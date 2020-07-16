from flask import Blueprint
from api.utils import decouple_user_data, create_zip_folder
from api.Ios.ios_features import IosFeatures

ios_api = Blueprint('ios_api', __name__)


@ios_api.route('/ios/', methods=['PUT'])
def generate_image():
    image_file, selected_request = decouple_user_data('Ios')
    perform_request = IosFeatures(image_file=image_file)
    if len(selected_request) == 1:
        perform_request.generate_ios_image(selected_request[0])
    else:
        for feature in selected_request:
            perform_request.generate_ios_image(feature)
    create_zip_folder(
        path=perform_request.image_folder,
        list_of_filename=perform_request.files_created)
    return {'success': 'yeah'}
