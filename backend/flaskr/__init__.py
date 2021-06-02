import os
import sys
sys.path.append('database')
from flask import Flask

from flask_cors import CORS
from flask_migrate import Migrate
from models import (
    setup_db,
    db
)

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    setup_db(app)
    CORS(app)

    migrate = Migrate(app, db)

    @app.after_request
    def after_reguest(response):
        response.headers.add('Access-Control-Allow-Headers',
                             'Content-Type, Autrorizaition')
        response.headers.add('Access-Control-Allow-Methods',
                             'GET, POST, PATCH, DELETE, OPTIONS')
        return response

    return app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
