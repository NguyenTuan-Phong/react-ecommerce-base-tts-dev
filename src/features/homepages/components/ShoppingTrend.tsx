import ban_phim from '../../../assets/img/1.png'
import {
    RightOutlined
} from "@ant-design/icons"
import { Link } from 'react-router-dom'


const ShoppingTrend = () => {
    return(
        <div className="max-w-[1400px] mx-auto bg-gradient-to-l from-[#FFC34E] to-[#FF8B49] rounded-xl ">
            <h1 className="text-center font-bold text-[white] text-[28px] py-6">XU HƯỚNG MUA SẮM</h1>
            <div className="flex gap-3 p-4">
                <div className="flex-1 bg-[white] rounded-[8px] p-3">
                    <img src={ban_phim} alt="Bàn phím" />
                    <Link to={'/'}>
                        <div className='flex mt-5 text-[20px] hover:cursor-pointer'>
                            <div className='flex-1'>
                                <p>Bàn phím Gaming</p>
                                <p className='text-[#29A07E]'>Giảm đến 30%</p>
                            </div>
                            <div className='rounded-full bg-[#F5F5F5] w-[50px] h-[50px] content-center text-center 
                            hover:shadow-md hover:shadow-gray-500 duration-200'>
                                <RightOutlined />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex-1 bg-[white] rounded-[8px] p-3">
                    <img src={ban_phim} alt="Bàn phím" />
                    <Link to={'/'}>
                        <div className='flex mt-5 text-[20px] hover:cursor-pointer'>
                            <div className='flex-1'>
                                <p>Chuột Gaming</p>
                                <p className='text-[#29A07E]'>Ưu đãi chỉ từ 100k</p>
                            </div>
                            <div className='rounded-full bg-[#F5F5F5] w-[50px] h-[50px] content-center text-center 
                            hover:shadow-md hover:shadow-gray-500 duration-200'>
                                <RightOutlined />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex-1 bg-[white] rounded-[8px] p-3">
                    <img src={ban_phim} alt="Bàn phím" />
                    <Link to={'/'}>
                        <div className='flex mt-5 text-[20px] hover:cursor-pointer'>
                            <div className='flex-1'>
                                <p>Tai nghe Gaming</p>
                                <p className='text-[#29A07E]'>Ưu đãi chỉ từ 100k</p>
                            </div>
                            <div className='rounded-full bg-[#F5F5F5] w-[50px] h-[50px] content-center text-center 
                            hover:shadow-md hover:shadow-gray-500 duration-200'>
                                <RightOutlined />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex-1 bg-[white] rounded-[8px] p-3">
                    <img src={ban_phim} alt="Bàn phím" />
                    <Link to={'/'}>
                        <div className='flex mt-5 text-[20px] hover:cursor-pointer'>
                            <div className='flex-1'>
                                <p>Loa Gaming</p>
                                <p className='text-[#29A07E]'>Giảm đến 40%</p>
                            </div>
                            <div className='rounded-full bg-[#F5F5F5] w-[50px] h-[50px] content-center text-center 
                            hover:shadow-md hover:shadow-gray-500 duration-200'>
                                <RightOutlined />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default ShoppingTrend