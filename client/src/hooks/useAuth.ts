import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { checkSession, login, register, logoutUser } from 'api/auth'
import { AuthSession, User, UserLogin, UserRegister } from '@interfaces/User'
import { useSelector, useDispatch } from 'react-redux'
import { logout, setCredentials } from '@store-actions/authSlice'
import { useToast } from "@components/ui/use-toast"

const useAuth = (page: 'login' | 'register' | 'private' = 'private') => {
    
    const { toast } = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, loading } = useSelector((state: { auth: AuthSession }) => state.auth)

    const [error, setError] = useState<{ status: number, message: string } | null>(null)
    const [submitting, setSubmitting] = useState<boolean>(false)

    const loginHandler = async (credentials: UserLogin) => {
        try {
            setSubmitting(true)
            const response = await login(credentials) as AxiosResponse<{ accessToken: string, refreshToken?: string, user: User }>
            localStorage.setItem('accessToken', response.data.accessToken)
            if(response.data.refreshToken) localStorage.setItem('refreshToken', response.data.refreshToken)
            checkSessionHandler()
        } catch (error: any) {
            setError(error)
            dispatch(setCredentials({ user: null, accessToken: null, loading: false }))
            toast({
                description: error.message,
                duration: 2000,
                variant: 'destructive'
            })
        } finally {
            setSubmitting(false)
        }
    }

    const registerHandler = async (credentials: UserRegister) => {
        try {
            setSubmitting(true)
            const response = await register(credentials) as AxiosResponse<{ accessToken: string, refreshToken?: string, user: User }>
            localStorage.setItem('accessToken', response.data.accessToken)
            if(response.data.refreshToken) localStorage.setItem('refreshToken', response.data.refreshToken)
            checkSessionHandler()
        } catch (error: any) {
            setError(error)
            dispatch(setCredentials({ user: null, accessToken: null, loading: false }))
            toast({
                description: error.message,
                duration: 2000,
                variant: 'destructive'
            })
        } finally {
            setSubmitting(false)
        }
    }

    const logoutHandler = async () => {
        try {
            await logoutUser()
        } catch (error) {
            console.log(error)
        } finally {
            localStorage.removeItem('accessToken')
            dispatch(logout())
        }
    }


    const checkSessionHandler = async () => {
        try {
            setError(null)
            dispatch(setCredentials({ user: null, accessToken: null, loading: true }))
            const response = await checkSession() as AxiosResponse<{ user: User }>
            dispatch(setCredentials({  user: response.data.user, accessToken: response.config.headers.Authorization?.toString().split(' ')[1], loading: false }))
        } catch (error: any) {
            if(error.status === 401) {
                // handleTokenRefresh()
                //     .then(({ accessToken, user }) => {
                //         dispatch(setCredentials({  user, accessToken, loading: false }))
                //         if(page !== 'private') navigate('/')
                //     }).catch(error => {
                //         setError(error)
                //         dispatch(setCredentials({ user: null, accessToken: null, loading: false }))
                //         if(page === 'private') {
                //             toast({
                //                 description: error.message,
                //                 duration: 2000,
                //                 variant: 'destructive'
                //             })
                //             navigate('/login')
                //         }
                //     })
                if(page === 'private') {
                    toast({
                        description: error.message,
                        duration: 2000,
                        variant: 'destructive'
                    })
                    navigate('/login')
                }
            } else {
                setError(error)
            }
        }
    }

    useEffect(() => {
        if(!loading && !user && page === 'private') navigate('/login')
        else if(!loading && user && (page === 'login' || page === 'register') ) navigate('/')
    }, [user, loading, page])

    useEffect(() => {
        checkSessionHandler()
    }, [])

    return {
        user,
        error,
        loading,
        submitting,
        login: loginHandler,
        register: registerHandler,
        logout: logoutHandler,
        checkSession: checkSessionHandler
    }
}

export default useAuth