from flask import Blueprint, render_template
from functions import utils

views = Blueprint(__name__, "views")

@views.route("/")
def dashboard():
    connection = utils.run_connection()
    try:
        with connection.cursor() as cursor:
            # Query to calculate the total number of suicides for each country
            sql = "SELECT country, SUM(suicides_no) AS total_suicides FROM suicide_statistics_2 GROUP BY country"
            cursor.execute(sql)
            data = cursor.fetchall()
    finally:
        connection.close()

    # Format the data as required by ApexCharts
    chart_data = [{"x": row["country"], "y": row["total_suicides"]} for row in data]

    return render_template('dashboard.html', title_page="Dashboard", active="dashboard", chart_data=chart_data)
