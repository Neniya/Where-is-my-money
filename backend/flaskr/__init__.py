import os
import sys
sys.path.append('database')
from flask import Flask, jsonify, request, abort

from flask_cors import CORS
from flask_migrate import Migrate
from models import (
    setup_db,
    db,
    Account,
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

    # get all accounts
    @app.route('/accounts')
    def get_accounts():
        accounts = Account.query.all()
        
        formatted_accounts = [account.format() for account in accounts]
        return jsonify({
            'success': True,
            'cost_types': formatted_accounts
        })

    # create an account
    @app.route('/accounts/add', methods=['POST'])
    def create_account():
       
        new_account = request.json.get('name')
        print(new_account)
        if (new_account is None):
            abort(422)
        try:
            # POST
            
            account = Account(
                name=new_account)
            print(account.name)
           
            account.insert()
            print("1")
            selection = Account.query.order_by('id').all()

            return jsonify({
                'success': True,
                'created': account.id,
                'total_accounts': len(selection)
            })
        except BaseException:
            abort(404)

        
    @app.route('/costtypes')
    def get_cost_types():
        cost_types = Cost_type.query.all()
        print(cost_types)
        formatted_cost_types= [cost_type.format() for cost_type in cost_types]
        return jsonify({
            'success': True,
            'cost_types': formatted_cost_types
        })
        
    # create a cost type
    @app.route('/costtypes/add', methods=['POST'])
    def create_cost_type():
       
        new_cost_type= request.json.get('name')
        
        if (new_cost_type is None):
            abort(422)
        try:
            # POST
            
            cost_type = Cost_type(
                name=new_cost_type)
           
            cost_type.insert()
            print("1")
            selection = Cost_type.query.order_by('id').all()

            return jsonify({
                'success': True,
                'created': cost_type.id,
                'total_cost_type': len(selection)
            })
        except BaseException:
            abort(404)    
        
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
