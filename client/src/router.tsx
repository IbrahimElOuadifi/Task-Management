import { Navigate, createBrowserRouter } from 'react-router-dom'
import App from 'pages/index'
import LoginPage from 'pages/login/index'
import RegisterPage from 'pages/register/index'
import PrivatePage from 'pages/private/index'
import HomePage from 'pages/private/App/index'
import Home from 'pages/private/App/home/index'
import About from 'pages/private/App/about/index'
import Projects from 'pages/private/App/projects/index'
import ProjectList from 'pages/private/App/projects/list/index'
import Project from 'pages/private/App/projects/project/index'
import TaskList from 'pages/private/App/projects/project/task-list/index'
import TaskDialog from 'pages/private/App/projects/project/task-dialog/index'
import AccountPage from 'pages/private/account/index'
import ProfilePage from 'pages/private/account/profile/index'
import SecurityPage from 'pages/private/account/security'
import SecurityDevices from 'pages/private/account/security/devices'
import ChangePassword from 'pages/private/account/security/change-password'
import SettingsPage from 'pages/private/account/settings'
import ApplicationSetting from 'pages/private/account/settings/application-setting'
import LabelsSetting from 'pages/private/account/settings/labels-setting'

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
                                element: <SecurityPage />,
                                children: [
                                    {
                                        path: '',
                                        element: <Navigate to='/account/security/devices' />
                                    },
                                    {
                                        path: 'password',
                                        element: <ChangePassword />
                                    },
                                    {
                                        path: 'devices',
                                        element: <SecurityDevices />
                                    }
                                ]
                            },
                            {
                                path: 'settings',
                                element: <SettingsPage />,
                                children: [
                                    {
                                        path: '',
                                        element: <Navigate to='/account/settings/app' />
                                    },
                                    {
                                        path: 'app',
                                        element: <ApplicationSetting />
                                    },
                                    {
                                        path: 'labels',
                                        element: <LabelsSetting />
                                    }
                                ]
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