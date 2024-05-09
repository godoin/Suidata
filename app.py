from flask import Flask, render_template
from views import views

app = Flask(__name__)
app.register_blueprint(views, url_prefix="/")

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)