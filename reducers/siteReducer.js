import { ADD_SITES, SEARCH_DATA, SET_SITE, SET_TOOL, SET_ANNOUNCEMENTS } from '../actions/types';

const initialState = {
    siteData: [],
    origin: [],
    currSite: [],
    toolID: '',
    allAnnouncements: []
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
        case SET_SITE:
            return{
                ...state,
                currSite: action.site,
                toolID: '',
            };
        case SET_TOOL:
            return{
                ...state,
                toolID: action.tool,
            };
        case SET_ANNOUNCEMENTS:
            return{
                ...state,
                allAnnouncements: action.data,
            };
        default:
            return state;
    }
}

export default siteReducer;