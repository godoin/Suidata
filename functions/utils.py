import os
import pandas as pd
import numpy as np

def load_data(file_path):
  df = pd.read_csv(file_path)
  return df

def preprocess(df):
  df.dropna(inplace=True)
  return df

def check_categories(df):
  for column in df.columns:
    unique_values = df[column].unique()
    print(f"Unique values in '{column}' category:")
    print(unique_values)
    print() 