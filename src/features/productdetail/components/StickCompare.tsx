import { Button } from "antd"
import {
    CloseOutlined,
    PlusOutlined
} from "@ant-design/icons"
import ImageWithFallback from "../../../components/img/ImageWithFallback";
import { useNavigate } from "react-router-dom";
export interface ProductComapreProp {
    id: string,
    img: string,
    productName: string
}
interface StickCompareProp {
    category: string | undefined,
    productCompare: ProductComapreProp[];
    setProductCompare: (newList: ProductComapreProp[]) => void
}

const StickCompare = ({category, productCompare, setProductCompare} : StickCompareProp) => {
    const navigate = useNavigate()
    const handleRemoveAllProductCompare = () => {
        setProductCompare([])
    }
    const handleRemoveItemsProductCompare = (id: string) => {
        const result = productCompare.filter((items) => items.id !==id)
        setProductCompare(result);
    }

    const handleCompare = () => {
        const listId = productCompare.map(i => i.id).join(',');
        navigate('/compare', { state: { listId, category } });
        
    }

    if(productCompare.length === 0) return null
    return(
        <div className="fixed bottom-0 right-0 left-0 bg-white z-9999 border border-gray-300 shadow-md">
            
            <div className="grid grid-cols-4 max-w-[1400px]  mx-auto content-center">
                {[0, 1, 2].map((index) => {
                    const item = productCompare[index];
                    return(
                        <div key={index} className="flex gap-2 items-center justify-center border-l border-l-gray-300">
                            {item ? (
                                <div className="flex flex-col items-center justify-center p-2 relative h-30 w-full gap-1">
                                    <ImageWithFallback 
                                        src={item.img}
                                        alt={item.productName}
                                        style={{ clipPath: '50%' }}
                                        className="w-10 h-10 rounded-[5px] border-gray-400 text-center content-center"
                                    />
                                    <span className="line-clamp-1">{item.productName}</span>
                                    <div className="w-[30px] h-[30px] text-center content-center absolute top-2 right-2 hover:cursor-pointer"
                                    onClick={() => handleRemoveItemsProductCompare(item.id)}
                                    >
                                        <CloseOutlined />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center hover:cursor-pointer p-2 gap-2">
                                    <div className="border border-dashed w-10 h-10 rounded-[5px] border-gray-400 text-center content-center">
                                        <PlusOutlined />
                                    </div>
                                    <span>Thêm sản phẩm</span>
                                </div>
                            )}
                        </div>
                    )})}
                <div className="flex flex-col gap-3 items-center h-[120px] justify-center border-r border-r-gray-300
                border-l border-l-gray-300">
                    <Button className={`h-12! w-40 ${productCompare.length < 2 ? "bg-gray-100 text-black" : "bg-blue-500! text-white!"}`}
                        disabled={productCompare.length<2}
                        onClick={handleCompare}
                    >
                        So sánh ngay
                    </Button>
                    <p className="text-blue-600 hover:cursor-pointer"
                    onClick={handleRemoveAllProductCompare}
                    >
                        Xóa tất cả sản phẩm
                    </p>
                </div>
            </div>
        </div>
    )
}
export default StickCompare