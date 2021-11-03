import os
import sys
sys.path.append('database')
from flask import Flask, jsonify

from flask_cors import CORS
from flask_migrate import Migrate
from models import (
    setup_db,
    db,
    Cost_type,
    Cost_item,
    Monetary_circulation,
    Currency
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
    def get_cost_types():
        cost_types = Cost_type.query.all()
        print(cost_types)
        formatted_cost_types= [cost_type.format() for cost_type in cost_types]
        return jsonify({
            'success': True,
            'cost_types': formatted_cost_types
        })
        
    @app.route('/costitems')
    def get_cost_items():
        cost_items = Cost_item.query.all()
        formatted_cost_items= [cost_item.format() for cost_item in cost_items]
        return jsonify({
            'success': True,
            'cost_types': formatted_cost_items
        })   

    @app.route('/circulations')
    def get_monetary_circulations():
        # monetary_circulations = Monetary_circulation.query.all()
        monetary_circulations = db.session.query(Monetary_circulation, Cost_item, Currency).join(Cost_item).join(Currency).\
            filter(
                Monetary_circulation.cost_item_id == Cost_item.id,
                Monetary_circulation.currency_id == Currency.id,
            ).\
            all()
          
        #  formatted_monetary_circulations= [monetary_circulation.format() for monetary_circulation in monetary_circulations] 
        
        return jsonify({
            'success': True,
            'monetary_circulations': [{
                'id': monetary_circulation.id,
                'date': monetary_circulation.date_time.strftime("%d.%m.%Y, %H:%M"),
                'cost_item': cost_item.name,
                'cost_type': cost_item.type.name,
                'notes': monetary_circulation.notes,
                'income_sum': str(monetary_circulation.income_sum),
                'spending_sum': str(monetary_circulation.spending_sum),
                'currency': currency.name,
                'account_id': monetary_circulation.account_id,
            } for monetary_circulation, cost_item, currency in monetary_circulations]
        })       

    return app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
