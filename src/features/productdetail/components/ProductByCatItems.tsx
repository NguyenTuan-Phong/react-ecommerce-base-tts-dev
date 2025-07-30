import { useParams } from "react-router-dom";
import { useCategories } from "../hook/useCategories";
import { Button, Card, Carousel, Col, Form, Input, Row, Select} from "antd";
import { Link } from "react-router-dom";
import banner1 from "../../../assets/img/banner1.png";
import ShoppingCartOutlined from "@ant-design/icons/lib/icons/ShoppingCartOutlined";
import useUserStore from "../../../store/useUserStore";
import { useEffect, useState } from "react";
import ProductFilterPage from "./FilterProducts";
import { useCart } from "../../cart/hook/useCart";
import useAddCart from "../../cart/hook/useAddCart";
import ImageWithFallback from "../../../components/img/ImageWithFallback";
import { useGetProductByCategoryItem } from "../hook/useGetProductByCategoryItem";
import SkeletonProduct from "../../../components/product/SkeletonProduct";
import { useGetPublishers } from "../hook/useGetPublishers";

const ProductByCatItems = () => {

  const { itemId } = useParams();
  const { data: categoryData } = useCategories();

  const pageGetProductByCategoryItem = 0;
  const sizeGetProductByCategoryItem = 10;
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [selectedPublisher, setSelectedPublisher] = useState<string | undefined>(undefined);
  const {
    ResponseGetPublisher
  } = useGetPublishers(0, 10)
  const { 
    isPendingGetProductByCategoryItem, 
    ResponseProductByCategoryItem } =
    useGetProductByCategoryItem(
      itemId!,
      pageGetProductByCategoryItem,
      sizeGetProductByCategoryItem,
      selectedPublisher,
      minPrice,
      maxPrice
    );

  const categories = Array.isArray(categoryData?.data) ? categoryData.data : [];
  const { refetchCart } = useCart();
  const { handleAddCart } = useAddCart(refetchCart);
  const userId = useUserStore((state) => state.user?.id);
  const [form] = Form.useForm();
  const [formSearch] = Form.useForm()
  //Chọn filter
  const selectedCategoryItem = Array.isArray(categories)
    ? categories
        .flatMap((cat) =>
          Array.isArray(cat.categoryItems) ? cat.categoryItems : []
        )
        .find((item) => String(item?.id) === String(itemId))
    : null;

  
  const handleSearchPrice = (value: any) => {
    setMaxPrice(value.maxPrice);
    setMinPrice(value.minPrice);
  }

  const handleRemoveSearch = (value: any) => {
    form.resetFields();
    setMaxPrice(value.maxPrice);
    setMinPrice(value.minPrice);
  }

  useEffect(() => {
    form.setFieldsValue({
      minPrice,
      maxPrice,
    });
  }, [minPrice, maxPrice, form]);

  if (!selectedCategoryItem)
  return <div>Không tìm thấy danh mục con phù hợp.</div>;

  return (
    <div>
      <section className="flex gap-4 py-5 flex-wrap">
        <Link className="link" to={"/"}>
          TRANG CHỦ
        </Link>
        <p>/</p>
        <p className="font-bold">{selectedCategoryItem.name}</p>
      </section>

      <Row
        gutter={[48, 48]}
        align="top"
        className="relative overflow-hidden mb-5">
        <Col xs={24} sm={24} md={7} lg={7}>
          <ProductFilterPage
            selectedPublisher={selectedPublisher}
            setSelectedPublisher={setSelectedPublisher}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </Col>

        <Col xs={24} md={17}>
          <section className="w-full aspect-[16/5] relative overflow-hidden mb-5">
            <Carousel autoplay autoplaySpeed={10000}>
              <div>
                <Link to="">
                  <img
                    src={banner1}
                    className="w-full h-full object-cover rounded-[5px]"
                    alt="banner"
                  />
                </Link>
              </div>
              <div>
                <Link to="">
                  <img
                    src={banner1}
                    className="w-full h-full object-cover rounded-[5px]"
                    alt="banner"
                  />
                </Link>
              </div>
            </Carousel>
          </section>

          <h2 className="text-2xl font-bold mb-4">
            {selectedCategoryItem.name}
          </h2>
          <div className="bg-white flex flex-col rounded-2xl">
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
                      className=" h-9! rounded-[6px]! text-center text-[14px]! shadow-md! bg-white!"
                    />
                  </Form.Item>
                  <Form.Item name="maxPrice">
                    <Input
                      type="number"
                      placeholder="Giá cao nhất"
                      className="h-9! rounded-[6px]! text-center text-[14px]! shadow-md! bg-white!"
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
            {isPendingGetProductByCategoryItem ? (
            <div className="text-center content-center h-50">
              {/* <Spin /> */}
              <SkeletonProduct />
            </div>
          ) : (
            <div>
              {!ResponseProductByCategoryItem ? (
                <div className="bg-[white] h-50 text-content text-center content-center rounded-[8px]">
                  Không có sản phẩm.
                </div>
              ) : (
                <div>
                  {ResponseProductByCategoryItem.data.content.length < 1 ? (
                    <div className="bg-[white] h-50 text-center content-center rounded-[8px] text-[16px]">
                      Không có sản phẩm.
                    </div>
                  ) : (
                    <div className="bg-[white] rounded-xl">
                    <div className="grid gap-4 bg-white p-5 rounded-xl grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {ResponseProductByCategoryItem.data.content.map((prod: any) => (
                          <Card
                            key={prod.id}
                            hoverable
                            className="bg-white rounded-[5px] shadow-sm"
                            style={{ width: "100%" }} // Đảm bảo card full width trong ô grid
                          >
                            <Link to={`/products/${prod.id}`}>
                              <ImageWithFallback
                                src={prod.imageUrl}
                                alt={prod.name}
                                className="h-40 w-full object-cover rounded-t-[5px]"
                              />
                              <p className="text-sm text-gray-500">Mã: {prod.code}</p>
                              <p className="text-[16px] font-bold text-black  line-clamp-2 h-12">{prod.name}</p>
                            </Link>
                            <div className="flex gap-2 mt-2">
                              <p className="text-[#29A07E] text-[18px] font-bold flex-1">
                                {prod.price.toLocaleString()} VNĐ
                              </p>
                              <button
                                className="bg-[#e5f8ee] hover:bg-[#22a085] hover:text-white text-[#22a085] rounded-full 
                                w-10 h-10 flex items-center justify-center hover:cursor-pointer"
                                onClick={() => handleAddCart(userId!, prod.id, 1)}
                              >
                                <ShoppingCartOutlined />
                              </button>
                            </div>
                          </Card>
                        ))}
                      </div>

                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          </div>
          
        </Col>
      </Row>
    </div>
  );
};

export default ProductByCatItems;
