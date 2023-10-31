import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user: null,
        token: null,
        error: null,
    },
    reducers : {
        setCredentials: (state, action) => state = action.payload
    }
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer
