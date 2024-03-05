import { FC, Fragment } from "react"
import { Button } from "@components/ui/button"
import { Separator } from "@components/ui/separator"
import { MdClose } from "react-icons/md"
import { useFetchData, usePOSTData } from "hooks/index"
import { getSessions,deleteSession } from "api/auth"
import { IMember } from "@interfaces/User"
import dayjs from "dayjs"
import Bowser from 'bowser'

interface Isession {
    _id: string
    user: IMember
    token: string
    ip: string
    userAgent: string
    createAt: Date,
    current: boolean
}

const SecurityDevices: FC = () => {
    
    const { data, loading, error, refetch } = useFetchData<Isession>(getSessions, {})
    
    const { postData } = usePOSTData<string>(deleteSession, refetch)
    
    const isLocalhost = (ip: string): boolean =>  ip.includes('127.0.0.1') || ip.includes('::1')
    
    return (
        <div>
            <div className='container grid max-w-4xl grid-cols-12 gap-4'>
                <div className='col-span-12'>
                    <h1 className='text-2xl font-bold'>Devices</h1>
                    <Separator className='my-4' />
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {data && data.length > 0 && data.map((session) => (
                        <Fragment key={session._id}>
                            <div className='flex items-center justify-between col-span-12' >
                                <p className='text-lg'>{isLocalhost(session.ip) ? 'localhost' : session.ip.replace('::ffff:', '')}</p>
                                <p className='text-lg'>{Bowser.getParser(session.userAgent).getBrowserName()} - {Bowser.getParser(session.userAgent).getBrowserVersion()}</p>
                                <p className='text-lg'>{Bowser.getParser(session.userAgent).getOSName()}{/* - {Bowser.getParser(session.userAgent).getOSVersion()}*/}</p>
                                <p className="text-lg">{dayjs(session.createAt).format('DD/MM/YYYY HH:mm:ss')}</p>
                                {
                                    session.current ? 
                                    '(current)' : (
                                        <Button type='button' variant='link' size='icon' className='ml-4' onClick={postData.bind(null, session._id)}>
                                            <MdClose className='text-red-600' size={18} />
                                        </Button>
                                    )
                                }
                            </div>
                            <Separator className='my-4' />
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>   
    )
}

export default SecurityDevices