from flask import Flask
from db import db
from flask_cors import CORS
from routes import register_routes

def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app, origins=["http://127.0.0.1:5500"])
    if test_config:
        app.config.update(test_config)
    else:
        app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:123456789@localhost/crm_db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


    db.init_app(app)

    register_routes(app)

    return app

app = create_app()

if(__name__ == "__main__"):
    app.run(host="0.0.0.0",port=3001,debug=True)