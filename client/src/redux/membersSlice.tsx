import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMember } from '@interfaces/User'

const initialState: IMember[] = []

const membersSlice = createSlice({
    name:"members",
    initialState,
    reducers : {
        setMembers: (_, action: PayloadAction<IMember[]>) => action.payload
    }
})

export const { setMembers } = membersSlice.actions

export default membersSlice.reducer