import { Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import type { Category, Product } from "../../../types";
import { toast } from "react-toastify";
import useUserStore from "../../../store/useUserStore";
import useCartStore from "../../../store/useCartStore";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ImageWithFallback from "../../../components/img/ImageWithFallback";
import SliderButton from "../../../components/button/SliderButton";

interface ViewedProductsProps {
  products: Product[];
  categories?: Category[];
  title?: string;
}

const ViewedProducts: React.FC<ViewedProductsProps> = ({
  products,
  title = "Sản phẩm đã xem",
}) => {
  if (!products || products.length === 0) return null;

  const navigate = useNavigate();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const addToCart = useCartStore((state) => state.addToCart);

  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const cardWidth = 250 + 20; 

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const handleAddToCart = (product: Product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      code: product.code,
      price: product.price,
      quantity: 1,
      image: product.imageUrl,
    });

    toast.success("Thêm vào giỏ hàng thành công!");
  };

  const goPrev = () => setIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () => setIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <div className="relative bg-white p-5 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="overflow-hidden relative">
        <SliderButton direction="prev" onClick={goPrev} show={index > 0} />
        <SliderButton direction="next" onClick={goNext} show={index < maxIndex} />

        <div
          className="flex gap-4 transition-transform duration-300 ease-in-out p-2"
          style={{ transform: `translateX(-${index * cardWidth}px)` }}
        >
          {products.map((prod) => (
            <Card
              key={prod.id}
              className="rounded-lg shadow-sm flex-shrink-0"
              style={{ width: 250 }}
              hoverable
            >
              <Link to={`/products/${prod.id}`}>
                <ImageWithFallback
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="h-40 object-cover rounded-xl w-full"
                />
                {prod.code && <p className="text-[#777] pt-1">Mã: {prod.code}</p>}
                <p className="text-[16px] font-bold text-black line-clamp-2 h-12">{prod.name}</p>
              </Link>

              <div className="flex gap-6 mt-2 items-center">
                <div className="text-[#29A07E] text-[18px] font-bold flex-1">
                  {prod.price?.toLocaleString() ?? '0'} VNĐ
                </div>
                <button
                  className="bg-[#e5f8ee] hover:bg-[#22a085] hover:text-white text-[#22a085] rounded-full w-10 h-10 flex items-center justify-center"
                  onClick={() => handleAddToCart(prod)}
                >
                  <ShoppingCartOutlined />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewedProducts;
