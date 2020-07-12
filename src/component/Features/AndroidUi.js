import React from "react";
import {REGISTERED_FEATURES} from "./registered_features";
import {SELECT_ALL_UPDATE} from "./utils";
import SelectAllFeatures from "./select_all_features";

class AndroidUi extends React.Component {

    constructor(props) {
        super(props);
        this.action_indicator = this.action_indicator.bind(this);
        this.state = {
            select_all: true
        }
    }

    action_indicator = ((e) => {
        let operation = e.target.id;
        console.log(operation)
        let updateOrNot = this.props.action(operation, 'Android');
        if (updateOrNot) {
            document.getElementById(operation).style.border = "4px solid green";
        } else {
            document.getElementById(operation).style.border = "0px";
        }
    })

    select_all = (() => {
        let select_all = SELECT_ALL_UPDATE(this.state.select_all, 'Android');
        this.setState({
            select_all
        })
        this.props.action(null, 'Android', 'multi')
    })

    render() {

        const all_features = (() => {
            return REGISTERED_FEATURES.Android.ALL.map((feature, index) => {
                return (
                    <div className="user_features" key={index}>
                        <div className="feature_box">
                            <div className="f_action" id={feature.name} onClick={this.action_indicator}/>
                            <div className="feature_name">{feature.name} => {feature.size}</div>
                        </div>
                    </div>
                )
            })
        })
        return (
            <div>
                <div className="center_element">
                    <p className="feature_text">SELECT IMAGE FEATURE FOR ANDROID</p>
                </div>
                <SelectAllFeatures select_all={this.select_all}/>
                {all_features()}
                <div className="center_element">
                    <a href="https://developer.android.com/training/multiscreen/screendensities"
                       className="read_more_link" target="_blank" rel="noopener noreferrer">
                        Why this sizes
                    </a>
                </div>
            </div>
        )
    }
}

export default AndroidUi