import API from "myAxios/API";
import { SET_CATEGORIES } from "redux/reducers/shareReducer";

// actions.js
export const getAllCategories = () => {
    return async (dispatch) => {
        API({
            method: "GET",
            url: `/category/get-all`,
        }).then((res) => {
            
            dispatch({
                type: SET_CATEGORIES,
                payload: res.data,
            });
        }).catch((error) => {
            console.log(error);
        });
    };
};