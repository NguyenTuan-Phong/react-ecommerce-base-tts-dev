import { StarFilled } from "@ant-design/icons";
import { Button } from "antd";

const stats = [
  { value: "4.9/5", label: "Đánh giá trung bình", sub: "Từ 125,000+ đánh giá", bg: "bg-green-100", text: "text-green-700" },
  { value: "98%", label: "Khách hàng hài lòng", sub: "Sẽ mua lại lần sau", bg: "bg-blue-100", text: "text-blue-700" },
  { value: "24h", label: "Giao hàng nhanh", sub: "Trung bình toàn quốc", bg: "bg-purple-100", text: "text-purple-700" },
  { value: "99.5%", label: "Sản phẩm chính hãng", sub: "Cam kết 100%", bg: "bg-orange-100", text: "text-orange-700" },
];

const reviews = [
  {
    name: "Tuấn Anh",
    role: "CEO Startup Tech",
    avatar: "T",
    stars: 5,
    title: "iPhone 15 Pro Max - Đáng từng đồng!",
    content:
      '“Mình đã dùng qua nhiều flagship nhưng iPhone 15 Pro Max thật sự xuất sắc! Camera chụp đêm cực kỳ ấn tượng, hiệu năng mượt mà không vết. Đặc biệt là vỏ Titanium rất sang trọng và nhẹ hơn hẳn. Dịch vụ của OrangeShop cũng tuyệt vời, giao hàng nhanh, đóng gói cẩn thận.”',
    product: "iPhone 15 Pro Max 256GB",
    price: "28.990.000đ",
    time: "3 ngày trước",
    likes: 234,
  },
  {
    name: "Linh Chi",
    role: "Graphic Designer",
    avatar: "L",
    stars: 5,
    title: "MacBook Pro M3 - Công cụ làm việc hoàn hảo!",
    content:
      '“Là một designer, mình cần máy mạnh để render và xử lý file nặng. MacBook Pro M3 quá đỉnh! Render video 4K nhanh như chớp, màn hình Retina hiển thị sắc nét, màu sắc chuẩn. Pin trâu, thiết kế sang trọng. Công việc hiệu quả gấp đôi so với máy cũ. Cảm ơn OrangeShop đã tư vấn nhiệt tình!”',
    product: "MacBook Pro M3 14'' 16GB",
    price: "45.990.000đ",
    time: "1 tuần trước",
    likes: 189,
  },
  {
    name: "Minh Khôi",
    role: "Music Producer",
    avatar: "M",
    stars: 5,
    title: "Sony WH-1000XM5 - Audiophile's choice!",
    content:
      '“Là producer, mình rất khó tính về âm thanh. Sony WH-1000XM5 thật sự xuất sắc! Chất lượng âm thanh Hi-Res chuẩn studio, chống ồn siêu hiệu quả. Đeo cả ngày không mỏi tai, pin trâu 30 tiếng. Giá tại OrangeShop rẻ hơn nhiều nơi khác, ship nhanh, đóng gói cẩn thận. Recommend 100%!”',
    product: "Sony WH-1000XM5",
    price: "7.990.000đ",
    time: "5 ngày trước",
    likes: 156,
  },
  {
    name: "Thành Nguyễn",
    role: "Music Producer",
    avatar: "M",
    stars: 5,
    title: "Sony WH-1000XM5 - Audiophile's choice!",
    content:
      '“Là producer, mình rất khó tính về âm thanh. Sony WH-1000XM5 thật sự xuất sắc! Chất lượng âm thanh Hi-Res chuẩn studio, chống ồn siêu hiệu quả. Đeo cả ngày không mỏi tai, pin trâu 30 tiếng. Giá tại OrangeShop rẻ hơn nhiều nơi khác, ship nhanh, đóng gói cẩn thận. Recommend 100%!”',
    product: "Sony WH-1000XM5",
    price: "7.990.000đ",
    time: "5 ngày trước",
    likes: 156,
  }
];

const CustomerReviews = () => {
  return (
    <div className="mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Khách Hàng <span className="text-orange-500">Nói Gì?</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Những chia sẻ chân thực từ khách hàng đã mua sắm tại OrangeShop – Niềm tin của bạn là động lực của chúng tôi
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} p-4 rounded-lg text-center`}>
            <div className={`text-2xl font-bold ${s.text}`}>{s.value}</div>
            <div className="font-medium">{s.label}</div>
            <div className="text-sm text-gray-600">{s.sub}</div>
          </div>
        ))}
      </div>


      <div className="grid grid-rows-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {reviews.map((r, i) => (
          <div key={i} className="border rounded-xl p-5 shadow-sm hover:shadow-md transition">

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full">
                {r.avatar}
              </div>
              <div>
                <div className="font-bold">{r.name}</div>
                <div className="text-sm text-gray-500">{r.role}</div>
              </div>
            </div>

            <div className="flex text-yellow-400 mb-3">
              {Array.from({ length: r.stars }).map((_, idx) => (
                <StarFilled key={idx} />
              ))}
            </div>

            <div className="font-bold mb-2">{r.title}</div>

            <p className="text-gray-600 text-sm mb-4">{r.content}</p>

            <div className="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center text-sm">
              <span className="text-purple-600">{r.product}</span>
              <span className="font-bold">{r.price}</span>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>{r.time}</span>
              <div className="flex gap-4">
                <span className="text-green-600 cursor-pointer">Hữu ích ({r.likes})</span>
                <span className="cursor-pointer text-blue-500">Trả lời</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button className="bg-orange-500! hover:bg-orange-600! text-white! px-6! py-3! rounded-full! font-bold! h-12! hover:border-none!">
          Xem thêm 125,000+ đánh giá
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          Tất cả đánh giá đều được xác thực từ khách hàng đã mua hàng
        </p>
      </div>
    </div>
  );
}
export default CustomerReviews