import { Pagination } from "antd"
import { useCategories } from "../../productdetail/hook/useCategories"
interface StickPaginationProp {
    page:number,
    size: number,
    setPage: (page: number) => void
}
const StickPagination = ({page, size, setPage} : StickPaginationProp) => {
    const {
        data
    } = useCategories(page, size)
    
    return(
        <div className="">
            <Pagination
                align="center"
                current={page + 1}
                pageSize={size}
                pageSizeOptions={["5", "10", "20", "50", "100"]}
                onChange={(pageNumber) => {
                        setPage(pageNumber - 1)
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                }
                total={data?.data.currentTotalElementsCount}
            />
        </div>
    )
}
export default StickPagination