import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  CustomerServiceOutlined,
  FileProtectOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

const LayoutFooter = () => {
  const role = useUserStore((state) => state.user?.role.name);

  const contactItems = [
    {
      icon: <EnvironmentOutlined />,
      text: "Tầng 8 tòa nhà 3A, số 3 ngõ 82 Duy Tân, phường Dịch Vọng Hậu, quận Cầu Giấy, Hà Nội, Việt Nam",
      href: "https://maps.app.goo.gl/8MScKhzeDhoi4Fje8",
      target: "_blank",
    },
    {
      icon: <PhoneOutlined />,
      text: "09637600289",
      href: "tel:09637600289",
    },
    {
      icon: <MailOutlined />,
      text: "contact@codec.com",
      href: "mailto:contact@codec.com",
    },
  ];

  return (
    <footer className="bg-[#0D1117] text-gray-300 text-[15px]">

      <div
        className={`${
          role === "ROLE_MANAGER" ? "" : "max-w-[1600px]"
        } mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10 px-6 py-10`}
      >

        <div>
          <div className="font-bold text-[22px] text-white mb-3">
            <span className="text-orange-500">Codec</span>
          </div>
          <p className="text-gray-400 mb-4">
            Nền tảng mua sắm trực tuyến hàng đầu Việt Nam với hàng triệu sản phẩm
            chất lượng, giá cả hợp lý và dịch vụ tận tâm.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-bold text-lg text-orange-500 mb-3">
            <CustomerServiceOutlined /> Hỗ trợ khách hàng
          </div>
          <ul className="space-y-2">
            <li>
              <Link to="/support-buy" className="hover:text-orange-500! transition!">
                Trung tâm hỗ trợ 24/7
              </Link>
            </li>
            <li>
              <Link to="/payment-guide" className="hover:text-orange-500! transition!">
                Hướng dẫn thanh toán
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="hover:text-orange-500! transition!">
                Góp ý, Khiếu Nại
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 font-bold text-lg text-orange-500 mb-3">
            <FileProtectOutlined /> Chính sách chung
          </div>
          <ul className="space-y-2 flex flex-col">
            <Link to="regulation" className="hover:text-orange-500! transition-colors!">
              Chính sách, quy định chung
            </Link>
            <Link to="shipping" className="hover:text-orange-500! transition!">
              Chính sách vận chuyển
            </Link>
            <Link to="warranty" className="hover:text-orange-500! transition!">
              Chính sách bảo hành
            </Link>
            <Link to="returns" className="hover:text-orange-500! transition!">
              Chính sách đổi trả và hoàn tiền
            </Link>
            <Link to="privacy" className="hover:text-orange-500! transition!">
              Chính sách xử lý khiếu nại
            </Link>
            <Link to="security" className="hover:text-orange-500! transition!">
              Bảo mật thông tin khách hàng
            </Link>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 font-bold text-lg text-orange-500 mb-3">
            <EnvironmentOutlined /> Liên hệ
          </div>
          <div className="space-y-3">
            {contactItems.map((item, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-orange-500! mt-1">{item.icon}</span>
                <a
                  href={item.href}
                  target={item.target ?? "_self"}
                  rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                  className="hover:text-orange-500! transition!"
                >
                  {item.text}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="font-medium text-white block mb-2">
              Đăng ký nhận tin khuyến mãi
            </label>
            <div className="flex">
              <input
                type="text"
                placeholder="Nhập email..."
                className="px-3 py-2 rounded-l-md w-full bg-gray-800 text-white border border-gray-700 focus:outline-none"
              />
              <button className="bg-orange-500 px-4 rounded-r-md hover:bg-orange-600 transition">
                <SendOutlined className="text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Nhận thông tin sale sớm nhất, ưu đãi độc quyền
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-3 text-center text-gray-500 text-sm flex justify-around">
        <p>© {new Date().getFullYear()} Codec. Tất cả quyền được bảo lưu.</p>
        <p> Made with ❤️ in Vietnam</p>
      </div>
    </footer>
  );
};

export default LayoutFooter;
