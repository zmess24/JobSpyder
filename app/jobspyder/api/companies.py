from flask import Blueprint, request, jsonify
from jobspyder.db import get_companies

from flask_cors import CORS
from datetime import datetime


companies_api_v1 = Blueprint(
    'companies_api_v1', 'companies_api_v1', url_prefix='/api/v1/companies')

CORS(companies_api_v1)


@companies_api_v1.route('/', methods=['GET'])
def api_get_movies():
    COMPANIES_PER_PAGE = 20

    companies = get_companies()

    response = { "companies": companies }

    return jsonify(response)