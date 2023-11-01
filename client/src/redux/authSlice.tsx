import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthSession } from '@interfaces/User'

const initialState: AuthSession = {
    user: null,
    token: null,
    loading: true
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers : {
        setCredentials: (_, action: PayloadAction<AuthSession>) => action.payload
    }
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer
