import {
  ArrowLeftOutlined,
  DollarOutlined,
  ShoppingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import ImageWithFallback from '../../../../components/img/ImageWithFallback';
import SkeletonViewDetailFlashSale from '../../../../components/skeleton/SkeletonViewDetailFlashSale';
import { useGetDetailCombo } from '../hook/useGetDetailCombo';

const ViewDetailCombo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoadingGetDetailCombo, ResponseDataGetDetailCombo } = useGetDetailCombo(id);

  const data = ResponseDataGetDetailCombo?.data;

  return (
    <div className='overflow-y-auto h-full px-6 py-2 bg-[#f7f9fb] rounded-md'>
      {isLoadingGetDetailCombo ? (
        <SkeletonViewDetailFlashSale />
      ) : (
        <div className='rounded-md'>
          <div className='mb-4'>
            <Button
              className='bg-[#fa7833] text-white hover:opacity-90 flex items-center gap-2'
              onClick={() => navigate(-1)}
            >
              <ArrowLeftOutlined />
              Quay lại
            </Button>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <div className='bg-white rounded-xl shadow-lg overflow-hidden min-h-full'>
                <ImageWithFallback src={data?.imageUrl} className='w-full h-80 object-cover p-4' />
                <div className='p-5'>
                  <h1 className='text-2xl font-bold text-gray-800 uppercase mb-2'>
                    {data?.nameCombo}
                  </h1>
                  <p className='text-gray-600 mb-4 leading-relaxed'>{data?.description}</p>
                  <div className='space-y-2 pt-4 flex justify-between'>
                    <p>Đã bán: {data?.soldQuantity}</p>
                    <p>Còn: {data?.remainingQuantity}</p>
                  </div>
                  <div className='space-y-2 border-gray-500 border-t border-dashed pt-4'>
                    <p className='text-sm text-gray-500 line-through flex items-center gap-1'>
                      <DollarOutlined />
                      Giá gốc: {data?.originalTotalPrice.toLocaleString()} VNĐ
                    </p>
                    <p className='text-sm text-red-600 flex items-center gap-1'>
                      <StarOutlined />
                      Giảm: {data?.discountAmount.toLocaleString()} VNĐ ({data?.discountPercentage}
                      %)
                    </p>
                    <p className='text-lg font-semibold text-[#fa7833] flex items-center gap-1'>
                      <ShoppingOutlined />
                      Giá sau KM: {data?.price.toLocaleString()} VNĐ
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} md={16}>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {data?.comboProducts.map((product) => (
                  <div
                    key={product.id}
                    className='bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300'
                  >
                    <ImageWithFallback
                      src={product.productImageUrl}
                      alt={product.productName}
                      className='w-full h-48 object-cover rounded-md'
                    />
                    <div className='mt-4'>
                      <h4 className='text-base font-semibold truncate' title={product.productName}>
                        {product.productName}
                      </h4>
                      <p className='text-sm text-[#fa7833] font-bold mt-1'>
                        Giá: {product.productPrice.toLocaleString()} VND
                      </p>
                      <div className='mt-2 text-sm text-gray-600 flex justify-between'>
                        {/* <span>Đã bán: <strong>{product.soldQuantity}</strong></span> */}
                        <span>
                          Số lượng: <strong>{product.quantity}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ViewDetailCombo;
