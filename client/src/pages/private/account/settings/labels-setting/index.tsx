import { useState } from "react"
import { Button } from "@components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@components/ui/badge"
import TablePagination from "@components/table-pagination"
import { MdEdit } from "react-icons/md"
import { invertColor } from "@utils"
import { useFetchData } from 'hooks/index'
import { getLabels } from 'api/labels'
import { ILabel } from "@interfaces/Label"
import CreateLabel  from "./create-label"
import DeleteAlert from "./delete-alert"

const LabelsSetting = () => {

    const [page, setPage] = useState(1)
    const [currentLabel, setCurrentLabel] = useState<ILabel | null>(null)

    const { data, loading, error, refetch, count } = useFetchData<ILabel>(getLabels, { query: '', limit: 10, page })

    return (
        <div className="container">
            <CreateLabel label={currentLabel} onSuccess={() => { refetch(); setCurrentLabel(null) }} close={() => setCurrentLabel(null)} />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Color</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        loading ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    Loading...
                                    <span className="ml-1 text-sm">
                                        (This may take a few seconds)
                                    </span>
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    An error occurred while loading data.
                                    <span className="ml-1 text-sm">
                                        (Error: {error.message})
                                        <button onClick={refetch} className="underline">
                                            Try again
                                        </button>
                                    </span>
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No data found.
                                    <span className="ml-1 text-sm">
                                        <button onClick={refetch} className="underline">
                                            Try again
                                        </button>
                                    </span>
                                </TableCell>
                            </TableRow>
                        ) : data.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>
                                    <Badge className="border cursor-default" style={{ backgroundColor: item.color, color: invertColor(item.color) }}>{item.color}</Badge>
                                </TableCell>
                                <TableCell className="flex items-center justify-end gap-2">
                                    <Button type="button" size="icon" variant="outline" onClick={() => setCurrentLabel(item)}>
                                        <MdEdit size={18} />
                                    </Button>
                                    <DeleteAlert label={item} onSuccess={refetch} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div className="flex items-center justify-between gap-4 mt-4">
                <TablePagination page={page} pages={Math.ceil(count/10)} setPage={setPage} />
            </div>
        </div>
    )
}

export default LabelsSetting