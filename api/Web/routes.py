from flask import Blueprint, request
from api.utils import get_selected_feature
from api.Web.web_features import WebFeatures
import time

web_api = Blueprint(__name__, 'web_api')


@web_api.route('/web/', methods=['PUT'])
def get_request_to_process():
    user_image = request.files['avatar']
    user_request = request.form.get('actions')
    selected_request = get_selected_feature(user_request, 'Web')
    perform_request = WebFeatures(user_image)
    for user_selected_request in selected_request:
        perform_request.map_feature_to_function(user_selected_request)
    return {'success': 'yeah'}


