from flask import Blueprint, request

web_api = Blueprint(__name__, 'web_api')


@web_api.route('/web/', methods=['GET', 'POST', 'PUT'])
def compress_image():
    user_image = request.files['avatar']
    print(user_image.filename)
    return {'success': 'yeah'}
