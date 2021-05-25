from flask_sqlalchemy import SQLAlchemy

import os

db = SQLAlchemy()

database_name = "mymoney"
DB_USERNAME = "postgres"
DB_PASSWORD = ""
database_path = os.environ['DATABASE_URL'] \
    if 'DATABASE_URL' in os.environ \
    else "postgresql://{}:{}@{}/{}".format(
        DB_USERNAME, DB_PASSWORD, 'localhost:5432', database_name)

class Account(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable=False)

class Cost_type(db.Model):
    __tablename__ = 'cost_types'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable=False)
        

class Cost_item(db.Model):
    __tablename__ = 'cost_items'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    spending = db.Column(db.Boolean, nullable = False, default = False)
    type_id = db.ForeignKey('cost_types.id', nullable = False)

class Currency(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)

class  Monetary_circulation(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    cost_item_id = db.ForeignKey('cost_items.id', nullable = False)
    notice = db.Column(db.String, nullable = True)
    income = db.Column(db.Float(precision='20,2'), server_default = 0.00)
    spending = db.Column(db.Float(precision='20,2'), server_default = 0.00)
    currency_id = db.ForeignKey('currency.id', nullable = False)
    account_id = db.ForeignKey('account.id', nullable = False)