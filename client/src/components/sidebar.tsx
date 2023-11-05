import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const Link = ({ children, ...props }: any) => {
    return (
        <li>
            <NavLink 
                {...props}
                className={({ isActive }) => `text-lg transition-all ease-in-out duration-150 text-gray-600 animate-in hover:text-gray-900 ${isActive ? '' : ''}`}
                children={({ isActive }) => (
                    <div className={`rounded-md px-4 py-1.5 ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
                        {children}
                    </div>
                )}
            />
        </li>
    )
}

const SideBar: FC = () => {
    return (
        <div className='h-full py-4 px-2'>
            <ul className='space-y-2'>
                <Link to='/'>Home</Link>
                <Link to='/projects'>Projects</Link>
                <Link to='/about'>About</Link>
            </ul>
        </div>
    )
}

export default SideBar