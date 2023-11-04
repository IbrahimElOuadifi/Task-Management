import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { checkSession, login, register } from 'api/auth'
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
            const response = await login(credentials) as AxiosResponse<{ token: string }>
            localStorage.setItem('token', response.data.token)
            checkSessionHandler()
        } catch (error: any) {
            setError(error)
            dispatch(setCredentials({ user: null, token: null, loading: false }))
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
            const response = await register(credentials) as AxiosResponse<{ token: string }>
            localStorage.setItem('token', response.data.token)
            checkSessionHandler()
        } catch (error: any) {
            setError(error)
            dispatch(setCredentials({ user: null, token: null, loading: false }))
            toast({
                description: error.message,
                duration: 2000,
                variant: 'destructive'
            })
        } finally {
            setSubmitting(false)
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem('token')
        dispatch(logout())
    }

    const checkSessionHandler = async () => {
        try {
            setError(null)
            dispatch(setCredentials({ user: null, token: null, loading: true }))
            const token = localStorage.getItem('token')
            const response = await checkSession({ token }) as AxiosResponse<{ user: User }>
            dispatch(setCredentials({  user: response.data.user, token, loading: false }))
        } catch (error: any) {
            setError(error)
            dispatch(setCredentials({ user: null, token: null, loading: false }))
            if(page === 'private') toast({
                description: error.message,
                duration: 2000,
                variant: 'destructive'
            })
            localStorage.removeItem('token')
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