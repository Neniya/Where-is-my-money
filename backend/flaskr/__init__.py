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
        if (new_account is None):
            abort(422)
        try:
            # POST     
            account = Account(
                name=new_account)
            account.insert()
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

    # create a cost item
    @app.route('/costitems/add', methods=['POST'])
    def create_cost_item():
       
        new_cost_item = request.json.get('name')
        print(new_cost_item) 
        new_item_type_id = request.json.get('type_id')
        print(new_item_type_id) 
        new_item_spending = request.json.get('spending')=="true"
        # if new_item_spending == "true":
        #     new_item_spending = True
        # else: 
        #     new_item_spending = False   
        # new_item_spending = new_item_spending == "true" ? True : False

        print(new_item_spending) 
        
        if (new_cost_item is None or new_item_type_id is None):
            abort(422)
        try:
            # POST     
            cost_item = Cost_item(  
                name = new_cost_item,
                type_id = int(new_item_type_id),
                spending = new_item_spending)
            cost_item.insert()
            selection = Cost_item.query.order_by('id').all()

            return jsonify({
                'success': True,
                'created': cost_item.id,
                'total_cost_item': len(selection)
            })
        except BaseException:
            abort(404)       

    @app.route('/circulations')
    def get_monetary_circulations():
        monetary_circulations = db.session.query(Monetary_circulation, Cost_item, Currency).join(Cost_item).join(Currency).\
            filter(
                Monetary_circulation.cost_item_id == Cost_item.id,
                Monetary_circulation.currency_id == Currency.id,
            ).\
            all()
          
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

    # GET circilations for the user
    @app.route('/circulations/<int:account_id>')
    def get_user_monetary_circulations(account_id):

        # if account doesn't exist
        if Account.query.get(account_id) is None:
            abort(404)

        monetary_circulations = db.session.query(Monetary_circulation, Cost_item, Currency).join(Cost_item).join(Currency).\
            filter(
                Monetary_circulation.account_id == str(account_id),
                Monetary_circulation.cost_item_id == Cost_item.id,
                Monetary_circulation.currency_id == Currency.id,
            ).\
            all()
          
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

    # POST a new circulation
    @app.route('/circulations/add', methods=['POST'])
    def create_circulation():
        # get data for new circulation
        new_date = request.json.get('date')
        new_cost_item_id = request.json.get('cost_item_id')
        new_notes = request.json.get('notes')
        new_income_sum = request.json.get('income_sum')
        new_spending_sum = request.json.get('spending_sum')
        new_currency_id = request.json.get('currency_id')
        new_account_id = request.json.get('account_id')
        
        if (new_date is None or new_cost_item_id is None
                or new_account_id is None):
            abort(422)
        try:
            # POST
            circulation = Monetary_circulation(
                date_time = new_date,
                cost_item_id = int(new_cost_item_id),
                notes = new_notes,
                income_sum = float(new_income_sum),
                spending_sum = float(new_spending_sum),
                currency_id = int(new_currency_id),
                account_id = int(new_account_id),
                )

            circulation.insert()
            selection = Monetary_circulation.query.order_by('id').all()

            return jsonify({
                'success': True,
                'created': circulation.id,
                'total_circulations': len(selection)
            })
        except BaseException:
            abort(404)        

    return app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
