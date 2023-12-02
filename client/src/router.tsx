import { createBrowserRouter } from 'react-router-dom'

import App from 'pages/index'
import LoginPage from 'pages/login/index'
import RegisterPage from 'pages/register/index'
import PrivatePage from 'pages/private/index'
import Home from 'pages/private/Home/index'
import About from 'pages/private/about/index'
import Projects from 'pages/private/projects/index'
import ProjectList from 'pages/private/projects/list/index'
import Project from 'pages/private/projects/project/index'
import TaskList from 'pages/private/projects/project/task-list/index'
import TaskDialog from 'pages/private/projects/project/task-dialog/index'

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
                                path: ':projectId',
                                element: <Project />,
                                children: [
                                    {
                                        path: '',
                                        element: <TaskList />,
                                    },
                                    {
                                        path: ':taskId',
                                        element: <TaskDialog />,
                                    }
                                ]
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