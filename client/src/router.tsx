import { createBrowserRouter } from 'react-router-dom'

import App from './pages/index'
import LoginPage from './pages/login/index'
import RegisterPage from './pages/register/index'
import PrivatePage from './pages/private/index'
import Home from './pages/private/Home'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <PrivatePage />,
                children: [
                    { path: '', element: <Home /> },
                    { path: 'dashboard', element: <h1>Dashboard</h1> },
                    { path: 'tasks', element: <h1>Tasks</h1> },
                ],
            },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
        ],
    },
])

export default router