import {ADD_SITES, SEARCH_DATA} from '../actions/types';

const initialState = {
    siteData: [],
}

const siteReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_SITES:
            return {
                ...state,
                siteData: action.data
            };
        case SEARCH_DATA:
            return{
                ...state,
                siteData:this.siteData.filter(this.siteData, item => {
                    return contains(item.toLowerCase(), action.query);
                })
            };
        default:
            return state;
    }
}

export default siteReducer;