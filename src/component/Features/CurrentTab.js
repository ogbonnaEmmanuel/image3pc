import React from "react";
import AndroidUi from "./AndroidUi";
import IosUi from "./IosUi";
import WebUi from "./WebUi";

class ClickedTabUi extends React.Component {
    constructor(props) {
        super(props);
        this.updateImageAction = this.updateImageAction.bind(this)
        this.state = {
            user_type: '',
            operations: {},
        }
    }

    singleOperation = ((operation, user_type) => {
        let updateOrNot = false;
        let current_user_operation = this.state;
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
        this.props.user_operation(this.state);
        return updateOrNot
    })

    multiOperation = ((select_state) => {
        if (select_state) {

        } else {

        }
    })

    updateImageAction = ((operation, user_type, select_type) => {
        if (select_type === 'single') {
            return this.singleOperation(operation, user_type);
        } else {
            this.multiOperation(select_type);
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