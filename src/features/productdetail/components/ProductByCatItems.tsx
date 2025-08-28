import { PlusCircleOutlined } from '@ant-design/icons';
import ShoppingCartOutlined from '@ant-design/icons/lib/icons/ShoppingCartOutlined';
import { Button, Card, Carousel, Col, Form, Input, Row, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import banner1 from '../../../assets/img/banner1.png';
import ImageWithFallback from '../../../components/img/ImageWithFallback';
import SkeletonProduct from '../../../components/skeleton/SkeletonProduct';
import useUserStore from '../../../store/useUserStore';
import useAddCart from '../../cart/hook/useAddCart';
import { useCart } from '../../cart/hook/useCart';
import { useCategories } from '../hook/useCategories';
import { useGetProductByCategoryItem } from '../hook/useGetProductByCategoryItem';
import { useGetPublishers } from '../hook/useGetPublishers';
import ProductFilterPage from './FilterProducts';
import StickCompare, { type ProductComapreProp } from './StickCompare';
import '../../../assets/css/ProductAnimation.css';


const ProductByCatItems = () => {
  const { id,itemId } = useParams();
  const { data: categoryData } = useCategories(0, 50);

  const pageGetProductByCategoryItem = 0;
  const sizeGetProductByCategoryItem = 10;
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [selectedPublisher, setSelectedPublisher] = useState<string | undefined>(undefined);
  const [productCompare, setProductCompare] = useState<ProductComapreProp[]>([]);
  const { ResponseGetPublisher } = useGetPublishers(0, 10);
  const { isPendingGetProductByCategoryItem, ResponseProductByCategoryItem } =
    useGetProductByCategoryItem(
      itemId!,
      pageGetProductByCategoryItem,
      sizeGetProductByCategoryItem,
      selectedPublisher,
      minPrice,
      maxPrice,
    );

  const categories = Array.isArray(categoryData?.data?.content) ? categoryData.data.content : [];
  const { refetchCart } = useCart();
  const { handleAddCart, loadingProductId } = useAddCart(refetchCart);
  const userId = useUserStore((state) => state.user?.id);
  const [form] = Form.useForm();

  const selectedCategoryItem = Array.isArray(categories)
    ? categories
        .flatMap((cat) => (Array.isArray(cat.categoryItems) ? cat.categoryItems : []))
        .find((item) => String(item?.id) === String(itemId))
    : null;

  const handleSearchPrice = (value: any) => {
    setMaxPrice(value.maxPrice);
    setMinPrice(value.minPrice);
  };

  const handleRemoveSearch = (value: any) => {
    form.resetFields();
    setMaxPrice(value.maxPrice);
    setMinPrice(value.minPrice);
  };

  useEffect(() => {
    form.setFieldsValue({
      minPrice,
      maxPrice,
    });
  }, [minPrice, maxPrice, form]);

  const handleAddProductCompare = (value: any) => {
    if (productCompare.length === 3) {
      toast.warning('Vui lòng xóa bớt sản phẩm để tiếp tục so sánh');
      return;
    }
    const result = productCompare.find((items) => items.id === value.id);
    if (!result) {
      const newProduct: ProductComapreProp = {
        id: value.id,
        img: value.imageUrl,
        productName: value.name,
      };

      setProductCompare([...productCompare, newProduct]);
    } else {
      toast.warning('Đã có sản phẩm này trong phần so sánh rồi.');
    }
  };

  if (!selectedCategoryItem) return <div>Không tìm thấy danh mục con phù hợp.</div>;

  return (
    <div>
      <section className='flex gap-4 py-5 flex-wrap'>
        <Link className='link' to={'/'}>
          TRANG CHỦ
        </Link>
        <p>/</p>
        <p className='font-bold'>{selectedCategoryItem.name}</p>
      </section>

      <Row gutter={[48, 48]} align='top' className='relative overflow-hidden mb-5'>
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
          <section className='w-full aspect-[16/5] relative overflow-hidden mb-5'>
            <Carousel autoplay autoplaySpeed={10000}>
              <div>
                <Link to=''>
                  <img
                    src={banner1}
                    className='w-full h-full object-cover rounded-[5px]'
                    alt='banner'
                  />
                </Link>
              </div>
              <div>
                <Link to=''>
                  <img
                    src={banner1}
                    className='w-full h-full object-cover rounded-[5px]'
                    alt='banner'
                  />
                </Link>
              </div>
            </Carousel>
          </section>

          <h2 className='text-2xl font-bold mb-4'>{selectedCategoryItem.name}</h2>
          <div className='bg-white flex flex-col rounded-2xl'>
            <div className='flex flex-col lg:flex-row px-5 pt-5 gap-4 relative'>
              <Form>
                <Select
                  className='w-full! lg:w-[220px]! h-9! rounded-[6px]! shadow-md!'
                  onChange={(value) => setSelectedPublisher(value === 'all' ? undefined : value)}
                  placeholder='Hãng sản xuất'
                  value={selectedPublisher}
                >
                  <Select.Option value='all'>Tất cả</Select.Option>
                  {ResponseGetPublisher?.data.content.map((i) => (
                    <Select.Option key={i.id} value={i.id}>
                      <p className='rounded-[6px]'>{i.name}</p>
                    </Select.Option>
                  ))}
                </Select>
              </Form>
              <Form
                form={form}
                className='flex flex-col justify-between sm:flex-row gap-2! sm:items-center w-full lg:w-auto'
                onFinish={handleSearchPrice}
              >
                <div className='flex gap-2'>
                  <Form.Item name='minPrice'>
                    <Input
                      type='number'
                      placeholder='Giá thấp nhất'
                      className=' h-9! rounded-[6px]! text-center text-[14px]! shadow-md! bg-white!'
                    />
                  </Form.Item>
                  <Form.Item name='maxPrice'>
                    <Input
                      type='number'
                      placeholder='Giá cao nhất'
                      className='h-9! rounded-[6px]! text-center text-[14px]! shadow-md! bg-white!'
                    />
                  </Form.Item>
                </div>
                <div className='flex gap-2'>
                  <Form.Item>
                    <Button
                      htmlType='submit'
                      className='bg-[#fa7833]! text-white! h-9! rounded-[6px]! shadow-md!'
                    >
                      Tìm kiếm
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className='bg-[#f5222d]! text-white! h-9! rounded-[6px]! shadow-md!'
                      onClick={handleRemoveSearch}
                    >
                      Xóa tìm kiếm
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
            <div className='w-full h-[1px] bg-gray-300'></div>
            {isPendingGetProductByCategoryItem ? (
              <div className='text-center content-center h-50'>
                {/* <Spin /> */}
                <SkeletonProduct />
              </div>
            ) : (
              <div>
                {!ResponseProductByCategoryItem ? (
                  <div className='bg-[white] h-50 text-content text-center content-center rounded-[8px]'>
                    Không có sản phẩm.
                  </div>
                ) : (
                  <div>
                    {ResponseProductByCategoryItem.data.content.length < 1 ? (
                      <div className='bg-[white] h-50 text-center content-center rounded-[8px] text-[16px]'>
                        Không có sản phẩm.
                      </div>
                    ) : (
                      <div className='bg-[white] rounded-xl'>
                        <div className='grid gap-4 bg-white p-5 rounded-xl grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                          {ResponseProductByCategoryItem.data.content.map((prod: any) => (
                            <Card
                              key={prod.id}
                              hoverable
                              className='bg-white rounded-[5px] shadow-sm product-card'
                              style={{ width: '100%' }} 
                            >
                              <Link to={`/products/${prod.id}`}>
                                <div className="overflow-hidden rounded-[8px]">
                                  <ImageWithFallback
                                    className="hover:cursor-pointer w-50 h-40 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                    src={prod.imageUrl}
                                    alt={prod.name}
                                  />
                                </div>
                                <p className='text-sm text-gray-500'>Mã: {prod.code}</p>
                                <p className='text-[16px] font-bold text-black  line-clamp-2 truncate'>
                                  {prod.name}
                                </p>
                                <div className='flex'>
                                  <p className='text-[14px]  line-clamp-2 text-gray-400 flex-1'>
                                    Số lượng:{prod.availableQuantity}
                                  </p>
                                  {prod.availableQuantity === 0 && (
                                    <p className='text-red-600 font-bold'>Hết hàng</p>
                                  )}
                                </div>
                              </Link>
                              <div className='flex gap-2 mt-2 min-h-10'>
                                {/* <p className="text-[#29A07E] text-[18px] font-bold flex-1">
                                {prod.price.toLocaleString()} VNĐ
                              </p> */}
                                 <div className="flex-1 flex flex-col justify-center">
                                  {prod?.flashPrice ? (
                                  <>
                                  <div className="text-gray-500 line-through text-[16px] h-[20px]">
                                    {prod?.originalPrice
                                    ? prod.originalPrice.toLocaleString('vi-VN') + ' VNĐ'
                                    : ''}
                                  </div>
                                  <div className="text-[#fa7833] text-[18px] font-bold">
                                    {prod.flashPrice.toLocaleString('vi-VN')} VNĐ
                                  </div>
                                  </>
                                  ) : (
                                  <>
      
                                  <div className="h-[20px]"></div>
                                  <div className="text-[#fa7833] text-[18px] font-bold">
                                    {prod?.price?.toLocaleString('vi-VN')} VNĐ
                                  </div>
                                  </>
                                )}
                              </div>

                                {prod.availableQuantity !== 0 && (
                                  <Button
                                    className='bg-[#e5f8ee]! hover:bg-[#fa7833]! hover:text-white! text-[#fa7833]! rounded-full! 
                                  w-10! h-10! flex! items-center! justify-center!'
                                    onClick={() => handleAddCart(userId!, false, prod.id, 1)}
                                    disabled={loadingProductId === prod.id}
                                  >
                                    {loadingProductId === prod.id ? (
                                      <Spin />
                                    ) : (
                                      <ShoppingCartOutlined />
                                    )}
                                  </Button>
                                )}
                              </div>
                              <div
                                className='flex gap-2 text-blue-500 hover:text-blue-300'
                                onClick={() => handleAddProductCompare(prod)}
                              >
                                <p>So sánh</p>
                                <PlusCircleOutlined />
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
      <StickCompare 
        category={id}
        productCompare={productCompare} 
        setProductCompare={setProductCompare} 
      />
    </div>
  );
};

export default ProductByCatItems;
