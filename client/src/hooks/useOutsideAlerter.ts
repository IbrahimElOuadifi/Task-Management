import { useEffect, RefObject } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref])
}

export default useOutsideAlerter