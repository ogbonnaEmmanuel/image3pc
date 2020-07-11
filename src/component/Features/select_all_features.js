import React from "react";

class SelectAllFeatures extends React.Component {
    constructor(props) {
        super(props);
        this.handleFeatures = this.handleFeatures.bind(this);
    }

    handleFeatures() {
        this.props.select_all()
    }

    render() {
        return (
            <div className="center_element">
                <div className="select_all">
                    <div className="f_action" onClick={this.handleFeatures}/>
                    <p onClick={this.handleFeatures}>SELECT ALL</p>
                </div>
            </div>
        )
    }
}

export default SelectAllFeatures