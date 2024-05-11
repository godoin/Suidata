from functions import utils
import pandas as pd

def preprocess_data(file_path):
    df = utils.load_data(file_path)
    df_one, df_two, df_three, df_four = utils.preprocess(df)
    file_one = './static/assets/data/suicide_statistics_one.csv'
    file_two = './static/assets/data/suicide_statistics_two.csv'
    file_three = './static/assets/data/suicide_statistics_three.csv'
    file_four = './static/assets/data/suicide_statistics_four.csv'
    
    df_one.to_csv(file_one, index=False)
    df_two.to_csv(file_two, index=False)
    df_three.to_csv(file_three, index=False)
    df_four.to_csv(file_four, index=False)

def main():
    file_path = './static/assets/data/who_suicide_statistics.csv'
    preprocess_data(file_path)

if __name__ == "__main__":
    main()