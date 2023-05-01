type State = 'neutral' | 'good' | 'danger' | 'caution';

// export const getFeverState = (question: string, value: string, state: unknown) => {
//   let answerValue: string | null = '';
//   let questionValue = '';
//   let temperatureAdjusted = null;
//   let temperatureValue = null;

//   // 1 SET answerValue
//   if (!question) {
//     questionValue = value.split('-')[0];
//     if (value.split('-')[1] === 'null') {
//       answerValue = null;
//     } else {
//       answerValue = value;
//     }
//   } else {
//     questionValue = question;
//     answerValue = value; // for new RadioBtnGroup with question
//   }

//   if (questionValue === 'temperature') {
//     temperatureValue = value;
//     answerValue = value;
//   }

//   // 2 SET setState
//   // 2.1 SET setState temperatureAdjusted
//   if (
//     (questionValue === 'temperature' &&
//       answerValue &&
//       state.feverMeasurementLocation === 'feverMeasurementLocation-05-Armpit') ||
//     (questionValue === 'feverMeasurementLocation' &&
//       answerValue === 'feverMeasurementLocation-05-Armpit' &&
//       state.temperature)
//   ) {
//     try {
//       temperatureAdjusted =
//         (questionValue === 'temperature' ? Number(answerValue) : parseFloat(state.temperature)) +
//         0.5;
//     } catch (error) {
//       if (error instanceof Error) {
//         Bugsnag.notify(error);
//       } else {
//         Bugsnag.notify({
//           errorClass: typeof error,
//           errorMessage: JSON.stringify(error),
//           message: 'Non error thrown',
//           stack: 'EventScreen',
//         });
//       }
//       // sanity check
//       temperatureAdjusted = answerValue;
//     }
//     temperatureValue = temperatureAdjusted;
//     setState({
//       temperatureAdjusted,
//     });
//   }
//   if (
//     (questionValue === 'temperature' &&
//       (answerValue === null || answerValue === '') &&
//       state.temperatureAdjusted !== null) ||
//     (questionValue === 'feverMeasurementLocation' &&
//       answerValue !== 'feverMeasurementLocation-05-Armpit' &&
//       state.temperatureAdjusted !== null)
//   ) {
//     temperatureValue =
//       questionValue === 'temperature' ? answerValue : parseFloat(state.temperature);
//     setState({
//       temperatureAdjusted: null,
//     });
//   }

//   // 2.2 SET setState all other
//   if (questionValue !== 'feverMeasurementLocation') {
//     const stateToSet = {
//       [questionValue]:
//         typeof answerValue === 'string' || !answerValue
//           ? answerValue
//           : questionValue !== 'antipyreticMedicationWhat'
//           ? answerValue.toString()
//           : answerValue,
//     };
//     if (questionValue === 'thermometerUsed') {
//       if (
//         (answerValue === 'thermometerUsed-01-Digital' ||
//           answerValue === 'thermometerUsed-02-Chemical') &&
//         (state.feverMeasurementLocation === 'feverMeasurementLocation-01-Forehead' ||
//           state.feverMeasurementLocation === 'feverMeasurementLocation-02-Ear')
//       ) {
//         stateToSet.feverMeasurementLocation = null;
//       }
//       if (
//         answerValue === 'thermometerUsed-03-Infra' &&
//         state.feverMeasurementLocation !== 'feverMeasurementLocation-02-Ear'
//       ) {
//         stateToSet.feverMeasurementLocation = null;
//       }
//       if (answerValue === 'thermometerUsed-04-Other') {
//         stateToSet.feverMeasurementLocation = null;
//       }
//     }
//     if (
//       questionValue === 'antipyreticMedication' &&
//       answerValue !== 'antipyreticMedication-02-Yes'
//     ) {
//       stateToSet.antipyreticMedicationWhat = null;
//       stateToSet.antipyreticMedicationHowManyTimes = null;
//       stateToSet.antipyreticMedicationHowMuch = null;
//       stateToSet.antipyreticMedicationWhy = null;
//     }
//     if (questionValue === 'antibiotics' && answerValue !== 'antibiotics-02-Yes') {
//       stateToSet.antibioticsWhat = null;
//       stateToSet.antibioticsHowManyTimes = null;
//       stateToSet.antibioticsHowMuch = null;
//     }
//     setState(stateToSet, () => {
//       if (questionValue === 'temperature' && state.respiratoryRate) {
//         onValueChangeVentilation('respiratoryRate', state.respiratoryRate);
//       }
//       if (questionValue === 'temperature' && state.pulse) {
//         onValueChangePulse('pulse', state.pulse);
//       }
//       checkEdit();
//     });
//   }

//   // 3 SET setState for questionState
//   let questionState = questionValue + 'State';
//   const ageInMonths = getAge('month');

