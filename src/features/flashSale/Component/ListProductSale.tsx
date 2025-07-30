import { Link, useLocation } from "react-router-dom";
import SkeletonProduct from "../../../components/product/SkeletonProduct";
import { Card, Pagination } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "../../cart/hook";
import useAddCart from "../../cart/hook/useAddCart";
import useUserStore from "../../../store/useUserStore";
import { useMemo, useState } from "react";
import ImageWithFallback from "../../../components/img/ImageWithFallback";
import { useFlashSaleProducts } from "../hook/useValidFlashSaleProduct";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ListProductSale = () => {
  const { refetchCart } = useCart();
  const { handleAddCart } = useAddCart(refetchCart);
  const userId = useUserStore((state) => state.user?.id);

  const { flashSaleProducts, isLoadingAllFlashSale } = useFlashSaleProducts();

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);

  const query = useQuery();
  const selectedCategory = query.get("category");

  const filteredFlashSaleProducts = useMemo(() => {
    if (!selectedCategory) return flashSaleProducts;

    const lowerCategory = selectedCategory.toLowerCase();

    return flashSaleProducts.filter((product) =>
      product.categories?.some((cat) =>
        cat.name?.toLowerCase() === lowerCategory ||
        cat.categoryItems?.some(
          (item) => item.name?.toLowerCase() === lowerCategory
        )
      )
    );
  }, [selectedCategory, flashSaleProducts]);

  // Pagination slice
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * size;
    const end = start + size;
    return filteredFlashSaleProducts.slice(start, end);
  }, [filteredFlashSaleProducts, page, size]);

  return (
    <div className="py-10 flex flex-col gap-5">
      {/* Breadcrumb + Title */}
      <section className="flex gap-3">
        <Link to="/" className="link">TRANG CHỦ</Link>
        <div className="section-text">/</div>
        <span className="cursor-default section-text">SIÊU SALE XỊN 6G "GỒNG GANH_GIẢM GẮT_ GIÁ GỐC"</span>
      </section>

      <section className="flex gap-5 items-end flex-wrap">
        <h1 className="text-[26px] font-bold section-text">
          {selectedCategory
            ? `Flash Sale - ${selectedCategory}`
            : 'SIÊU SALE XỊN 6G "GỒNG GANH_GIẢM GẮT_ GIÁ GỐC"'}
        </h1>

        <p className="text-[16px] pb-1">({filteredFlashSaleProducts.length} Sản phẩm)</p>
      </section>

      {/* Product Grid */}
      <section className="rounded-[8px] h-auto bg-[white] p-3">
        {isLoadingAllFlashSale ? (
          <SkeletonProduct count={size} />
        ) : (
          <div>
            {filteredFlashSaleProducts.length === 0 ? (
              <div className="h-50 text-center content-center">Không có sản phẩm.</div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {paginatedProducts.map((i) => (
                    <Card
                      key={i.productId}
                      className="flex flex-col bg-white rounded-[8px] p-3 w-full h-full hover:text-[#29A07E] mt-3 max-w-[240px]"
                      hoverable
                      cover={
                        <Link to={`flash-sale/${i.productId}`} className="flex items-center justify-center">
                          <ImageWithFallback
                            className="rounded-[8px] w-full h-45 object-cover"
                            alt={i.name}
                            src={i.imageUrl}
                          />
                        </Link>
                      }
                    >
                      <Link to={`/products/${i.productId}`}>
                        <div className="text-xs text-[#777] mb-1">Mã: {i.code}</div>
                        <p className="text-[14px] font-bold line-clamp-2 text-black group-hover:text-[#29A07E]">
                          {i.name}
                        </p>
                      </Link>

                      <div className="flex">
                        <div className="flex-1">
                          <div className="text-gray-500 line-through text-[16px]">
                            {typeof i.originalPrice === 'number'
                              ? i.originalPrice.toLocaleString('vi-VN') + ' VNĐ'
                              : '0 VNĐ'}
                          </div>
                          <div className="text-[#29A07E] text-[18px] font-bold">
                            {i.flashPrice?.toLocaleString()} VNĐ
                          </div>
                        </div>
                        <button
                          className="bg-[#e5f8ee] hover:bg-[#22a085] hover:text-white text-[#22a085] hover:cursor-pointer rounded-full w-10 h-10 flex items-center justify-center"
                          onClick={() => handleAddCart(userId!, i.productId, 1)}
                        >
                          <ShoppingCartOutlined />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-10">
                  <Pagination
                    align="center"
                    current={page}
                    pageSize={size}
                    onChange={(pageNumber, pageSizeNumber) => {
                      setPage(pageNumber);
                      setSize(pageSizeNumber);
                    }}
                    total={filteredFlashSaleProducts.length}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ListProductSale;
