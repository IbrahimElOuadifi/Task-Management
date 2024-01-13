import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '@store-actions/authSlice'
import { useToast } from "@components/ui/use-toast"

const usePOSTData = <T>(
    request: Function,
    onSuccess?: Function,
    onFailure?: Function,
) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { toast } = useToast()

    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const postData = async (data: T) => {
        try {
            setLoading(true)
            setError(null)
            const response: AxiosResponse = await request(data)
            setData(Array.isArray(response.data) ? response.data : [response.data])
            if(onSuccess) onSuccess(response)
        } catch (error: any) {
            if(error.status === 401) {
                // handleTokenRefresh()
                //     .then(({ user, accessToken }) => {
                //         dispatch(setCredentials({ user, accessToken, loading: false }))
                //         postData(data)
                //     }).catch(error => {
                //         navigate('/login')
                //         setError(error)
                //         dispatch(logout())
                //         toast({
                //             description: error.message,
                //             duration: 2000,
                //             variant: 'destructive'
                //         })
                //     })

                navigate('/login')
                setError(error)
                dispatch(logout())
                toast({
                    description: error.message,
                    duration: 2000,
                    variant: 'destructive'
                })
            } else {
                setError(error)
                if(onFailure) onFailure(error)
            }
        } finally {
            setLoading(false)
        }
    }

    return {
        data,
        error,
        loading,
        postData
    }
}

export default usePOSTData