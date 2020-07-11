import React from "react";
import SelectAllFeatures from "./select_all_features";
import {REGISTERED_FEATURES} from "./registered_features";

class WebUi extends React.Component {

    constructor(props) {
        super(props);
        this.action_indicator = this.action_indicator.bind(this);
        this.state = {
            select_all: false
        }
    }

    action_indicator = ((e) => {
        let operation = e.target.id;
        let updateOrNot = this.props.action(operation, 'Web');
        if (updateOrNot) {
            document.getElementById(operation).style.border = "4px solid green";
        } else {
            document.getElementById(operation).style.border = "0px";
        }
    })

    get_all_features = (()=>{
        return REGISTERED_FEATURES.Web.ALL
    })

    select_all = (() => {
        let user_action_style = ''
        if (this.state.select_all) {
            user_action_style = "4px solid green";
        } else {
            user_action_style = "0px"
        }
        let features = REGISTERED_FEATURES.Web.ALL;
        features.forEach(feature => {
            document.getElementById(feature).style.border = user_action_style;
        })
    })

    render() {

        const all_features = (() => {
            let features = this.get_all_features();
            return features.map((feature, index) => {
                return (
                    <div className="user_features" key={index}>
                        <div className="feature_box">
                            <div className="f_action" id={feature} onClick={this.action_indicator}/>
                            <div className="feature_name">{feature}</div>
                        </div>
                    </div>
                )
            })
        })
        return (
            <div>
                <div className="center_element">
                    <p className="feature_text">SELECT IMAGE FEATURE FOR WEB</p>
                </div>
                <SelectAllFeatures select_all={this.select_all}/>
                {all_features()}
            </div>
        )
    }
}

export default WebUi