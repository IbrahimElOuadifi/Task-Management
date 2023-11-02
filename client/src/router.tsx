import { createBrowserRouter } from 'react-router-dom'

import App from 'pages/index'
import LoginPage from 'pages/login/index'
import RegisterPage from 'pages/register/index'
import PrivatePage from 'pages/private/index'
import Home from 'pages/private/home/index'
import About from 'pages/private/about/index'
import Projects from 'pages/private/projects/index'
import ProjectList from 'pages/private/projects/list/index'
import Project from 'pages/private/projects/project/index'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <PrivatePage />,
                children: [
                    {
                        path: '',
                        element: <Home />
                    },
                    {
                        path: 'projects',
                        element: <Projects />,
                        children: [
                            {
                                path: '',
                                element: <ProjectList />,
                            },
                            {
                                path: ':id',
                                element: <Project />,
                            },
                        ]
                    },
                    {
                        path: 'about',
                        element: <About />
                    },
                ],
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
        ],
    },
])

export default router