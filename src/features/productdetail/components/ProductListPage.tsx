import { Carousel, Col, Row } from "antd";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import banner1 from '../../../assets/img/banner1.png';
import { filter} from "../../homepages/data/Filter";
import {danhMuc} from"../../homepages/data/Data_DanhMuc";

const ProductListPage = () => {
    const { id } = useParams<{ id?: string }>();
    const danhmucItem = danhMuc.find(item => item.id === Number(id));

    // Lấy dữ liệu danh mục filter theo id
    const filterItem = filter.find(item => item.id === Number(id));

  // State cho từng filter
    const [filterValues, setFilterValues] = useState<Record<number, string>>({});

    if (!filterItem) return null;

    const handleChange = (typeId: number, value: string) => {
        setFilterValues(prev => ({
        ...prev,
        [typeId]: value
        }));
    };


    // button nex prev
    // const [slice, setSlice] = useState(0);
    // const perPage = 5;
    // const maxSlice = Math.max(0, danhMuc?.length - perPage);

    // const handlePrev = () => setSlice(s => Math.max(0, s - 1));
    // const handleNext = () => setSlice(s => Math.min(maxSlice, s + 1));

    
    return (
        <div className="mt-5">
            <section className="flex gap-4 py-[20px]">
            <Link style={{color : 'black', fontWeight : 'bold'}} to={'/'}>
                TRANG CHỦ
            </Link>
            <p>/</p>
            <p className="font-bold">{filterItem.name}</p>
            </section>
            <Row
                gutter={[48, 48]}
                align="top"
                className=" relative overflow-hidden mb-5"
            >
            <Col xs={24} sm={24} md={7} lg={7}>
            <div className="bg-white p-4 rounded-xl">
            {filterItem && (
               <form className="space-y-4">
                    {filterItem.type.map(type => (
                        type.children && type.children.length > 0 && (
                        <div key={type.id} className="flex flex-col mb-4">
                            <label className="mb-1 font-semibold">{type.name}</label>
                            <div className="flex flex-col gap-1">
                                {type.children.map(child => (
                                <label key={child.id} className="flex items-center gap-2 font-normal">
                                    <input
                                    type="checkbox"
                                    value={child.name}
                                    checked={filterValues[type.id]?.includes(child.name) || false}
                                    onChange={() => handleChange(type.id, child.name)}
                                    />
                                    {child.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                        )
                    ))}
                </form>
            )}
            </div>
            </Col>
            <Col xs={24} sm={24} md={17} lg={17}>
            <section className="flex-3 w-[770px] h-full object-cover relative overflow-hidden">
                <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={10000}>
                    <div>
                        <Link to="">
                            <img
                                src={banner1}
                                className="w-full h-full object-cover rounded-[20px]"
                                alt="banner"
                            />
                        </Link>
                    </div>
                    <div>
                        <Link to="">
                            <img
                                src={banner1}
                                className="w-full h-full object-cover rounded-[20px]"
                                alt="banner"
                            />
                        </Link>
                    </div>
                </Carousel>
            </section>
            <div className=" mt-5">
                <h1 className="font-bold text-base">{filterItem.name}</h1>
                <div className="flex gap-3 mt-5 bg-[#e6f7dd] p-4 rounded-xl"> 
                    
                    {danhmucItem?.type.map(type => (
                    <div key={type.id} className="mb-4">
                        
                        <img
                        src={type.img}
                        alt={type.name}
                        style={{clipPath:'50%'}}
                        />
                    <p className="text-[12px] font-bold pb-2">
                        {type.name.toUpperCase()}
                    </p>
                    </div>
                ))}
                </div>
            </div> 
            </Col>
        </Row>
        </div>
    );
};

export default ProductListPage;