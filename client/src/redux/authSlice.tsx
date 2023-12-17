import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthSession } from '@interfaces/User'

const initialState: AuthSession = {
    user: null,
    accessToken: null,
    loading: true
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers : {
        setCredentials: (_, action: PayloadAction<AuthSession>) => action.payload,
        logout: () => ({ ...initialState, loading: false })
    }
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer