export interface BlogPost {
    id: number;
    title: string;
    image: string;
    date: string;
    excerpt?: string;
    url: string;
    views?: number;
    comments?: number;
}

export const latestPosts: BlogPost[] = [
    {
        id: 1,
        title: "CHẤT! SIÊU CHẤT! LED RGB CHẤT NHẤT BẠN TỪNG THẤY LUÔN!!",
        image: "/assets/news/banphim-led.jpg", // Thay đường dẫn phù hợp
        date: "02-07-2022, 11:22 am",
        excerpt: "BÀN PHÍM CƠ LED ĐỈNH NHẤT",
        url: "/tin-tuc/ban-phim-co-led-dinh-nhat",
        views: 5541,
        comments: 0,
    },
    {
        id: 2,
        title: "TÌM HIỂU VỀ CÁC LOẠI PLATE TRÊN BÀN PHÍM CƠ",
        image: "/assets/news/plate-banphim.jpg",
        date: "30-06-2022, 10:41 am",
        url: "/tin-tuc/plate-ban-phim-co",
    },
    {
        id: 3,
        title: "LOA SH39 VỚI NÚT BẤM BẰNG PHÍM CƠ SIÊU ĐỘC LẠ",
        image: "/assets/news/loa-sh39.jpg",
        date: "22-11-2023, 5:09 pm",
        url: "/tin-tuc/loa-sh39",
    },
    {
        id: 4,
        title: "BỘ THANH LED RGB NHÁY THEO NHẠC ĐIỆN ĐẢO",
        image: "/assets/news/thanh-led-rgb.jpg",
        date: "22-11-2023, 4:59 pm",
        url: "/tin-tuc/thanh-led-rgb",
    }
];