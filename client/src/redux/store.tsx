import { configureStore } from '@reduxjs/toolkit'
import auth from './authSlice'
import members from './membersSlice'
import labels from './labelsSlice'

const store = configureStore({
  reducer:{ auth, members, labels }, 
})

export default store