import { ADD_SITES, SEARCH_DATA } from './types'; 

export const addData = (info) => ({
    type: ADD_SITES,
    data: info,
})

export const searchData = (search) => ({
    type: SEARCH_DATA,
    query: search,
})