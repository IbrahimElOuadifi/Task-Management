import { FC } from 'react'
import { Separator } from '@components/ui/separator'

const Settings: FC = () => {
    return (
        <>
            <h1 className='text-2xl font-bold'>Settings</h1>
            {/* divider */}
            <Separator className='my-4' />
        </>
    )
}

export default Settings