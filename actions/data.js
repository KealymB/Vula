import { ADD_SITES, SEARCH_DATA, SET_SITE, SET_TOOL, SET_ANNOUNCEMENTS, SET_CONT, SET_GRADES, SET_SEARCH, SET_URL, CLEAR_SEARCH } from './types'; 

export const addData = (info) => ({
    type: ADD_SITES,
    data: info,
})

export const searchData = (search) => ({
    type: SEARCH_DATA,
    query: search,
})

export const clearData = () => ({
    type: CLEAR_SEARCH,
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
export const setCont = (data) => ({
    type: SET_CONT,
    cont: data,
})
export const setGrades = (grades) => ({
    type: SET_GRADES,
    data: grades,
})
export const setSearch = (search) => ({
    type: SET_SEARCH,
    data: search,
})
export const setUrl = (url, title) => ({
    type: SET_URL,
    url: url,
    title: title,
})