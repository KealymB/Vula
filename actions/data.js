import { ADD_DATA, SEARCH_DATA } from './types'; 

export const addData = (info) => ({
    type: ADD_DATA,
    data: info,
})

export const searchData = (search) => ({
    type: SEARCH_DATA,
    query: search,
})