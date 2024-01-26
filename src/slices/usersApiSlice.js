import { apiSlice } from "./apiSlice";

const USERS_URL = '/api';


export const usersApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login:builder.mutation({
            query:(data) => ({
                url: `${USERS_URL}/supervisor/auth`, 
                method:'POST', 
                body:data,
                credentials: 'include'
            })
        }),
        logout:builder.mutation({
            query:() => ({
                url: `${USERS_URL}/supervisor/logout`, 
                method:'POST', 
            })
        })
    })
})

export const {useLoginMutation, useLogoutMutation}  = usersApiSlice;