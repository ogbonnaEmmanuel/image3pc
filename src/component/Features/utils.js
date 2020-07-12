import {REGISTERED_FEATURES} from "./registered_features";

export const SELECT_ALL_UPDATE = ((current_state, feature_type) => {
    let user_action_style = '';
    if (current_state) {
        user_action_style = "4px solid green";
    } else {
        user_action_style = "0px"
    }
    let features = REGISTERED_FEATURES[feature_type].ALL;
    features.forEach(feature => {
        if (feature_type === 'Web') {
            document.getElementById(feature).style.border = user_action_style;
        } else {
            document.getElementById(feature['name']).style.border = user_action_style;
        }
    })
    current_state = !current_state;
    return current_state
})