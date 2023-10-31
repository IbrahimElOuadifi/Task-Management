import { Outlet, Link } from 'react-router-dom'

const Private = () => {
  return (
      <div>
        <h1>Private</h1>
        <Link to='/login'>Login</Link>
        <Outlet />
      </div>
    )
  }
  
  export default Private