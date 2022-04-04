import os
import sys
sys.path.append('database')
from flask import Flask, jsonify, request, abort

from flask_cors import CORS
from flask_migrate import Migrate
from models import (
    setup_db,
    db,
    User,
    Account,
    Cost_type,
    Cost_item,
    Monetary_circulation,
    Currency
)

CIRCULATIONS_PER_PAGE = 30

def paginate_circulations(request, selection):
    page = request.args.get('page', 1, type=int)
    start = (page - 1) * CIRCULATIONS_PER_PAGE
    end = start + CIRCULATIONS_PER_PAGE
    print("pag")
    return selection[start:end]

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

    # get all users
    @app.route('/users')
    def get_users():
        users = User.query.all()
        
        formatted_users = [user.format() for user in users]
        return jsonify({
            'success': True,
            'users': formatted_users
        })

    # create a user
    @app.route('/users/add', methods=['POST'])
    def create_user():
       
        new_user = request.json.get('name')
        if (new_user is None):
            abort(422)
        try:
            # POST     
            user = User(
                name=new_user)
            user.insert()
            selection = User.query.order_by('id').all()

            return jsonify({
                'success': True,
                'created': user.id,
                'total_users': len(selection)
            })
        except BaseException:
            abort(404)
    
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
        monetary_circulations = db.session.query(Monetary_circulation, Cost_item, Currency, Account).\
            join(Cost_item).join(Currency).join(Account).\
            filter(
                Monetary_circulation.cost_item_id == Cost_item.id,
                Monetary_circulation.currency_id == Currency.id,
                Monetary_circulation.account_id == Account.id,
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
                'account': account.name,
                'user_id': monetary_circulation.user_id,
            } for monetary_circulation, cost_item, currency, account in monetary_circulations]
        })   

    # GET circilations for the user
    @app.route('/circulations/<int:user_id>')
    def get_user_monetary_circulations(user_id):

        # if user doesn't exist
        if User.query.get(user_id) is None:
            abort(404)

        monetary_circulations = db.session.query(Monetary_circulation, Cost_item, Currency, Account).\
            join(Cost_item).join(Currency).join(Account).\
            filter(
                Monetary_circulation.user_id == str(user_id),
                Monetary_circulation.cost_item_id == Cost_item.id,
                Monetary_circulation.currency_id == Currency.id,
                Monetary_circulation.account_id == Account.id,
            ).\
            all()

        return jsonify({
            'success': True,
            'monetary_circulations': [{
                'id': monetary_circulation.id,
                'date': monetary_circulation.date_time.strftime("%d.%m.%Y, %H:%M"),
                'date_month': monetary_circulation.date_time.strftime("%m"),
                'date_day': monetary_circulation.date_time.strftime("%d"),
                'date_year': monetary_circulation.date_time.strftime("%Y"),
                'date_year_month': monetary_circulation.date_time.strftime("%Y") +\
                     '-' + monetary_circulation.date_time.strftime("%m"),
                'cost_item': cost_item.name,
                'cost_type': cost_item.type.name,
                'notes': monetary_circulation.notes,
                'income_sum': str(monetary_circulation.income_sum),
                'spending_sum': str(monetary_circulation.spending_sum),
                'currency': currency.name,
                'account_id': monetary_circulation.account_id,
                'account': account.name,
                'user_id': monetary_circulation.user_id,
                'timestamp': monetary_circulation.timestamp,
            } for monetary_circulation, cost_item, currency, account in monetary_circulations]
        })   
  

    # GET circilations for the account
    # @app.route('/circulations/<int:account_id>')
    # def get_account_monetary_circulations(account_id):

    #     # if account doesn't exist
    #     if Account.query.get(account_id) is None:
    #         abort(404)

    #     monetary_circulations = db.session.query(Monetary_circulation, Cost_item, Currency).join(Cost_item).join(Currency).\
    #         filter(
    #             Monetary_circulation.account_id == str(account_id),
    #             Monetary_circulation.cost_item_id == Cost_item.id,
    #             Monetary_circulation.currency_id == Currency.id,
    #         ).\
    #         all()
          
    #     return jsonify({
    #         'success': True,
    #         'monetary_circulations': [{
    #             'id': monetary_circulation.id,
    #             'date': monetary_circulation.date_time.strftime("%d.%m.%Y, %H:%M"),
    #             'cost_item': cost_item.name,
    #             'cost_type': cost_item.type.name,
    #             'notes': monetary_circulation.notes,
    #             'income_sum': str(monetary_circulation.income_sum),
    #             'spending_sum': str(monetary_circulation.spending_sum),
    #             'currency': currency.name,
    #             'account_id': monetary_circulation.account_id,
    #             'user_id': monetary_circulation.user_id,
    #         } for monetary_circulation, cost_item, currency in monetary_circulations]
    #     })   

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
        new_user_id = request.json.get('user_id')
        new_timestamp = request.json.get('timestamp')
        
        if (new_date is None or new_cost_item_id is None
                or new_account_id is None or new_user_id is None):
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
                user_id = int(new_user_id),
                timestamp = int(new_timestamp),
                )

            circulation.insert()
            selection = Monetary_circulation.query.order_by('id').all()
           
            return jsonify({
                'success': True,
                'created': circulation.id,  
                'date': circulation.date_time.strftime("%d.%m.%Y, %H:%M"),        
                'total_circulations': len(selection)
            })
        except BaseException:
            abort(404)     
         

    # Change a circulation
    @app.route('/circulations/<int:circulation_id>', methods=['PATCH'])
    def update_circulation(circulation_id):
        error = 422
        try:
            circulation = Monetary_circulation.query.filter(Monetary_circulation.id == str(circulation_id)).one_or_none()
            ''' responds with a 404 error if <id> is not found'''
            if circulation is None:
                error = 404
                abort(error)

            ''' update the corresponding row for <id>'''
            body = request.get_json()
            print(body)
            circulation.date_time = body.get('date')
            circulation.cost_item_id = body.get('cost_item_id')
            circulation.notes = body.get('notes')
            circulation.income_sum = body.get('income_sum')
            circulation.spending_sum = body.get('spending_sum')
            circulation.currency_id = body.get('currency_id')
            circulation.account_id = body.get('account_id')
            circulation.user_id = body.get('user_id')
            print(circulation.__dict__)
    
        
            circulation.update()

            return jsonify({
                'success': True,
                'circulation_id': circulation_id
            }), 200
        except Exception:
            abort(error)

    # DELETE a circulation
    @app.route('/circulations/<int:user_id>/<int:circulation_id>', methods=['DELETE'])
    def delete_circulation(circulation_id, user_id):
        try:
            circulation = Monetary_circulation.query.filter(
                Monetary_circulation.id == circulation_id).one_or_none()
            # error 404. if there isn't any circulation with circulation_id
            if circulation is None:
                abort(404)
              
            # delete
            circulation.delete()

            # renue query - get list of monetary circulations without deleted one
            # paginate monetary circulations
            monetary_circulations = db.session.query(Monetary_circulation, Cost_item, Currency).join(Cost_item).join(Currency).\
            filter(
                Monetary_circulation.user_id == str(user_id),
                Monetary_circulation.cost_item_id == Cost_item.id,
                Monetary_circulation.currency_id == Currency.id,
            ).\
            all()
            current_circulations = paginate_circulations(request, monetary_circulations)     

            return jsonify({
                'success': True,
                'deleted': circulation_id,
                'total_circulations': len(monetary_circulations),
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
                'user_id': monetary_circulation.user_id,
            } for monetary_circulation, cost_item, currency in current_circulations]})
        except BaseException:
            abort(422)   






    # GET accounts for the user
    @app.route('/accounts/<int:user_id>')
    def get_user_accounts(user_id):

        # if user doesn't exist
        if User.query.get(user_id) is None:
            abort(404)

        user_accounts = []
        list_of_user_accounts = Account.query.filter(Account.user.any(id=user_id)).all()
        for account in list_of_user_accounts:
            user_accounts.append(
            {'name':account.name,
            'id': account.id}) 

        return jsonify({
            'success': True,
            'user_accounts': user_accounts,
        })    

         # error handlers for all expected errors

        @app.errorhandler(404)
        def not_found(error):
            return jsonify({
                "success": False,
                "error": 404,
                "message": "resource not found"
            }), 404

        @app.errorhandler(422)
        def unprocessable(error):
            return jsonify({
                "success": False,
                "error": 422,
                "message": "unprocessable"
            }), 422

        @app.errorhandler(400)
        def bad_request(error):
            return jsonify({
                "success": False,
                "error": 400,
                "message": "bad request"
            }), 400

        @app.errorhandler(500)
        def bad_request(error):
            return jsonify({
                "success": False,
                "error": 500,
                "message": "Internal Server Errort"
            }), 500

    return app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)



