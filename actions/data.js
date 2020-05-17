import { ADD_SITES, SEARCH_DATA, SET_SITE, SET_TOOL, SET_ANNOUNCEMENTS } from './types'; 

export const addData = (info) => ({
    type: ADD_SITES,
    data: info,
})

export const searchData = (search) => ({
    type: SEARCH_DATA,
    query: search,
})

export const setSite = (site) => ({
    type: SET_SITE,
    site: site,
})

export const setTool = (tool, name) => ({
    type: SET_TOOL,
    tool: tool,
    name: name,
})

export const setAnnouncements = (ann) => ({
    type: SET_ANNOUNCEMENTS,
    data: ann,
})