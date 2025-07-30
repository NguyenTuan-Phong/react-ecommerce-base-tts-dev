import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import "./Search.css";
import { Link, useLocation } from "react-router-dom";
import { useSearch } from "../hook/useSearch";
import ImageWithFallback from "../../img/ImageWithFallback";

const { Title } = Typography;

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const { search, dataSearch } = useSearch();

  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [searchBoxRect, setSearchBoxRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (showResult && searchBoxRef.current) {
      const rect = searchBoxRef.current.getBoundingClientRect();
      setSearchBoxRect(rect);
    }
  }, [showResult]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  useEffect(() => {
    if (debouncedKeyword.trim() !== "") {
      search(debouncedKeyword.trim()).then(() => {
        setShowResult(true);
      });
    } else {
      setShowResult(false); 
    }
  }, [debouncedKeyword]);

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultRef.current &&
        !resultRef.current.contains(event.target as Node)
      ) {
        setShowResult(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
  if (debouncedKeyword.trim() !== "") {
    search(debouncedKeyword.trim()).then((res) => {
      console.log("SEARCH RESULT", res); 
    });
  }
}, [debouncedKeyword]);

const location = useLocation();

useEffect(() => {
  setShowResult(false);
}, [location]);






  const handleChange = (value: string) => {
    setKeyword(value);
  };

  return (
    <div className="search w-full max-w-[480px] md:max-w-[400px] sm:max-w-[320px]">
      <div 
      ref={searchBoxRef}
      className="bg-white rounded-[8px] shadow-md flex items-center flex-1 px-4 border">
        <SearchOutlined className="text-gray-700" />
        <input
          type="text"
          placeholder="Bạn cần tìm gì?"
          className="w-full border-none outline-none text-lg px-2 py-3 bg-transparent placeholder:truncate"
          value={keyword}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setShowResult(true)} 
        />

      </div>

      <div className="bg-white">
       {showResult &&
        Array.isArray(dataSearch?.content) &&
        keyword.trim() !== "" &&
        dataSearch.content.length > 0 && searchBoxRect && (

          <div 
          className="search-product-result-list flex flex-col gap-1 p-[2px]!"
          style={{
          position: "fixed",
          top: searchBoxRect.bottom,
          left: searchBoxRect.left,
          width: searchBoxRect.width,
          zIndex: 9999,
          background: "#fff",
          borderRadius: "0 0 0px 0px",
          border: "1px solid #e0e0e0",
          maxHeight: 320,
          overflowY: "auto",
      }}
          >
            {dataSearch.content.map((item:any) => (
              <Link
                className="search-product-result flex gap-3 "
                key={item.id}
                to={`/products/${item.id}`}
                style={{ cursor: "pointer" }}
              >
                <div className="flex gap-3! p-3 items-center border-gray-200 border w-full">
                  <ImageWithFallback
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 8, border: "1px solid black" }}
                  />

                  <div>
                    <Title level={5} className="!leading-normal !m-0">{item.name}</Title>
                    <p className="text-[#777] m-0" style={{ lineHeight: "normal" }}>
                      Mã: {item.code}
                    </p>
                    <p className="font-bold text-black m-0" style={{ lineHeight: "normal" }}>
                      {item.price.toLocaleString()} VNĐ
                    </p>
                  </div>
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
