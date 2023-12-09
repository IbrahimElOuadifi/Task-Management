import { FC, ReactNode } from 'react'
import SideBar from '@components/home-sidebar'

const HomeLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            {/* sidebar and home page using grid */}
            <div className="grid grid-cols-12 h-full">
                <div className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 p-4 bg-gray-100">
                    {/* sidebar */}
                    <div className='bg-white w-full h-full'>
                        <SideBar />
                    </div>
                </div>
                <div className="col-span-6 md:col-span-8 lg:col-span-9 xl:col-span-10 p-4 bg-gray-100 flex justify-center align-top">
                    {/* home page */}
                    <div className='bg-white w-full h-full py-4 px-8 max-w-screen-2xl'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeLayout