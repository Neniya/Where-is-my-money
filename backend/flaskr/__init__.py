import os
import sys
sys.path.append('database')
from flask import Flask, jsonify

from flask_cors import CORS
from flask_migrate import Migrate
from models import (
    setup_db,
    db, Cost_type
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


    #@app.route('/')
    #def index():
    #    return render_template('../frontend/public/index.html')    

    @app.route('/costtypes')
    def get_cost_type():
        cost_types = Cost_type.query.all()
        print(cost_types)
        formatted_cost_types= [cost_type.format() for cost_type in cost_types]
        return jsonify({
            'success': True,
            'cost_types': formatted_cost_types
        })
        

    return app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
