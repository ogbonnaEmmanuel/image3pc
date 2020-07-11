import {REGISTERED_FEATURES} from "../Features/registered_features";

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
// const REGISTERED_FEATURES = {
//     Android: {
//         'LDPI': '1',
//         'MDPI': '2',
//         'HDPI': '3',
//         'XHDPI': '4',
//         'XXHDPI': '5',
//         'XXXHDPI': '6'
//     },
//     Ios: {
//         '@X': '1',
//         '@2X': '2',
//         '@3X': '3'
//     },
//     Web: {
//         'Compress image': '1',
//         'Resize image': '2'
//     }
// }