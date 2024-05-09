from flask import Blueprint, render_template, request, jsonify, redirect, url_for

views = Blueprint(__name__, "views")

@views.route("/")
def home():
  return render_template('welcome.html', title_page="Home")

@views.route("/reports")
def profile():
  return render_template('reports.html', title_page="Reports")

# @views.route("/go-to-json")
# def go_to_json():
#   return redirect(url_for('views.get_json'))

# @views.route("/data")
# def get_data():
#   data = request.json
#   return jsonify(data)

# @views.route("/json")
# def get_json():
#   return jsonify({'name': 'godwin', 'age': 22})

# @views.route("/profile/<username>")
# def profile(username):
#   return render_template('index.html', name=username)

# @views.route("/profile")
# def profile():
#   args = request.args
#   name = args.get('name')
#   return render_template('index.html', name=name)