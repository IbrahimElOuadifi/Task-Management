import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const SideBar: FC = () => {
    return (
        <div className='h-full py-4 px-2'>
            <ul className='space-y-2'>
                <li>
                    <NavLink to='/' className={({ isActive }) => `text-gray-600 hover:text-gray-900 hover:font-bold ${isActive ? 'font-bold' : ''}`}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/projects' className={({ isActive }) => `text-gray-600 hover:text-gray-900 hover:font-bold ${isActive ? 'font-bold' : ''}`}>
                        Projects
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/about' className={({ isActive }) => `text-gray-600 hover:text-gray-900 hover:font-bold ${isActive ? 'font-bold' : ''}`}>
                        About
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SideBar