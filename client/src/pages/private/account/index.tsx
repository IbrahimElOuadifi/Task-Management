import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import AccountLayout from '@layouts/account'

const AccountPage: FC = () => {
    return (
        <AccountLayout>
            <Outlet />
        </AccountLayout>
    )
}

export default AccountPage