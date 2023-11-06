import { FC } from 'react'
import { Separator } from '@components/ui/separator'

const Home: FC = () => {
    return (
        <>
            <h1 className='text-2xl font-bold'>HOME</h1>
            {/* divider */}
            <Separator className='my-4' />
        </>
    )
}

export default Home