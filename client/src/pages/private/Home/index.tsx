import { FC } from 'react'
import WorkspaceCard from './workspace-card'
import NewWorkspace from './new-workspace'

const workspaceData = [
    { _id: 1, title: 'Workspace 1' },
    { _id: 2, title: 'Workspace 2' },
    { _id: 3, title: 'Workspace 3' },
    { _id: 4, title: 'Workspace 4' },
    { _id: 5, title: 'Workspace 5' },
    { _id: 6, title: 'Workspace 6' },
    { _id: 7, title: 'Workspace 7' },
    { _id: 8, title: 'Workspace 8' },
    { _id: 9, title: 'Workspace 9' },
    { _id: 10, title: 'Workspace 10' },
    { _id: 11, title: 'Workspace 11' },
    { _id: 12, title: 'Workspace 12' },
]

const Home: FC = () => {
    return (
        <>
            <h1 className='text-2xl font-bold'>YOUR WORKSPACES</h1>
            {/* divider */}
            <hr className='my-4' />
            {/* workspaces */}
            <div className='flex flex-wrap'>
                {workspaceData.map(workspace => (<WorkspaceCard key={workspace._id} id={workspace._id.toString()} title={workspace.title} />))}
                <NewWorkspace />
            </div>
        </>
    )
}

export default Home