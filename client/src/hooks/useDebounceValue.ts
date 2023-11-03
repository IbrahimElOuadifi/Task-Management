import { useState, useEffect } from 'react'

const useDebounceValue = <T>(value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    const [isDebouncing, setIsDebouncing] = useState<Boolean>(false)
    
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