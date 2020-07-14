import React from "react";
import SelectAllFeatures from "./select_all_features";
import {REGISTERED_FEATURES} from "./registered_features";
import {SELECT_ALL_UPDATE} from "./utils";

class WebUi extends React.Component {

    constructor(props) {
        super(props);
        this.action_indicator = this.action_indicator.bind(this);
        this.state = {
            select_all: true
        }
    }

    action_indicator = ((e) => {
        let operation = e.target.id;
        let updateOrNot = this.props.action(operation, 'Web', 'single');
        if (updateOrNot) {
            document.getElementById(operation).style.border = "4px solid green";
        } else {
            document.getElementById(operation).style.border = "0px";
        }
    })

    get_all_features = (() => {
        return REGISTERED_FEATURES.Web.ALL
    })

    select_all = (() => {
        let select_all = SELECT_ALL_UPDATE(this.state.select_all, 'Web');
        this.setState({
            select_all
        })
        //change of state from return select_all which always negate on return
        select_all ? this.props.action(null, 'Web', null) : this.props.action(null, 'Web', 'multi')
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