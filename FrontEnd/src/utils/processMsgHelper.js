import { SET_NEW_ORDERS, SET_RELOADTRACKINGORDER } from "redux/reducers/shareReducer";
import store from "../redux/store";
import { ReloadType } from "./MessageHelper";


const newOrderMsg = Object.freeze({
    0: "CountNewOrders"
})

export const ProcessMsgNewOrder = (message) => {
    try {
        if (message) {
            store.dispatch({ type: SET_NEW_ORDERS, payload: message })
        }
    } catch (error) {
        console.log(error);
    }
}

export const ProcessMsgReload = (message) => {
    try {
        switch (message) {
            case ReloadType.Tracking_Order:
                store.dispatch({ type: SET_RELOADTRACKINGORDER })
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
}


export const ProcessMsgCurrentTime = (message) => {
    try {
        if (message === undefined || message === null || message === "") {
            return;
        }
        store.dispatch({ type: 'SetServerTime', payload: message });
    } catch (error) {
        console.log("ProcessMsgCurrentTime", error);
    }
}
