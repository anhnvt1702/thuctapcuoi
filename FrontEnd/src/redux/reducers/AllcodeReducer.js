const initialState = {
    data: [],
};

const AllcodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALLCODE':
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

export const SET_ALLCODE = 'SET_ALLCODE'

export default AllcodeReducer;
