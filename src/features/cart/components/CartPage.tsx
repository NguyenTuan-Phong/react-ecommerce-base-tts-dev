import { Link } from "react-router-dom";
import Pay from "./Pay";
import useCartStore from "../../../store/useCartStore";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.cartItems);
   const updateQuantity = useCartStore((state) => state.updateQuantity);
   const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (totalMoney, item) => totalMoney + item.quantity * item.price,
    0
  );

  const data = {
    total,
    totalPrice,
  };

  return (
    <div className="max-w-[1400px] flex mx-auto flex-col">
      <section className="flex gap-4 py-[20px]">
        <Link style={{ color: "black", fontWeight: "bold" }} to={"/"}>
          TRANG CHỦ
        </Link>
        <p>/</p>
        <p className="font-bold">THÔNG TIN GIỎ HÀNG</p>
      </section>

      {cartItems.length !== 0 ? (
        <section className="my-[10px] gap-4 flex flex-col">
          <div className="bg-[white] rounded-[8px]">
            <div className="flex p-4 ">
              <p className="font-[600] flex-1">THÔNG TIN GIỎ HÀNG</p>
              <div className="gap-4 flex">
                <Link
                  style={{ color: "black", fontWeight: "600" }}
                  to={"/"}
                >
                  <p>CHỌN TIẾP SẢN PHẨM KHÁC</p>
                </Link>
                <div
                  className="hover:cursor-pointer font-[600]"
                  onClick={() => {
                    const confirmClear = window.confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?');
                    if (confirmClear) {
                        clearCart();
                    }
                    }}
                >
                  <p>XÓA GIỎ HÀNG</p>
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-[#f5f5f5]"></div>

            {/* title */}
            <div className="flex p-4 ">
              <div className="flex-1">
                <b>Sản phẩm</b>
              </div>
              <div className="w-[180px] text-center">
                <b>Đơn giá</b>
              </div>
              <div className="w-[180px] text-center">
                <b>Số lượng</b>
              </div>
              <div className="w-[180px] text-center">
                <b>Số tiền</b>
              </div>
              <div className="w-[120px] text-center">
                <b>Thao tác</b>
              </div>
            </div>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex p-3 bg-[white] rounded-[8px]"
            >
              <div className="flex-1 flex">
                <img
                  className="h-[100px] w-[100px]"
                  src={item.image || "img.png"}
                  alt="Ảnh sản phẩm"
                />
                <ul className="flex flex-col">
                  <b className="truncate text-[18px] min-w-[600px]">
                    {item.name}
                  </b>
                  <li>Mã sản phẩm: {item.code || "N/A"}</li>
                  {item.warranty && <li>Bảo hành: {item.warranty}</li>}
                </ul>
              </div>

              <div className="w-[180px] text-center text-[16px] text-[#818181] mt-3">
                {item.price.toLocaleString()} VNĐ
              </div>

              <div className="w-[180px] text-center text-[16px] text-[#818181] mt-3 flex items-center justify-center gap-2">
                <div
                  className="w-10 h-10 bg-[#818181] rounded-full opacity-25 text-black flex items-center justify-center hover:cursor-pointer"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                >
                  -
                </div>

                <input
                  className="w-[60px] h-10 text-center"
                  type="text"
                  readOnly
                  value={item.quantity}
                />

                <div
                  className="w-10 h-10 bg-[#818181] rounded-full opacity-50 text-black flex items-center justify-center hover:cursor-pointer"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </div>
              </div>

              <div className="w-[180px] text-center text-[16px] text-[#E94E1B] mt-3">
                {(item.quantity * item.price).toLocaleString()} VNĐ
              </div>

              <div
                className="w-[120px] text-center text-[16px] hover:cursor-pointer mt-3"
                onClick={() => {
                    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?');
                    if (confirmDelete) {
                        removeFromCart(item.id);
                    }
                }}
              >
                Xóa
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="bg-[white] h-[200px] text-center content-center text-[24px] font-bold mb-3">
          <p>Giỏ hàng của bạn đang trống</p>
        </section>
      )}

      <section className="mt-2 mb-5">
        <Pay data={data} />
      </section>
    </div>
  );
};

export default CartPage;
