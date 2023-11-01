import { FC, ReactNode } from 'react'
import NavBar from '@components/navebar'

const HomeLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-col flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default HomeLayout