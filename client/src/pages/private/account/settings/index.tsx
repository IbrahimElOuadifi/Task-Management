import { FC } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'

const Settings: FC = () => {
    return (
        <>
        <div className='flex items-center justify-between gap-4'>
            <h1 className='text-2xl font-bold'>Settings</h1>
                <div>
                    <NavLink
                        to='/account/settings/app'
                        children={({ isActive }) => (
                            <Button type="button" className="my-4 ml-2" variant={isActive ? 'default' : 'outline'}>Application</Button>
                        )} />
                    <NavLink
                        to='/account/settings/labels'
                        children={({ isActive }) => (
                            <Button type="button" className="my-4 ml-2" variant={isActive ? 'default' : 'outline'}>Manage Labels</Button>
                        )} />
                </div>
            </div>
            {/* divider */}
            <Separator className='my-4' />
            <Outlet />
        </>
    )
}

export default Settings