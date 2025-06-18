const initialState = {
    numberNewOrder: 0,
    categories: [],
    reloadTrackingOrder: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_NEW_ORDERS":
            return {
                ...state,
                numberNewOrder: action.payload
            };
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case SET_RELOADTRACKINGORDER:
            return {
                ...state,
                reloadTrackingOrder: state.reloadTrackingOrder+1,
            };
        default:
            return state;
    }
};


export const SET_NEW_ORDERS = "SET_NEW_ORDERS"
export const SET_CATEGORIES = "SET_CATEGORIES"
export const SET_RELOADTRACKINGORDER = "SET_RELOADTRACKINGORDER"