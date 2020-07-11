from flask import Flask, Blueprint
from api.Android.routes import android_api
from api.Web.routes import web_api
from api.Ios.routes import ios_api
from api.config import Config


def create_app_api(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(android_api)
    app.register_blueprint(web_api)
    app.register_blueprint(ios_api)
    return app