//   if (
//     // TODO TOCHECK do we need this undefined??
//     answerValue === undefined ||
//     answerValue === null ||
//     answerValue === '' ||
//     answerValue === 'thermometerUsed-01-Digital' ||
//     answerValue === 'thermometerUsed-02-Chemical' ||
//     answerValue === 'thermometerUsed-03-Infra' ||
//     (answerValue === 'feverMeasurementLocation-02-Ear' &&
//       state.thermometerUsed === 'thermometerUsed-03-Infra') ||
//     answerValue === 'feverMeasurementLocation-03-Rectal' ||
//     answerValue === 'feverMeasurementLocation-04-Oral' ||
//     answerValue === 'feverMeasurementLocation-05-Armpit' ||
//     answerValue === 'antipyreticMedication-01-No' ||
//     answerValue === 'antipyreticMedicationWhat-01' ||
//     answerValue === 'antipyreticMedicationWhat-02' ||
//     answerValue === 'antipyreticMedicationWhat-03' ||
//     answerValue === 'antipyreticMedicationWhy-01' ||
//     answerValue === 'antipyreticMedicationWhy-02' ||
//     answerValue === 'antibiotics-01-No'
//   ) {
//     // TODO too many setState() calls OR?
//     setState({[questionState]: 'neutral'}, () => {
//       handlePatientStateChange();
//       if (questionValue === 'thermometerUsed') {
//         if (
//           answerValue !== 'thermometerUsed-03-Infra' &&
//           state.feverMeasurementLocation === 'feverMeasurementLocation-02-Ear'
//         ) {
//           setState({feverMeasurementLocationState: 'cautioncantdo'}, () => {
//             handleEventStateChange();
//           });
//         } else if (
//           answerValue === 'thermometerUsed-03-Infra' &&
//           state.feverMeasurementLocation === 'feverMeasurementLocation-02-Ear'
//         ) {
//           setState({feverMeasurementLocationState: 'neutral'}, () => {
//             handleEventStateChange();
//           });
//         }
//         handleEventStateChange();
//       }
//       if (questionValue === 'feverMeasurementLocation') {
//         handleEventStateChange();
//       }
//       if (
//         questionValue === 'antipyreticMedication' &&
//         answerValue !== 'antipyreticMedication-02-Yes'
//       ) {
//         setState(
//           {
//             antipyreticMedicationHowManyTimesState: null,
//           },
//           () => {
//             handlePatientStateChange();
//           },
//         );
//       }
//       if (questionValue === 'antibiotics' && answerValue !== 'antibiotics-02-Yes') {
//         setState(
//           {
//             antibioticsHowManyTimes: null,
//           },
//           () => {
//             handlePatientStateChange();
//           },
//         );
//       }
//     });
//   }
//   if (
//     (temperatureValue >= 35 && temperatureValue <= 38) ||
//     (temperatureValue > 38 && temperatureValue <= 39 && ageInMonths > 6) ||
//     (temperatureValue > 39 && temperatureValue <= 40 && ageInMonths > 6) ||
//     answerValue === 'feverDuration-01-3>days'
//   ) {
//     if (questionValue === 'temperature' || questionValue === 'feverMeasurementLocation') {
//       setState({temperatureState: 'good'}, () => {
//         handlePatientStateChange();
//       });
//     } else {
//       setState({[questionState]: 'good'}, () => {
//         handlePatientStateChange();
//       });
//     }
//   }
//   if (
//     (temperatureValue > 38 && temperatureValue <= 39 && ageInMonths > 3 && ageInMonths <= 6) ||
//     (temperatureValue > 40 && temperatureValue <= 41 && ageInMonths > 6) ||
//     answerValue === 'feverDuration-02-5>=days>3' ||
//     answerValue === 'antipyreticMedication-02-Yes' ||
//     answerValue === 'antipyreticMedicationHowManyTimes01-1' ||
//     answerValue === 'antipyreticMedicationHowManyTimes02-2' ||
//     answerValue === 'antipyreticMedicationHowManyTimes03-3' ||
//     answerValue === 'antibioticsHowManyTimes01-1' ||
//     answerValue === 'antibioticsHowManyTimes02-2' ||
//     answerValue === 'antibioticsHowManyTimes03-3' ||
//     answerValue === 'antibiotics-02-Yes'
//   ) {
//     if (questionValue === 'temperature' || questionValue === 'feverMeasurementLocation') {
//       setState({temperatureState: 'caution'}, () => {
//         handlePatientStateChange();
//       });
//     } else {
//       setState({[questionState]: 'caution'}, () => {
//         handlePatientStateChange();
//       });
//     }
//   }
//   if (
//     answerValue === 'thermometerUsed-04-Other' ||
//     answerValue === 'feverMeasurementLocation-01-Forehead' ||
//     (answerValue === 'feverMeasurementLocation-02-Ear' &&
//       state.thermometerUsed !== 'thermometerUsed-03-Infra')
//   ) {
//     setState({[questionState]: 'cautioncantdo'}, () => {
//       if (
//         answerValue === 'thermometerUsed-04-Other' &&
//         state.feverMeasurementLocation === 'feverMeasurementLocation-02-Ear'
//       ) {
//         setState({feverMeasurementLocationState: 'cautioncantdo'}, () => {
//           handleEventStateChange();
//         });
//       } else {
//         handleEventStateChange();
//       }
//     });
//   }
//   if (
//     (temperatureValue &&
//       (temperatureValue < 35 ||
//         (temperatureValue > 38 && temperatureValue <= 39 && ageInMonths <= 3) ||
//         (temperatureValue > 39 && temperatureValue <= 40 && ageInMonths <= 6) ||
//         (temperatureValue > 40 && temperatureValue <= 41 && ageInMonths <= 6) ||
//         temperatureValue > 41)) ||
//     answerValue === 'feverDuration-03-days>=5' ||
//     answerValue === 'antipyreticMedicationHowManyTimes04-4' ||
//     answerValue === 'antipyreticMedicationHowManyTimes05-5' ||
//     answerValue === 'antipyreticMedicationHowManyTimes06-MoreThan5' ||
//     answerValue === 'antibioticsHowManyTimes04-4' ||
//     answerValue === 'antibioticsHowManyTimes05-5' ||
//     answerValue === 'antibioticsHowManyTimes06-MoreThan5'
//   ) {
//     if (questionValue === 'temperature' || questionValue === 'feverMeasurementLocation') {
//       setState({temperatureState: 'danger'}, () => {
//         handlePatientStateChange();
//       });
//     } else {
//       setState({[questionState]: 'danger'}, () => {
//         handlePatientStateChange();
//       });
//     }
//   }
// };

