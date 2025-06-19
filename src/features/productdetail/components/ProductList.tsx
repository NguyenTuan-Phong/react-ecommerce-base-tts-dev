import { Card } from "antd";
import React, { useState } from "react";
import { useProducts } from "../hook/useProduct";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import useCartStore from "../../../store/useCartStore";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  code: string;
  rating: number;
  categories: { id: number; name: string; description?: string }[];
}

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface ProductListProps {
  categories: Category[];
}

const ProductList: React.FC<ProductListProps> = ({ categories = [] }) => {
  const { data: productData, isLoading, isError } = useProducts();
  const products: Product[] = productData?.data?.content || [];

  const navigate = useNavigate();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const addToCart = useCartStore((state) => state.addToCart);

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

  // Index slide riêng theo từng danh mục
  const [indices, setIndices] = useState<Record<number, number>>({});

  const getIndex = (catId: number) => indices[catId] || 0;

  const updateIndex = (catId: number, newIndex: number) => {
    setIndices((prev) => ({ ...prev, [catId]: newIndex }));
  };

  // Auto next từng category sau 10s
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     categories.forEach((cat) => {
  //       const catProducts = products.filter((p) =>
  //         p.categories.some((c) => c.id === cat.id)
  //       );
  //       const currentIndex = getIndex(cat.id);
  //       const maxIndex = Math.max(catProducts.length - 5, 0);

  //       const newIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
  //       updateIndex(cat.id, newIndex);
  //     });
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, [categories, products]);

  if (isLoading) return <div>Đang tải sản phẩm...</div>;
  if (isError) return <div>Lỗi khi tải sản phẩm...</div>;
  if (!Array.isArray(categories) || categories.length === 0)
    return <div>Không có danh mục nào để hiển thị.</div>;

  return (
    <div>
      {categories.map((cat) => {
        const productsInCategory = products.filter((prod) =>
          prod.categories.some((c) => c.id === cat.id)
        );

        const index = getIndex(cat.id);
        const maxIndex = Math.max(productsInCategory.length - 5, 0);

        const goNext = () => {
          if (index < maxIndex) updateIndex(cat.id, index + 1);
        };

        const goPrev = () => {
          if (index > 0) updateIndex(cat.id, index - 1);
        };

        return (
          <div key={cat.id} className="mt-5 mb-10 bg-white rounded-xl p-3">
            <h3 className="font-bold text-2xl mb-4">{cat.name}</h3>
            {productsInCategory.length === 0 ? (
              <p>Đang cập nhật...</p>
            ) : (
              <div className="relative">
                <div className="flex gap-3 flex-wrap">
                  {productsInCategory
                    .slice(index, index + 5)
                    .map((prod) => (
                      <Card
                        key={prod.id}
                        className="flex flex-col p-3 bg-white rounded-[8px] flex-shrink-0 h-85"
                        hoverable
                        style={{ borderRadius: 8, width: 240, margin: 8 }}
                        cover={
                          <img
                            className="rounded-[8px] hover:cursor-pointer w-50 h-40 object-cover"
                            src={prod.imageUrl}
                            alt={prod.name}
                          />
                        }
                      >
                        <Link to={`/products/${prod.id}`}>
                          <p className="text-[#777]">Mã: {prod.code}</p>
                          <p className="text-[16px] font-bold">{prod.name}</p>
                        </Link>

                        <div className="flex gap-6 mt-2 items-center">
                          <div className="text-[#29A07E] text-[18px] font-bold">
                            {prod.price.toLocaleString()} VNĐ
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

                {/* Prev Button */}
                <button
                  className={`w-10 h-10 bg-[#bbb9b9] rounded-full flex items-center justify-center
                    absolute top-1/2 left-0 -translate-y-1/2 z-10 hover:bg-[#29A07E] ${
                      index === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={index === 0}
                  onClick={goPrev}
                >
                  <CaretLeftOutlined />
                </button>

                {/* Next Button */}
                <button
                  className={`w-10 h-10 bg-[#bbb9b9] rounded-full flex items-center justify-center
                    absolute top-1/2 right-0 -translate-y-1/2 z-10 hover:bg-[#29A07E] ${
                      index === maxIndex ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={index === maxIndex}
                  onClick={goNext}
                >
                  <CaretRightOutlined />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
