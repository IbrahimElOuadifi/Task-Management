import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '@store-actions/authSlice'
import { checkSession } from 'api/auth'
import { User } from '@interfaces/User'
import { AxiosResponse } from 'axios'

const App = () => {

  const dispatch = useDispatch()
  const { user, error } = useSelector((state: any) => state.auth)

  useEffect(() => {
      sessionMiddleware()
  }, [])

  const sessionMiddleware = async () => {
    try {
      console.log('loading ...')
      const token = localStorage.getItem('token')
      const resp = await checkSession({ token }) as AxiosResponse
      const user = resp.data.user as User
      console.log(user)
      dispatch(setCredentials({ user , token, error: null }))
    } catch (error: any) {
      dispatch(setCredentials({ user: null, error }))
    } finally {
      console.log('loaded ...')
    }
  }

  return (!user && !error) ? <h2>Loading...</h2> : <Outlet /> 
}
  
export default App