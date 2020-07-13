import os
import zipfile
import secrets

REGISTERED_FEATURES = {
    'Web': {
        '1': 'compress',
        '2': 'resize'
    },
    'Android': {
        '1': {'name': 'LDPI', 'size': 36},
        '2': {'name': 'MDPI', 'size': 48},
        '3': {'name': 'HDPI', 'size': 72},
        '4': {'name': 'XHDPI', 'size': 96},
        '5': {'name': 'XXHDPI', 'size': 144},
        '6': {'name': 'XXXHDPI', 'size': 192},
    },
    'Ios': {
        '1': {'name': '@x', 'size': 100},
        '2': {'name': '@2x', 'size': 200},
        '3': {'name': '@3x', 'size': 300},
    }
}


def get_selected_feature(features, platform):
    selected_feature = []
    for feature in features:
        if platform != 'Web':
            mark_id_to_feature = REGISTERED_FEATURES[platform][feature]['size']
        else:
            mark_id_to_feature = REGISTERED_FEATURES[platform][feature]
        selected_feature.append(mark_id_to_feature)
    return selected_feature


def delete_created_files(list_of_filename=None):
    for files in list_of_filename:
        os.remove(files)


def create_zip_folder(path=None, list_of_filename=None):
    zip_name = secrets.token_hex(8) + '.zip'
    zip_name = os.path.join(path, zip_name)
    with zipfile.ZipFile(zip_name, 'w', compression=zipfile.ZIP_DEFLATED) as file_zip:
        for files in list_of_filename:
            file_zip.write(files)
    delete_created_files(list_of_filename)
