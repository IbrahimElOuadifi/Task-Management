import { FC, ReactNode } from 'react'
import NavBar from '@components/navbar'

const HomeLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default HomeLayout