
import { useState } from "react";
import {
    MessageFilled
} from "@ant-design/icons"
import ChatBox from "./ChatBox";
const ChatRealTime = () => {
    const [isShowChat, setIsShowChat] = useState(false);
    const handleClick = () => {
        setIsShowChat(!isShowChat);
    };
    return (
        <div className="flex flex-col">
            {isShowChat ? (
                <div>
                    <ChatBox userId="user_abc" 
                        onClick={() => setIsShowChat(false)}
                    />
                </div>
            ) : (
                <div className=" bg-[#29a07e] w-16 h-16 p-3 flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform">
                    <MessageFilled 
                    style={{ fontSize: '28px', color: 'white' }} 
                    onClick={handleClick}
                    />
                </div>
            ) }
            
            
        </div>
    )
}
export default ChatRealTime;