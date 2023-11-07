import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { useSelector } from 'react-redux'
import { AuthSession } from '@interfaces/User'

const usePOSTData = <T>(
    request: Function,
    onSuccess?: Function,
    onFailure?: Function,
) => {

    const { token } = useSelector((state: { auth: AuthSession }) => state.auth)

    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const postData = async (data: T) => {
        try {
            setLoading(true)
            const response: AxiosResponse = await request({ ...data, token })
            setData(Array.isArray(response.data) ? response.data : [response.data])
            if(onSuccess) onSuccess(response)
        } catch (error: any) {
            setError(error)
            if(onFailure) onFailure(error)
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