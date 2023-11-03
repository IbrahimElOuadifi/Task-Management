import { FC } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Button } from "@components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "@store-actions/authSlice"
import { AuthSession } from "@interfaces/User"
import userPic from '@assets/svg/user.svg'

const NavBar: FC = () => {

    const dispatch = useDispatch()

    const { user } = useSelector((state:  { auth: AuthSession }) => state.auth)

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout())
    }

    return (
        <div className="flex flex-row justify-between items-center px-8 h-16 drop-shadow-sm">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
            </div>
            <div className="flex flex-row justify-between items-center">
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
                            <DropdownMenuItem>
                                Profile
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Settings
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default NavBar