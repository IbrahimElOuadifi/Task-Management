import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILabel } from '@interfaces/Label'

const initialState: ILabel[] = []

const labelsSlice = createSlice({
    name:"labels",
    initialState,
    reducers : {
        setLabels: (_, action: PayloadAction<ILabel[]>) => action.payload
    }
})

export const { setLabels } = labelsSlice.actions

export default labelsSlice.reducer