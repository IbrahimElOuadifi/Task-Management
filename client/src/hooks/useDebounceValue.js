import { useState, useEffect } from 'react'

const useDebounceValue = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    const [isDebouncing, setIsDebouncing] = useState(false)
    
    useEffect(() => {
        if (debouncedValue !== value)  setIsDebouncing(true)
        else setIsDebouncing(false)
        
        const handler = setTimeout(() => {
            setDebouncedValue(value)
            setIsDebouncing(false)
        }, delay || 200)
    
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    
    return [debouncedValue, isDebouncing]
}

export default useDebounceValue