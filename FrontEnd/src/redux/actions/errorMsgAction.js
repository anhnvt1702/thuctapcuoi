import API from "myAxios/API";
import store from "redux/store";

// actions.js
export const getAllErrorMsg = () => {
    return async (dispatch) => {
        API({
            method: "GET",
            url: `api/quan-tri/error-def/get-all`,
        }).then((res) => {
            dispatch({
                type: 'SET_ERROR_MSG',
                payload: res.data,
            });
        }).catch((error) => {
            console.log(error);
        });
    };
};


export const getErrorByCode = (errorCode) => {
    try {
        const state = store.getState();
        const errMsgs = state.errorMessageReducer.data;
        const msg = errMsgs && errMsgs.find(msg => msg.error_Code === errorCode)
        return (msg && msg.error_Des) || "";
    } catch (error) {
        console.log(error);
    }
};

