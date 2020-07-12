import React from "react";

class SelectAllFeatures extends React.Component {
    constructor(props) {
        super(props);
        this.handleFeatures = this.handleFeatures.bind(this);
        this.state = {
            selected: true
        }
    }

    handleFeatures(e) {
        let selected = this.state.selected;
        let indicator = document.getElementById('all');
        let action_style = '4px solid green';
        selected ? indicator.style.border = action_style : indicator.style.border = ''
        this.setState({
            selected: !selected
        })
        this.props.select_all()
    }

    render() {
        return (
            <div className="center_element">
                <div className="select_all">
                    <div className="f_action" onClick={this.handleFeatures} id="all"/>
                    <p onClick={this.handleFeatures}>SELECT ALL</p>
                </div>
            </div>
        )
    }
}

export default SelectAllFeatures