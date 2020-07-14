from flask import current_app
from PIL import Image
import secrets
import os
from api.utils import create_zip_folder


class WebFeatures:
    def __init__(self, image_file):
        self.files_created = []
        self.image_file = image_file
        self.image_folder = current_app.config['UPLOAD_FOLDER']

    def compress(self):
        user_image = Image.open(self.image_file)
        save_location = self.generate_location_filename()
        user_image.save(save_location, optimize=True)
        self.files_created.append(save_location)
        create_zip_folder(self.image_folder, self.files_created)

    def create_favicon(self):
        sizes = {'op_1': (16, 16), 'op_2': (32, 32)}
        for size in sizes:
            user_image = Image.open(self.image_file)
            save_location = self.generate_location_filename(config_name=size)
            user_image.thumbnail(sizes[size])
            user_image.save(save_location)
            self.files_created.append(save_location)
        create_zip_folder(self.image_folder, self.files_created)

    def generate_location_filename(self, config_name=None):
        image_file = self.image_file
        file_name, ext = os.path.splitext(image_file.filename)
        if config_name:
            file_name = secrets.token_hex(8) + config_name + ext
        else:
            file_name = secrets.token_hex(8) + ext
        image_folder = self.image_folder
        save_location = os.path.join(image_folder, file_name)
        return save_location

    def map_feature_to_function(self, feature_name):
        self.__getattribute__(feature_name)()
        #create select all feature
        return True
