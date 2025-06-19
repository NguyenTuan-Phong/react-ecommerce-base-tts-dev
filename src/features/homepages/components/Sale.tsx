import back_ground from '../../../assets/img/home-bg-collection.png'
import san_pham from '../../../assets/img/250-3435-3.jpg'
import { Link } from 'react-router-dom'
import {dataSale} from '../data/Data_Sale'
import {
    ShoppingCartOutlined,
    CaretLeftOutlined,
    CaretRightOutlined
} from '@ant-design/icons'
import { Card } from 'antd'
import { toast} from 'react-toastify'
import { useState, useEffect } from 'react'
const Sale = () => {
    const [index, setIndex] = useState(0);
    const maxIndex = dataSale.length - 5

    const goNext = () => {
        if(index + 5 < dataSale.length) {
            setIndex(index + 1);
        }
    }
    const goPrev = () => {
        if(index > 0 ) {
            setIndex(index - 1);
        }
    }
    useEffect(() => {
        const timeNext = setTimeout(() =>{
            if (index + 5 < dataSale.length) {
                goNext();
            } else {
                setIndex(0)
            }
        },10000)
        return () => clearTimeout(timeNext);
    },[index])

    const notify = () => toast.success("Thêm vào giỏ hàng thành công!");
    
    return(
        <div className="max-w-[1400px] mx-auto bg-cover rounded-[8px] pb-3"
        style={{ background: `url(${back_ground})` , backgroundRepeat : 'no-repeat', border: '8px'}}
        >
            <h1 className='text-[white] text-[24px] font-bold text-center p-5'>SIÊU SALE XỊN 6G "GỒNG GANH_GIẢM GẮT_ GIÁ GỐC"</h1>
            <div className='flex'>
                <div className='flex-1'></div>
                <div className='flex gap-5'>
                    <Link style={{color : 'white'}} to={'/'}>
                        PHỤ KIỆN TRANG TRÍ
                    </Link>
                    <div className='h-6 w-[1px] bg-[white]'></div>
                    <Link style={{color : 'white'}} to={'/'}>
                        GAMING GEAR
                    </Link>
                    <div className='h-6 w-[1px] bg-[white]'></div>
                    <Link style={{color : 'white'}} to={'/'}>
                        MÔ HÌNH
                    </Link>
                    <div className='h-6 w-[1px] bg-[white]'></div>
                    <Link style={{color : 'white'}} to={'/'}>
                        QUẠT TẢN NHIỆT
                    </Link>
                    <div className='h-6 w-[1px] bg-[white]'></div>
                    <Link style={{color : 'white'}} to={'/'}>
                        GHẾ GAMING
                    </Link>
                </div>
                <div className='flex-1'></div>
            </div> 
            
            <div className={`flex overflow-hidden p-3 max-w-[1400px] relative transition-transform duration-300 ease-in-out`}
                
            >
                <div className='gap-4 grid grid-cols-5 pt-5'
                >
                    {dataSale.slice(index, index + 5).map((item) => (
                        <Card
                        key={item.id}
                        className="flex flex-col p-0 bg-white rounded-[8px] flex-shrink-0"
                        hoverable
                        style={{ borderRadius: 8 }}
                        cover={
                            <img
                            className='rounded-[8px] hover:cursor-pointer'
                            src={san_pham}
                            alt="Sản phẩm"
                            />
                        }
                        >
                            <Link 
                                to={`/products/${item.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                                className="block"
                            >
                                <div className='flex pt-4 pb-2'>
                                <p className='flex-1 text-[#777]'>Mã : {item.code}</p>
                                <p className={`${item.status === "Còn hàng" ? "text-[#22a085]" : "text-red-500"}`}>{item.status}</p>
                                </div>
                                <b className='block line-clamp-2 hover:cursor-pointer hover:text-[#29A07E] w-[234px] truncate'>{item.name}</b>
                            </Link> 
                            <div className='flex'>
                                <div className='flex-1'>
                                    <p className='text-[#888] line-through'>{item.originalPrice.toLocaleString()} VNĐ</p>
                                    <div className='text-[#29A07E] text-[18px] font-bold'>{item.price.toLocaleString()} VNĐ</div>
                                </div>
                            
                                <button
                                    className="bg-[#e5f8ee] hover:bg-[#22a085] hover:text-white text-[#22a085] hover:cursor-pointer rounded-full w-10 h-10 flex items-center justify-center"
                                    disabled={item.status !== "Còn hàng"}
                                    onClick={notify}
                                >
                                    <ShoppingCartOutlined/>
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>

                <button className={`w-10 h-10 bg-[#bbb9b9] rounded-full text-center content-center
                    absolute top-1/2 left-0 -translate-y-1/2 z-10 hover:bg-[#29A07E] ${index === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={index === 0}
                    onClick={goPrev}
                >
                    <CaretLeftOutlined />
                </button>  

                <button className={`w-10 h-10 bg-[#bbb9b9] rounded-full text-center content-center
                    absolute right-0 top-1/2 -translate-y-1/2 z-10 hover:bg-[#29A07E] ${index === maxIndex ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={goNext}
                    disabled={index === maxIndex}
                >
                    <CaretRightOutlined />
                </button>
            </div> 
            <div className="">
                <div className='mx-auto w-[140px] h-[50px] border border-white text-center rounded-[999px]
                hover:bg-[white] hover:cursor-pointer font-blod text-[18px] content-center'>
                    Xem thêm
                </div>
            </div>
        </div>
    )
}
export default Sale