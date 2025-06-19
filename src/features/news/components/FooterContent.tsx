import LED from '../../../assets/img_news_event/14-maxresdefault-2-711x400.jpg'
import PS24 from '../../../assets/img_news_event/ps4.jpg'
import BP from '../../../assets/img_news_event/lotchuot.jpg'
import {
    PlayCircleOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
const FooterContent = () => {
    return(
        <div className="max-w-[1400px] flex m-auto gap-5">
            <section className='flex-1 bg-[white] p-5 rounded-[8px] flex flex-col gap-4'>
                <div className="flex">
                    <h1 className="font-bold text-[24px] flex-1">TIN TỨC && SỰ KIỆN</h1>
                    <Link to={'/news'}>
                        <div className="border-[green] border py-3 px-5 rounded-3xl hover:cursor-pointer">
                            <p>Xem thêm</p>
                        </div>
                    </Link>
                    
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='grid grid-cols-2 gap-2'>
                        <img className='' src={LED} alt="LED" />
                        <div className='flex gap-1'>
                            <div className='flex flex-col gap-1 p-2 h-16! bg-[#29A07E] rounded-[5px] text-[white] text-center'>
                                <span>20.10</span>
                                <span className='text-[18px] font-bold'>2002</span>
                            </div>
                            <div className='font-bold'> 
                                CHẤT ! SIÊU CHẤT ! LED RGB CHẤT NHẤT BẠN TỪNG THẤY LUÔN !!
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <img className='' src={PS24} alt="LED" />
                        <div className='flex gap-1'>
                            <div className='flex flex-col gap-1 p-2 h-16! bg-[#29A07E] rounded-[5px] text-[white] text-center'>
                                <span>20.10</span>
                                <span className='text-[18px] font-bold  '>2002</span>
                            </div>
                            <div className='font-bold'> 
                                HƯỚNG DẪN KẾT NỐI TAY CẦM PS4 VỚI PC VÀ ĐIỆN THOẠI
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <img className='' src={BP} alt="LED" />
                        <div className='flex gap-1'>
                            <div className='flex flex-col gap-1 p-2 h-16! bg-[#29A07E] rounded-[5px] text-[white] text-center'>
                                <span>20.10</span>
                                <span className='text-[18px] font-bold  '>2002</span>
                            </div>
                            <div className='font-bold'> 
                                DỊCH VỤ IN LÓT CHUỘT THEO YÊU CẦU TẠI LẮC ĐẦU
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='flex-1 bg-[white] p-5 rounded-[8px] flex flex-col gap-4'>
                <div className="flex">
                    <h1 className="font-bold text-[24px] flex-1">YOUTUBE CHANNEL</h1>
                    <Link to={'/yt'}>
                        <div className="border-[green] border py-3 px-5 rounded-3xl hover:cursor-pointer">
                            <p>Xem thêm</p>
                        </div>
                    </Link>
                    
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='relative'>
                        <img className='rounded-[8px] hover:cursor-pointer' 
                        src={LED} alt="LED" />
                        
                        <div className='absolute top-1/2 left-1/2 transform -translate-1/2 hover:cursor-pointer'>
                            <PlayCircleOutlined className='text-[80px] text-[#29A07E]!'/>
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex-1 relative'>
                            <img className='rounded-[8px] hover:cursor-pointer' src={PS24} alt="PS24" />
                            <p className='font-bold text-center pt-5'>TTS CODEC</p>
                            <div className='absolute top-1/3 left-1/2 transform -translate-1/2 hover:cursor-pointer'>
                                <PlayCircleOutlined className='text-[60px] text-[#29A07E]!'/>
                            </div>
                        </div>
                        <div className='flex-1 hover:cursor-pointer relative'>
                            <img className='rounded-[8px]' src={BP} alt="BP" />
                            <div className='absolute top-1/2 left-1/2 transform -translate-1/2 hover:cursor-pointer'>
                                <PlayCircleOutlined className='text-[70px] text-[#29A07E]!'/>
                            </div>
                        </div>
                    </div>
                </div>   
            </section>
        </div>
    )
}
export default FooterContent