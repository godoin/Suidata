from flask import Blueprint, render_template, request, jsonify, redirect, url_for
from functions import utils
import pandas as pd

views = Blueprint(__name__, "views")

@views.route("/")
def dashboard():
  file_path = './static/assets/data/who_suicide_statistics.csv'
  df = utils.load_data(file_path)
  df_preprocessed = utils.preprocess(df)
  utils.check_categories(df_preprocessed)
  return render_template('dashboard.html', title_page="Dashboard", active="dashboard")

@views.route("/data")
def get_data():
    file_path = './static/assets/data/who_suicide_statistics.csv'
    df = utils.load_data(file_path)
    df_preprocessed = utils.preprocess(df)
    return render_template('data.html', title_page="Data", active="data", data=df_preprocessed.to_dict(orient='records'))

@views.route("/reports")
def reports():
  return render_template('reports.html', title_page="Reports", active="reports")
