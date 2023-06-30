from scraper.JobSpyder.spiders.company_spider import CompanySpider
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
import os

class Scraper:
    def __init__(self):
        settings_file_path = 'scraper.JobSpyder.settings' # The path seen from root, ie. from main.py
        os.environ.setdefault('SCRAPY_SETTINGS_MODULE', settings_file_path)
        self.process = CrawlerProcess(get_project_settings())
        self.spider = CompanySpider # The spider you want to crawl

    def run_spiders(self):
        self.process.crawl(self.spider)
        self.process.start()  # the script will block here until the crawling is finished
