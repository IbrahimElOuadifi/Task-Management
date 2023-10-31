import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '@store-actions/authSlice'
import { checkSession } from 'api/auth'
import { User, AuthSession } from '@interfaces/User'
import { AxiosResponse } from 'axios'
import { Spinner } from '@components/ui/spinner'
import { Toaster } from '@components/ui/toaster'

const App = () => {

  const dispatch = useDispatch()
  const { user, error } = useSelector((state: { auth: AuthSession }) => state.auth)

  useEffect(() => {
    sessionMiddleware()
  }, [])

  const sessionMiddleware = async () => {
    try {
      console.log('loading ...')
      const token = localStorage.getItem('token')
      const resp = await checkSession({ token }) as AxiosResponse
      const user = resp.data.user as User
      dispatch(setCredentials({ user , token, error: null }))
    } catch (error: any) {
      dispatch(setCredentials({ user: null, error }))
    } finally {
      console.log('loaded ...')
    }
  }

  if(!user && !error) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-100 bg-opacity-50">
      <Spinner />
    </div>
  )

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  )
}
  
export default App