import {
  CheckSquareOutlined,
  CreditCardOutlined,
  InboxOutlined,
  PhoneOutlined,
  StarFilled,
  StarOutlined,
  StarTwoTone,
  TruckOutlined,
} from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageWithFallback from '../../../components/img/ImageWithFallback';
import useUserStore from '../../../store/useUserStore';
import type { Product } from '../../../types';
import { useCart } from '../../cart/hook';
import useAddCart from '../../cart/hook/useAddCart';
import Feedback from '../../feedback/components/Feedback';
import { useCategories } from '../hook/useCategories';
import { useProductById } from '../hook/useProductById';
import './ProductDetail.css';
import ViewedProducts from './ViewedProducts';
import { toast } from 'react-toastify';

const { Title } = Typography;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [number, setNumber] = useState(1);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const { data: categories } = useCategories(0, 10);
  const { data: product, isLoading, error } = useProductById(id);
  const { refetchCart } = useCart(); // lấy lại cart
  const { handleAddCart, loadingButton } = useAddCart(refetchCart);
  const userId = useUserStore((state) => state.user?.id);

  // Lưu sản phẩm đã xem vào localStorage
  useEffect(() => {
    if (product) {
      const stored = localStorage.getItem('recentlyViewed');
      let viewed: Product[] = stored ? JSON.parse(stored) : [];

      // Xoá sản phẩm nếu đã tồn tại để không bị trùng
      viewed = viewed.filter((p) => p.id !== product.id);

      // Thêm mới vào đầu
      viewed.unshift({
        id: product.id,
        name: product.name,
        price: product.price,
        flashPrice:product.flashPrice,
        originalPrice:product.originalPrice,
        imageUrl: product.imageUrl,
        quantity: product.quantity,
        code: product.code,
      } as Product);

      // Giới hạn 5 sản phẩm gần nhất
      if (viewed.length > 5) viewed = viewed.slice(0, 6);

      localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
      setRecentProducts(viewed);
    }
  }, [product]);

  const renderStars = (rating: number) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarFilled key={i} className='text-[#fadb14]!' />);
      } else if (i - rating < 1) {
        stars.push(<StarTwoTone twoToneColor='#fadb14' key={i} />);
      } else {
        stars.push(<StarOutlined key={i} className='text-[#fadb14]!' />);
      }
    }

    return stars;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !product) return <div>Không tìm thấy sản phẩm!</div>;

  return (
    <div className='max-w-[1400px] mx-auto'>
      <section className='flex gap-4 py-[20px]'>
        <Link className='link' to={'/'}>
          TRANG CHỦ
        </Link>
        <p className='section-text'>/</p>
        <p className='font-bold section-text'>CHI TIẾT SẢN PHẨM</p>
      </section>

      <Row
        gutter={[24, 24]}
        align='middle'
        className='rounded-xl shadow p-4 bg-white max-w-[1400px] m-0!'
      >
        <Col xs={24} md={8}>
          <div className='flex justify-center'>
            <ImageWithFallback
              src={product.imageUrl}
              alt={product.name}
              style={{
                objectFit: 'cover',
                height: 'auto',
                maxHeight: 420,
                width: '100%',
                borderRadius: 12,
              }}
            />
          </div>
        </Col>

        <Col xs={24} md={9} lg={9}>
          <Title level={3} className='!text-lg sm:!text-2xl mb-1!'>
            {product.name}
          </Title>
          <div className='flex mb-1'>
            <p className='text-[14px] line-clamp-2 text-gray-400 flex-1'>
              Số lượng:{product.availableQuantity}
            </p>
            {product.availableQuantity === 0 && <p className='text-red-600 font-bold'>Hết hàng</p>}
          </div>
          <div className='flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#8b8681]'>
            <span>Mã SP: {product.code}</span>
            <div className='flex items-center'>{renderStars(product.rating)}</div>
            <span>({product.rating} đánh giá)</span>
          </div>

          <div className='h-px bg-gray-300 my-4 w-full' />

          <p className='font-bold text-sm sm:text-base'>Thông số sản phẩm</p>
          <ul className='text-[#8b8681] text-xs sm:text-sm'>
            <li>{product.description}</li>
          </ul>

          <div className='h-[1px] bg-gray-300 mt-1 mb-4 w-full' />

          {/* PRICE BOX */}
          <div className='bg-[#f4f4f4] p-3 rounded-[5px] mt-2 w-full'>
            {product?.flashPrice ? (
              <>
                {product?.originalPrice && (
                  <div className='text-gray-500 text-[16px]'>
                    Giá tiền:{' '}
                    <span className='line-through'>
                      {product.originalPrice.toLocaleString()} VNĐ
                    </span>
                  </div>
                )}

                <Title level={4} className='!mb-0 !text-[#fa7833]'>
                  <span className=' text-xs sm:text-sm'>Khuyến mại: </span>
                  {product.flashPrice.toLocaleString()} VNĐ
                </Title>
              </>
            ) : (
              <Title level={4} className='!mb-0 !text-[#fa7833]'>
                <span className='text-[#8b8681] text-xs sm:text-sm'>Giá tiền: </span>
                {product?.price?.toLocaleString()} VNĐ
              </Title>
            )}
          </div>
          {product.availableQuantity !== 0 && (
            <div>
              <div className='flex gap-4 mt-5 text-sm sm:text-base items-center'>
                <span className='text-[#8b8681]'>Số lượng</span>
                <Button
                  onClick={() => setNumber((n) => Math.max(1, n - 1))}
                  disabled={number === 1}
                >
                  -
                </Button>
                <span>{number}</span>
                <Button
                  onClick={() => {
                    setNumber((n) => {
                      if (n < product.availableQuantity) {
                        return n + 1;
                      } else {
                        toast.warning("Bạn đã chọn số lượng tối đa!");
                        return n;
                      }
                    });
                  }}
                >
                  +
                </Button>
              </div>
              <Row gutter={[24, 24]} className='mt-5'>
                <Col xs={12} sm={12}>
                  <Button
                    className='w-full! font-bold! rounded-md! bg-[#fa7833]! text-white! py-3! h-13! text-base! sm:text-lg!'
                    onClick={() => handleAddCart(userId!,false, product.id, number)}
                    disabled={loadingButton === 0}
                    loading={loadingButton === 0}
                  >
                    THÊM VÀO GIỎ
                  </Button>
                </Col>
                <Col xs={12} sm={12}>
                  <Button
                    className='w-full! font-bold! rounded-md! bg-[#ff5c00]! text-white! py-3! text-base! sm:text-lg! h-13!'
                    onClick={() => {
                      handleAddCart(userId!, true, product.id, number);
                    }}
                    disabled={loadingButton === 1}
                    loading={loadingButton === 1}
                  >
                    MUA NGAY
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </Col>

        <Col xs={24} md={7} order={3}>
          <div className='space-y-4 md:gap-3 md:items-stretch'>
            <div className='policy-card flex-1 h-full'>
              <div className='policy-card-title'>CHÍNH SÁCH MUA HÀNG</div>
              <div className='policy-list'>
                <p className='policy-item'>
                  <CreditCardOutlined className='icon' />
                  Thanh toán thuận tiện
                </p>
                <p className='policy-item'>
                  <CheckSquareOutlined className='icon' />
                  Sản phẩm 100% chính hãng
                </p>
                <p className='policy-item'>
                  <InboxOutlined className='icon' />
                  Bảo hành nhanh chóng
                </p>
                <p className='policy-item'>
                  <TruckOutlined className='icon' />
                  Giao hàng toàn quốc
                </p>
              </div>
            </div>

            <div className='policy-card flex-1 h-full'>
              <div className='policy-card-title'>HOTLINE HỖ TRỢ</div>
              <div className='policy-list h-[152px]'>
                <a href='tel:0349296461' className='policy-item'>
                  <PhoneOutlined className='icon' />
                  Hotline CSKH: 0349.296.461
                </a>
                <a href='tel:0349296461' className='policy-item'>
                  <PhoneOutlined className='icon' />
                  Tư vấn mua hàng: 0349.296.461
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Feedback />
      {/*  Hiển thị sản phẩm đã xem */}
      {recentProducts.length > 0 && (
        <div className='mt-5 mb-5'>
          <ViewedProducts
            products={recentProducts.filter((p) => p.id !== product.id)}
            categories={categories?.data.content}
            title='SẢN PHẨM ĐÃ XEM'
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;