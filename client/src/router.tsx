import { Navigate, createBrowserRouter } from 'react-router-dom'
import App from 'pages/index'
import LoginPage from 'pages/login/index'
import RegisterPage from 'pages/register/index'
import PrivatePage from 'pages/private/index'
import HomePage from 'pages/private/app/index'
import Home from 'pages/private/app/home/index'
import About from 'pages/private/app/about/index'
import Projects from 'pages/private/app/projects/index'
import ProjectList from 'pages/private/app/projects/list/index'
import Project from 'pages/private/app/projects/project/index'
import TaskList from 'pages/private/app/projects/project/task-list/index'
import TaskDialog from 'pages/private/app/projects/project/task-dialog/index'
import AccountPage from 'pages/private/account/index'
import ProfilePage from 'pages/private/account/profile/index'
import SecurityPage from 'pages/private/account/security'
import SettingsPage from 'pages/private/account/settings'

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
                        element: <HomePage />,
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
                        ]
                    },
                    {
                        path: 'account',
                        element: <AccountPage />,
                        children: [
                            {
                                path: '',
                                element: <Navigate to='/account/profile' />
                            },
                            {
                                path: 'profile',
                                element: <ProfilePage />
                            },
                            {
                                path: 'security',
                                element: <SecurityPage />
                            },
                            {
                                path: 'settings',
                                element: <SettingsPage />
                            },
                        ]
                    }
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