export interface BlogPost {
  id: number;
  title: string;
  images: string[];    // dùng cho mainPost có nhiều ảnh
  date: string;
  excerpt?: string;
  url: string;
  views?: number;
  comments?: number;
}

export const latestPosts: BlogPost[] = [
    {
        id: 1,
        title: "Có mấy loại đèn LED trên thị trường? Nên dùng loại nào là tốt nhất?",
        url: "/news/1",
        date: "2025-08-20",
        views: 120,
        images: [
        "https://cdn.tgdd.vn/Files/2020/09/25/1293456/cac-loai-bong-den-led-tren-thi-truong-22.jpg",       // ảnh to bên trái
        "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyzDwrmm9WM6yrYi7PLspNvupem2sn_BXsTw&s",    // ảnh nhỏ 1
        "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyzDwrmm9WM6yrYi7PLspNvupem2sn_BXsTw&s",    // ảnh nhỏ 2
        "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyzDwrmm9WM6yrYi7PLspNvupem2sn_BXsTw&s",    // ảnh nhỏ 3
        "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyzDwrmm9WM6yrYi7PLspNvupem2sn_BXsTw&s",    // ảnh nhỏ 4
    ]
    },
    {
        id: 2,
        title: "TÌM HIỂU VỀ CÁC LOẠI PLATE TRÊN BÀN PHÍM CƠ",
        images: 	["https://gongangshop.vn/wp-content/uploads/2024/12/Ban-phim-co-custom-2.jpg"],
        date: "30-06-2022, 10:41 am",
        url: "/tin-tuc/plate-ban-phim-co",
    },
    {
        id: 3,
        title: "LOA SH39 VỚI NÚT BẤM BẰNG PHÍM CƠ SIÊU ĐỘC LẠ",
        images: ["https://lacdau.com/media/product/1579-aaf7b21cce03a933397a5827a00bafd8.jpg"],
        date: "22-11-2023, 5:09 pm",
        url: "/tin-tuc/loa-sh39",
    },
    {
        id: 4,
        title: "BỘ THANH LED RGB NHÁY THEO NHẠC ĐIỆN ĐẢO",
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-JQ9h1Ue7eyjBKlZVlBsnqTKyy-FC-j67Q&s"],
        date: "22-11-2023, 4:59 pm",
        url: "/tin-tuc/thanh-led-rgb",
    },
    {
        id: 4,
        title: "BỘ THANH LED RGB NHÁY THEO NHẠC ĐIỆN ĐẢO",
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-JQ9h1Ue7eyjBKlZVlBsnqTKyy-FC-j67Q&s"],
        date: "22-11-2023, 4:59 pm",
        url: "/tin-tuc/thanh-led-rgb",
    },
    {
        id: 4,
        title: "BỘ THANH LED RGB NHÁY THEO NHẠC ĐIỆN ĐẢO",
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-JQ9h1Ue7eyjBKlZVlBsnqTKyy-FC-j67Q&s"],
        date: "22-11-2023, 4:59 pm",
        url: "/tin-tuc/thanh-led-rgb",
    },
    {
        id: 4,
        title: "BỘ THANH LED RGB NHÁY THEO NHẠC ĐIỆN ĐẢO",
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-JQ9h1Ue7eyjBKlZVlBsnqTKyy-FC-j67Q&s"],
        date: "22-11-2023, 4:59 pm",
        url: "/tin-tuc/thanh-led-rgb",
    }
];