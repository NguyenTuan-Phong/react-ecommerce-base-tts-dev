export interface YoutubeVideo {
    id: number;
    title: string;
    image: string;
    videoUrl: string;
    date: string;
    description?: string;
}

export const youtubeChanelVideos: YoutubeVideo[] = [
    {
        id: 1,
        title: "CHẤT! SIÊU CHẤT! LED RGB CHẤT NHẤT BẠN TỪNG THẤY LUÔN!!",
        image: "../assets/img_yt/1.jpg", 
        videoUrl: "https://www.youtube.com/watch?v=xxxxxxx1",
        date: "02-07-2022, 11:22 am",
        description: "Bàn phím cơ LED RGB cực đỉnh, nổi bật với dàn setup gaming."
    },
    {
        id: 2,
        title: "LOA SH39 VỚI NÚT BẤM BẰNG PHÍM CƠ SIÊU ĐỘC LẠ",
        image: "../../../assets/img_yt/1.jpg",
        videoUrl: "https://www.youtube.com/watch?v=xxxxxxx2",
        date: "30-06-2022, 10:41 am",
        description: "Trải nghiệm loa SH39 đầy sáng tạo với nút bấm cơ học."
    },
    {
        id: 3,
        title: "BỘ THANH LED RGB NHÁY THEO NHẠC ĐIỆN ĐẢO",
        image: "../../../assets/img_yt/1.jpg",
        videoUrl: "https://www.youtube.com/watch?v=xxxxxxx3",
        date: "22-11-2023, 5:09 pm",
        description: "Review hệ thống LED RGB nháy theo nhạc cực chất cho góc máy tính."
    },
    {
        id: 4,
        title: "ĐỒNG HỒ LED TÍCH HỢP LOA BASS - REVIEW VÀ HƯỚNG DẪN SỬ DỤNG",
        image: "../../../assets/img_yt/1.jpg",
        videoUrl: "https://www.youtube.com/watch?v=xxxxxxx4",
        date: "22-11-2023, 4:59 pm",
        description: "Chi tiết đồng hồ LED tích hợp loa bass và hướng dẫn sử dụng."
    },
    {
        id: 5,
        title: "DÂY LED RGB QUANH PHÒNG SẼ RA SAO??",
        image: "../../../assets/img_yt/1.jpg",
        videoUrl: "https://www.youtube.com/watch?v=xxxxxxx5",
        date: "22-11-2023, 4:59 pm",
        description: "Trang trí phòng với dây LED RGB, hiệu ứng đẹp mắt & dễ lắp đặt."
    },
    {
        id: 6,
        title: "QUẢ CẦU LED 3D ĐỘC ĐÁO, REVIEW SẢN PHẨM HOT",
        image: "../../../assets/img_yt/1.jpg",
        videoUrl: "https://www.youtube.com/watch?v=xxxxxxx6",
        date: "22-11-2023, 4:59 pm",
        description: "Khám phá quả cầu LED 3D nhiều màu sắc, tạo điểm nhấn cho bàn làm việc."
    }
];