import { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

const parseJSON = (obj) => {
    try {
        return JSON.parse(obj)
    } catch (error) {
        return {}
    }
}

const useFetchData = (request, options = { id: null, query: '{}', page: 1, limit: 10 }, callback) => {

    const { id, query, page, limit } = options
    
    const { token } = useSelector(state => state.auth)

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await request({ id, page, limit, ...parseJSON(query), token })
            setData(response)
            if (callback && response) callback(response)
        } catch (error) {
            setError(error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const memoizedFetchData = useMemo(() => fetchData, [id, query, page, limit])
    
    useEffect(() => {
        fetchData()
    }, [memoizedFetchData])
    
    return { data, error, loading, refetch: fetchData}
}

export default useFetchData