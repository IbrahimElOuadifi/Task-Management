import { FC } from 'react'
import { Separator } from '@components/ui/separator'

const Profile: FC = () => {
    return (
        <>
            <h1 className='text-2xl font-bold'>Profile</h1>
            {/* divider */}
            <Separator className='my-4' />
        </>
    )
}

export default Profile