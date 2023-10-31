import { createBrowserRouter } from 'react-router-dom'

import App from './pages/index'
import LoginPage from './pages/login/index'
import RegisterPage from './pages/register/index'
import PrivatePage from './pages/private/index'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <PrivatePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
        ],
    },
])

export default router