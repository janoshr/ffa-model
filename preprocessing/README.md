# Preprocessing package

This package is created to reduce noise introduced by the version changes to the application where the dataset is from.

Reclassifies the measurements by using the latest algorithm. Features it reclassifies are `respiratoryRateState` and `pulseState` and if it change the `patientState` it updates that as well.

## Getting started

To run the project place the populate an sqlite3 database called `feverfriend.db` and place it in the root of the preprocessing package.

Install the packages by running `npm i` and generate the prisma files by running `npx prisma generate`.

Execute the following script to run the reclassification:
```bash
npm start
```

Development version:

```
node: v19.5.0
npm: 9.3.1
```
