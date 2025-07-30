import { Link } from "react-router-dom"
import p_kien from '../../../assets/img/04_Jul6bacdcd6a63d8b6a4e46c8337fc12342.png'
import loa from '../../../assets/img/04_Jula2b2fecb48c5967badfe4d137f8508ec.png'
import tan_nhiet from '../../../assets/img/04_Jul476c025120f6806e9d46a90f17cebbdf.png'
import mo_hinh from '../../../assets/img/04_Jul7f64f21fb6ba6d30b7932b6ad017b870.png'
import gaming from '../../../assets/img/04_Julbc98282e1bb9acf041f8c94b05ccdfcb.png'
import ban_ghe from '../../../assets/img/04_Jul58a3f59ace6732aceb452a6e387c0c20.png'
import banner_yeucau from '../../../assets/img/04_Jul4b2820f0c4fe29e2d289589b90e47f4c.png'
import banner_xuhuong from '../../../assets/img/09_Jul9860edbd0f637428e39fde95121313ed.png'
import {Carousel, Col, Row} from 'antd'
import CategoriesMenu from "./Menu"
  
const HomeBannerv2 = () => {

    return(
        <div className="banner h-auto"> 
            <Row gutter={[16, 16]}
                    className="max-w-[1400px] mx-auto relative max-h-[680px]"
                >
                <Col xs={0} lg={6} className="h-full rounded-[10px]"
                >
                    <CategoriesMenu />
                </Col>

                <Col xs={24} lg={18} className="h-full">

                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={18}>
                            <section className="w-full h-full object-cover relative overflow-hidden">
                                <Carousel
                                    autoplay
                                    autoplaySpeed={10000}
                                    dots={false}
                                    className="rounded-[20px]"
                                >
                                    <div>
                                    <Link to="">
                                        <img
                                        src={banner_yeucau}
                                        alt="Banner sản phẩm theo yêu cầu"
                                        className="w-full h-full object-cover rounded-[20px]"
                                        />
                                    </Link>
                                    </div>

                                    <div className="hidden lg:block">
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
                        </Col>

                        <Col xs={0} lg={6}>
                            <div className="flex flex-col gap-2 h-full">
                                <Link to="">
                                    <img src={mo_hinh} alt="Mô hình" />
                                </Link>
                                <Link to="">
                                    <img src={gaming} alt="Gaming" />
                                </Link>
                                <Link to="">
                                    <img src={ban_ghe} alt="Bàn ghế gaming" />
                                </Link>
                            </div>
                        </Col>
                    </Row>


                    <div className="hidden lg:block mt-4">
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                            <Link to="">
                                <div className="text-center">
                                <img src={p_kien} alt="Phụ kiện máy tính" />
                                </div>
                            </Link>
                            </Col>
                            <Col span={8}>
                            <Link to="">
                                <div className="text-center">
                                <img src={loa} alt="Loa" />
                                </div>
                            </Link>
                            </Col>
                            <Col span={8}>
                            <Link to="">
                                <div className="text-center">
                                <img src={tan_nhiet} alt="Tản Nhiệt" />
                                </div>
                            </Link>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default HomeBannerv2