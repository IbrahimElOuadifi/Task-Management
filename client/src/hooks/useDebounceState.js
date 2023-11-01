import { useState } from 'react'
import useDebounceValue from './useDebounceValue'

const useDebounceState = (defaultValue, delay) => {
    const [value, setValue] = useState(defaultValue)
    const [debouncedValue, isDebouncing] = useDebounceValue(value, delay)
    return { value, setValue, debouncedValue, isDebouncing }
}

export default useDebounceState