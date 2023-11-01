import { useState, useEffect, FC } from 'react'
import { AxiosResponse } from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Card } from '@components/ui/card'
import { Alert, AlertDescription } from '@components/ui/alert'
import { Controller, useForm, FieldErrors } from 'react-hook-form'
import { UserLogin, AuthSession, User } from '@interfaces/User'
import { login, checkSession } from 'api/auth'
import { setCredentials } from '@store-actions/authSlice'
import { Spinner } from '@components/ui/spinner'
import { useToast } from '@components/ui/use-toast'
 
const Login: FC = () => {

    const { user } = useSelector((state: { auth: AuthSession }) => state.auth)

    const [loading, setLoading] = useState<boolean>(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { toast } = useToast()

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onSubmit = async (data: UserLogin): Promise<void> => {
        try {
            setLoading(true)
            const resp = await login(data) as AxiosResponse
            const token = resp.data.token as string
            localStorage.setItem('token', token)
            const user = (await checkSession({ token }) as AxiosResponse).data.user as User
            dispatch(setCredentials({ user, token, error: null }))
        } catch (error: any) {
            console.log(error)
            toast({
                description: error.message,
                duration: 2000,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }
    
    const onSubmitError = (errors: FieldErrors<UserLogin>): void => {
        console.log(errors)
    }

    useEffect(() => {
        if (user) 
            navigate('/', { replace: true })
    }, [user])

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Card className='py-2 px-4 mt-[35%]'>
                    <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900 mb-8">
                        Login to your account
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{ required: 
                                {
                                    value: true,
                                    message: 'Username is required'
                                }
                            }}
                            render={({ field }) => <Input error={Boolean(errors.username)} {...field} placeholder='Username' className='mb-4' />}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: 
                                {
                                    value: true,
                                    message: 'Password is required'
                                }
                            }}
                            render={({ field }) => <Input error={Boolean(errors.password)} {...field} placeholder='Password' className='mb-4' />}
                        />
                        {
                         Object.keys(errors).length > 0 && (
                            <Alert variant='destructive' className='mb-4'>
                                <AlertDescription>
                                    {errors.username?.message || errors.password?.message}
                                </AlertDescription>
                            </Alert>
                        )
                        }
                        <Button type="submit" className='w-full' variant="default">
                            {loading ? <Spinner className='mr-2' /> : 'Login'}
                        </Button>
                        <div className="text-center mt-4">
                            don't have an account? <Link to='/register' className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default Login
