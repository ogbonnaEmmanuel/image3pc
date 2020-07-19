from flask import Blueprint

from api.Web.web_features import WebFeatures
from api.utils import decouple_user_data, create_zip_folder

web_api = Blueprint(__name__, 'web_api')


@web_api.route('/web/', methods=['PUT', 'GET'])
def get_request_to_process():
    user_image, selected_request = decouple_user_data('Web')
    perform_request = WebFeatures(image_file=user_image)
    if len(selected_request) == 1:
        perform_request.map_feature_to_function(selected_request[0])
    else:
        for feature in selected_request:
            perform_request.map_feature_to_function(feature)
    zip_name = create_zip_folder(
        path=perform_request.image_folder,
        list_of_filename=perform_request.files_created)
    return {'success': zip_name}
