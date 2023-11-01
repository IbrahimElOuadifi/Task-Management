import { useEffect } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthSession } from '@interfaces/User'
import { useToast } from '@components/ui/use-toast'

const Private = () => {

  const { error } = useSelector((state:  { auth: AuthSession }) => state.auth)
  
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if(error) {
      toast({
        description: error.message,
        duration: 2000,
        variant: 'destructive',
      })
      navigate('/login', { replace: true })
    }
  }, [error, navigate, pathname])

  return (
      <div>
        <h1>Private</h1>
        <Link to='/login'>Login</Link>
        <Outlet />
      </div>
    )
  }
  
  export default Private