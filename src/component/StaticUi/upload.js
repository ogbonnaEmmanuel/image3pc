import React from "react";
import {css} from "@emotion/core";
import {API_URL_MAP, MAP_STRING_TO_DATA} from "../Utils/api"
import {HashLoader} from "react-spinners";
import {connect} from 'react-redux';

const override = css`
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
`;

class UploadUi extends React.Component {

    constructor(props) {
        super(props);
        this.handleFile = this.handleFile.bind(this);
        this.userData = this.userData.bind(this);
        this.makeApiRequest = this.makeApiRequest.bind(this);
        this.uploadIcon = this.uploadIcon.bind(this);
        this.state = {
            userImageText: 'CHOOSE IMAGE',
            loading: false,
            fileUpload: true
        }
    }

    userData = () => {
        let actions = this.props.imageAction;
        let operation_type = actions.platform
        let operations = actions.user_selected_operation;
        const fileField = document.querySelector('input[type="file"]');
        let userAction = MAP_STRING_TO_DATA(operations, operation_type);
        return {
            actions: actions, operation_type: operation_type,
            operations: operations, fileField: fileField,
            userAction: userAction
        }
    }


    generateDownloadUrl(filename) {
        this.setState({
            loading: false
        })
        console.log('Success:', filename);
    }

    process_Started(Has_it) {
        if (Has_it) {
            this.setState({
                fileUpload: false
            })
            return ''
        }
        this.setState({
            fileUpload: true
        })
    }

    uploadIcon() {
        if (this.state.fileUpload) {
            return (
                <label htmlFor="file" id="file_label">
                            <span className="material-icons icon_insert" id="insert">
                                            folder_open
                            </span>
                </label>
            )
        }
    }

    makeApiRequest() {
        let userData = this.userData();
        const formData = new FormData();
        formData.append('actions', userData.userAction);
        formData.append('user_image', userData.fileField.files[0]);
        if (userData.operation_type) {
            fetch(API_URL_MAP[userData.operation_type], {
                method: 'PUT',
                body: formData
            })
                .then(response => response.json())
                .then(result => {
                    this.generateDownloadUrl(result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            let userImageText = 'Please select an option';
            setTimeout(() => {
                window.location.reload(false);
            }, 2000);
            this.process_Started(false);
            this.setState({
                userImageText,
                loading: false,
            })
        }
    }

    handleFile = (e) => {
        let userImageText = `Processing ${e.target.files[0]['name']} .....`;
        //start process to process file
        this.setState({
            userImageText,
            loading: true,
        })
        this.process_Started(true);
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
                        <HashLoader
                            css={override}
                            size={90}
                            color={"#fff"}
                            loading={this.state.loading}/>
                        {this.uploadIcon()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state => {
    return {
        imageAction: state.operations
    }
})

export default connect(mapStateToProps)(UploadUi)