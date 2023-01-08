# Notes

## 2022.12.29 SQL queries

- SQL query filtering
- Does the model need all (pulse, repiratoryRate, temperature) variables?
- After initial filtering the number of entries goes from 19709 to 2997.
- Dataset used is a backup from 2022.12.20
- 

## 2023.01.05 Preprocessing

- Created jupyter notebook for preprocessing
- Preprocessing started with
  - age calculation
  - filtering for invalid data
  - categorical encoding, ordinal/one-hot

## 2023.01.06 Algorithm redo

- Node package created to make predictions consistent
- `pulse` and `respiratoryRate` variables will be reclassified and if that changes the overall classification it will be updated
- `.*State` variables will be excluded for the ML model
- `null` values for `pulse` and `repiratoryRate` will be allowed and filled with something

## 2023.01.08 State updates

- Node package recalculates `pulseState` and `respiratoryRateState` and `patientState` variables and updates the database entries
- The package also calculates the age of the patient at the time of the the event creation and upates all measurementEvents by adding `ageInMonths` field.
- A `modifiedList.csv` file is also created that includes all the old state variables as well as the new ones. It also has the measurementEvent ID.
- Data analysis file added and separated from preprocess file
- Data analysis provides some plots about the changes to the algorithm reflected in the states of each variables
- More fine tuning is required for the algorithm
