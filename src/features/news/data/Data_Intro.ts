// Dữ liệu cho các bài viết, tương ứng giao diện trong ảnh 2

export type Intro = {
  id: number;
  title: string;
  date: string; // format: dd.mm.yyyy
  image: string;
};

export const intro: Intro[] = [
  {
    id: 1,
    title: "TÌM HIỂU VỀ CÁC LOẠI PLATE TRÊN BÀN PHÍM CƠ",
    date: "30.06.2022",
    image: "/images/plate-keyboard.jpg", // thay bằng đường dẫn ảnh thật
  },
  {
    id: 2,
    title: "DỊCH VỤ IN LÓT CHUỘT THEO YÊU CẦU TẠI LẮC ĐẦU",
    date: "19.10.2022",
    image: "/images/custom-mousepad-service.jpg",
  },
  {
    id: 3,
    title: "GIỚI THIỆU VỀ AKKO CS SWITCH",
    date: "30.06.2022",
    image: "/images/akko-cs-switch.jpg",
  },
];