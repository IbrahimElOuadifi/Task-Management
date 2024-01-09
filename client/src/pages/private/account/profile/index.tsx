import { FC } from 'react'
import { Avatar, AvatarFallback } from '@components/ui/avatar'
import { Separator } from '@components/ui/separator'
import { MdPerson } from 'react-icons/md'
import dayjs from 'dayjs'
import { useFetchData } from 'hooks/index'
import { checkSession } from 'api/auth'
import { User } from '@interfaces/User'
import EditDialog from './edit-dialog'

const Profile: FC = () => {

    const { data: [data] } = useFetchData<{ user: User } | undefined>(checkSession);

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Profile</h1>
                {/* <Button type="submit" className="my-4" variant="default">
                Edit Profile
                </Button> */}
                <EditDialog user={data?.user} />
            </div>
            {/* divider */}
            <Separator className="my-4" />
            {/* {data ? JSON.stringify(data.user) : null} */}
            <div className="flex items-center justify-between flex-col gap-8">
                <Avatar className="w-24 h-24">
                    <AvatarFallback className='bg-blue-300 text-xl text-white'>
                        <MdPerson size={36} />
                    </AvatarFallback>
                    {/* <AvatarImage src={data?.user?.avatar} alt="avatar" /> */}
                </Avatar>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <h1>Full Name</h1>
                    </div>
                    <div className="col-span-6">
                        <h1>{data?.user?.firstName} {data?.user?.lastName}</h1>
                    </div>
                    <div className="col-span-6">
                        <h1>Username</h1>
                    </div>
                    <div className="col-span-6">
                        <h1>{data?.user?.username}</h1>
                    </div>
                    <div className="col-span-6">
                        <h1>Role</h1>
                    </div>
                    <div className="col-span-6">
                        <h1>{data?.user?.role}</h1>
                    </div>
                    <div className="col-span-6">
                        <h1>Created At</h1>
                    </div>
                    <div className="col-span-6">
                        <h1>{dayjs(data?.user?.createdAt).format("DD MMMM YYYY HH:mm")}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile