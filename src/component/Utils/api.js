import {REGISTERED_FEATURES} from "./registered_features";

export const API_URL_MAP = {
    'Web': '/web/',
    'Android': '/android/',
    'Ios': '/ios/'
}

export const MAP_STRING_TO_DATA = (data, type) => {
    let generated_string = ''
    for (let operation in data) {
        generated_string += REGISTERED_FEATURES[type][operation]['string_rep']
    }
    return generated_string
}