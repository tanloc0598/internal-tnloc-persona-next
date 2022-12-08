// action - state management
import actionTypes from '../types';

type settingState = {
    securityHash: string
}

const initialState: settingState = {
    securityHash: '',
};

// ===========================|| CUSTOMIZATION REDUCER ||=========================== //

const settingsReducer = (state: settingState = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SECURITYHASH:
            return {
                ...state,
                securityHash: action.payload
            };
        default:
            return state;
    }
};

export default settingsReducer;
