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
    if len(selected_request) == 1:
        perform_request.map_feature_to_function(selected_request[0])
    else:
        for feature in selected_request:
            perform_request.map_feature_to_function(feature)
    perform_request.create_zip_folder()
    return {'success': 'yeah'}
