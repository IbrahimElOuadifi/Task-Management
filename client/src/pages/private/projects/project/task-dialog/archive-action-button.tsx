import { FC } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { usePOSTData } from 'hooks/index'
import { deleteTask } from 'api/task'

interface ArchiveActionButtonProps {
    taskId: string
    onSuccessful?: () => void
}
  
const ArchiveActionButton:FC<ArchiveActionButtonProps> = ({ taskId, onSuccessful }) => {

    const { postData } = usePOSTData(deleteTask, onSuccessful)

    const handleDeleteTask = () => {
        postData({ id: taskId }).then(() => {
            if (onSuccessful) {
                onSuccessful()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant='outline' className='text-sm'>Archive</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Delete Task ?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteTask}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  export default ArchiveActionButton