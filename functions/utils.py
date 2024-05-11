import os
import pandas as pd
from dotenv import load_dotenv
import numpy as np
import pymysql
import json
from decimal import Decimal

load_dotenv()

# MySQL configuration
MYSQL_HOST = os.getenv('MYSQL_HOST', 'localhost')
MYSQL_USER = os.getenv('MYSQL_USER', 'root')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', '')
MYSQL_DB = os.getenv('MYSQL_DB', 'CSE3')

def load_data(file_path):
  df = pd.read_csv(file_path)
  return df

def preprocess(df):
  quarter_index = len(df) // 4
  first_quarter = df.iloc[:quarter_index]
  second_quarter = df.iloc[quarter_index:2 * quarter_index]
  third_quarter = df.iloc[2 * quarter_index:3 * quarter_index]
  fourth_quarter = df.iloc[3 * quarter_index:]
  return first_quarter, second_quarter, third_quarter, fourth_quarter

def check_categories(df):
  for column in df.columns:
    unique_values = df[column].unique()
    print(f"Unique values in '{column}' category:")
    print(unique_values)
    print() 

def run_connection():
  db = pymysql.connect(
      host=MYSQL_HOST,
      user=MYSQL_USER,
      password=MYSQL_PASSWORD,
      db=MYSQL_DB,
      cursorclass=pymysql.cursors.DictCursor
  )
  return db

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        return super().default(o)
