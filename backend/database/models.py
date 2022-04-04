from flask_sqlalchemy import SQLAlchemy

import os

db = SQLAlchemy()

database_name = "mymoney"
DB_USERNAME = "postgres"
DB_PASSWORD = "postgres123"
#print(os.environ['DATABASE_URL'])
database_path = os.environ['DATABASE_URL'] \
    if 'DATABASE_URL' in os.environ \
    else "postgresql://{}:{}@{}/{}".format(
        DB_USERNAME, DB_PASSWORD, 'localhost:5432', database_name)

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''
def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
   # db.create_all()

'''
db_drop_and_create_all()
    drops the database tables and starts fresh
    can be used to initialize a clean database
    !!NOTE you can change the database_filename variable to have multiple verisons of a database
'''
def db_drop_and_create_all():
    db.drop_all()
    db.create_all()    
# -------------------------------------------------------------------------- #
# Models.
# -------------------------------------------------------------------------- #


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable=False)
    circulations = db.relationship('Monetary_circulation', backref='user', lazy = True)
    accounts = db.relationship('Account', secondary = 'user_accounts', backref = db.backref('user', lazy = True))
    
    def format(self):
        return {
            'id': self.id,
            'name': self.name,
        }
    def insert(self):
        db.session.add(self)
        db.session.commit() 

class Account(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable=False)
    circulations = db.relationship('Monetary_circulation', backref='account', lazy = True)
    def format(self):
        return {
            'id': self.id,
            'name': self.name,
        }
    def insert(self):
        db.session.add(self)
        db.session.commit()    

# many-to-many
# it gives opportunity for users to use one account for several users
user_accounts = db.Table('user_accounts',
    db.Column('account_id', db.Integer, db.ForeignKey('accounts.id'), primary_key = True),
    db.Column('user_id', db.Integer ,db.ForeignKey('users.id'), primary_key = True)
)

class Cost_type(db.Model):
    __tablename__ = 'cost_types'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable=False)
    items = db.relationship('Cost_item', backref='type', lazy = True)
    
    def format(self):
        return {
            'id': self.id,
            'name': self.name,
        }
    def insert(self):
        db.session.add(self)
        db.session.commit()    

class Cost_item(db.Model):
    __tablename__ = 'cost_items'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    spending = db.Column(db.Boolean, nullable = False, default = False)
    type_id = db.Column(db.Integer, db.ForeignKey('cost_types.id'), nullable = False)
    circulations = db.relationship('Monetary_circulation', backref='cost_item', lazy = True)

    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'spending': self.spending,
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()     

class Currency(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    circulations = db.relationship('Monetary_circulation', backref='currency', lazy = True)


class  Monetary_circulation(db.Model):
    id = db.Column(db.BigInteger, primary_key = True)
    date_time = db.Column(db.DateTime) 
    cost_item_id = db.Column(db.ForeignKey('cost_items.id'), nullable = False)
    notes = db.Column(db.String, nullable = True)
    income_sum = db.Column(db.Numeric(10,2), default = 0.00)
    spending_sum = db.Column(db.Numeric(10,2), default = 0.00)
    currency_id = db.Column(db.ForeignKey('currency.id'), nullable = False)
    account_id = db.Column(db.ForeignKey('accounts.id'), nullable = False)
    user_id = db.Column(db.ForeignKey('users.id'), nullable = False)
    timestamp = db.Column(db.Integer, nullable = False)


    def format(self):
        return {
            'id': self.id,
            'date_time': self.date_time,
            'cost_item_id': self.cost_item_id,
            'notes': self.notes,
            'income_sum': str(self.income_sum),
            'spending_sum': str(self.spending_sum),
            'currency_id': self.currency_id,
            'account_id': self.account_id,
            'user_id': self.user_id, 
            'time_stamp': self.time_stamp,
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()