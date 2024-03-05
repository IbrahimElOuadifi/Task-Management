import { FC } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
    page: number
    pages: number
    setPage: (page: number) => void
}

const TablePagination: FC<Props> = ({ page, pages, setPage }) => {

    const handlePageChange = (page: number) => {
        if (page < 1) {
            return setPage(1)
        } else if (page > pages) {
            return setPage(pages)
        } else {
            return setPage(page)
        }
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className="cursor-default">
                    <PaginationPrevious onClick={handlePageChange.bind(this, page - 1)} />
                </PaginationItem>
                {
                    Array.from(Array(pages).keys()).map((pageIndex) => {
                        const pageIndexPlusOne = pageIndex + 1
                        if (pageIndexPlusOne === page) {
                            return (<PaginationItem key={pageIndexPlusOne} className="cursor-default">
                                <PaginationLink isActive onClick={handlePageChange.bind(this, pageIndexPlusOne)}>
                                    {pageIndexPlusOne}
                                </PaginationLink>
                            </PaginationItem>)
                        } else if (pageIndexPlusOne === pages || pageIndexPlusOne === 1 || pageIndexPlusOne === page - 1 || pageIndexPlusOne === page + 1) {
                            return (<PaginationItem key={pageIndexPlusOne} className="cursor-default">
                                <PaginationLink onClick={handlePageChange.bind(this, pageIndexPlusOne)}>
                                    {pageIndexPlusOne}
                                </PaginationLink>
                            </PaginationItem>)
                        } else if (pageIndexPlusOne === page - 2 || pageIndexPlusOne === page + 2) {
                            return (<PaginationItem key={pageIndexPlusOne} className="cursor-default">
                                <PaginationEllipsis />
                            </PaginationItem>)
                        } else {
                            return null
                        }
                    })
                }
                <PaginationItem className="cursor-default">
                    <PaginationNext onClick={handlePageChange.bind(this, page + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default TablePagination