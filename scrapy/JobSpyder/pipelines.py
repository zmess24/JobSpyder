# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from scrapy.utils.project import get_project_settings
from .items import (
    CompanyItem,
    RoleItem
)
from dataclasses import asdict

settings = get_project_settings()

class MongoDBPipeline:
    def __init__(self):
        conn = MongoClient(
            settings.get('MONGODB_URI'),
            server_api=ServerApi('1')
        )

        db = conn[settings.get('MONGODB_DB')]
        self.collection = db[settings['MONGODB_COLLECTION']]

    def process_item(self, item, spider):
        if isinstance(item, CompanyItem): # article item
            self.collection.update_one({"_id": item._id}, { '$set': asdict(item) }, upsert=True)
        return item