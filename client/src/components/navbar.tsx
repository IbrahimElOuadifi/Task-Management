import { FC } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Button } from "@components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { MdClose, MdPerson, MdSecurity, MdSettings } from 'react-icons/md'
import { logout } from "@store-actions/authSlice"
import { AuthSession } from "@interfaces/User"
import userPic from '@assets/svg/user.svg'

const NavBar: FC = () => {

    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const { user } = useSelector((state:  { auth: AuthSession }) => state.auth)

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout())
    }

    return (
        <div className="flex flex-row justify-between items-center px-8 h-16 drop-shadow-sm">
            <div className="flex flex-row justify-between items-center">
                <Link to='/'>
                    <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
                </Link>
            </div>
            <div className="flex flex-row justify-between items-center">
                {
                    pathname.toLowerCase().startsWith('/account') ? (
                        <Link to='/'>
                            <MdClose size={28} />
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full ring-1">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={userPic} alt="Avatar" />
                                        <AvatarFallback>
                                            {user?.firstName[0].toUpperCase()}{user?.lastName[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                                    {/* <p className="text-xs leading-none text-muted-foreground">{user?.username}</p> */}
                                </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <NavLink
                                        to='/account/profile'
                                        children={({ isActive }) => {
                                            return (
                                                <DropdownMenuItem className={`flex justify-between items-center ${isActive && 'bg-slate-200'}`}>
                                                    <span>Profile</span>
                                                    <MdPerson />
                                                </DropdownMenuItem>
                                            )
                                        }}/>
                                    <NavLink
                                        to='/account/security'
                                        children={({ isActive }) => {
                                            return (
                                                <DropdownMenuItem className={`flex justify-between items-center ${isActive && 'bg-slate-200'}`}>
                                                    <span>Security</span>
                                                    <MdSecurity />
                                                </DropdownMenuItem>
                                            )
                                        }}/>
                                    <NavLink
                                        to='/account/settings'
                                        children={({ isActive }) => {
                                            return (
                                                <DropdownMenuItem className={`flex justify-between items-center ${isActive && 'bg-slate-200'}`}>
                                                    <span>Settings</span>
                                                    <MdSettings />
                                                </DropdownMenuItem>
                                            )
                                        }}/>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="justify-center items-center">
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </div>
        </div>
    )
}

export default NavBar