export const getPulseState = (
  question: string,
  value: string,
  ageInMonths: number,
  ageInYears: number,
  temperature: number | null
): { [key: string]: State } => {
  const questionState = question + 'State';

  const pulse: string | number = parseFloat(value) ?? value;

  if (!pulse) {
    return { [questionState]: 'neutral' };
  }
  // pulse decision tree version 2020-04-24
  if (pulse && (temperature || temperature === null)) {
    if (temperature === null || temperature < 38.5) {
      if (
        (ageInMonths <= 3 && pulse <= 111) ||
        (ageInMonths <= 3 && pulse > 173) ||
        (ageInMonths > 3 && ageInMonths <= 6 && pulse <= 106) ||
        (ageInMonths > 3 && ageInMonths <= 6 && pulse > 167) ||
        (ageInMonths > 6 && ageInMonths <= 12 && pulse <= 97) ||
        (ageInMonths > 6 && ageInMonths <= 12 && pulse > 166) ||
        (ageInMonths > 12 && ageInMonths <= 18 && pulse <= 90) ||
        (ageInMonths > 12 && ageInMonths <= 18 && pulse > 152) ||
        (ageInMonths > 18 && ageInYears <= 2 && pulse <= 85) ||
        (ageInMonths > 18 && ageInYears <= 2 && pulse > 145) ||
        (ageInYears > 2 && ageInYears <= 3 && pulse <= 78) ||
        (ageInYears > 2 && ageInYears <= 3 && pulse > 135) ||
        (ageInYears > 3 && ageInYears <= 5 && pulse <= 70) ||
        (ageInYears > 3 && ageInYears <= 5 && pulse > 130) ||
        (ageInYears > 5 && ageInYears <= 8 && pulse <= 61) ||
        (ageInYears > 5 && ageInYears <= 8 && pulse > 123) ||
        (ageInYears > 8 && ageInYears <= 12 && pulse <= 53) ||
        (ageInYears > 8 && ageInYears <= 12 && pulse > 113) ||
        (ageInYears > 12 && ageInYears <= 16 && pulse <= 48) ||
        (ageInYears > 12 && ageInYears <= 16 && pulse > 105) ||
        (ageInYears > 16 && pulse <= 45) ||
        (ageInYears > 16 && pulse > 99)
      ) {
        return { [questionState]: 'danger' };
      }
      if (
        (ageInMonths <= 3 && pulse > 111 && pulse <= 127) ||
        (ageInMonths <= 3 && pulse > 158 && pulse <= 173) ||
        (ageInMonths > 3 && ageInMonths <= 6 && pulse > 106 && pulse <= 121) ||
        (ageInMonths > 3 && ageInMonths <= 6 && pulse > 152 && pulse <= 167) ||
        (ageInMonths > 6 && ageInMonths <= 12 && pulse > 97 && pulse <= 111) ||
        (ageInMonths > 6 && ageInMonths <= 12 && pulse > 145 && pulse <= 160) ||
        (ageInMonths > 12 && ageInMonths <= 18 && pulse > 90 && pulse <= 105) ||
        (ageInMonths > 12 && ageInMonths <= 18 && pulse > 137 && pulse <= 152) ||
        (ageInMonths > 18 && ageInYears <= 2 && pulse > 85 && pulse <= 99) ||
        (ageInMonths > 18 && ageInYears <= 2 && pulse > 131 && pulse <= 145) ||
        (ageInYears > 2 && ageInYears <= 3 && pulse > 78 && pulse <= 92) ||
        (ageInYears > 2 && ageInYears <= 3 && pulse > 120 && pulse <= 135) ||
        (ageInYears > 3 && ageInYears <= 5 && pulse > 70 && pulse <= 84) ||
        (ageInYears > 3 && ageInYears <= 5 && pulse > 116 && pulse <= 130) ||
        (ageInYears > 5 && ageInYears <= 8 && pulse > 61 && pulse <= 75) ||
        (ageInYears > 5 && ageInYears <= 8 && pulse > 109 && pulse <= 123) ||
        (ageInYears > 8 && ageInYears <= 12 && pulse > 53 && pulse <= 67) ||
        (ageInYears > 8 && ageInYears <= 12 && pulse > 99 && pulse <= 113) ||
        (ageInYears > 12 && ageInYears <= 16 && pulse > 48 && pulse <= 61) ||
        (ageInYears > 12 && ageInYears <= 16 && pulse > 92 && pulse <= 105) ||
        (ageInYears > 16 && pulse > 45 && pulse <= 58) ||
        (ageInYears > 16 && pulse > 86 && pulse <= 99)
      ) {
        return { [questionState]: 'caution' };
      }
      if (
        (ageInMonths <= 3 && pulse > 127 && pulse <= 158) ||
        (ageInMonths > 3 && ageInMonths <= 6 && pulse > 121 && pulse <= 152) ||
        (ageInMonths > 6 && ageInMonths <= 12 && pulse > 111 && pulse <= 145) ||
        (ageInMonths > 12 && ageInMonths <= 18 && pulse > 105 && pulse <= 137) ||
        (ageInMonths > 18 && ageInYears <= 2 && pulse > 99 && pulse <= 131) ||
        (ageInYears > 2 && ageInYears <= 3 && pulse > 92 && pulse <= 120) ||
        (ageInYears > 3 && ageInYears <= 5 && pulse > 84 && pulse <= 116) ||
        (ageInYears > 5 && ageInYears <= 8 && pulse > 75 && pulse <= 109) ||
        (ageInYears > 8 && ageInYears <= 12 && pulse > 67 && pulse <= 99) ||
        (ageInYears > 12 && ageInYears <= 16 && pulse > 61 && pulse <= 92) ||
        (ageInYears > 16 && pulse > 58 && pulse <= 86)
      ) {
        return { [questionState]: 'good' };
      }
    } else if (temperature >= 38.5) {
      if (
        (ageInMonths <= 3 && pulse <= 128) ||
        (ageInMonths <= 3 && pulse > 173) ||
        (ageInMonths > 3 && ageInMonths <= 6 && pulse <= 122) ||
        (ageInMonths > 3 && ageInMonths <= 6 && pulse > 167) ||
        (ageInMonths > 6 && ageInMonths <= 12 && pulse <= 112) ||
        (ageInMonths > 6 && ageInMonths <= 12 && pulse > 166) ||
        (ageInMonths > 12 && ageInMonths <= 18 && pulse <= 103) ||
        (ageInMonths > 12 && ageInMonths <= 18 && pulse > 152) ||
        (ageInMonths > 18 && ageInYears <= 2 && pulse <= 98) ||
        (ageInMonths > 18 && ageInYears <= 2 && pulse > 145) ||
        (ageInYears > 2 && ageInYears <= 3 && pulse <= 90) ||
        (ageInYears > 2 && ageInYears <= 3 && pulse > 135) ||
        (ageInYears > 3 && ageInYears <= 5 && pulse <= 80) ||
        (ageInYears > 3 && ageInYears <= 5 && pulse > 130) ||
        (ageInYears > 5 && ageInYears <= 8 && pulse <= 70) ||
        (ageInYears > 5 && ageInYears <= 8 && pulse > 123) ||
        (ageInYears > 8 && ageInYears <= 12 && pulse <= 61) ||
        (ageInYears > 8 && ageInYears <= 12 && pulse > 120) ||
        (ageInYears > 12 && ageInYears <= 16 && pulse <= 55) ||
        (ageInYears > 12 && ageInYears <= 16 && pulse > 120) ||
        (ageInYears > 16 && pulse <= 52) ||
        (ageInYears > 16 && pulse > 120)
      ) {
        return { [questionState]: 'danger' };
      }
      if (
        (ageInMonths <= 3 && pulse > 128 && pulse <= 146) ||
        (ageInMonths <= 3 && pulse > 158 && pulse <= 173) ||
        (ageInMonths > 3 && ageInMonths <= 6 && pulse > 122 && pulse <= 139) ||
        (ageInMonths > 3 && ageInMonths <= 6 && pulse > 152 && pulse <= 167) ||
        (ageInMonths > 6 && ageInMonths <= 12 && pulse > 112 && pulse <= 127) ||
        (ageInMonths > 6 && ageInMonths <= 12 && pulse > 145 && pulse <= 160) ||
        (ageInMonths > 12 && ageInMonths <= 18 && pulse > 103 && pulse <= 121) ||
        (ageInMonths > 12 && ageInMonths <= 18 && pulse > 137 && pulse <= 152) ||
        (ageInMonths > 18 && ageInYears <= 2 && pulse > 98 && pulse <= 114) ||
        (ageInMonths > 18 && ageInYears <= 2 && pulse > 131 && pulse <= 145) ||
        (ageInYears > 2 && ageInYears <= 3 && pulse > 90 && pulse <= 106) ||
        (ageInYears > 2 && ageInYears <= 3 && pulse > 120 && pulse <= 135) ||
        (ageInYears > 3 && ageInYears <= 5 && pulse > 80 && pulse <= 97) ||
        (ageInYears > 3 && ageInYears <= 5 && pulse > 116 && pulse <= 130) ||
        (ageInYears > 5 && ageInYears <= 8 && pulse > 70 && pulse <= 86) ||
        (ageInYears > 5 && ageInYears <= 8 && pulse > 109 && pulse <= 123) ||
        (ageInYears > 8 && ageInYears <= 12 && pulse > 61 && pulse <= 77) ||
        (ageInYears > 8 && ageInYears <= 12 && pulse > 99 && pulse <= 120) ||
        (ageInYears > 12 && ageInYears <= 16 && pulse > 55 && pulse <= 70) ||
        (ageInYears > 12 && ageInYears <= 16 && pulse > 92 && pulse <= 120) ||
        (ageInYears > 16 && pulse > 52 && pulse <= 67) ||
        (ageInYears > 16 && pulse > 86 && pulse <= 120)
      ) {
        return { [questionState]: 'caution' };
      }
      if (
        (ageInMonths <= 3 && pulse > 146 && pulse <= 158) ||
        (ageInMonths > 3 && ageInMonths <= 6 && pulse > 139 && pulse <= 152) ||
        (ageInMonths > 6 && ageInMonths <= 12 && pulse > 127 && pulse <= 145) ||
        (ageInMonths > 12 && ageInMonths <= 18 && pulse > 121 && pulse <= 137) ||
        (ageInMonths > 18 && ageInYears <= 2 && pulse > 114 && pulse <= 131) ||
        (ageInYears > 2 && ageInYears <= 3 && pulse > 106 && pulse <= 120) ||
        (ageInYears > 3 && ageInYears <= 5 && pulse > 97 && pulse <= 116) ||
        (ageInYears > 5 && ageInYears <= 8 && pulse > 86 && pulse <= 109) ||
        (ageInYears > 8 && ageInYears <= 12 && pulse > 77 && pulse <= 99) ||
        (ageInYears > 12 && ageInYears <= 16 && pulse > 70 && pulse <= 92) ||
        (ageInYears > 16 && pulse > 67 && pulse <= 86)
      ) {
        return { [questionState]: 'good' };
      }
    }
  }
  return { [questionState]: 'neutral' };
};

