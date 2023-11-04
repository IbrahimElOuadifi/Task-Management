import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Card } from '@components/ui/card'
import { Alert, AlertDescription } from '@components/ui/alert'
import { Controller, useForm, FieldErrors } from 'react-hook-form'
import { UserLogin } from '@interfaces/User'
import { Spinner } from '@components/ui/spinner'
import useAuth from 'hooks/useAuth'
 
const Login: FC = () => {

    const { submitting, login } = useAuth('login')

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onSubmit = (data: UserLogin): void => {
        login(data)
    }
    
    const onSubmitError = (errors: FieldErrors<UserLogin>): void => {
        console.log(errors)
    }

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
                            render={({ field }) => <Input {...field} error={Boolean(errors.username)} type='text' placeholder='Username' className='mb-4' autoComplete='username' />}
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
                            render={({ field }) => <Input {...field} error={Boolean(errors.password)} type='password' placeholder='Password' className='mb-4' autoComplete='password' />}
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
                            {submitting ? <Spinner className='mr-2' /> : 'Login'}
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
