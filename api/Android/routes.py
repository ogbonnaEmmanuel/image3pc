from flask import Blueprint
from api.utils import decouple_user_data, create_zip_folder
from api.Android.android_features import AndroidFeatures

android_api = Blueprint(__name__, 'android_api')


@android_api.route('/android/', methods=['PUT'])
def generate_responsive_android_images():
    user_image, selected_request = decouple_user_data('Android')
    perform_request = AndroidFeatures(image_file=user_image)
    if len(selected_request) == 1:
        perform_request.responsive_android_images(selected_request[0])
    else:
        for feature in selected_request:
            perform_request.responsive_android_images(feature)
    create_zip_folder(
        path=perform_request.image_folder,
        list_of_filename=perform_request.files_created)
    return {'success': 'yeah'}
