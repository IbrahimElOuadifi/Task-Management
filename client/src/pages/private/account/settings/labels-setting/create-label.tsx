import { useState, useEffect, FC } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { useForm, Controller } from "react-hook-form"
import { usePOSTData } from 'hooks/index'
import { createLabel, updateLabel } from 'api/labels'
import { ILabel } from "@interfaces/Label"

interface FormValues {
    name: string
    color: string
}

interface Props {
    label: ILabel | null
    onSuccess: () => void
    close: () => void
}

const CreateLabel: FC<Props> = ({ label, onSuccess, close }) => {

    const { postData: postCreate } = usePOSTData(createLabel, onSuccess)
    const { postData: postUpdate } = usePOSTData(updateLabel, onSuccess)

    const [open, setOpen] = useState(false)

    const { handleSubmit, control, setValue, reset } = useForm<FormValues>({
        defaultValues: {
            name: "",
            color: "#000000",
        }
    })

    const onSubmit = async (data: FormValues) => {
        if (label?._id) {
            await postUpdate({...label,...data }).then(() => setOpen(false))
        } else {
            await postCreate({...data }).then(() => setOpen(false))
        }
    }

    const onError = (errors: any) => {
        console.log(errors)
    }

    useEffect(() => {
        reset()
        if(label) {
            if (label?._id) {
                setValue("name", label.name)
                setValue("color", label.color)
                setOpen(true)
                return
            }
        }
    }, [label, open])

    return (
        <Dialog open={open} onOpenChange={open => { setOpen(open); close(); }}>
            <DialogHeader className="flex flex-row items-center justify-between gap-4 mb-4">
                <DialogTitle className="text-2xl font-bold">Manage Labels</DialogTitle>
                <DialogTrigger asChild>
                    <Button type="button" variant="default">Create Label</Button>
                </DialogTrigger>
                </DialogHeader>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-4 pt-8 pb-4">
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="name" className="text-start">Name</Label>
                            <Controller
                                control={control}
                                name="name"
                                rules={{ required: "Name is required" }}
                                render={({ field }) => <Input {...field} type="text" id="name" className="col-span-3" />} />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="color" className="text-start">Color</Label>
                            <Controller
                                control={control}
                                name="color"
                                rules={{ required: "Color is required" }}
                                render={({ field }) => (<>
                                    <Input id="color-code" className="col-span-2" type="text" {...field} />
                                    <Input id="color" className="col-span-1" type="color" {...field} />
                                </>)} />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
            </DialogContent>        
        </Dialog>
    )
}

export default CreateLabel