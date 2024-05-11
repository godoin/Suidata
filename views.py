from flask import Blueprint, render_template, request, jsonify, redirect, url_for
from functions import utils
import os
import pandas as pd
import pymysql
import json

views = Blueprint(__name__, "views")

@views.route("/")
def dashboard():
    connection = utils.run_connection()
    
    try:
        with connection.cursor() as cursor:
            # Query to calculate sum of suicides based on age categories
            sql_age = "SELECT age, SUM(suicides_no) AS total_suicides FROM suicide_statistics_2 GROUP BY age"
            cursor.execute(sql_age)
            age_data = cursor.fetchall()

            # Query to calculate sum of suicides based on countries
            sql_country = "SELECT country, SUM(suicides_no) AS total_suicides FROM suicide_statistics_2 GROUP BY country"
            cursor.execute(sql_country)
            country_data = cursor.fetchall()

            # Query to calculate total suicides in the entire table
            sql_total_suicides = "SELECT SUM(suicides_no) AS total_suicides FROM suicide_statistics_2"
            cursor.execute(sql_total_suicides)
            total_suicides_data = cursor.fetchone()

            # Query to find the country with the highest number of suicides
            sql_most_suicides_country = "SELECT country, SUM(suicides_no) AS total_suicides FROM suicide_statistics_2 GROUP BY country ORDER BY total_suicides DESC LIMIT 1"
            cursor.execute(sql_most_suicides_country)
            most_suicides_country_data = cursor.fetchone()

            # Query to count the total number of unique countries
            sql_total_countries = "SELECT COUNT(DISTINCT country) AS total_countries FROM suicide_statistics_2"
            cursor.execute(sql_total_countries)
            total_countries_data = cursor.fetchone()

            # Query to find the country with the largest population
            sql_largest_population_country = "SELECT country, MAX(population) AS largest_population FROM suicide_statistics_2"
            cursor.execute(sql_largest_population_country)
            largest_population_country_data = cursor.fetchone()

            # Query to calculate sum of suicides based on gender and year
            sql_gender_year = "SELECT year, sex, SUM(suicides_no) AS total_suicides FROM suicide_statistics_2 GROUP BY year, sex"
            cursor.execute(sql_gender_year)
            gender_year_data = cursor.fetchall()
          
    finally:
        connection.close()
    
    chart_data_age = [{"x": row["age"], "y": float(row["total_suicides"])} for row in age_data]
    chart_data_country = [{"x": row["country"], "y": float(row["total_suicides"])} for row in country_data]
    chart_data_gender_year = [{"year": row["year"], "sex": row["sex"], "total_suicides": float(row["total_suicides"])} for row in gender_year_data]
    
    print(chart_data_gender_year)

    # Extracting male and female total suicides
    male_total_suicides = sum(row["total_suicides"] for row in gender_year_data if row["sex"] == "male")
    female_total_suicides = sum(row["total_suicides"] for row in gender_year_data if row["sex"] == "female")
    
    # Formatting total suicides with commas and no decimal point
    male_total_suicides_formatted = "{:,.0f}".format(male_total_suicides)
    female_total_suicides_formatted = "{:,.0f}".format(female_total_suicides)
    
    total_suicides = total_suicides_data["total_suicides"]
    total_suicides_formatted = "{:,.0f}".format(total_suicides)

    most_suicides_country = most_suicides_country_data["country"]
    total_countries = total_countries_data["total_countries"]
    largest_population_country = largest_population_country_data["country"]
  
    return render_template('dashboard.html', title_page="Dashboard", active="dashboard", chart_data_age=json.dumps(chart_data_age), chart_data_country=json.dumps(chart_data_country), total_suicides=total_suicides_formatted, most_suicides_country=most_suicides_country, total_countries=total_countries, largest_population_country=largest_population_country, chart_data_gender_year=json.dumps(chart_data_gender_year), male_total_suicides=male_total_suicides_formatted, female_total_suicides=female_total_suicides_formatted)

@views.route("/data", methods=['GET'])
def get_data():
  connection = utils.run_connection()

  try:
    with connection.cursor() as cursor:
      sql = "SELECT * FROM suicide_statistics_2"
      cursor.execute(sql)
      data = cursor.fetchall()
  finally:  
    connection.close()

  return render_template('data.html', title_page="Data", active="data", data=data)

@views.route("/reports")
def reports():
  connection = utils.run_connection()
  
  try:
    with connection.cursor() as cursor:
      # Query to calculate sum of suicides based on gender and year
      sql_gender_year = "SELECT year, sex, SUM(suicides_no) AS total_suicides FROM suicide_statistics_2 GROUP BY year, sex"
      cursor.execute(sql_gender_year)
      gender_year_data = cursor.fetchall()
  finally:
    connection.close()

  # Extracting male and female total suicides
  male_total_suicides = sum(row["total_suicides"] for row in gender_year_data if row["sex"] == "male")
  female_total_suicides = sum(row["total_suicides"] for row in gender_year_data if row["sex"] == "female")
    
  # Formatting total suicides with commas and no decimal point
  male_total_suicides_formatted = "{:,.0f}".format(male_total_suicides)
  female_total_suicides_formatted = "{:,.0f}".format(female_total_suicides)
  
  return render_template('reports.html', title_page="Reports", active="reports", male_total_suicides=male_total_suicides_formatted, female_total_suicides=female_total_suicides_formatted)

@views.route("/about")
def about():
  return render_template('about.html', title_page="About")