import { FC } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { usePOSTData } from 'hooks/index'
import { deleteLabel } from 'api/labels'
import { ILabel } from "@interfaces/Label"
import { MdDelete } from "react-icons/md"

interface Props {
    label: ILabel | null
    onSuccess: () => void
}

const CreateLabel: FC<Props> = ({ label, onSuccess }) => {

    const { postData } = usePOSTData(deleteLabel, onSuccess)

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button type="button" size="icon" variant="outline">
                    <MdDelete size={18} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Label</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to delete this label?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => postData(label)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CreateLabel