import { Link } from "react-router-dom"
import { useEffect, useState, type JSX } from "react"
import {
    AliyunOutlined,
    MinusSquareOutlined,
    ApartmentOutlined,
    ProductOutlined,
    HourglassOutlined,
    AudioOutlined,
    QrcodeOutlined
} from '@ant-design/icons'
import { useCategories } from "../../productdetail/hook/useCategories";

interface Props {
    onHoverIdChange?: (id: number | null) => void;
}

const iconMap: Record<number, JSX.Element | null> = {
    1: <AliyunOutlined />,
    2: <ApartmentOutlined />,
    3: <ProductOutlined />, 
    4:  <MinusSquareOutlined />,   
    5: <HourglassOutlined />,
    6: <AudioOutlined />,
    7: <AliyunOutlined />,
    8: <QrcodeOutlined />,
    9: null,
    10: null,
    11: null
};
const CategoriesMenu = ({ onHoverIdChange }: Props) => {
    const [hoverId, setHoverId] = useState<number | null>(null);
    // const [isfilter, setFilter] = useState<any>(null);

    const { data: categoryData, isLoading,isError } = useCategories();
    const categories = categoryData?.data?.content || [];


    useEffect(() => {
        // const filter_danhMuc = categories.find((item:any) => item.id === hoverId)
        // if (filter_danhMuc) {
        //     setFilter(filter_danhMuc)
        // } else {
        //     setFilter(null)
        // }
        onHoverIdChange?.(hoverId)
    }, [hoverId, onHoverIdChange])
    
    if(isLoading){
        return<div>Đang tải danh mục...</div>
    }
    if(isError){
        return<div>Lỗi khi tải danh mục...</div>
    }


    return (
        <div className="relative flex">
            <div className="flex-1 flex flex-col text-[20px] rounded-[20px] bg-[white]">
               {categories.map((item:any) => (
                    <Link 
                    style={{ color: 'black' }} 
                    to={`/category/${item.id}`}
                    key={item.id} 
                    className="flex-1"
                    onMouseEnter={() => setHoverId(item.id)}
                        // onMouseLeave={() => setHoverId(null)}
                    >
                        <div className="hover:bg-[#22a085] flex gap-4 items-center hover:text-[white] p-3">
                            <div className="text-[30px] w-[40px] h-[60px]"> {iconMap[item.id] ?? null}</div>
                            <p>{item.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default CategoriesMenu