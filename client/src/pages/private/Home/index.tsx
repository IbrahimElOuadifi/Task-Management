import { FC } from 'react'
import WorkspaceCard from './workspace-card'

const Home: FC = () => {
    return (
        <div className="h-full">
            {/* sidebar and home page using grid */}
            <div className="grid grid-cols-12 h-full">
                <div className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 p-4 bg-gray-100">
                    {/* sidebar */}
                    <div className='bg-white w-full h-full'>

                    </div>
                </div>
                <div className="col-span-6 md:col-span-8 lg:col-span-9 xl:col-span-10 p-4 bg-gray-100">
                    {/* home page */}
                    <div className='bg-white w-full h-full py-4 px-8'>
                        <h1 className='text-2xl font-bold'>YOUR WORKSPACES</h1>
                        {/* divider */}
                        <hr className='my-4' />
                        {/* workspaces */}
                        <div className='flex flex-wrap'>
                            <WorkspaceCard title='Workspace 1' />
                            <WorkspaceCard title='Workspace 2' />
                            <WorkspaceCard title='Workspace 3' />
                            <WorkspaceCard title='Workspace 4' />
                            <WorkspaceCard title='Workspace 5' />
                            <WorkspaceCard title='Workspace 6' />
                            <WorkspaceCard title='Workspace 7' />
                            <WorkspaceCard title='Workspace 8' />
                            <WorkspaceCard title='Workspace 9' />
                            <WorkspaceCard title='Workspace 10' />
                            <WorkspaceCard title='Workspace 11' />
                            <WorkspaceCard title='Workspace 12' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home