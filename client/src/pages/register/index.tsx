import { useState, useEffect, FC } from 'react'
import { AxiosResponse } from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Card } from '@components/ui/card'
import { Alert, AlertDescription } from '@components/ui/alert'
import { Controller, useForm, FieldErrors } from 'react-hook-form'
import { UserRegister } from '@interfaces/User'
import { register } from 'api/auth'
import { checkSession } from 'api/auth'
import { User, AuthSession } from '@interfaces/User'
import { setCredentials } from '@store-actions/authSlice'
import { Spinner } from '@components/ui/spinner'
import { useToast } from '@components/ui/use-toast'
 
const Register: FC = () => {

    const { user } = useSelector((state: { auth: AuthSession }) => state.auth)

    const [loading, setLoading] = useState<boolean>(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { toast } = useToast()

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data: UserRegister): Promise<void> => {
        try {
            setLoading(true)
            const resp = await register(data) as AxiosResponse
            const token = resp.data.token as string
            localStorage.setItem('token', token)
            const user = (await checkSession({ token }) as AxiosResponse).data.user as User
            dispatch(setCredentials({ user , token, error: null }))
        } catch (error: any) {
            console.log(error)
            toast({
                title: 'Error',
                description: error.message,
                duration: 2000,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    const onSubmitError = (errors: FieldErrors<UserRegister>): void => {
        console.log(errors)
    }

    useEffect(() => {
        if (user) 
            navigate('/')
    }, [user])

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Card className='py-2 px-4 mt-[35%]'>
                    <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900 mb-8">
                        Create your account
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
                        <div className="flex space-x-2 mb-4">
                            <Controller
                                name="firstName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 
                                    {
                                        value: true,
                                        message: 'First name is required'
                                    }
                                }}
                                render={({ field }) => <Input {...field} placeholder='First Name' />}
                            />
                            <Controller
                                name="lastName"
                                control={control}
                                defaultValue=""
                                rules={{ 
                                    required: {
                                        value: true,
                                        message: 'Last name is required'
                                    }
                                 }}
                                render={({ field }) => <Input {...field} placeholder='Last Name' />}
                            />
                        </div>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{ 
                                required: {
                                    value: true,
                                    message: 'Username is required'
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Username must be at least 3 characters'
                                },
                                maxLength: {
                                    value: 8,
                                    message: 'Username must be less than 8 characters'
                                },
                             }}
                            render={({ field }) => <Input className='mb-4' {...field} placeholder='Username' />}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ 
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                },
                                maxLength: {
                                    value: 256,
                                    message: 'Password must be less than 256 characters'
                                },
                             }}
                            render={({ field }) => <Input className='mb-4' {...field} placeholder='Password' type='password' />}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{ 
                                required: {
                                    value: true,
                                    message: 'Confirm password is required'
                                },
                                validate: (value: string) => value === watch('password') || 'Passwords do not match'
                             }}
                            render={({ field }) => <Input className='mb-4' {...field} placeholder='Confirm Password' type='password' />}
                        />
                        {
                            Object.keys(errors).length > 0 && (
                                <Alert variant="destructive" className='mb-4'>
                                    <AlertDescription>
                                        {
                                            errors.firstName?.message ||
                                            errors.lastName?.message ||
                                            errors.username?.message ||
                                            errors.password?.message ||
                                            errors.confirmPassword?.message
                                        }
                                    </AlertDescription>
                                </Alert>
                            )
                        }
                        <Button type="submit" className='w-full' variant="default">
                            {loading ? <Spinner className='mr-2' /> : 'Register'}
                        </Button>
                        <div className="text-center my-4">
                            already have an account? <Link to='/login' className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default Register
