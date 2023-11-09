import { useState } from 'react'
import useDebounceValue from './useDebounceValue'

const useDebounceState = <T>(defaultValue: T, delay: number = 200) => {
    const [value, setValue] = useState<T>(defaultValue)
    const [debouncedValue, isDebouncing] = useDebounceValue<T>(value, delay)
    return { value, setValue, debouncedValue, isDebouncing }
}

export default useDebounceState