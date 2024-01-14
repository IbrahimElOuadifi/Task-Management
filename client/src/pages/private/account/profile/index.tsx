import { FC, useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Separator } from '@components/ui/separator'
import { MdPerson } from 'react-icons/md'
import dayjs from 'dayjs'
import { useFetchData, usePOSTData } from 'hooks/index'
import { checkSession, updateProfilePicture } from 'api/auth'
import { User } from '@interfaces/User'
import EditDialog from './edit-dialog'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Controller, useForm } from 'react-hook-form'

const Profile: FC = () => {

    const [avatar, setAvatar] = useState<string | null>(null)

    const { handleSubmit, control, setValue, getValues } = useForm<User>({
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: ''
        }
    })

    const restValues = ({ user }: { user: User }) => {
        setValue('firstName', user.firstName)
        setValue('lastName', user.lastName)
        setValue('username', user.username)
        setValue('email', user.email || '')
        if (user.avatar) setAvatar(user.avatar)
    }

    const { data: [data], refetch } = useFetchData<{ user: User } | undefined>(checkSession, {});

    const { postData: updatePicture } = usePOSTData(updateProfilePicture, refetch, console.log)

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const onSubmit = (fields: User) => {
        // check if data changed
        if (
            fields.firstName !== data?.user.firstName
            || fields.lastName !== data.user.lastName
            || fields.username !== data.user.username
            || fields.email !== data.user.email
        ) {
            setIsOpen(true)
        } else {
            setIsEdit(false)
        }
    }
    
    const onError = (error: any) => {
        console.log(error)
    }

    const handleUpdatePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.item(0)) {
            updatePicture({ avatar: e.target.files?.item(0) })
        }
    }

    useEffect(() => {
        if (data) {
            restValues(data)
        }
    }, [data, isEdit])

    const renderAvatar = (file: File | string | null) => {
        if (typeof file ==='string')
            return <AvatarImage src={`${import.meta.env.VITE_SERVER_URL}/${file}`} alt='avatar' />
        else if (file instanceof File)
            return <AvatarImage src={URL.createObjectURL(file)} alt='avatar' />
        else
            return <></>
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Profile</h1>
                {/* {!isEdit && <Button type="button" className="my-4" variant="default" onClick={() => setIsEdit(true)}>Edit Profile</Button>} */}
                {isEdit ? (
                    <div className='col-span-12 my-4 flex justify-end items-center'>
                        <Button type='button' variant='outline' className='mr-2' onClick={() => setIsEdit(false)}>
                            Cancel
                        </Button>
                        {/* <Button type='submit' variant='default'>
                            Update Profile
                        </Button> */}
                    </div>
                ) : (
                    <Button type="button" className="my-4" variant="default" onClick={() => setIsEdit(true)}>Edit Profile</Button>
                )}
                <EditDialog
                    isOpen={isOpen}
                    onOpenChange={(open: boolean) => setIsOpen(open)}
                    user={getValues()}
                    onSuccess={() => {
                        refetch()
                        setIsEdit(false)
                        setIsOpen(false)
                    }} />
            </div>
            <Separator className="my-4" />
            <form className='container max-w-4xl grid grid-cols-12 gap-4' onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="col-span-12 flex justify-center items-center p-4">
                    <Label htmlFor='avatar'>
                        <Avatar className="w-24 h-24">
                            <AvatarFallback className='bg-blue-300 text-xl text-white'>
                                <MdPerson size={36} />
                            </AvatarFallback>
                            {renderAvatar(avatar)}
                        </Avatar>
                    </Label>
                    <input className='hidden' type='file' id='avatar' onChange={handleUpdatePicture} accept='image/*' />
                </div>
                    <div className='col-span-12 md:col-span-6'>
                        <Label htmlFor='firstName'>First Name</Label>
                        <Controller
                            name='firstName'
                            control={control}
                            render={({ field, fieldState: { error } }) => <Input id='firstName' {...field} error={Boolean(error)} readOnly={!isEdit} />}
                            rules={{ required: true }} />
                    </div>
                    <div className='col-span-12 md:col-span-6'>
                        <Label htmlFor='lastName'>Last Name</Label>
                        <Controller
                            name='lastName'
                            control={control}
                            render={({ field, fieldState: { error } }) => <Input id='lastName' {...field} error={Boolean(error)} readOnly={!isEdit} />}
                            rules={{ required: true }} />
                    </div>
                    <div className='col-span-12'>
                        <Label htmlFor='username'>Username</Label>
                        <Controller
                            name='username'
                            control={control}
                            render={({ field, fieldState: { error } }) => <Input id='username' {...field} error={Boolean(error)} readOnly={!isEdit} />}
                            rules={{ required: true }} />
                    </div>
                    <div className='col-span-12'>
                        <Label htmlFor='email'>Email</Label>
                        <Controller
                            name='email'
                            control={control}
                            render={({ field, fieldState: { error } }) => <Input id='email' {...field} error={Boolean(error)} type='email' autoComplete='email' readOnly={!isEdit} />}
                            rules={{ required: true }} />
                    </div>
                    <div className='col-span-12'>
                        <Label htmlFor='create-date'>Create At</Label>
                        <Input id='create-date' type='datetime-local' value={dayjs(data?.user?.createdAt).format("YYYY-MM-DDTHH:mm")} readOnly />
                    </div>
                    {
                        isEdit && (
                            <div className='col-span-12 py-2 flex justify-end items-center'>
                                {/* <Button type='button' variant='outline' className='mr-2' onClick={() => setIsEdit(false)}>
                                    Cancel
                                </Button> */}
                                <Button type='submit' variant='default'>
                                    Update Profile
                                </Button>
                            </div>
                        )
                    }
                </form>
        </div>
    )
}

export default Profile