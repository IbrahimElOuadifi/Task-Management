import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '@store-actions/authSlice'
import { checkSession } from 'api/auth'
import { User, AuthSession } from '@interfaces/User'
import { AxiosResponse } from 'axios'
import { Spinner } from '@components/ui/spinner'
import { Toaster } from '@components/ui/toaster'
import { useToast } from '@components/ui/use-toast'

const App = () => {

  const { toast } = useToast()
  const dispatch = useDispatch()
  const { loading } = useSelector((state: { auth: AuthSession }) => state.auth)

  useEffect(() => {
    sessionMiddleware()
  }, [])

  const sessionMiddleware = async () => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return dispatch(setCredentials({ user: null, loading: false }))
      const resp = await checkSession({ token }) as AxiosResponse
      const user = resp.data.user as User
      dispatch(setCredentials({ user , token, loading: false  }))
    } catch (error: any) {
      toast({
        description: error.message,
        duration: 2000,
        variant: 'destructive'
      })
      dispatch(setCredentials({ user: null, loading: false }))
      localStorage.removeItem('token')
    }
  }

  if(loading) return (
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