import bson

from flask import current_app, g
from werkzeug.local import LocalProxy
from flask_pymongo import PyMongo

from pymongo.errors import DuplicateKeyError, OperationFailure
from bson.objectid import ObjectId
from bson.errors import InvalidId


def get_db():
    """
    Configuration method to return db instance
    """
    db = getattr(g, "_database", None)
    print(db)
    if db is None:

        db = g._database = PyMongo(current_app).db
       
    return db


# Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)

def get_companies():
    results = db.companies.find({}).sort( "name", 1)
    return list(results)

def get_roles():
    results = db.companies.aggregate([
        {"$unwind": "$open_roles"},
        {"$group": 
            {"_id": "$_id", 
            "open_roles": {"$push": "$episodes"},
            }
        }
    ]).limit(100)
    return list(results)