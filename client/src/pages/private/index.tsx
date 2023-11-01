import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthSession } from '@interfaces/User'
import HomeLayout from '@layouts/home'

const Private = () => {

  const { user, loading } = useSelector((state:  { auth: AuthSession }) => state.auth)
  
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(!user && !loading)
      navigate('/login', { replace: true })
  }, [loading, user, pathname])

  return (
      <HomeLayout>
        <Outlet />
      </HomeLayout>
    )
  }
  
  export default Private