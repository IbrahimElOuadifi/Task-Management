import { FC } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Button } from "@components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { MdClose, MdSecurity } from 'react-icons/md'
import { AuthSession } from "@interfaces/User"
import userPic from '@assets/svg/user.svg'

interface Props {
    handleLogout: () => void
}

const NavBar: FC<Props> = ({ handleLogout }) => {

    const { pathname } = useLocation()

    const { user } = useSelector((state:  { auth: AuthSession }) => state.auth)

    return (
        <div className="flex flex-row items-center justify-between h-16 px-8 drop-shadow-sm">
            <div className="flex flex-row items-center justify-between">
                <Link to='/'>
                    <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
                </Link>
            </div>
            <div className="flex flex-row items-center justify-between">
                {
                    pathname.toLowerCase().startsWith('/account') && false ? (
                        <Link to='/'>
                            <MdClose size={28} />
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative w-8 h-8 rounded-full ring-1">
                                    <Avatar className="w-8 h-8">
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
                                        to='/account'
                                        children={({ isActive }) => {
                                            return (
                                                <DropdownMenuItem className={`flex justify-between items-center ${isActive && 'bg-slate-200'}`}>
                                                    <span>Account</span>
                                                    <MdSecurity />
                                                </DropdownMenuItem>
                                            )
                                        }}/>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="items-center justify-center">
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