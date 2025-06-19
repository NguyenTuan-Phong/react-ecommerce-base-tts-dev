
export type Guide = {
  id: number;
  title: string;
  date: string; 
  image: string;
  createdAt?: string;   
};

export const guides:Guide[] = [
  {
    id: 1,
    title: "HƯỚNG DẪN KẾT NỐI TAY CẦM PS4 VỚI PC VÀ ĐIỆN THOẠI",
    date: "22.11.2023",
    image: "/images/ps4-pc-phone-guide.jpg", 
  },
  {
    id: 2,
    title: "HƯỚNG DẪN KẾT NỐI TAY CẦM DUALSHOCK4 VỚI MÁY TÍNH ĐỂ CHƠI FIFA ONLINE 4",
    date: "30.06.2022",
    image: "/images/dualshock4-fifa-guide.jpg",
  },
  {
    id: 3,
    title: "HƯỚNG DẪN SỬ DỤNG BÀN PHÍM CƠ AKKO 3098B VÀ 3098N",
    date: "30.06.2022",
    image: "/images/akko-3098-guide.jpg",
  },
];