export const getVentilationState = (
  question: string,
  value: string,
  ageInMonths: number,
  ageInYears: number,
  temperature: number | null
): { [key: string]: State } => {
  let answerValue: number | string = value;
  if (question === 'respiratoryRate') {
    answerValue = parseFloat(value);
  }

  const questionState = question + 'State';
  let questionStateValue: State = 'neutral';

  if (answerValue === null) {
    questionStateValue = 'neutral';
  } else if (
    answerValue === 'wheezing-01-No' ||
    answerValue === 'dyspnea-01-1' ||
    answerValue === 'dyspnea-02-2'
  ) {
    questionStateValue = 'good';
  } else if (answerValue === 'wheezing-02-SomewhatYes' || answerValue === 'dyspnea-03-3') {
    questionStateValue = 'caution';
  } else if (
    answerValue === 'wheezing-03-Stridor' ||
    answerValue === 'dyspnea-04-4' ||
    answerValue === 'dyspnea-05-5'
  ) {
    questionStateValue = 'danger';
  } else if (temperature || temperature === null) {
    if (temperature === null || temperature < 38.5) {
      // Breathing decision tree version 2020-04-24
      if (
        (ageInMonths <= 3 && answerValue > 33 && answerValue <= 51) ||
        (ageInMonths > 3 && ageInMonths <= 6 && answerValue > 32 && answerValue <= 48) ||
        (ageInMonths > 6 && ageInMonths <= 12 && answerValue > 29 && answerValue <= 46) ||
        (ageInMonths > 12 && ageInMonths <= 18 && answerValue > 27 && answerValue <= 42) ||
        (ageInMonths > 18 && ageInYears <= 2 && answerValue > 25 && answerValue <= 37) ||
        (ageInYears > 2 && ageInYears <= 3 && answerValue > 22 && answerValue <= 30) ||
        (ageInYears > 3 && ageInYears <= 5 && answerValue > 20 && answerValue <= 24) ||
        (ageInYears > 5 && ageInYears <= 8 && answerValue > 18 && answerValue <= 22) ||
        (ageInYears > 8 && ageInYears <= 12 && answerValue > 16 && answerValue <= 20) ||
        (ageInYears > 12 && ageInYears <= 16 && answerValue > 14 && answerValue <= 18) ||
        (ageInYears > 16 && answerValue > 13 && answerValue <= 16)
      ) {
        questionStateValue = 'good';
      }
      if (
        (ageInMonths <= 3 && answerValue > 25 && answerValue <= 33) ||
        (ageInMonths <= 3 && answerValue > 51 && answerValue <= 60) ||
        (ageInMonths > 3 && ageInMonths <= 6 && answerValue > 23 && answerValue <= 32) ||
        (ageInMonths > 3 && ageInMonths <= 6 && answerValue > 48 && answerValue <= 57) ||
        (ageInMonths > 6 && ageInMonths <= 12 && answerValue > 22 && answerValue <= 29) ||
        (ageInMonths > 6 && ageInMonths <= 12 && answerValue > 46 && answerValue <= 54) ||
        (ageInMonths > 12 && ageInMonths <= 18 && answerValue > 20 && answerValue <= 27) ||
        (ageInMonths > 12 && ageInMonths <= 18 && answerValue > 42 && answerValue <= 49) ||
        (ageInMonths > 18 && ageInYears <= 2 && answerValue > 19 && answerValue <= 25) ||
        (ageInMonths > 18 && ageInYears <= 2 && answerValue > 37 && answerValue <= 43) ||
        (ageInYears > 2 && ageInYears <= 3 && answerValue > 18 && answerValue <= 22) ||
        (ageInYears > 2 && ageInYears <= 3 && answerValue > 30 && answerValue <= 34) ||
        (ageInYears > 3 && ageInYears <= 5 && answerValue > 18 && answerValue <= 20) ||
        (ageInYears > 3 && ageInYears <= 5 && answerValue > 24 && answerValue <= 30) ||
        (ageInYears > 5 && ageInYears <= 8 && answerValue > 16 && answerValue <= 18) ||
        (ageInYears > 5 && ageInYears <= 8 && answerValue > 22 && answerValue <= 27) ||
        (ageInYears > 8 && ageInYears <= 12 && answerValue > 14 && answerValue <= 16) ||
        (ageInYears > 8 && ageInYears <= 12 && answerValue > 20 && answerValue <= 24) ||
        (ageInYears > 12 && ageInYears <= 16 && answerValue > 12 && answerValue <= 14) ||
        (ageInYears > 12 && ageInYears <= 16 && answerValue > 18 && answerValue <= 23) ||
        (ageInYears > 16 && answerValue > 11 && answerValue <= 13) ||
        (ageInYears > 16 && answerValue > 16 && answerValue <= 21)
      ) {
        questionStateValue = 'caution';
      }
      if (
        (ageInMonths <= 3 && answerValue <= 25) ||
        (ageInMonths <= 3 && answerValue > 60) ||
        (ageInMonths > 3 && ageInMonths <= 6 && answerValue <= 23) ||
        (ageInMonths > 3 && ageInMonths <= 6 && answerValue > 57) ||
        (ageInMonths > 6 && ageInMonths <= 12 && answerValue <= 22) ||
        (ageInMonths > 6 && ageInMonths <= 12 && answerValue > 54) ||
        (ageInMonths > 12 && ageInMonths <= 18 && answerValue <= 20) ||
        (ageInMonths > 12 && ageInMonths <= 18 && answerValue > 49) ||
        (ageInMonths > 18 && ageInYears <= 2 && answerValue <= 19) ||
        (ageInMonths > 18 && ageInYears <= 2 && answerValue > 43) ||
        (ageInYears > 2 && ageInYears <= 3 && answerValue <= 18) ||
        (ageInYears > 2 && ageInYears <= 3 && answerValue > 34) ||
        (ageInYears > 2 && ageInYears <= 5 && answerValue <= 18) ||
        (ageInYears > 2 && ageInYears <= 5 && answerValue > 30) ||
        (ageInYears > 5 && ageInYears <= 8 && answerValue <= 16) ||
        (ageInYears > 5 && ageInYears <= 8 && answerValue > 27) ||
        (ageInYears > 8 && ageInYears <= 12 && answerValue <= 14) ||
        (ageInYears > 8 && ageInYears <= 12 && answerValue > 24) ||
        (ageInYears > 12 && ageInYears <= 16 && answerValue <= 12) ||
        (ageInYears > 12 && ageInYears <= 16 && answerValue > 23) ||
        (ageInYears > 16 && answerValue <= 11) ||
        (ageInYears > 16 && answerValue > 21)
      ) {
        questionStateValue = 'danger';
      }
    } else if (temperature >= 38.5) {
      if (
        (ageInMonths <= 3 && answerValue > 38 && answerValue <= 51) ||
        (ageInMonths > 3 && ageInMonths <= 6 && answerValue > 37 && answerValue <= 48) ||
        (ageInMonths > 6 && ageInMonths <= 12 && answerValue > 33 && answerValue <= 46) ||
        (ageInMonths > 12 && ageInMonths <= 18 && answerValue > 31 && answerValue <= 42) ||
        (ageInMonths > 18 && ageInYears <= 2 && answerValue > 29 && answerValue <= 37) ||
        (ageInYears > 2 && ageInYears <= 3 && answerValue > 25 && answerValue <= 30) ||
        (ageInYears > 3 && ageInYears <= 5 && answerValue > 23 && answerValue <= 24) ||
        (ageInYears > 5 && ageInYears <= 8 && answerValue > 21 && answerValue <= 22) ||
        (ageInYears > 8 && ageInYears <= 12 && answerValue > 18 && answerValue <= 20) ||
        (ageInYears > 12 && ageInYears <= 16 && answerValue > 16 && answerValue <= 18) ||
        (ageInYears > 16 && answerValue > 15 && answerValue <= 16)
      ) {
        questionStateValue = 'good';
      }
      if (
        (ageInMonths <= 3 && answerValue > 29 && answerValue <= 38) ||
        (ageInMonths <= 3 && answerValue > 51 && answerValue <= 60) ||
        (ageInMonths > 3 && ageInMonths <= 6 && answerValue > 26 && answerValue <= 37) ||
        (ageInMonths > 3 && ageInMonths <= 6 && answerValue > 48 && answerValue <= 57) ||
        (ageInMonths > 6 && ageInMonths <= 12 && answerValue > 25 && answerValue <= 33) ||
        (ageInMonths > 6 && ageInMonths <= 12 && answerValue > 46 && answerValue <= 54) ||
        (ageInMonths > 12 && ageInMonths <= 18 && answerValue > 23 && answerValue <= 31) ||
        (ageInMonths > 12 && ageInMonths <= 18 && answerValue > 42 && answerValue <= 49) ||
        (ageInMonths > 18 && ageInYears <= 2 && answerValue > 22 && answerValue <= 29) ||
        (ageInMonths > 18 && ageInYears <= 2 && answerValue > 37 && answerValue <= 43) ||
        (ageInYears > 2 && ageInYears <= 3 && answerValue > 21 && answerValue <= 25) ||
        (ageInYears > 2 && ageInYears <= 3 && answerValue > 30 && answerValue <= 34) ||
        (ageInYears > 3 && ageInYears <= 5 && answerValue > 21 && answerValue <= 23) ||
        (ageInYears > 3 && ageInYears <= 5 && answerValue > 24 && answerValue <= 30) ||
        (ageInYears > 5 && ageInYears <= 8 && answerValue > 18 && answerValue <= 21) ||
        (ageInYears > 5 && ageInYears <= 8 && answerValue > 22 && answerValue <= 27) ||
        (ageInYears > 8 && ageInYears <= 12 && answerValue > 16 && answerValue <= 18) ||
        (ageInYears > 8 && ageInYears <= 12 && answerValue > 20 && answerValue <= 24) ||
        (ageInYears > 12 && ageInYears <= 16 && answerValue > 14 && answerValue <= 16) ||
        (ageInYears > 12 && ageInYears <= 16 && answerValue > 18 && answerValue <= 23) ||
        (ageInYears > 16 && answerValue > 13 && answerValue <= 15) ||
        (ageInYears > 16 && answerValue > 16 && answerValue <= 21)
      ) {
        questionStateValue = 'caution';
      }
      if (
        (ageInMonths <= 3 && answerValue <= 29) ||
        (ageInMonths <= 3 && answerValue > 60) ||
        (ageInMonths > 3 && ageInMonths <= 6 && answerValue <= 26) ||
        (ageInMonths > 3 && ageInMonths <= 6 && answerValue > 57) ||
        (ageInMonths > 6 && ageInMonths <= 12 && answerValue <= 25) ||
        (ageInMonths > 6 && ageInMonths <= 12 && answerValue > 54) ||
        (ageInMonths > 12 && ageInMonths <= 18 && answerValue <= 23) ||
        (ageInMonths > 12 && ageInMonths <= 18 && answerValue > 49) ||
        (ageInMonths > 18 && ageInYears <= 2 && answerValue <= 22) ||
        (ageInMonths > 18 && ageInYears <= 2 && answerValue > 43) ||
        (ageInYears > 2 && ageInYears <= 3 && answerValue <= 21) ||
        (ageInYears > 2 && ageInYears <= 3 && answerValue > 34) ||
        (ageInYears > 2 && ageInYears <= 5 && answerValue <= 21) ||
        (ageInYears > 2 && ageInYears <= 5 && answerValue > 30) ||
        (ageInYears > 5 && ageInYears <= 8 && answerValue <= 18) ||
        (ageInYears > 5 && ageInYears <= 8 && answerValue > 27) ||
        (ageInYears > 8 && ageInYears <= 12 && answerValue <= 16) ||
        (ageInYears > 8 && ageInYears <= 12 && answerValue > 24) ||
        (ageInYears > 12 && ageInYears <= 16 && answerValue <= 14) ||
        (ageInYears > 12 && ageInYears <= 16 && answerValue > 23) ||
        (ageInYears > 16 && answerValue <= 13) ||
        (ageInYears > 16 && answerValue > 21)
      ) {
        questionStateValue = 'danger';
      }
    }
  }
  return { [questionState]: questionStateValue };
};

