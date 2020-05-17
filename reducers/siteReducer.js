import { ADD_SITES, SEARCH_DATA, SET_SITE, SET_TOOL, SET_ANNOUNCEMENTS } from '../actions/types';

const initialState = {
    siteData: [],
    origin: [],
    currSite: [],
    toolID: '',
    toolName: 'test',
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
                toolName: 'test',
            };
        case SET_TOOL:
            return{
                ...state,
                toolID: action.tool,
                toolName: action.name,
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