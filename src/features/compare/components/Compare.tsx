import { CloseCircleOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import ImageWithFallback from "../../../components/img/ImageWithFallback";
import SVGCompare from "../../../components/svg/Compare";
import SVGInformation from "../../../components/svg/Information";
import { Link, useLocation } from "react-router-dom";
import { useComapreProduct } from "../hook/useCompareProduct";
import { Card, Col, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import type { ResponseProductCompare } from "../../../services/compareServices";
import { useGetProductByCategory } from "../../productdetail/hook/useGetProductByCategory";
import type { Product } from "../../homepages/type";
const Compare = () => {
    const location = useLocation()
    const { 
        listId,
        category
    } : { 
        listId:string,
        category: string | undefined 
    } = location.state || {};

    const [dataCompare, setDataCompare] = useState<ResponseProductCompare[]>([])
    const [isCompareProductVisible, setIsCompareProductVisible] = useState(false);
    const {
        isLoadingCallProduct,
        ResponseDataComapreProduct
    } = useComapreProduct(listId)

    const {
        ResponseGetProductByCategory
    } = useGetProductByCategory(category!, 0, 10, undefined, undefined, undefined);

    const dataProductByCategory = ResponseGetProductByCategory?.data.content || []

    const data = ResponseDataComapreProduct?.data || []
    useEffect(() => {
        setDataCompare(data)
    },[data])
     
    const handleRemoveProduct = (id: string) => {
        const newData = dataCompare.filter(i => i.id !== id)
        setDataCompare(newData)
    }

    const handleAddProductToCompare = () => {
        setIsCompareProductVisible(true)
    }
    const handleAddProductNow = (items: Product) => {
        const dataProductNew: ResponseProductCompare = {
            id: items.id,
            name: items.name,
            imageUrl: items.imageUrl,
            price: items.price,
            code: items.code,
            rating: items.rating,
            quantity: items.quantity,
            description: items.description,
            soldQuantity: 0,
            availableQuantity: items.availableQuantity,
            flashPrice: items.flashPrice || 0,
            originalPrice: items.originalPrice || 0,
            isInFlashSale: false
        };

        setDataCompare(prev => [...prev, dataProductNew]);
        setIsCompareProductVisible(false)
    };

    return (
        <div className="mt-5">
            <section className="flex gap-4 py-[20px]">
                <Link className="link" to="/">
                    TRANG CHỦ
                </Link>
                <p className='section-text'>/</p>
                <p className="font-bold">SO SÁNH SẢN PHẨM</p>
            </section>
            {isLoadingCallProduct ? (
                <div className="my-5">
                    <Row gutter={[16, 16]}>
                        {[...Array(4)].map((_, index) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={index}>
                                <Card hoverable style={{ minHeight: 350 }}>
                                    <Skeleton.Image style={{ width: '100%', height: 150, marginBottom: 16 }} />
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                
            ) : (
                <div className="max-w-[1400px] mx-auto bg-gray-50 p-5 my-5 rounded-[5px]">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                        So sánh sản phẩm
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="border border-gray-300 bg-white rounded-lg p-4 shadow-sm flex items-center justify-center">
                            <SVGCompare />
                        </div>
                    
                        {[0, 1, 2].map((index) => {
                            const result = dataCompare[index];
                            return (
                                <div
                                    key={index}
                                    className="border border-gray-300 bg-white rounded-lg shadow-sm"
                                >
                                    {result ? (
                                        <div className="p-4 pt-10 flex flex-col gap-3 h-full relative">
                                            <Link to={`/products/${result.id}`}>
                                                <div className="w-full flex justify-center">
                                                    <ImageWithFallback 
                                                        className="w-full h-[180px] object-contain" 
                                                        src={result.imageUrl}
                                                        alt={result.name}
                                                    />
                                                </div>
                                                <div className="text-sm space-y-1">
                                                    <p className="font-semibold text-gray-800 text-xl line-clamp-2">
                                                        {result.name}
                                                    </p>
                                                    <p className="text-orange-500">Online giá rẻ quá</p>
                                                    <p className="text-red-600 font-bold text-lg">
                                                        {result.originalPrice.toLocaleString()}
                                                    </p>
                                                    {result.isInFlashSale &&
                                                        <div className="flex gap-3">
                                                            <p className="text-gray-400 text-sm line-through">
                                                                {result.flashPrice.toLocaleString()} 
                                                                
                                                            </p>
                                                            <span className="text-green-600">
                                                                    - { (( result.originalPrice - result.flashPrice )/ result.originalPrice * 100).toFixed(0) } %
                                                                </span>
                                                        </div>
                                                    }
                                                    <p className="text-black">Số lượng: {result.availableQuantity}</p>
                                                    <p className="text-black">Đánh giá: ⭐ {result.rating}</p>
                                                    <p className="text-black">Đã bán: {result.soldQuantity ?? 0}</p>
                                                </div>
                                            </Link>
                                            {dataCompare.length > 1 &&
                                                <div className="absolute top-5 right-5 transform -translate-y-1/2 translate-x-1/2 cursor-pointer"
                                                    onClick={() => handleRemoveProduct(result.id)}
                                                >
                                                    <CloseCircleOutlined className="text-[25px]!"/>
                                                </div>
                                            }
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full p-6 hover:bg-gray-100 transition gap-2">
                                            <div className="flex flex-col items-center justify-centers p-6 gap-2 cursor-pointer"
                                                onClick={handleAddProductToCompare}
                                            >
                                                <div className="border border-dashed border-gray-400 w-20 h-20 flex items-center justify-center rounded-md">
                                                    <PlusOutlined className="text-2xl text-gray-500" />
                                                </div>
                                                <span className="mt-3 text-gray-600 text-sm font-medium">
                                                    Thêm sản phẩm
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-10">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">
                            Thông tin sản phẩm
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="border border-gray-300 bg-white rounded-lg p-4 shadow-sm flex items-center justify-center">
                                <SVGInformation />
                            </div>
                        
                            {dataCompare.slice(0,3).map((result, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="border border-gray-300 bg-white rounded-lg shadow-sm"
                                    >
                                        {result && (
                                            <div className="p-4 flex flex-col gap-3 h-full">
                                                <p><strong>- Tên sản phẩm</strong>: {result.name}</p>
                                                <p><strong>- Mô tả sản phẩm</strong>: {result.description}</p> 
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {isCompareProductVisible &&
                <div className="fixed inset-0 z-[9999]">
                    <div className="absolute inset-0 bg-black opacity-70"></div>

                    <div className="relative w-[600px] h-[500px] bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 rounded-[5px]">
                        <div className="flex gap-1 bg-white absolute -top-10 right-0 p-2 transform -translate-y-1/2 rounded-[5px] cursor-pointer"
                            onClick={() => setIsCompareProductVisible(false)}
                        >
                            <CloseOutlined />
                            Đóng
                        </div>
                        <div className="h-full p-5">
                            <div className="h-20 flex items-center border-gray-200 px-4 bg-white">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M3 9h18M3 13.5h18M3 18h18" />
                                        </svg>
                                        Chọn sản phẩm
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Chọn thêm sản phẩm để so sánh
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 overflow-y-auto h-[380px]">
                                {dataProductByCategory.map((items) => (
                                    <Card key={items.id} 
                                        className="bg-white rounded-lg shadow"
                                        hoverable
                                        onClick={() => handleAddProductNow(items)}
                                        >
                                        <ImageWithFallback 
                                            src={items.imageUrl}
                                            alt={items.name}
                                            className="w-full h-40 object-cover rounded-lg mb-2"
                                            />
                                            <p className="text-sm text-[#777]">Mã: {items.code}</p>
                                            <p className="text-[16px] font-bold text-[black] line-clamp-2">{items.name}</p>
                                        <div className="flex">
                                            <p className="text-[14px] font-bold line-clamp-2 text-gray-400 flex-1">Số lượng:{items.availableQuantity}</p>
                                            {items.availableQuantity === 0 &&
                                                <p className="text-red-600 font-bold">Hết hàng</p>
                                            }
                                        </div>
                                        <div className="flex gap-3 mt-2 min-h-10">
                                            <div className="flex-1">
                                            <div className='flex-1'>
                                                {items?.flashPrice ? (
                                                <>
                                                    {items?.originalPrice && (
                                                    <div className="text-gray-500 line-through text-[16px]">
                                                    {typeof items.originalPrice === 'number'
                                                        ? items.originalPrice.toLocaleString('vi-VN') + ' VNĐ'
                                                        : '0 VNĐ'}
                                                    </div>
                                                    )}
                                                    <div className="text-[#29A07E] text-[18px] font-bold">
                                                    {items.flashPrice.toLocaleString()} VNĐ
                                                    </div>
                                                </>
                                                ) : (
                                                <div className="text-[#29A07E] text-[18px] font-bold">
                                                    {items?.price?.toLocaleString()} VNĐ
                                                </div>
                                                )}
                                            </div>
                                            </div>
                                        </div>
                                       
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    );
};

export default Compare;