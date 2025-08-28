import { Link } from "react-router-dom"
import banner_pc from '../../../../public/images/baner_pc.png'
import banner_sale from '../../../../public/images/sale.png'
import { Carousel } from 'antd'
import ImageWithFallback from "../../../components/img/ImageWithFallback"

const HomeBannerv2 = () => {

    return(
            <div className="banner h-auto mx-auto max-h-[680px]">

                    <div className="w-full">
                        <Carousel autoplay autoplaySpeed={10000}>
                            <div className="relative group">
                                <Link to="/pc">
                                    <ImageWithFallback
                                    src={banner_pc}
                                    className="w-full h-full max-h-[680px] rounded-[10px]"
                                    alt="Ưu đãi Gaming PC SUPER Sale"
                                    />
                                </Link>
                                <div className="absolute inset-0 z-10 bg-black/30 opacity-0 group-hover:opacity-100 
                                                transition-opacity duration-300 rounded-[10px]" />
                                <div className="absolute bottom-1/2 left-4 z-20 text-white transition-opacity duration-300 
                                                opacity-0 group-hover:opacity-100 transform translate-y-1/2 hidden sm:block">
                                    <div className="text-white">
                                        <div className="sale-badge inline-block px-4 py-2 rounded-full text-white font-bold text-sm mb-4 bg-red-600 animate-pulse">
                                        🔥 SUPER SALE
                                        </div>
                                        <h2 className="text-4xl font-bold mb-2">Gaming PC</h2>
                                        <p className="text-xl mb-4">Giảm đến 50%</p>
                                        <p className="text-lg opacity-90">Cấu hình khủng - Giá siêu hời</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-1/2 right-4 z-20 text-white transition-opacity duration-300 
                                                opacity-0 group-hover:opacity-100 transform translate-y-1/2 hidden sm:block">
                                    <div className="text-white text-right">
                                        <div className="text-6xl font-bold">50%</div>
                                        <div className="text-xl">OFF</div>
                                    </div>
                                </div>
                                
                                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                    <div className="text-center text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
                                        <h3 className="text-2xl font-bold mb-2">🎮 Gaming PC Sale</h3>
                                        <p className="text-lg mb-4">
                                            Khám phá bộ sưu tập PC Gaming với giá ưu đãi
                                        </p>
                                        <div className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors cursor-pointer inline-block">
                                            <Link to={'/product-sale'}>
                                                Khám phá →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <Link to="/sale">
                                    <ImageWithFallback
                                    src={banner_sale}
                                    className="w-full h-full max-h-[680px] rounded-[10px]"
                                    alt="Khuyến mãi HOT"
                                    />
                                </Link>
                                <div className="absolute inset-0 z-10 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[10px]" />
                                <div className="absolute bottom-1/2 left-4 z-20 text-white transition-opacity duration-300 
                                                opacity-0 group-hover:opacity-100 transform translate-y-1/2 hidden sm:block">
                                    <div className="text-white">
                                        <div className="bg-yellow-400 inline-block px-4 py-2 rounded-full text-black font-bold text-sm mb-4 animate-bounce">
                                            ⏰ FLASH SALE
                                        </div>
                                        <h2 className="text-4xl font-bold mb-2">Giờ Vàng</h2>
                                        <p className="text-xl mb-4">Chỉ trong 24h</p>
                                        <p className="text-lg opacity-90">Giảm sốc - Số lượng có hạn</p>
                                    </div>
                                    <div className="text-white text-right">
                                        <div className="text-5xl font-bold">24H</div>
                                        <div className="text-xl">ONLY</div>
                                    </div>
                                </div>
                                <div className="absolute bottom-1/2 right-4 z-20 text-white transition-opacity duration-300 
                                                opacity-0 group-hover:opacity-100 transform translate-y-1/2 hidden sm:block">
                                     <div className="text-white text-right">
                                        <div className="text-5xl font-bold">24H</div>
                                        <div className="text-xl">ONLY</div>
                                    </div>
                                </div>

                                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                    <div className="text-center text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
                                        <h3 className="text-2xl font-bold mb-2">💻 Combo Setup Hoàn Hảo</h3>
                                        <p className="text-lg mb-4">
                                            Bộ combo PC + màn hình + phụ kiện với giá ưu đãi
                                        </p>
                                        <div className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors cursor-pointer inline-block">
                                            
                                            <Link to={'/product-sale'}>
                                                Khám phá →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <Link to="/sale">
                                    <ImageWithFallback
                                    src={banner_sale}
                                    className="w-full h-full max-h-[680px] rounded-[10px]"
                                    alt="Khuyến mãi HOT"
                                    />
                                </Link>
                                <div className="absolute inset-0 z-10 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[10px]" />
                                <div className="absolute bottom-1/2 left-4 z-20 text-white transition-opacity duration-300 
                                                opacity-0 group-hover:opacity-100 transform translate-y-1/2 hidden sm:block">
                                    <div className="text-white">
                                        <div className="bg-yellow-500 inline-block px-4 py-2 rounded-full text-black font-bold text-sm mb-4">
                                            ⚡ COMBO HOT
                                        </div>
                                        <h2 className="text-4xl font-bold mb-2">Combo Setup</h2>
                                        <p className="text-lg opacity-90">Tiết kiệm đến 2 triệu</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-1/2 right-4 z-20 text-white transition-opacity duration-300 
                                                opacity-0 group-hover:opacity-100 transform translate-y-1/2 hidden sm:block">
                                    <div className="text-white text-right">
                                        <div className="text-4xl font-bold">COMBO</div>
                                        <div className="text-xl">DEAL</div>
                                    </div>
                                </div>

                                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                    <div className="text-center text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
                                        <h3 className="text-2xl font-bold mb-2">💻 Combo Setup Hoàn Hảo</h3>
                                        <p className="text-lg mb-4">
                                            Bộ combo PC + màn hình + phụ kiện với giá ưu đãi
                                        </p>
                                        <div className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors cursor-pointer inline-block">
                                            <Link to={'/combo-product-page'}>
                                                Khám phá →
                                            </Link>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>

                {/* </div> */}
            </div>

    )
}
export default HomeBannerv2