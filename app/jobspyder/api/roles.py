from flask import Blueprint, request, jsonify
from jobspyder.db import get_roles

from flask_cors import CORS
from datetime import datetime


roles_api_v1 = Blueprint(
    'roles_api_v1', 'roles_api_v1', url_prefix='/api/v1/roles')

CORS(roles_api_v1)


@roles_api_v1.route('/', methods=['GET'])
def get_roles():
    roles = get_roles()

    response = { "roles": roles }

    return jsonify(response)