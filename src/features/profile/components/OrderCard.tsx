import {
    TruckOutlined
} from "@ant-design/icons";
import Img from '../../../assets/img_yt/1.jpg'
import { useEffect, useState } from "react";
import OrderCardSkeleton from "./OrderCardSkeleton";
const OrderCard = () => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        setTimeout(()=> {
            setIsLoading(false);
        }, 3000)
    },[])
    return(
        <>
            {isLoading ? (
                <OrderCardSkeleton />

            ) : (
                <>
                    <div className="bg-[#e9e6e6]">
                        <div className="border-b-[1px] border-dotted p-5 ">
                            <section className="">
                                <div className="pb-4 border-b-[1px] border-[#c0bfbf]">
                                    <section className="flex gap-4 justify-end">
                                        <div className="flex gap-1 text-[green]">
                                            <TruckOutlined className="text-[16px]!"/>
                                            <b>Giao hàng thành công</b>
                                        </div>
                                        <b className="bg-[#a1a0a0] w-[1px] h-5"></b>
                                        <b className="text-[#e12d2d]">ĐÁNH GIÁ</b>
                                    </section>
                                </div>
                                <div className="flex pt-4 gap-3">
                                    <section>
                                        <img className="w-25 h-25" src={Img} alt="LB" />
                                    </section>
                                    <section className="flex-1">
                                        <div className="flex flex-col gap-3">
                                            <b>Áo thun Msicrow unisex MONSTER X STREET phông tay lỡ nam nữ form rộng Local Brand</b>
                                            <p>Số lượng: 1</p>
                                        </div>
                                    </section>
                                    <section className="w-[200px] gap-2 text-center content-center flex justify-end">
                                        <span className="text-[12px] content-center"><del >199.000 VNĐ</del></span>

                                        <span className="text-[red] font-bold text-[18px] content-center">106.000 VNĐ</span>
                                    </section>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="bg-[#d2d2d2]">
                        <div className="p-5">
                            <section className="">
                                <div className="flex gap-4 py-3 justify-end">
                                    <b className="content-end">Thành tiền: </b>
                                    <b className="text-[20px]">70.000 VNĐ</b>
                                </div>
                                <div className="flex justify-end pb-5">
                                    <button className="bg-[#ee4d2d] text-[white] px-7 py-3 rounded-[3px]">Mua lại</button>
                                </div>
                            </section>
                        </div>
                    </div>
                </>
            )

            }
            
        </>
    )
}
export default OrderCard