export const getSkinState = (question: string, value: string): { [key: string]: State } => {
  const questionState = question + 'State';
  let questionStateValue: State;
  if (value === null) {
    questionStateValue = 'neutral';
  } else if (value === 'skinColor-01-NormalSlightlyPale' || value === 'rash-01-No') {
    questionStateValue = 'good';
  } else if (
    value === 'skinColor-02-Pale' ||
    value === 'glassTest-01-RedDisappears' ||
    value === 'rash-02-Yes'
  ) {
    questionStateValue = 'caution';
  } else if (value === 'skinColor-03-GreyBlueCyanotic' || value === 'glassTest-02-RedRemains') {
    questionStateValue = 'danger';
  } else {
    questionStateValue = 'neutral';
  }
  return { [questionState]: questionStateValue };
};

export const getHydrationState = (question: string, value: string): { [key: string]: State } => {
  const questionState = question + 'State';
  let questionStateValue: State;

  if (value === null) {
    questionStateValue = 'neutral';
  } else if (
    value === 'lastUrination-01-6>hours' ||
    value === 'skinTurgor-01-Normal' ||
    value === 'tearsWhenCrying-01-Yes' ||
    value === 'tongue-01-Wet' ||
    value === 'drinking-01-Normal' ||
    value === 'diarrhea-01-NoOrSlight' ||
    value === 'vomit-01-No'
  ) {
    questionStateValue = 'good';
  } else if (
    value === 'lastUrination-02-6<=hours<12' ||
    value === 'skinTurgor-02-SomewhatDecreased' ||
    value === 'tearsWhenCrying-02-NotSoMuch' ||
    value === 'tongue-02-Dry' ||
    value === 'drinking-02-LessThanNormal' ||
    value === 'diarrhea-02-Frequent' ||
    value === 'vomit-02-Slight'
  ) {
    questionStateValue = 'caution';
  } else if (
    value === 'lastUrination-01-12<hours' ||
    value === 'skinTurgor-03-SeverelyDecreased' ||
    value === 'tearsWhenCrying-03-No' ||
    value === 'drinking-03-NotFor12Hours' ||
    value === 'diarrhea-03-FrequentAndBloody' ||
    value === 'vomit-03-Frequent' ||
    value === 'vomit-04-Yellow' ||
    value === 'vomit-05-5<hours'
  ) {
    questionStateValue = 'danger';
  } else {
    questionStateValue = 'neutral';
  }
  return { [questionState]: questionStateValue };
};

