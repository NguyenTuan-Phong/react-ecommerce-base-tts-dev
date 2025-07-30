import { Button } from "antd"
import {
    ArrowLeftOutlined,
} from "@ant-design/icons"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetFlashSaleById } from "../hook/useGetFlashSaleById";
import dayjs from "dayjs"
import SkeletonViewDetailFlashSale from "../../../../components/skeleton/SkeletonViewDetailFlashSale";
import { useMemo } from "react";
const ViewDetailFlashSale = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    
    const {
        isLoadingGetFlashSaleById,
        ResponseFlashSaleById
    } = useGetFlashSaleById(id!)
    const defaultFlashSale = {
        data:{
            id: "",
            name: "",
            startTime: "",
            endTime: "",
            active: false,
            products: []
        }
    }
    const data = useMemo(
        () => ResponseFlashSaleById ?? defaultFlashSale,
        [ResponseFlashSaleById]
    )

    const now = dayjs();
    const start = dayjs(data.data.startTime);
    const end   = dayjs(data.data.endTime);

    const descriptors = [
        { 
            status: () => start.isAfter(now),   
            label: "Sắp tới",       
            color: "text-blue-500" 
        },
        {   
            status: () => end.isBefore(now),    
            label: "Đã qua",        
            color: "text-red-500" 
        },
        {   
            status: () => true,                 
            label: "Đang diễn ra",  
            color: "text-green-500" 
        },
    ];

    const { label, color } = descriptors.find(d => d.status())!;
    
    return(
        <div className="h-full overflow-y-auto">
            {isLoadingGetFlashSaleById ? (
                <SkeletonViewDetailFlashSale />
            ) : (
                <div>
                    <div className="">
                        <Button className="bg-[#22a085] text-white" onClick={() => navigate(-1)}>
                        <ArrowLeftOutlined />
                        </Button>
                        
                    </div>
                    <div className="text-center text-[22px] p-3">
                        <b className="text-center">Chiến dịch giảm giá: <b className="text-red-500">{data.data.name}</b></b>
                    </div>
                    <div className="bg-white flex flex-col gap-10">
                        <div className="flex gap-20">
                            <p><strong>Thời gian bắt đầu:</strong> {dayjs(data.data.startTime).format("DD/MM/YYYY, HH:mm")}</p>
                            <p><strong>Thời gian kết thúc:</strong> {dayjs(data.data.endTime).format("DD/MM/YYYY, HH:mm")}</p>
                            <p><strong className={color}>{label}</strong></p>
                        </div>
                        <div>
                            <Button 
                            className="bg-green-700! text-[white]! h-12! px-10!"
                            >
                                <Link to={'/admin/update-flashsale'} state={{ id: id }}>
                                    Cập nhật
                                </Link>
                            </Button>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 flex-wrap">
                                {data.data.products.map((product) => (
                                    <div key={product.productId} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <div className="mt-4">
                                        <h4 className="text-[18px] font-semibold truncate">{product.name}</h4>
                                        <p className="text-[14px] text-gray-600 h-[24px] truncate">{product.description}</p>
                                        <p className="text-md font-bold mt-2">Giá: {product.flashPrice.toLocaleString()} VND</p>
                                        <div className="mt-2 text-sm text-gray-500 flex justify-between">
                                            <p>Còn lại: {product.availableQuantity}</p>
                                            <p>Đã bán: {product.soldQuantity}</p>
                                        </div>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    )
}
export default ViewDetailFlashSale