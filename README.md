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

## 2023.01.24 Algorithm analysis

- Original 2020 algorithm recoverd from github
- Comparisons added for other algorithms
- 3D diagrams added for measurement density

## 2023.01.29 Algorithm refactor

- Algorithm refactored for visual clearity/readability and ease of modification
- Algorithm updated for the latest version


## 2023.02.11 Section States

- Section state generation added; Grouping each variable state a section state is generated for the 7 sections
- Section state generation takes the highest state in each section where `good` < `caution` < `danger`
- Variables groupped and some renamed to shorten them

## 2023.02.22 Neural Network

Neural network model added. Basic model with a model builder for searching hyper parameters. `BayesianOptimization` class is used for searching the hyper parameter space. Model evaluation and saving feature also added. Model conversion to TensorflowLite model is also added.
Best model accuracy around 90%. 
Hyper parameters:

- number of neurons in the first layer
- activation function
- learning rate
- should I have a 2nd layer or not
- number of neurons in the 2nd layer

## 2023.02.24 Neural Network optimization

- Base model added for comparison.
- `BayesianOptimization` class is replaced by `Hyperband` due to the fact the first one gets stuck in suboptimal states
- Best model accuracy around 93.7%


Upcoming:

- Dropout layer after each layer after the first one to reduce overfitting
- Dropout rate for each dropout layer
- Number of layers as a hyper parameter up to 5





