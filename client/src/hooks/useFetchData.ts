import { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '@store-actions/authSlice'

const parseJSON = (obj: string): Record<string, unknown> => {
    try {
        return JSON.parse(obj)
    } catch (error) {
        return {}
    }
}

export interface Options {
    id?: string | null;
    query?: string;
    page?: number;
    limit?: number;
}

const useFetchData = <T>(
    request: Function,
    options: Options = { id: null, query: '{}', page: 1, limit: 10 },
    callback?: Function
) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id, query, page, limit } = options
    const { token } = useSelector((state: any) => state.auth)

    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [count, setCount] = useState<number>(0)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response: AxiosResponse = await request({ id, page, limit, ...parseJSON(query as string), token })
            console.log(response.data)
            if(Array.isArray(response.data)) {
                setData(response.data)
            } else if (response.data && !isNaN(response.data.count)) {
                setData(response.data.results)
                setCount(response.data.count)
            } else {
                setData([response.data])
            }
            // setData(Array.isArray(response.data) ? response.data : [response.data])
            if (callback && response) callback(response)
        } catch (error: any) {
            if(error.status === 401) {
                dispatch(logout())
                navigate('/login')
            }
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const memoizedFetchData = useMemo(() => fetchData, [id, query, page, limit])

    useEffect(() => {
        fetchData()
    }, [memoizedFetchData])

    return { data, error, loading, count, refetch: fetchData }
}

export default useFetchData