import os
import pandas as pd

INIT_PATH = "C:/xampp/htdocs/CSE3/"

def preprocess_suicide_data(input_file, output_file):
    """
    Preprocesses suicide data from the original format to the new format, 
    including a year-wise breakdown and a row for the total across all years.
    Adds a total_mortality column summing male and female suicides.

    Args:
        input_file (str): Path to the original CSV file.
        output_file (str): Path to the new CSV file to be created.
    """

    df = pd.read_csv(input_file)

    # Aggregate data by country, year, and sex
    df_sex = df.groupby(['country', 'year', 'sex'])['suicides_no'].sum().reset_index()

    # Pivot the data to have 'male' and 'female' as columns
    df_sex_pivot = df_sex.pivot(index=['country', 'year'], columns='sex', values='suicides_no').reset_index()
    df_sex_pivot.columns.name = None  # Remove the column name level
    df_sex_pivot = df_sex_pivot.fillna(0)  # Fill missing values with 0

    # Aggregate data by country, year, and age
    df_age = df.groupby(['country', 'year', 'age'])['suicides_no'].sum().reset_index()

    # Pivot the data to have age groups as columns
    df_age_pivot = df_age.pivot(index=['country', 'year'], columns='age', values='suicides_no').reset_index()
    df_age_pivot.columns.name = None
    df_age_pivot = df_age_pivot.fillna(0)

    # Merge the two pivoted DataFrames on 'country' and 'year'
    df_final = pd.merge(df_sex_pivot, df_age_pivot, on=['country', 'year'], how='outer')

    # Reorder columns and rename 'country' to 'name'
    df_final = df_final.rename(columns={'country': 'name'})
    df_final = df_final[['name', 'year', 'male', 'female', '5-14 years', '15-24 years', '25-34 years', '35-54 years', '55-74 years', '75+ years']]

    # Add a column 'total_mortality' summing 'male' and 'female'
    df_final['total_mortality'] = df_final['male'] + df_final['female']

    # Filter for years 1996 to 2016
    df_filtered = df_final[df_final['year'].between(1985, 2016)]

    # Calculate the totals for "All" years (1996-2016) for each country
    df_total = df_filtered.groupby('name').sum(numeric_only=True).reset_index()
    df_total['year'] = 'All'  # Set the year to 'All' for this total row

    # Concatenate the total row to the main DataFrame
    df_final_with_total = pd.concat([df_filtered, df_total], ignore_index=True)

    # Sort by 'name' and 'year' for clarity
    df_final_with_total = df_final_with_total.sort_values(by=['name', 'year'])

    # Write the preprocessed data to the output file
    df_final_with_total.to_csv(output_file, index=False)

# Example usage
input_file = os.path.join(INIT_PATH, "core", "who_suicide_statistics.csv")
output_file = os.path.join(INIT_PATH, "core", "preprocessed.csv")
preprocess_suicide_data(input_file, output_file)