export const getGeneralState = (
  question: string,
  value: string | string[],
  ageInYears: number
): { [key: string]: State | null } => {
  const questionState = question + 'State';
  let questionStateValue: State = 'neutral';

  if (!value || (Array.isArray(value) && value.length === 0)) {
    questionStateValue = 'neutral';
  } else if (
    value === 'crying-01-DoesntCry' ||
    value === 'crying-02-NormalBoldCrying' ||
    value === 'lastTimeEating-01-<12hours' ||
    value === 'painfulUrination-01-No' ||
    value === 'smellyUrine-01-No' ||
    value === 'awareness-01-Normal' ||
    value === 'vaccinationsHowManyHoursAgo-01-Within48h' ||
    value === 'vaccinationsHowManyHoursAgo-02-Beyond48h' ||
    value === 'exoticTripInTheLast12Months-01-No' ||
    value === 'febrileSeizure-01-No' ||
    value === 'wryNeck-01-No' ||
    value === 'bulgingFontanelleMax18MOld-01-No' ||
    value === 'pain-01-No'
  ) {
    questionStateValue = 'good';
  } else if (
    value === 'lastTimeEating-02-12<=<24hours' ||
    value === 'painfulUrination-02-Yes' ||
    value === 'smellyUrine-02-Yes' ||
    (value === 'awareness-02-SleepyOddOrFeverishNightmares' && ageInYears <= 14) ||
    value === 'exoticTripInTheLast12Months-02-Yes' ||
    value === 'bulgingFontanelleMax18MOld-02-Yes' ||
    value === 'pain-02-FeelingBad' ||
    value === 'pain-03-Headache' ||
    (value === 'pain-05-StrongBellyacheAche' && ageInYears < 5)
  ) {
    questionStateValue = 'caution';
  } else if (
    value === 'crying-03-ContinuousWithUnusuallyHighPitch' ||
    value === 'crying-04-Weak' ||
    value === 'lastTimeEating-03->24hours' ||
    (value === 'awareness-02-SleepyOddOrFeverishNightmares' && ageInYears > 14) ||
    value === 'awareness-03-NoReactionsNoAwareness' ||
    value === 'febrileSeizure-02-Yes' ||
    value === 'wryNeck-02-Yes' ||
    value === 'pain-04-SwollenPainful' ||
    (value === 'pain-05-StrongBellyacheAche' && ageInYears >= 5)
  ) {
    questionStateValue = 'danger';
  }

  // to check CheckBoxGroup array answers
  if (Array.isArray(value) && value !== null) {
    if (value.includes('pain-01-No')) {
      questionStateValue = 'good';
    }
    if (value.includes('pain-02-FeelingBad') || value.includes('pain-03-Headache')) {
      questionStateValue = 'caution';
    }
    if (value.includes('pain-04-SwollenPainful') || value.includes('pain-05-StrongBellyacheAche')) {
      questionStateValue = 'danger';
    }
  }

  const questionStateToSet: { [key: string]: State | null } = {
    [questionState]: questionStateValue,
  };
  if (question === 'vaccinationsWithIn14days' && value !== 'vaccinationsWithIn14days-02-Yes') {
    questionStateToSet.vaccinationsHowManyHoursAgoState = null;
  }
  return questionStateToSet;
};

interface PatientEventStateExtract {
  antibioticsHowManyTimesState: State | null;
  antibioticsState: State | null | undefined;
  antipyreticMedicationHowManyTimesState: State | null | undefined;
  antipyreticMedicationState: State | null | undefined;
  awarenessState: State | null | undefined;
  bulgingFontanelleMax18MOldState: State | null | undefined;
  cryingState: State | null | undefined;
  diarrheaState: State | null | undefined;
  drinkingState: State | null | undefined;
  dyspneaState: State | null | undefined;
  exoticTripInTheLast12MonthsState: State | null | undefined;
  febrileSeizureState: State | null | undefined;
  feverDurationState: State | null | undefined;
  feverMeasurementLocationState: State | null | undefined;
  glassTestState: State | null | undefined;
  lastTimeEatingState: State | null | undefined;
  lastUrinationState: State | null | undefined;
  pain: string | string[] | null | undefined;
  painState: State | null | undefined;
  painfulUrinationState: State | null | undefined;
  pulseState: State | null | undefined;
  rashState: State | null | undefined;
  respiratoryRateState: State | null | undefined;
  skinColorState: State | null | undefined;
  skinTurgorState: State | null | undefined;
  smellyUrineState: State | null | undefined;
  tearsWhenCryingState: State | null | undefined;
  temperatureState: State | null | undefined;
  thermometerUsedState: State | null | undefined;
  tongueState: State | null | undefined;
  vaccinationsHowManyHoursAgoState: State | null | undefined;
  vaccinationsWithIn14daysState: State | null | undefined;
  vomitState: State | null | undefined;
  wheezingState: State | null | undefined;
  wryNeckState: State | null | undefined;
}

