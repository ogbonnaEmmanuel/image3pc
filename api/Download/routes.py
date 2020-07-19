from flask import Blueprint, send_from_directory, current_app, abort

download_api = Blueprint(__name__, 'download_api')


@download_api.route('/download/<filename>')
def download(filename):
    try:
        return send_from_directory(directory=current_app.config['UPLOAD_FOLDER'],
                                   filename=filename,
                                   as_attachment=True)
    except FileNotFoundError:
        abort(404)
