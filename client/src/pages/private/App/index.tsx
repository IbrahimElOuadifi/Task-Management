import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import HomeLayout from '@layouts/home'

const HomePage: FC = () => {
    return (
        <HomeLayout>
            <Outlet />
        </HomeLayout>
    )
}

export default HomePage