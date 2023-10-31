import { FC } from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Card } from '@components/ui/card'
import { Alert, AlertDescription } from '@components/ui/alert'
import { Link } from 'react-router-dom'
import { Controller, useForm, FieldErrors } from 'react-hook-form'

interface RegisterForm {
    firstName: string
    lastName: string
    username: string
    password: string
    confirmPassword: string
}

const Register: FC = () => {

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (data: RegisterForm): void => {
        console.log(data)
    }

    const onSubmitError = (errors: FieldErrors<RegisterForm>): void => {
        console.log(errors)
    }

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
                            render={({ field }) => <Input className='mb-4' {...field} placeholder='Password' />}
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
                            render={({ field }) => <Input className='mb-4' {...field} placeholder='Confirm Password' />}
                        />
                        {
                            Object.keys(errors).length > 0 && (
                                <Alert className='mb-4'>
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
                        <Button type="submit" className='w-full' variant="default">Register</Button>
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
