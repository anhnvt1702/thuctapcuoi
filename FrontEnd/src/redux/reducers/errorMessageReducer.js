const initialState = {
    data: [],
};

const errorMessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ERROR_MSG':
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

export default errorMessageReducer;
