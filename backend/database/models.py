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


class Account(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable=False)
    circulations = db.relationship('Monetary_circulation', backref='account', lazy = True)


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

class Cost_item(db.Model):
    __tablename__ = 'cost_items'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    spending = db.Column(db.Boolean, nullable = False, default = False)
    type_id = db.Column(db.Integer, db.ForeignKey('cost_types.id'), nullable = False)
    circulations = db.relationship('Monetary_circulation', backref='cost_item', lazy = True)

class Currency(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    circulations = db.relationship('Monetary_circulation', backref='currency', lazy = True)


class  Monetary_circulation(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    cost_item_id = db.Column(db.ForeignKey('cost_items.id'), nullable = False)
    notice = db.Column(db.String, nullable = True)
    income = db.Column(db.Numeric(10,2))
    spending = db.Column(db.Numeric(10,2))
    currency_id = db.Column(db.ForeignKey('currency.id'), nullable = False)
    account_id = db.Column(db.ForeignKey('accounts.id'), nullable = False)