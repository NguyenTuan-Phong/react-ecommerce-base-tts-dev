import { Link } from "react-router-dom"
import p_kien from '../../../assets/img/04_Jul6bacdcd6a63d8b6a4e46c8337fc12342.png'
import loa from '../../../assets/img/04_Jula2b2fecb48c5967badfe4d137f8508ec.png'
import tan_nhiet from '../../../assets/img/04_Jul476c025120f6806e9d46a90f17cebbdf.png'
import mo_hinh from '../../../assets/img/04_Jul7f64f21fb6ba6d30b7932b6ad017b870.png'
import gaming from '../../../assets/img/04_Julbc98282e1bb9acf041f8c94b05ccdfcb.png'
import ban_ghe from '../../../assets/img/04_Jul58a3f59ace6732aceb452a6e387c0c20.png'
import banner_yeucau from '../../../assets/img/04_Jul4b2820f0c4fe29e2d289589b90e47f4c.png'
import banner_xuhuong from '../../../assets/img/09_Jul9860edbd0f637428e39fde95121313ed.png'
import { useEffect } from "react"
import {
    AliyunOutlined,
    MinusSquareOutlined,
    ApartmentOutlined,
    ProductOutlined,
    HourglassOutlined,
    AudioOutlined,
    QrcodeOutlined
} from '@ant-design/icons'
import { useState } from "react"
import { danhMuc, type DanhMucItem } from "../data/Data_DanhMuc"
import {Carousel} from 'antd'
const HomeBanner = () => {
    const [hoverId,setHoverId] = useState<number | null>(null);
    const [isfilter, setFilter] = useState< DanhMucItem | null>(null);
    
    const data_DanhMuc = [
        {
            id: 1,
            name: "Lót Chuột",
            icon: <AliyunOutlined />
        },
        {
            id: 2,
            name: "Gaming Gear",
            icon: <ApartmentOutlined />
        },
        {
            id: 3,
            name: "Phụ Kiện Máy Tính",
            icon: <MinusSquareOutlined />
        },
        {
            id: 4,
            name: "Mô Hình",
            icon: <ProductOutlined />
        },
        {
            id: 5,
            name: "Phụ Kiện Trang Trí",
            icon: <HourglassOutlined />
        },
        {
            id: 6,
            name: "Loa, Micro, Webcam",
            icon: <AudioOutlined />
        },
        {
            id: 7,
            name: "Ghế Gaming",
            icon: <AliyunOutlined />
        },
        {
            id: 8,
            name: "Bàn Gaming",
            icon: <QrcodeOutlined />
        },
        {
            id: 9,
            name: "Phụ Kiện Điện Thoại",
            icon: null
        },
        {
            id: 10,
            name: "Linh Kiện Máy Tính",
            icon: null
        },
        {
            id: 11,
            name: "Combo Ưu Đãi",
            icon: null
        }
    ]

    useEffect(() => {
        const filter_danhMuc = danhMuc.find( item => item.id === hoverId)
        if(filter_danhMuc) {
            setFilter(filter_danhMuc)
        } else {
            setFilter(null)
        }
    },[hoverId])

    return(
        <div className="banner">
            <div className={`max-w-[1400px] mx-auto flex ${!hoverId && "gap-5"}`} >
                <div className="flex-1 h-[684px] grid grid-row-11 text-[20px] rounded-[20px]
                bg-[white]
                ">
                    {data_DanhMuc.map((item) => (
                        <Link 
                        style={{color: 'black'}} 
                        to={`/category/${item.id}`}     
                        key={item.id} 
                        className="flex-1"
                        onMouseEnter={() => setHoverId(item.id)}
                        onMouseLeave={() => setHoverId(null)}
                        >
                            <div className="hover:bg-[#22a085] h-full flex gap-4 items-center hover:text-[white] pl-[20px]">
                                <div className="text-[16px] w-[40px]">{item?.icon}</div>
                                <p>{item.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={`flex-3 grid grid-cols-4 gap-2 bg-[white] rounded-[20px] ${!hoverId && "hidden"} shadow-xl`}
                    onMouseEnter={() => setHoverId(hoverId)}
                    onMouseLeave={() => setHoverId(null)}
                >
                    {isfilter?.type.map((item) => (
                        <div className="p-5" key={item.id}>
                            <p className="text-[16px] text-[#29A07E] hover:cursor-pointer pb-2">{item.name.toLocaleUpperCase()}</p>
                            {item.children?.map((i) => (
                                <div className="flex flex-col gap-2 hover:cursor-pointer hover:text-[#29A07E]"  key={i.id}>
                                    {i.name.toLocaleUpperCase()}
                                </div>
                            ))}
                        </div>
                            
                    ))}
                </div>
                <div className={`flex-3 flex flex-col gap-2 ${hoverId && "hidden"}`}>
                    <div className="flex gap-2 ">
                        <section className="flex-3 w-[770px] h-full object-cover relative overflow-hidden">
                            <Carousel autoplay={{dotDuration : true}} autoplaySpeed={10000}>
                                <div>
                                    <Link to="">
                                        <img
                                            src={banner_yeucau}
                                            alt="Banner sản phẩm theo yêu cầu"
                                            className="w-full h-full object-cover rounded-[20px]"
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/">
                                        <img
                                            src={banner_xuhuong}
                                            alt="Banner sản phẩm xu hướng"
                                            className="w-full h-full object-cover rounded-[20px]"
                                        />
                                    </Link>
                                </div>
                            </Carousel>
                        </section>
                        <section className="flex gap-2 flex-col flex-1">
                            <Link to={''}>
                                <img src={mo_hinh} alt="Mô hình" />
                            </Link>
                            <Link to={''}>
                                <img src={gaming} alt="Gaming" />
                            </Link>
                            <Link to={''}>
                                <img src={ban_ghe} alt="Bàn ghế gaming" />
                            </Link>
                        </section>
                    </div>
                    <div className="grid grid-cols-3 gap-4 col-span-1">
                        <Link to="">
                            <div className="text-center">
                                <img src={p_kien} 
                                alt="Phụ kiện máy tính" />
                            </div>
                        </Link>
                        <Link to="">
                            <div className="text-center">
                                <img src={loa} 
                                alt="Loa" />
                            </div>
                        </Link>
                        <Link to="">
                            <div className="text-center">
                                <img src={tan_nhiet} 
                                alt="Tản Nhiệt" />
                            </div>
                        </Link>
                    </div>

                </div>
                
            </div>
        </div>
    )
}
export default HomeBanner