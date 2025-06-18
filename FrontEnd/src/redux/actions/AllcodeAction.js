import { SET_ALLCODE } from 'redux/reducers/AllcodeReducer'
import API from "myAxios/API";

// actions.js
export const getAllCode_All = () => {
    return async (dispatch) => {
        API({
            method: "GET",
            url: `api/quan-tri/allcode/get-all`,
        }).then((res) => {
            dispatch({
                type: SET_ALLCODE,
                payload: res.data,
            });
        }).catch((error) => {
            console.log(error);
        });
    };
};
