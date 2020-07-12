import React from "react";
import FooterUi from "./StaticUi/footerUi";
import HeaderUi from "./StaticUi/headerUi";
import UploadUi from "./StaticUi/upload";
import ClickedTabUi from "./Features/CurrentTab";


class FeatureUi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentHeaderFocus: 'web_color',
            operationsOnImage: {
                user_type: '',
                operations: {},
            }
        }
    }


    updateUserFocus = (currentHeaderFocus => {
        this.setState({
            currentHeaderFocus
        })
    })

    updateOperation = (operationsOnImage => {
        this.setState({
            operationsOnImage: {
                user_type : operationsOnImage.user_type,
                operations: operationsOnImage.operations
            }
        })
        console.log(this.state.operationsOnImage)
    })

    render() {
        return (
            <section>
                <section id="feature_ui">
                    <HeaderUi userFocus={this.updateUserFocus}/>
                    <div className="center_element">
                        <div className="features_section">
                            <ClickedTabUi tab_name={this.state.currentHeaderFocus}
                                          user_operation={this.updateOperation}/>
                            <UploadUi imageAction={this.state.operationsOnImage}/>
                        </div>
                    </div>
                </section>
                <FooterUi/>
            </section>
        )
    }
}

export default FeatureUi