export const getPatientState = (
  state: PatientEventStateExtract
): { patientState: State } | null => {
  const {
    antibioticsHowManyTimesState,
    antibioticsState,
    antipyreticMedicationHowManyTimesState,
    antipyreticMedicationState,
    awarenessState,
    bulgingFontanelleMax18MOldState,
    cryingState,
    diarrheaState,
    drinkingState,
    dyspneaState,
    exoticTripInTheLast12MonthsState,
    febrileSeizureState,
    feverDurationState,
    feverMeasurementLocationState,
    glassTestState,
    lastTimeEatingState,
    lastUrinationState,
    pain,
    painState,
    painfulUrinationState,
    pulseState,
    rashState,
    respiratoryRateState,
    skinColorState,
    skinTurgorState,
    smellyUrineState,
    tearsWhenCryingState,
    temperatureState,
    thermometerUsedState,
    tongueState,
    vaccinationsHowManyHoursAgoState,
    vaccinationsWithIn14daysState,
    vomitState,
    wheezingState,
    wryNeckState,
  } = state;

  const statesAll = [
    { thermometerUsedState: thermometerUsedState },
    { feverMeasurementLocationState: feverMeasurementLocationState },
    { temperatureState: temperatureState },
    { feverDurationState: feverDurationState },
    { antipyreticMedicationState: antipyreticMedicationState },
    {
      antipyreticMedicationHowManyTimesState: antipyreticMedicationHowManyTimesState,
    },
    { antibioticsState: antibioticsState },
    { antibioticsHowManyTimesState: antibioticsHowManyTimesState },
    { respiratoryRateState: respiratoryRateState },
    { wheezingState: wheezingState },
    { dyspneaState: dyspneaState },
    { lastUrinationState: lastUrinationState },
    { skinTurgorState: skinTurgorState },
    { tearsWhenCryingState: tearsWhenCryingState },
    { tongueState: tongueState },
    { drinkingState: drinkingState },
    { diarrheaState: diarrheaState },
    { vomitState: vomitState },
    { skinColorState: skinColorState },
    { rashState: rashState },
    { glassTestState: glassTestState },
    { pulseState: pulseState },
    { cryingState: cryingState },
    { lastTimeEatingState: lastTimeEatingState },
    { painfulUrinationState: painfulUrinationState },
    { smellyUrineState: smellyUrineState },
    { awarenessState: awarenessState },
    { vaccinationsWithIn14daysState: vaccinationsWithIn14daysState },
    { vaccinationsHowManyHoursAgoState: vaccinationsHowManyHoursAgoState },
    { exoticTripInTheLast12MonthsState: exoticTripInTheLast12MonthsState },
    { febrileSeizureState: febrileSeizureState },
    { wryNeckState: wryNeckState },
    { bulgingFontanelleMax18MOldState: bulgingFontanelleMax18MOldState },
    { painState: painState },
  ];

  const statesHydration = [
    { lastUrinationState: lastUrinationState },
    { skinTurgorState: skinTurgorState },
    { tearsWhenCryingState: tearsWhenCryingState },
    { tongueState: tongueState },
    { drinkingState: drinkingState },
    { diarrheaState: diarrheaState },
    { vomitState: vomitState },
  ];

  if (
    temperatureState === 'danger' ||
    feverDurationState === 'danger' ||
    antipyreticMedicationHowManyTimesState === 'danger' ||
    antibioticsHowManyTimesState === 'danger' ||
    respiratoryRateState === 'danger' ||
    wheezingState === 'danger' ||
    dyspneaState === 'danger' ||
    lastUrinationState === 'danger' ||
    skinTurgorState === 'danger' ||
    tearsWhenCryingState === 'danger' ||
    tongueState === 'danger' ||
    drinkingState === 'danger' ||
    diarrheaState === 'danger' ||
    vomitState === 'danger' ||
    skinColorState === 'danger' ||
    glassTestState === 'danger' ||
    pulseState === 'danger' ||
    cryingState === 'danger' ||
    lastTimeEatingState === 'danger' ||
    awarenessState === 'danger' ||
    febrileSeizureState === 'danger' ||
    wryNeckState === 'danger' ||
    painState === 'danger'
  ) {
    return {
      patientState: 'danger',
    };
  } else if (
    // new logic: more than 1 caution combinations
    ((temperatureState === 'caution' || feverDurationState === 'caution') &&
      respiratoryRateState === 'caution' &&
      wheezingState === 'caution' &&
      dyspneaState === 'caution') ||
    ((temperatureState === 'caution' || feverDurationState === 'caution') &&
      painfulUrinationState === 'caution' &&
      smellyUrineState === 'caution') ||
    (respiratoryRateState === 'caution' &&
      wheezingState === 'caution' &&
      dyspneaState === 'caution' &&
      pulseState === 'caution') ||
    (respiratoryRateState === 'caution' &&
      wheezingState === 'caution' &&
      dyspneaState === 'caution' &&
      skinColorState === 'caution') ||
    ((temperatureState === 'caution' || feverDurationState === 'caution') &&
      pulseState === 'caution' &&
      numberOfCautions(statesAll, {
        temperatureState: temperatureState,
        feverDurationState: feverDurationState,
        pulseState: pulseState,
      }) >= 2) ||
    numberOfCautions(statesHydration) >= 4 ||
    (numberOfCautions(statesHydration) === 3 &&
      numberOfCautions(statesAll, {
        lastUrinationState: lastUrinationState,
        skinTurgorState: skinTurgorState,
        tearsWhenCryingState: tearsWhenCryingState,
        tongueState: tongueState,
        drinkingState: drinkingState,
        diarrheaState: diarrheaState,
        vomitState: vomitState,
      }) >= 2) ||
    ((temperatureState === 'caution' ||
      feverDurationState === 'caution' ||
      respiratoryRateState === 'caution' ||
      wheezingState === 'caution' ||
      dyspneaState === 'caution' ||
      pulseState === 'caution') &&
      (skinColorState === 'caution' || glassTestState === 'caution') &&
      bulgingFontanelleMax18MOldState === 'caution') ||
    ((temperatureState === 'caution' ||
      feverDurationState === 'caution' ||
      respiratoryRateState === 'caution' ||
      wheezingState === 'caution' ||
      dyspneaState === 'caution' ||
      pulseState === 'caution') &&
      (skinColorState === 'caution' || glassTestState === 'caution') &&
      painState === 'caution' &&
      pain === 'pain-03-Headache') ||
    ((temperatureState === 'caution' || feverDurationState === 'caution') &&
      ((painState === 'caution' && pain === 'pain-03-Headache') ||
        bulgingFontanelleMax18MOldState === 'caution') &&
      awarenessState === 'caution')
  ) {
    return {
      patientState: 'danger',
    };
  } else if (
    temperatureState === 'caution' ||
    feverDurationState === 'caution' ||
    antipyreticMedicationState === 'caution' ||
    antipyreticMedicationHowManyTimesState === 'caution' ||
    antibioticsState === 'caution' ||
    antibioticsHowManyTimesState === 'caution' ||
    respiratoryRateState === 'caution' ||
    wheezingState === 'caution' ||
    dyspneaState === 'caution' ||
    lastUrinationState === 'caution' ||
    skinTurgorState === 'caution' ||
    tearsWhenCryingState === 'caution' ||
    tongueState === 'caution' ||
    drinkingState === 'caution' ||
    diarrheaState === 'caution' ||
    vomitState === 'caution' ||
    skinColorState === 'caution' ||
    rashState === 'caution' ||
    glassTestState === 'caution' ||
    pulseState === 'caution' ||
    cryingState === 'caution' ||
    lastTimeEatingState === 'caution' ||
    painfulUrinationState === 'caution' ||
    smellyUrineState === 'caution' ||
    awarenessState === 'caution' ||
    exoticTripInTheLast12MonthsState === 'caution' ||
    bulgingFontanelleMax18MOldState === 'caution' ||
    painState === 'caution'
  ) {
    return {
      patientState: 'caution',
    };
  } else if (
    temperatureState === 'good' ||
    feverDurationState === 'good' ||
    respiratoryRateState === 'good' ||
    wheezingState === 'good' ||
    dyspneaState === 'good' ||
    lastUrinationState === 'good' ||
    skinTurgorState === 'good' ||
    tearsWhenCryingState === 'good' ||
    tongueState === 'good' ||
    drinkingState === 'good' ||
    diarrheaState === 'good' ||
    vomitState === 'good' ||
    skinColorState === 'good' ||
    rashState === 'good' ||
    pulseState === 'good' ||
    cryingState === 'good' ||
    lastTimeEatingState === 'good' ||
    painfulUrinationState === 'good' ||
    smellyUrineState === 'good' ||
    awarenessState === 'good' ||
    vaccinationsWithIn14daysState === 'good' ||
    vaccinationsHowManyHoursAgoState === 'good' ||
    exoticTripInTheLast12MonthsState === 'good' ||
    febrileSeizureState === 'good' ||
    wryNeckState === 'good' ||
    bulgingFontanelleMax18MOldState === 'good' ||
    painState === 'good'
  ) {
    return {
      patientState: 'good',
    };
  } else if (
    thermometerUsedState === 'neutral' ||
    feverMeasurementLocationState === 'neutral' ||
    temperatureState === 'neutral' ||
    feverDurationState === 'neutral' ||
    antipyreticMedicationState === 'neutral' ||
    respiratoryRateState === 'neutral' ||
    wheezingState === 'neutral' ||
    dyspneaState === 'neutral' ||
    skinColorState === 'neutral' ||
    lastUrinationState === 'neutral' ||
    skinTurgorState === 'neutral' ||
    tearsWhenCryingState === 'neutral' ||
    tongueState === 'neutral' ||
    drinkingState === 'neutral' ||
    diarrheaState === 'neutral' ||
    vomitState === 'neutral' ||
    rashState === 'neutral' ||
    glassTestState === 'neutral' ||
    pulseState === 'neutral' ||
    cryingState === 'neutral' ||
    lastTimeEatingState === 'neutral' ||
    painfulUrinationState === 'neutral' ||
    smellyUrineState === 'neutral' ||
    awarenessState === 'neutral' ||
    vaccinationsHowManyHoursAgoState === 'neutral' ||
    vaccinationsHowManyHoursAgoState === null ||
    exoticTripInTheLast12MonthsState === 'neutral' ||
    febrileSeizureState === 'neutral' ||
    wryNeckState === 'neutral' ||
    bulgingFontanelleMax18MOldState === 'neutral' ||
    painState === 'neutral'
  ) {
    return {
      patientState: 'neutral',
    };
  }
  // Sanity check
  return null;
};

