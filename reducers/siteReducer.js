import { ADD_SITES, SEARCH_DATA, SET_SITE, SET_TOOL, SET_ANNOUNCEMENTS, SET_CONT, SET_GRADES, SET_SEARCH, SET_URL, CLEAR_SEARCH } from '../actions/types';

const initialState = {
    siteData: [],
    origin: [],
    currSite: [],
    toolID: '',
    toolName: 'test',
    allAnnouncements: [],
    cont: [],
    grades: [],
    searching: false,
    url: '',
    title: '',
}

const siteReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_SITES:
            return {
                ...state,
                siteData: action.data.filter(item => {
                    return item.label.toLowerCase().includes('2020')//change to follow year
                }),
                origin: action.data,
            };
        case SEARCH_DATA:
            return{
                ...state,
                siteData: state.origin.filter(item => {
                    return item.label.toLowerCase().includes(action.query)
                })
            };
        case CLEAR_SEARCH:
            return{
                ...state,
                siteData: state.origin.filter(item => {
                    return item.label.toLowerCase().includes('2020')
                }),
            };
        case SET_SITE:
            return{
                ...state,
                currSite: action.site,
                toolID: '',
                toolName: 'Announcements', //change this to set the default site landing
                url: '',
                title: '',
            };
        case SET_TOOL:
            return{
                ...state,
                toolID: action.tool,
                toolName: action.name,
                url: '',
                title: '',
            };
        case SET_ANNOUNCEMENTS:
            return{
                ...state,
                allAnnouncements: action.data,
            };
        case SET_CONT:
            return{
                ...state,
                cont: action.cont,
            };
        case SET_GRADES:
            return{
                ...state,
                grades: action.data,
            };
        case SET_SEARCH:
            return{
                ...state,
                searching: action.data,
                siteData: state.origin
            };
        case SET_URL:
            return{
                ...state,
                url: action.url,
                title:action.title,
            };
        default:
            return state;
    }
}

export default siteReducer;