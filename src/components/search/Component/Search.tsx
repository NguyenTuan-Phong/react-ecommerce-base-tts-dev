import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Typography } from "antd";
import './Search.css'
import { Link } from "react-router-dom";
import type { Product } from "../../../types";
import { useProducts } from "../../../features/productdetail/hook/useProduct";

const { Title } = Typography;

function SearchProduct(productList: Product[], keyword: string): Product[] {
  if (!keyword.trim()) return productList;
  const lowerKeyword = keyword.toLowerCase();
  return productList.filter(
    item => item.name.toLowerCase().includes(lowerKeyword)
  );
}

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");

  // Lấy danh sách sản phẩm từ API
  const { data: productData, isLoading, isError } = useProducts();
  const allProducts: Product[] = productData?.data?.content || [];

  if(isLoading){
    return<div>Đang tìm kiếm...</div>
  }
  if(isError){
    return<div>Lỗi khi tìm kiếm...</div>
  }

  // Reset keyword mỗi khi chuyển route
  // useEffect(() => {
  //   setKeyword("");
  // }, [location.pathname]);

  const filter = SearchProduct(allProducts, keyword);

  return (
    <div className="search">
      <div className="bg-white rounded-[12px] shadow-md flex items-center flex-1 px-4">
        <SearchOutlined className="text-gray-700" />
        <input
          type="text"
          placeholder="Bạn cần tìm gì?"
          className="border-none outline-none text-lg px-2 py-3 flex-1 bg-transparent"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
      </div>
      {/* Danh sách kết quả tìm kiếm */}
      <div className="bg-white p-3" >
         {keyword && filter.length > 0 && (
        <div className="search-product-result-list">
          {filter.map(item => (
            <Link
              className="search-product-result flex gap-3"
              key={item.id}
              to={`/products/${item.id}`}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.imageUrl}
                alt="image"
                style={{ width: 50, height: 50 }}
              />
              <div>
                <Title level={5}>{item.name}</Title>
                <p className="text-[#777]">Mã:{item.code} </p>
                <p className="font-bold text-black">
                  {item.price.toLocaleString()} VNĐ
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Search;