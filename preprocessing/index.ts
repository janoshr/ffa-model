import { getPulseState, getVentilationState } from './lib/core';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const events = await prisma.measurementEvent.findMany({});
  console.log(events.length);
  
  const newEvents = events.map((event)=> {
    // get ventilation and pulse variables
    // update ventilation and pulse states
    // update overall state
    // return updated event
  });
  // update rows if needed
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
