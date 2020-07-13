import React from "react";
import ImageProcess from "../process.mp4";
import {API_URL_MAP, MAP_STRING_TO_DATA} from "./api"

class UploadUi extends React.Component {

    constructor(props) {
        super(props);
        this.handleFile = this.handleFile.bind(this);
        this.userData = this.userData.bind(this);
        this.makeApiRequest = this.makeApiRequest.bind(this);
        this.state = {
            userImageText: 'CHOOSE IMAGE',
            loading: false,
        }
    }

    userData = () => {
        let actions = this.props.imageAction;
        let operation_type = actions['user_type'];
        let operations = actions['operations'];
        const fileField = document.querySelector('input[type="file"]');
        let userAction = MAP_STRING_TO_DATA(operations, operation_type);
        return {
            actions: actions, operation_type: operation_type,
            operations: operations, fileField: fileField,
            userAction: userAction
        }
    }

    makeApiRequest = () => {
        let actions = this.props.imageAction;
        let operation_type = actions['user_type'];
        let operations = actions['operations'];
        const fileField = document.querySelector('input[type="file"]');
        let userAction = MAP_STRING_TO_DATA(operations, operation_type);
        const formData = new FormData();
        formData.append('actions', userAction);
        formData.append('avatar', fileField[0]);
        if (operation_type) {
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
        } else {
            let userImageText = 'Please choose an option';
            this.setState({
                userImageText
            })
        }
    }

    handleFile = (e) => {
        let userImageText = `Processing ${e.target.files[0]['name']} .....`;
        this.setState({
            userImageText,
            loading: true,
        })
        this.makeApiRequest();
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