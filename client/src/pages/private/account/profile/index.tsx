import { FC } from 'react'
import { Separator } from '@components/ui/separator'
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
        {data ? JSON.stringify(data.user) : null}
        </div>
    );
};

export default Profile