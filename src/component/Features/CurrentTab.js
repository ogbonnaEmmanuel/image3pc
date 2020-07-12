import React from "react";
import AndroidUi from "./AndroidUi";
import IosUi from "./IosUi";
import WebUi from "./WebUi";
import {REGISTERED_FEATURES} from "./registered_features";

class ClickedTabUi extends React.Component {
    constructor(props) {
        super(props);
        this.updateImageAction = this.updateImageAction.bind(this);
        this.singleOperation = this.singleOperation.bind(this);
        this.state = {
            operation: {
                user_type: '',
                operations: {},
            }
        }
    }

    singleOperation = ((operation, user_type) => {
        let updateOrNot = false;
        let current_user_operation = this.state.operation;
        if (operation in current_user_operation.operations) {
            delete current_user_operation.operations[operation];
            this.setState({
                operations: current_user_operation.operations
            })

        } else {
            current_user_operation.user_type = user_type;
            current_user_operation.operations[operation] = operation
            this.setState({
                user_type: current_user_operation.user_type,
                operations: current_user_operation.operations
            })
            updateOrNot = true;
        }
        this.props.user_operation(current_user_operation);
        return updateOrNot
    })

    multiOperation = ((select_state, user_type) => {
        let operation = this.state.operation;
        if (select_state) {
            operation.user_type = user_type;
            operation.operations = REGISTERED_FEATURES[user_type].SELECT_ALL;
        } else {
            operation.user_type = '';
            operation.operations = {};
        }
        this.setState({
            operation
        })
        this.props.user_operation(operation);
    })

    updateImageAction = ((operation, user_type, select_type) => {
        if (select_type === 'single') {
            return this.singleOperation(operation, user_type);
        } else {
            this.multiOperation(select_type, user_type);
        }
    })


    currentUi = (() => {
        let clickedTab = this.props.tab_name;
        switch (clickedTab) {
            case "android_color":
                return <AndroidUi action={this.updateImageAction}/>
            case "ios_color":
                return <IosUi action={this.updateImageAction}/>
            default:
                return <WebUi action={this.updateImageAction}/>
        }
    })

    render() {
        return (
            <div>
                {this.currentUi()}
            </div>
        )
    }
}

export default ClickedTabUi