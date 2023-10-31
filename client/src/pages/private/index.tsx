import { useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthSession } from '@interfaces/User'

const Private = () => {

  const navigate = useNavigate()
  const { error } = useSelector((state:  { auth: AuthSession }) => state.auth)

  useEffect(() => {
    if(error)
      navigate('/login')
  }, [error, navigate])

  return (
      <div>
        <h1>Private</h1>
        <Link to='/login'>Login</Link>
        <Outlet />
      </div>
    )
  }
  
  export default Private