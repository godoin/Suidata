from flask import Blueprint, render_template, request, jsonify, redirect, url_for
from functions import utils
import os
import pandas as pd
import pymysql
import json

views = Blueprint(__name__, "views")

@views.route("/")
def dashboard():
    # connection = utils.run_connection()
    return render_template('about.html', title_page="suidata", active="about",)

@views.route("/data")
def get_data():
  return render_template('data.html', title_page="Data", active="data")

@views.route("/map")
def reports():
  return render_template('map.html', title_page="Map", active="map")

@views.route("/dashboard")
def about():
  return render_template('dashboard.html', title_page="Dashboard")