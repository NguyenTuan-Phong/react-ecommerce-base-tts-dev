import { Button, Card, Carousel, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import banner1 from '../../../assets/img/banner1.png';
import { useCategories } from "../hook/useCategories";
import type { Category } from "../../../types";
import useUserStore from "../../../store/useUserStore";

import {
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ProductFilterPage from "./FilterProducts";
import { useCart } from "../../cart/hook/useCart";
import useAddCart from "../../cart/hook/useAddCart";
import ImageWithFallback from "../../../components/img/ImageWithFallback";
import { useGetProductByCategory } from "../hook/useGetProductByCategory";
import SkeletonProduct from "../../../components/product/SkeletonProduct";
import SliderButton from "../../../components/button/SliderButton";
import { useGetPublishers } from "../hook/useGetPublishers";

const ProductByCat = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();


  const page = 0
  const size = 10
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  const [selectedPublisher, setSelectedPublisher] = useState<string | undefined>(undefined);
  const [index, setIndex] = useState(0);
  const {
    isPendingGetProductByCategory,
    ResponseGetProductByCategory
  } = useGetProductByCategory(id!, page, size, selectedPublisher, minPrice, maxPrice);

  const { data: categoryData } = useCategories();
  const categories: Category[] = Array.isArray(categoryData?.data) ? categoryData.data : [];

  const { refetchCart } = useCart();
  const { handleAddCart } = useAddCart(refetchCart);
  const userId = useUserStore((state) => state.user?.id);

  const selectedCategory = categories.find((cat) => String(cat.id) === id);
  const [form] = Form.useForm();
  const [formSearch] = Form.useForm();
  const {
    ResponseGetPublisher
  } = useGetPublishers(page, size)
  
  
  const handleRemoveSearch = (value: any) => {
    form.resetFields();
    setMaxPrice(value.maxPrice);
    setMinPrice(value.minPrice);
  };

  const handleSearchPrice = (value: any) => {
    setMaxPrice(value.maxPrice);
    setMinPrice(value.minPrice);
  };

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getGridCols = () => {
    const width = window.innerWidth;

    if (width >= 1024) return 5;  
    else if (width >= 768) return 4;  
    else if (width >= 640) return 3; 
    else return 2;                    
  };


  useEffect(() => {
    const updateLayout = () => {
      const cols = getGridCols();
      const rows = 1;
      setItemsPerPage(cols * rows);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const goNext = () => {
    if (index + 1 < selectedCategory?.categoryItems.length!) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const goPrev = () => {
    if (index - 1 >= 0) {
      setIndex(index - 1);
    } else {
      setIndex(0);
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      minPrice,
      maxPrice,
    });
  }, [minPrice, maxPrice, form]);

  if (!selectedCategory) return <div>Không tìm thấy danh mục phù hợp.</div>;  

  return (
    <div className="mt-5">
      <section className="flex gap-4 py-[20px]">
        <Link className="link" to="/">
          TRANG CHỦ
        </Link>
        <p className='section-text'>/</p>
        <p className="font-bold">{selectedCategory.name}</p>
      </section>

      <Row gutter={[48, 48]} align="top" className="relative overflow-hidden mb-5">
        {/* FILTER */}
        <Col xs={24} sm={24} md={6} lg={6}>
          <ProductFilterPage
            selectedPublisher={selectedPublisher}
            setSelectedPublisher={setSelectedPublisher}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </Col>

        {/* MAIN CONTENT */}
        <Col xs={24} sm={24} md={18} lg={18}>
          {/* Banner */}
          <section className="w-full aspect-[16/5] relative overflow-hidden mb-5">
            <Carousel autoplay autoplaySpeed={10000}>
              <div>
                <Link to="">
                  <img
                    src={banner1}
                    className="w-full h-full object-cover rounded-[20px]"
                    alt="banner"
                  />
                </Link>
              </div>
              <div>
                <Link to="">
                  <img
                    src={banner1}
                    className="w-full h-full object-cover rounded-[20px]"
                    alt="banner"
                  />
                </Link>
              </div>
            </Carousel>
          </section>
          
          <div>
            {selectedCategory.categoryItems?.length > 0 && (
              // <div className="flex gap-4 items-center overflow-x-auto p-3 bg-[#e6f7dd] rounded-lg mb-6">
              <div className="relative">
                <SliderButton
                  direction="prev"
                  onClick={goPrev}
                  show={index > 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[20px] h-10 opacity-75 cursor-pointer"
                />

                <SliderButton
                  direction="next"
                  onClick={goNext}
                  show={index + itemsPerPage < selectedCategory.categoryItems.length}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[20px] h-10 opacity-75 cursor-pointer"
                />
                <div
                  className="
                    grid gap-4 p-3 bg-[#e6f7dd] rounded-lg mb-6 h-45 overflow-hidden
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-4 
                    lg:grid-cols-5 
                  "
                >
                  {selectedCategory.categoryItems.slice(index, index + itemsPerPage).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/category/${selectedCategory.id}/${item.id}`)}
                      className="flex-shrink-0 cursor-pointer text-center px-4 py-2 rounded-lg hover:bg-[#c3ecd0] hover:text-[#29A07E]
                      flex flex-col gap-3 items-center
                      "
                    >
                      <ImageWithFallback 
                        src={item.img}
                        alt={item.name}
                        style={{ clipPath: '50%' }}
                        className="w-25 h-25 object-cover mb-2 rounded-full mx-auto"
                      />
                      <p className="text-[12px] font-bold pb-2 truncate w-30 text-black">
                        {item.name.toUpperCase()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <h1 className="font-bold text-base mb-4">{selectedCategory.name.toUpperCase()}</h1>
          <div className="flex flex-col bg-white rounded-2xl">
            <div className="flex flex-col lg:flex-row px-5 pt-5 gap-4 relative">
              <Form form={formSearch}>
                <Select
                  className="w-full! lg:w-[220px]! h-9! rounded-[6px]! shadow-md!"
                  onChange={(value) => setSelectedPublisher(value === "all" ? undefined : value)}
                  placeholder="Hãng sản xuất"
                  value={selectedPublisher}
                >
                  <Select.Option value="all">Tất cả</Select.Option>
                  {ResponseGetPublisher?.data.content.map((i) => (
                    <Select.Option key={i.id} value={i.id}>
                      <p className="rounded-[6px]">{i.name}</p>
                    </Select.Option>
                  ))}
                </Select>
              </Form> 
              <Form
                form={form}
                className="flex flex-col justify-between sm:flex-row gap-2! sm:items-center w-full lg:w-auto"
                onFinish={handleSearchPrice}
                  
              >
                <div className="flex gap-2">
                  <Form.Item name="minPrice">
                    <Input
                      type="number"
                      placeholder="Giá thấp nhất"
                      className=" h-9! rounded-[6px]! text-center text-[14px]! shadow-md!"
                    />
                  </Form.Item>
                  <Form.Item name="maxPrice">
                    <Input
                      type="number"
                      placeholder="Giá cao nhất"
                      className="h-9! rounded-[6px]! text-center text-[14px]! shadow-md!"
                    />
                  </Form.Item>
                </div>
                <div className="flex gap-2">
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      className="bg-[#22a085]! text-white! h-9! rounded-[6px]! shadow-md!">
                      Tìm kiếm
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="bg-[#f5222d]! text-white! h-9! rounded-[6px]! shadow-md!"
                      onClick={handleRemoveSearch}>
                      Xóa tìm kiếm
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
            <div className="w-full h-[1px] bg-gray-300"></div>
            {isPendingGetProductByCategory ? (
            <div className="h-50 flex-1 text-center content-center">
              {/* <Spin /> */}
              <SkeletonProduct />
            </div>
          ) : (
            <div className="">
              {!ResponseGetProductByCategory ? (
                <div className="bg-[white] h-50 text-content text-center content-center rounded-[8px]">
                  Không có sản phẩm.
                </div>
              ) : (
                <div className="mt-5">
                  

                  {ResponseGetProductByCategory.data.content.length < 1 ? (
                    <div className="bg-[white] h-50 text-content text-center content-center rounded-[8px]">
                      Không có sản phẩm.
                    </div>
                  ) : (
                    <div className="grid gap-2 bg-white p-5 rounded-xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                      {ResponseGetProductByCategory.data.content.map((item) => (
                        // <div key={item.id} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-[white] p-5 rounded-xl">
                            <Card key={item.id} 
                              className="bg-white rounded-lg shadow"
                              hoverable
                            >
                              <Link to={`/products/${item.id}`}>

                                <ImageWithFallback 
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-40 object-cover rounded-lg mb-2"
                                />
                                <p className="text-sm text-[#777]">Mã: {item.code}</p>
                                <p className="text-[16px] font-bold text-[black] h-12 line-clamp-2">{item.name}</p>
                              </Link>
                              <div className="flex gap-3 mt-2 ">
                                <p className="text-[#29A07E] text-[18px] font-bold flex-1">
                                  {item.price.toLocaleString()} VNĐ
                                </p>
                                <button
                                  className='bg-[#e5f8ee] hover:bg-[#22a085] hover:text-white text-[#22a085] rounded-full 
                                  w-10 h-10 flex items-center justify-center hover:cursor-pointer'
                                  onClick={() => handleAddCart(userId!, item.id, 1)}
                                >
                                  <ShoppingCartOutlined />
                                </button>
                              </div>
                            </Card>
                          
                        // </div>
                      ))}
                    {/* day */}
                    </div>
                    
                  )}
                </div>
              )}
              
            </div>
            
          )}
          </div>
          {/* Danh sách sản phẩm */}
          
          
        </Col>
      </Row>
    </div>
  );
};

export default ProductByCat;