function numberOfCautions(
  statesTocheck: { [key: string]: State | undefined | null }[],
  statesToLeaveOut?: { [x: string]: State | undefined | null }
): number {
  let otherCautionStates = [];
  const cautionStates = statesTocheck.filter((state) => {
    const key = Object.keys(state)[0];
    return state[key] === 'caution';
  });

  if (statesToLeaveOut) {
    if (cautionStates.length > 0) {
      cautionStates.forEach((cautionState) => {
        const cautionStateKey = Object.keys(cautionState)[0];

        if (!statesToLeaveOut[cautionStateKey]) {
          otherCautionStates.push(cautionState);
        }
      });
    }

    return otherCautionStates.length;
  } else {
    return cautionStates.length;
  }
}

/**
 * if the patient has chronicDisease or value for certain questions is cautioncantdo
 * the event state changes to BLUE but the patient state stays the same so that the 2 state
 * can be checked and measured separately
 */
export const getEventState = (
  thermometerUsedState: State | 'cautioncantdo',
  feverMeasurementLocationState: State | 'cautioncantdo',
  chronicDisease: unknown
): { eventState: 'neutral' | 'cautioncantdo' } | null => {
  if (
    chronicDisease === 'chronicDisease-01-Yes' ||
    thermometerUsedState === 'cautioncantdo' ||
    feverMeasurementLocationState === 'cautioncantdo'
  ) {
    return { eventState: 'cautioncantdo' };
  } else if (
    (thermometerUsedState === 'neutral' || thermometerUsedState === null) &&
    (feverMeasurementLocationState === 'neutral' || feverMeasurementLocationState === null)
  ) {
    return { eventState: 'neutral' };
  }
  return null;
};

export const evaluateCaretakerState = (
  parentFeelState: State,
  parentThinkState: State,
  parentConfidentState: State
): { caretakerState: State | undefined } => {
  let caregiverState: State | undefined;

  if (
    parentFeelState === 'danger' ||
    parentThinkState === 'danger' ||
    parentConfidentState === 'danger'
  ) {
    caregiverState = 'danger';
  } else if (
    parentFeelState === 'caution' ||
    parentThinkState === 'caution' ||
    parentConfidentState === 'caution'
  ) {
    caregiverState = 'caution';
  } else if (
    parentFeelState === 'good' ||
    parentThinkState === 'good' ||
    parentConfidentState === 'good'
  ) {
    caregiverState = 'good';
  } else if (
    parentFeelState === 'neutral' ||
    parentThinkState === 'neutral' ||
    parentConfidentState === 'neutral'
  ) {
    caregiverState = 'neutral';
  }
  return { caretakerState: caregiverState };
};

export const getCaretakerState = (
  question: string,
  value: string
): { [key: string]: State | undefined } => {
  const questionState = question + 'State';
  let questionStateValue: State | undefined;

  if (!value) {
    questionStateValue = 'neutral';
  } else if (
    value === 'parentFeel-01-Optimal' ||
    value === 'parentThink-01-NotBad' ||
    value === 'parentConfident-01-Confident' ||
    value === 'parentConfident-02-SomewhatConfident'
  ) {
    questionStateValue = 'good';
  } else if (
    value === 'parentFeel-02-NotSure' ||
    value === 'parentThink-02-SomewhatBad' ||
    value === 'parentConfident-03-NotReally'
  ) {
    questionStateValue = 'caution';
  } else if (
    value === 'parentFeel-03-VeryWorried' ||
    value === 'parentThink-03-Bad' ||
    value === 'parentConfident-04-NotAtAll'
  ) {
    questionStateValue = 'danger';
  }

  return { [questionState]: questionStateValue };
};
