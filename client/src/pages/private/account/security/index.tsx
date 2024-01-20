import { FC } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'

const Security: FC = () => {
    return (
        <>
            <div className='flex justify-between items-center gap-4'>
                <h1 className='text-2xl font-bold'>Security</h1>
                <div>
                    <NavLink
                        to='/account/security/password'
                        children={({ isActive }) => (
                            <Button type="button" className="my-4 ml-2" variant={isActive ? 'default' : 'outline'}>Change Password</Button>
                        )} />
                    <NavLink
                        to='/account/security/devices'
                        children={({ isActive }) => (
                            <Button type="button" className="my-4 ml-2" variant={isActive ? 'default' : 'outline'}>Devices</Button>
                        )} />
                </div>
            </div>
            {/* divider */}
            <Separator className='my-4' />
            <Outlet />
        </>
    )
}

export default Security