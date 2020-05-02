import {ADD_SITES, SEARCH_DATA} from '../actions/types';

const initialState = {
    siteData: [],
    origin: [],
}

const siteReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_SITES:
            return {
                ...state,
                siteData: action.data,
                origin: action.data,
            };
        case SEARCH_DATA:
            return{
                ...state,
                siteData: state.origin.filter(item => {
                    return item.label.toLowerCase().includes(action.query)
                })
            };
        default:
            return state;
    }
}

export default siteReducer;