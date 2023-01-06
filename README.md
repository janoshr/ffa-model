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

