import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import HomeLayout from '@layouts/home'
import { useAuth } from 'hooks/index'
import { Spinner } from '@components/ui/spinner'

const Private: FC = () => {

  const { user, loading } = useAuth()

  if(!user && loading) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-100 bg-opacity-50">
      <Spinner />
    </div>
  )

  return (
      <HomeLayout>
        <Outlet />
      </HomeLayout>
    )
  }
  
  export default Private