import {
    AliyunOutlined,
    MinusSquareOutlined,
    ApartmentOutlined,
    ProductOutlined,
    HourglassOutlined,
    AudioOutlined,
    QrcodeOutlined,
}  from "@ant-design/icons";
import { Link } from "react-router-dom";
const data_DanhMuc = [
        {
        id: 1,
        name: "Lót Chuột",
        icon: <AliyunOutlined />,
        children: [
            { id: 101, name: "Lót Chuột Cỡ Nhỏ" },
            { id: 102, name: "Lót Chuột RGB" },
            { id: 103, name: "Lót Chuột Custom" },
        ],
        },
        {
        id: 2,
        name: "Gaming Gear",
        icon: <ApartmentOutlined />,
        children: [
            { id: 201, name: "Tai Nghe Gaming" },
            { id: 202, name: "Chuột Gaming" },
            { id: 203, name: "Bàn Phím Cơ" },
        ],
        },
        {
        id: 3,
        name: "Phụ Kiện Máy Tính",
        icon: <MinusSquareOutlined />,
        children: [
            { id: 301, name: "Giá Đỡ Laptop" },
            { id: 302, name: "Quạt Tản Nhiệt" },
            { id: 303, name: "Balo, Túi Đựng" },
        ],
        },
        {
        id: 4,
        name: "Mô Hình",
        icon: <ProductOutlined />,
        children: [
            { id: 401, name: "Mô Hình Anime" },
            { id: 402, name: "Mô Hình Game" },
            { id: 403, name: "Mô Hình Chibi" },
        ],
        },
        {
        id: 5,
        name: "Phụ Kiện Trang Trí",
        icon: <HourglassOutlined />,
        children: [
            { id: 501, name: "Đèn LED Decor" },
            { id: 502, name: "Giá Treo Tai Nghe" },
            { id: 503, name: "Sticker & Poster" },
        ],
        },
        {
        id: 6,
        name: "Loa, Micro, Webcam",
        icon: <AudioOutlined />,
        children: [
            { id: 601, name: "Micro Thu Âm" },
            { id: 602, name: "Loa Bluetooth" },
            { id: 603, name: "Webcam Full HD" },
        ],
        },
        {
        id: 7,
        name: "Ghế Gaming",
        icon: <AliyunOutlined />,
        children: [
            { id: 701, name: "Ghế Ergonomic" },
            { id: 702, name: "Ghế Chơi Game RGB" },
        ],
        },
        {
        id: 8,
        name: "Bàn Gaming",
        icon: <QrcodeOutlined />,
        children: [
            { id: 801, name: "Bàn Gaming LED" },
            { id: 802, name: "Bàn 2 Tầng" },
            { id: 803, name: "Bàn Có Kệ Màn Hình" },
        ],
        },
        {
        id: 9,
        name: "Phụ Kiện Điện Thoại",
        icon: null,
        children: [
            { id: 901, name: "Ốp Lưng" },
            { id: 902, name: "Cáp Sạc" },
            { id: 903, name: "Giá Đỡ Điện Thoại" },
        ],
        },
        {
        id: 10,
        name: "Linh Kiện Máy Tính",
        icon: null,
        children: [
            { id: 1001, name: "RAM Máy Tính" },
            { id: 1002, name: "Ổ Cứng SSD" },
            { id: 1003, name: "Card Màn Hình" },
        ],
        },
        {
        id: 11,
        name: "Combo Ưu Đãi",
        icon: null,
        children: [
            { id: 1101, name: "Combo Chuột + Lót" },
            { id: 1102, name: "Combo Phím + Tai Nghe" },
        ],
        },
    ];
const Menuv2 = () => {
    
    return (
        <div className="relative flex-1 h-[684px] w-[348px] grid grid-rows-11 text-[20px] rounded-[20px] bg-white">
        {data_DanhMuc.map((item) => (
            <div key={item.id} className="group">
            <Link to={""} style={{ color: "black" }}>
                <div className="hover:bg-[#22a085] h-full flex gap-4 items-center hover:text-white pl-[20px]">
                <div className="text-[16px] w-[40px]">{item?.icon}</div>
                <p>{item.name}</p>
                </div>
            </Link>

            {item.children && (
                <div
                className="hidden group-hover:grid grid-cols-4 gap-2 bg-white w-[1052px] h-[682px]
                                        rounded-[20px] shadow-xl absolute z-100 left-full top-0">
                {item.children.map((child) => (
                    <div key={child.id} className="p-5">
                    <p className="text-[16px] text-[#29A07E] hover:cursor-pointer pb-2">
                        {child.name.toLocaleUpperCase()}
                    </p>
                    </div>
                ))}
                </div>
            )}
            </div>
        ))}
        </div>
    );
};
export default Menuv2;
