from flask import current_app
from PIL import Image
import secrets
import os
from api.utils import create_zip_folder


class WebFeatures:
    def __init__(self, image_file):
        self.files_created = []
        self.image_file = image_file

    def compress(self):
        image_file = self.image_file
        user_image = Image.open(image_file)
        file_name, ext = os.path.splitext(image_file.filename)
        file_name = secrets.token_hex(8) + ext
        save_location = os.path.join(current_app.config['UPLOAD_FOLDER'], file_name)
        user_image.save(save_location, optimize=True)
        self.files_created.append(save_location)
        create_zip_folder(current_app.config['UPLOAD_FOLDER'], self.files_created)

    def resize(self):
        pass

    def map_feature_to_function(self, feature_name):
        self.__getattribute__(feature_name)()
