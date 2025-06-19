import {
    UserOutlined
} from "@ant-design/icons"
import CommentFeedback from "./CommentFeedback";
import FormReply from "./FormReply";
const Feedback = () => {
    return(
        <div className="w-full flex gap-5">
            <section className="flex-2 flex flex-col gap-5">
                <div className="bg-[white] py-8 px-4 rounded-[5px]">
                    <nav className="flex gap-8">
                        <p className="hover:cursor-pointer text-[22px] font-bold text-[#29A07E] pb-[20px] border-b border-[#29A07E]">
                            ĐẶC ĐIỂM
                        </p>
                        <p className="hover:cursor-pointer text-[22px] font-bold hover:border-b hover:border-[#29A07E]">
                            ĐÁNH GIÁ
                        </p>
                    </nav>
                    <div className="h-[2px] w-full bg-[#f5f5f5]"></div>
                    <div className="pt-4">
                        <p>Đang cập nhật ... !</p>
                    </div>
                </div>
                <div className="bg-[white] py-4 px-4 rounded-[5px]">
                    <h1 className="text-[22px] font-bold py-5">ĐÁNH GIÁ VỀ SẢN PHẨM</h1>
                    <div className="h-[2px] w-full bg-[#f5f5f5]"></div>
                    <section className="pt-5 flex gap-3 px-5">
                        <div className="w-[150px]">
                            <div className="w-[70px] h-[70px] rounded-full bg-[#606060] opacity-25 text-center content-center">
                                <UserOutlined style={{color: "white",fontSize : 36}}/>
                            </div>
                        </div>
                        <div className="flex-1">
                            <FormReply />
                        </div>
                    </section>
                    <section>
                        <CommentFeedback />
                    </section>
                </div>
            </section>


            <section className="flex-1">
                <div className="bg-[white] py-8 px-4 rounded-[5px]">
                    <p className="text-[22px] font-bold pb-[20px] border-b border-[#29A07E]">
                        SẢN PHẨM TƯƠNG TỰ
                    </p>
                    <div className="h-[2px] w-full bg-[#f5f5f5]"></div>

                </div>
            </section>
        </div>
    )
}
export default Feedback;