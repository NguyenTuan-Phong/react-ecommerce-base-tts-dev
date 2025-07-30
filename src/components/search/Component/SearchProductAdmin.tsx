import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useSearch } from "../hook/useSearch";

type SearchProductAdminProps = {
  onResult?: (data: any[]) => void;
};

const SearchProductAdmin = ({ onResult }: SearchProductAdminProps) => {
  const [keyword, setKeyword] = useState("");
  const { search, dataSearch } = useSearch();

  // Gọi API sau 500ms debounce
  useEffect(() => {
    if (keyword.trim()) {
      const delaySearch = setTimeout(() => {
        search(keyword);
      }, 500);
      return () => clearTimeout(delaySearch);
    } else {
      onResult?.([]); // nếu rỗng thì gửi mảng rỗng
    }
  }, [keyword]);

  // Gửi kết quả về component cha
  useEffect(() => {
    if (dataSearch?.data?.content && Array.isArray(dataSearch.data.content)) {
      onResult?.(dataSearch.data.content);
    }
  }, [dataSearch]);

  return (
    <div className="relative w-80">
      <div className="bg-white rounded-[6px] shadow-md flex items-center px-3 border h-12 border-gray-300">
        <SearchOutlined className="text-gray-700" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sản phẩm"
          className="border-none outline-none text-sm px-2 py-3 flex-1 bg-transparent placrholder:truncate"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchProductAdmin;
