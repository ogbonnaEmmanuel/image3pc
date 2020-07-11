from flask import Blueprint

android_api = Blueprint(__name__, 'android_api')


@android_api.route('/android/', methods=['PUT', 'GET', 'POST'])
def generate_images():
    return {'success': 'android'}
