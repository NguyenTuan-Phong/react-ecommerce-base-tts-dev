import {
    UserOutlined,
    StarOutlined
} from "@ant-design/icons"
import FormReply from "./FormReply";
import { useState } from "react";
const CommentFeedback = () => {
    const [isDisplay, setIsDisplay] = useState(false)
    const handleReply = () => {
        setIsDisplay(!isDisplay)
    }
    return (
        <div className="flex px-5 gap-3">
            <div className="w-[150px]">
                <div className="w-[70px] h-[70px] rounded-full bg-[#606060] opacity-25 text-center content-center">
                <UserOutlined style={{ color: "white", fontSize: 36 }} />
                </div>
            </div>
            <div className="flex-1 flex-col flex gap-3">
                <div className="flex gap-3">
                    <b>Thanh</b>
                    <div className="flex gap-1">
                        <StarOutlined />
                        <StarOutlined />
                        <StarOutlined />
                        <StarOutlined />
                        <StarOutlined />
                    </div>
                </div>
                <div>
                    <p>Xin chào. Tôi tên là Mark và tôi đến từ Trung Quốc.</p>
                    <p>Tôi là người ngay thẳng và tốt bụng. Tôi điều hành một nhà máy sản xuất miếng lót chuột lớn.</p> 
                    <p>Bạn có cần mua miếng lót chuột không? Giá cả rất ưu đãi. Nếu cần, chúng ta có thể nói chuyện. </p>
                    <p>Thông tin liên hệ Google Mail: （huang1880789@gmail.com） </p>
                    <p>Facebook Messenger：（https://m.me/61576626543144?source=qr_link_share）</p>
                    <p>WhatsApp: （+86 19875894090） </p>
                    <p>tên twitter: （huang38400）tên </p>
                    <p>instagram: （huangxiansheng3312）</p>
                    <p>tên pinterest: （huang1880789） </p>
                    <p>Liên kết Tik Tok: https://www.tiktok.com/@huangxiansheng86?is_from_webapp=1&sender_device=pc </p>
                    <p>Liên kết facebook: https://www.facebook.com/profile.php?id=61576626543144&mibextid=ZbWKwL</p>
                </div>
                <div className="flex gap-3">
                    <p>(27/5/2025)</p>
                    <div className="text-[blue] text-[16px] hover:cursor-pointer"
                    onClick={() => handleReply()}
                    >
                        Trả lời.
                    </div>
                </div>

                <div style={{ display : isDisplay ? "block" : "none"}}>
                    <FormReply />
                </div>
            </div>
        </div>
    );
};
export default CommentFeedback;
