// import authReducer from "./authReducer";
// import authSocialReducer from "./authSocialReducer";
import settingsReducer from "./settingsReducer";
// import customerActionReducer from "./customerActionReducer";
// import bookingReducer from "./bookingReducer";
// import orderDetailReducer from "./orderDetailReducer";
// import stackApiReducer from "./stackApiReducer";
export interface ReducerInterFace {
    // auth: any,
    // authSocial: any,
    settings: any,
    // customerAction: any,
    // booking: any,
    // orderDetail: any
    // stackApi: any
}

const reducers: ReducerInterFace = {
    // auth: authReducer,
    // authSocial: authSocialReducer,
    settings: settingsReducer,
    // customerAction: customerActionReducer,
    // booking: bookingReducer,
    // orderDetail: orderDetailReducer,
    // stackApi: stackApiReducer
}
export default reducers
