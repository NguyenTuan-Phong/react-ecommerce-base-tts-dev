import ban_phim from '../../../assets/img/1.png'
import {
    RightOutlined
} from "@ant-design/icons"
import { Link } from 'react-router-dom'
import { useGetCategory } from '../hook/useGetCategory'
import SkeletonCategory from '../../../components/product/SkeletonCategory'


const ShoppingTrend = () => {


    const {
        isPendingGetCategory,
        ResponseGetCategory
    } = useGetCategory();
   if (!ResponseGetCategory?.data) return null; 

    const data = ResponseGetCategory.data.slice(0, 4);

    return(
        <div className="max-w-[1400px] mx-auto bg-gradient-to-l from-[#FFC34E] to-[#FF8B49] rounded-xl ">
            <h1 className="text-center font-bold text-[white] text-[28px] py-6">XU HƯỚNG MUA SẮM</h1>
            {isPendingGetCategory ? (
                <div>
                    <SkeletonCategory />
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 p-3">
                    {data.map((i) => (
                        <div key={i.id} className="flex-1 bg-[white] rounded-[8px] p-3">
                            <img src={ban_phim} alt="Bàn phím" />
                            <Link to={`/category/${i.id}`}   >
                                <div className='flex mt-5 text-[20px] hover:cursor-pointer'>
                                    <div className='flex-1'>
                                        <p>{i.name}</p>
                                        <p className='text-[#29A07E]'>Giảm đến 30%</p>
                                    </div>
                                    <div className='rounded-full bg-[#F5F5F5] w-[50px] h-[50px] content-center text-center 
                                    hover:shadow-md hover:shadow-gray-500 duration-200'>
                                        <RightOutlined />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    )
}
export default ShoppingTrend