# FeverFellow Models

Models are trained and tested in this project for FeverFellow a mobile application for fever management.

Installing required packages for python. Recommended python version is 3.10 (this version was used in development).

```bash
pip install -r requirements.txt
```

For machine learning models TensorFlow is used.

Python Notebooks:

| Path  | Description  |
|---|---|
| `analysis.ipynb`  | Analysis of the dataset for noise and class distribution.  |
| `ffa_model.ipynb` | Neural Network Models, training, testing, evaluating and fine-tuning. |
| `plots.ipynb` | Visualizations of noise in the dataset. |
| `preprocessing.ipynb` | Preprocessing of the dataset, one-hot and ordinal encoding, section state generation, imputing |
| `section_models.ipynb` | Random Forest Model training, testing, evaluation, and hyperparameter tuning. |

Data files should be located in a folder called `data` at the root of the project.
