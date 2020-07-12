import React from "react";
import ImageProcess from "../process.mp4";
import {API_URL_MAP, MAP_STRING_TO_DATA} from "./api"

class UploadUi extends React.Component {

    state = {
        userImageText: 'CHOOSE IMAGE',
    }

    handleFile = (e) => {
        let imageName = `Processing ${e.target.files[0]['name']} .....`;
        //start process to process file
        let defaultProcess = document.getElementById('insert');
        let currentProcess = document.getElementById('img_process');
        defaultProcess.style.display = 'none';
        currentProcess.style.display = 'block';
        this.setState({
            userImageText: imageName
        })
        let actions = this.props.imageAction;
        let operation_type = actions['type'];
        let operations = actions['operations'];
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');
        let userAction = MAP_STRING_TO_DATA(operations, operation_type);
        formData.append('actions', userAction);
        formData.append('avatar', fileField.files[0]);
        fetch(API_URL_MAP[operation_type], {
            method: 'PUT',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div className="center_element">
                <div id="box_action">
                    <div className="center_element">
                        <p id="action_text">{this.state.userImageText}</p>
                    </div>
                    <div id="allowed_function">
                        <div id="rule_box"/>
                        <div id="rule_name">max file size 20mb</div>
                    </div>
                    <div id="allowed_function">
                        <div id="rule_box"/>
                        <div id="rule_name">file type(png,jpg,jpeg)</div>
                    </div>
                    <input type="file" id="file" accept=".png,.jpg,.jpeg"
                           onChange={this.handleFile}/>
                    <div className="center_element">
                        <label htmlFor="file" id="file_label">
                            <video autoPlay loop muted playsInline src={ImageProcess}
                                   id="img_process"/>
                            <span className="material-icons icon_insert" id="insert">
                                            folder_open
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadUi