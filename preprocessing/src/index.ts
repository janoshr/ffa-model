import { getPatientState, getPulseState, getVentilationState } from './lib/core';
import { PrismaClient } from '@prisma/client';
import { getAge } from './lib/util';
import fs from 'fs';
import { stringify } from 'csv';

const prisma = new PrismaClient();

const SET_AGE_IN_MONTHS = false;

type IList = (string | number | null)[];

async function main() {
  // get all measurements
  const events = await prisma.measurementEvent.findMany({});
  console.log('Number of measurements:', events.length);

  const modifiedMs: {
    [key: string]: {
      pulse: IList;
      respiratoryRate: IList;
      patientState: IList;
      ageInMonths: number | null;
      fever: boolean;
    };
  } = {};

  const newEvents = events.map((event) => {
    // get and set calculated age for measurements
    const ageInMonths = getAge(event['dateOfBirth'], event['timestampOfCreation'], 'month');
    event['ageInMonths'] = ageInMonths;

    let modified = false;
    const temperature = Number(event['temperatureAdjusted'] ?? event['temperature'])
    // calculate new respiratoryRateState and update if needed
    if (event['respiratoryRate'] && ageInMonths !== null) {
      const newRespiratoryRateState = getVentilationState(
        'respiratoryRate',
        event['respiratoryRate'],
        ageInMonths,
        ageInMonths / 12,
        temperature
      )['respiratoryRateState'];

      // update
      if (event['respiratoryRateState'] !== newRespiratoryRateState) {
        // store modifications and original data in an object
        modified = true;
        modifiedMs[event['id']] = modifiedMs[event['id']] ?? {};
        modifiedMs[event['id']]['respiratoryRate'] = [
          event['respiratoryRate'],
          event['respiratoryRateState'],
          newRespiratoryRateState,
        ];
        event['respiratoryRateState'] = newRespiratoryRateState;
      }
    }

    // calculate new pulseState and update if needed
    if (event['pulse'] && ageInMonths !== null) {
      const newPulseState = getPulseState(
        'pulse',
        event['pulse'],
        ageInMonths,
        ageInMonths / 12,
        temperature
      )['pulseState'];

      // update
      if (event['pulseState'] !== newPulseState) {
        // store modifications and original data in an object
        modified = true;
        modifiedMs[event['id']] = modifiedMs[event['id']] ?? {};
        modifiedMs[event['id']]['pulse'] = [event['pulse'], event['pulseState'], newPulseState];
        event['pulseState'] = newPulseState;
      }
    }

    // check if pulse or respiratoryRate state variables have been modified
    if (modified) {
      // calculate new patientState
      const newPatientState = (getPatientState(event as any) as any)['patientState'];
      modifiedMs[event['id']]['ageInMonths'] = ageInMonths;
      modifiedMs[event['id']]['fever'] = Boolean(temperature && temperature >= 38.5)

      if (event['patientState'] !== newPatientState) {
        // if patientState differs store original and new data
        modifiedMs[event['id']]['patientState'] = [event['patientState'], newPatientState];
        event['patientState'] = newPatientState ?? event['patientState'];
      }
    }

    // get ventilation and pulse variables
    // update ventilation and pulse states
    // update overall state
    // return updated event
    return event;
  });

  // csv stringifyer
  const stringifyer = stringify({
    header: true,
    columns: [
      'id',
      'fever',
      'ageInMonths',
      'pulse',
      'pulseStateOld',
      'pulseStateNew',
      'respiratoryRate',
      'respiratoryRateStateOld',
      'respiratoryRateStateNew',
      'patientStateOld',
      'patientStateNew',
    ],
  });

  const modifiedList = Object.entries(modifiedMs);

  // format object into a flat list and writ csv stringifyer
  if (modifiedList.length !== 0) {
    modifiedList.forEach(([id, ev]) => {
      stringifyer.write([
        id,
        ev['fever'] ? 1 : 0,
        ev['ageInMonths'] ?? '',
        ...(ev['pulse'] ? ev['pulse'] : ['', '', '']),
        ...(ev['respiratoryRate'] ? ev['respiratoryRate'] : ['', '', '']),
        ...(ev['patientState'] ? ev['patientState'] : ['', '']),
      ]);
    });

    // write out modified list
    const writeStream = fs.createWriteStream('modifiedList.csv');

    stringifyer.pipe(writeStream);
  }

  // Update all rows in the database
  // all rows need to be updated because ageInMonths is being set
  if (SET_AGE_IN_MONTHS) {
    await prisma.$transaction(
      newEvents.map((event) => {
        return prisma.measurementEvent.update({
          data: event,
          where: { id: event['id'] },
        });
      })
    );
    console.log('All measurements updated for ageInMonths');
    console.log('Number of events updated for state', modifiedList.length);
  } else {
    await prisma.$transaction(
      modifiedList.map(([id, modEv]) => {
        return prisma.measurementEvent.update({
          where: { id: id },
          data: {
            patientState: modEv['patientState'] ? (modEv['patientState'][1] as string) : undefined,
            pulseState: modEv['pulse'] ? (modEv['pulse'][2] as string) : undefined,
            respiratoryRateState: modEv['respiratoryRate']
              ? (modEv['respiratoryRate'][2] as string)
              : undefined,
          },
        });
      })
    );
    console.log('Number of events updated for state', modifiedList.length);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
