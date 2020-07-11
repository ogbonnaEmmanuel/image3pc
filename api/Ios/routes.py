from flask import Blueprint

ios_api = Blueprint('ios_api', __name__)


@ios_api.route('/ios/', methods=['PUT', 'GET', 'POST'])
def generate_image():
    return {'success': 'ios'}
