import { useEffect, useState } from "react";

const Time = () => {
    const [time, setTime] = useState(new Date());
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-cente">
            <div className="bg-white shadow-lg rounded-[5px] p-6 flex flex-col sm:flex-row gap-4 items-center text-center sm:text-left border-gray-200 border w-[400px]">
                <div className="text-gray-700 text-lg font-semibold">
                📅 Ngày: <span className="text-blue-600">{day}-{month}-{year}</span>
                </div>
                <div className="text-gray-700 text-lg font-semibold">
                ⏰ Giờ: <span className="text-green-600">{time.toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
};

export default Time;