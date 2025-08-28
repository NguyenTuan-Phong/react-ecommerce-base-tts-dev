import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import TextReveal from "./TextReveal";
import robot from "../../assets/Robot/robot.lottie";
import Chat from "./Chat";
import { useState } from "react";
const AlAssistant = () => {
    const [isShowChat, setIsShowChat] = useState(false);
    const handleClick = () => {
        setIsShowChat(!isShowChat);
    };
    return (
        <div className="flex flex-col">
            {isShowChat ? (
                <Chat 
                    onClick={() => setIsShowChat(false)}
                />
            ) : (
                <div className="flex items-center justify-end">
                    <TextReveal text="Trợ Lý AI" interval={400} pause={600} />
                    <DotLottieReact
                        src={robot}
                        loop
                        autoplay
                        className="w-[110px] h-[110px] cursor-pointer"
                        onClick={handleClick}
                    />
                </div>
            ) }
            
            
        </div>
    )
}
export default AlAssistant;