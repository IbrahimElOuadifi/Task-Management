import { Outlet } from 'react-router-dom'
import { Toaster } from '@components/ui/toaster'

const App = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  )
}
  
export default App