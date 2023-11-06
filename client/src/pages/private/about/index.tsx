import { FC } from 'react'
import { Separator } from '@components/ui/separator'

const About: FC = () => {
    return (
        <>
            <h1 className='text-2xl font-bold'>ABOUT</h1>
            {/* divider */}
            <Separator className='my-4' />
        </>
    )
}

export default About