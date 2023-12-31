import { FC, ReactNode } from 'react'
import NavBar from '@components/navbar'

interface Props {
    children: ReactNode,
    handleLogout: () => void
}

const HomeLayout: FC<Props> = ({ children, handleLogout }) => {
    return (
        <div className="flex flex-col h-screen">
            <NavBar handleLogout={handleLogout} />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default HomeLayout