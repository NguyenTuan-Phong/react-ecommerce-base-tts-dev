import { useLocation, useNavigate } from "react-router-dom";
import FormReply from "../../feedback/components/FormReply"
import type { itemOrder } from "../type";
import ImageWithFallback from "../../../components/img/ImageWithFallback";

const FeedbackProduct = () => {
    const location = useLocation();
    const item = location.state?.item;
    const nagavite = useNavigate()
    
    return(
        <div className="flex flex-col gap-8 max-w-4xl mx-auto p-6">
            <div className="w-fit border border-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-pointer
                transition duration-200 hover:bg-gray-100 hover:shadow-sm hover:scale-[1.01]"
                onClick={() => nagavite(-1)}
            >
                Quay lại
            </div>

            {item.items.map((i: itemOrder) => (
                <div key={i.productId} className="p-6 bg-white shadow-md rounded-xl border border-gray-200">
                    {/* Sản phẩm */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <div className="w-30 h-30 border rounded overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
                            <ImageWithFallback
                                alt={i.productName}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1 space-y-2 mt-3 md:mt-0">
                            <h2 className="text-lg font-semibold text-gray-800">Thông tin sản phẩm</h2>
                            <div className="text-sm text-gray-600">
                                <p className="flex">
                                    <span className="font-semibold w-25 block">Tên sản phẩm:</span> 
                                    {i.productName}
                                </p>
                                <p className="flex">
                                    <span className="font-semibold w-25 block">Mã sản phẩm:</span> 
                                    {i.productCode}
                                </p>
                                <p className="flex">
                                    <span className="font-semibold w-25 block">Số lượng:</span> 
                                    {i.quantity}
                                </p>
                            </div>
                        </div>
                    </div>
                    {i.isReview ? (
                        <div className="text-[18px] font-bold text-[green]">
                            ĐÃ ĐÁNH GIÁ SẢN PHẨM
                        </div>
                    ) : (
                        <div className="mt-6 border-t border-gray-300 border-dashed pt-5 space-y-3">
                            <h2 className="text-lg font-semibold text-gray-800">Phản hồi về sản phẩm</h2>
                            <FormReply productId={i.productId}/>
                        </div>
                    )}
                    
                </div>
            ))}
        </div>

    )
}

export default FeedbackProduct