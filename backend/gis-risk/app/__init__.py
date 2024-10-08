from flask import Flask
# from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

from .config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    from .controller import map
    app.register_blueprint(map.map_bp, url_prefix="/")
    return app

app = create_app()

# @app.route("/")
# def index():
    # return "success"
    # return render_template("index.html")

if __name__ == "__main__":
   app.run(host="0.0.0.0", debug=True, port=5000, threaded=True)