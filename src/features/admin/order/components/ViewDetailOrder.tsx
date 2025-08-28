import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import type { contentOrder } from '../../../profile/type';
import { useUpdateStatusOrder } from '../hook/useUpdateStatusOrder';
const ViewDetailOrder = () => {
  const location = useLocation();
  const record: contentOrder = location.state?.record;
  const navigate = useNavigate();

  const { isPendingUpdateStatusOrder, handleUpdateStatusOrder } = useUpdateStatusOrder();

  const statusSteps = [
    { label: 'Xác nhận', icon: ClockCircleOutlined },
    { label: 'Đang vận chuyển', icon: CarOutlined },
    { label: 'Đang giao', icon: AppstoreOutlined },
    { label: 'Hoàn thành', icon: CheckCircleOutlined },
    { label: 'Đã hủy', icon: CloseCircleOutlined },
  ];

  const getStatusColor = (index: number) => {
    if (record.orderStatus === 4 && index === 4) return 'text-red-500';
    if (index === 0) return 'text-green-600';
    if (record.orderStatus >= index) return 'text-green-600';
    if (record.orderStatus + 1 === index) return 'text-blue-600';
    return 'text-gray-300';
  };

  const handleUpdate = (orderId: string, status: number) => {
    const value = {
      orderId,
      status,
      userId: record.userId,
    };

    handleUpdateStatusOrder(value);
  };

  return (
    <div className='overflow-y-auto h-full p-2'>
      <div className=''>
        <Button className='bg-[#fa7833] text-white' onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </Button>
      </div>
      <div className='text-center text-[22px] py-5'>
        <b className='text-center'>
          Thông tin chi tiết đơn hàng: <b className='text-red-500'>{record.code}</b>
        </b>
      </div>
      <div className='flex items-start justify-between mb-8'>
        {statusSteps.map((step, index) => {
          const Icon = step.icon;
          const isCancelled = record.orderStatus === 4;

          return (
            <div key={index} className='flex flex-col items-center text-center flex-1'>
              {/* Icon */}
              <Icon className={`w-6 h-6 mb-1 ${getStatusColor(index)}`} />

              {/* Label */}
              <span className={`text-sm font-medium mb-3 ${getStatusColor(index)}`}>
                {step.label}
              </span>

              {/* Gạch chân */}
              {(index < statusSteps.length - 1 || (isCancelled && index === 4)) && (
                <div className='w-full h-1 mb-3 mt-1 relative bg-gray-200'>
                  <div
                    className='absolute top-0 left-0 h-1'
                    style={{
                      width: '100%',
                      backgroundColor:
                        record.orderStatus === 4 && index === 4
                          ? '#ef4444' // đỏ khi bị hủy
                          : index === 0 || record.orderStatus >= index
                          ? '#22c55e' // xanh nếu đã qua bước đó
                          : record.orderStatus + 1 === index
                          ? '#3b82f6' // xanh dương cho bước kế tiếp
                          : '#e5e7eb', // xám
                    }}
                  />
                </div>
              )}

              {/* Button xác nhận */}
              {record.orderStatus !== 4 &&
                record.orderStatus >= 0 &&
                record.orderStatus < 3 &&
                record.orderStatus + 1 === index && (
                  <Button
                    className='px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'
                    onClick={() => handleUpdate(record.id, index)}
                    loading={isPendingUpdateStatusOrder}
                  >
                    Xác nhận
                  </Button>
                )}
            </div>
          );
        })}
      </div>

      {/* Order Info */}
      <div className='bg-white shadow rounded-lg p-6 mb-6 space-y-4 border border-gray-300'>
        <div className='flex justify-between'>
          <div>
            <p className='text-sm text-gray-500'>Mã đơn hàng</p>
            <p className='font-medium'>{record.code}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Ngày tạo</p>
            <p className='font-medium'>{new Date(record.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-gray-500'>Khách hàng</p>
            <p className='font-medium'>{record.customerName}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Hình thức thanh toán</p>
            <p className='font-medium'>{record.typeText}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Người nhận</p>
            <p className='font-medium'>{record.recipientName}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Số điện thoại</p>
            <p className='font-medium'>{record.recipientPhone}</p>
          </div>
          <div className='sm:col-span-2'>
            <p className='text-sm text-gray-500'>Địa chỉ giao hàng</p>
            <p className='font-medium'>{record.shippingAddress}</p>
          </div>
          <div className='sm:col-span-2'>
            <p className='text-sm text-gray-500'>Ghi chú</p>
            <p className='font-medium'>{record.note || 'Không có'}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className='bg-white shadow rounded-lg p-6 mb-6 border border-gray-300'>
        <h2 className='text-lg font-semibold mb-4'>Sản phẩm</h2>
        <ul className='divide-y divide-gray-200'>
          {record.items.map((item, idx) => (
            <li key={idx} className='py-4 flex justify-between items-center'>
              <div>
                <p className='font-medium'>{item.productName}</p>
                <p className='text-sm text-gray-500'>Mã: {item.productCode}</p>
                <p className='text-sm text-gray-500'>Số lượng: {item.quantity}</p>
              </div>
              <div className='text-right'>
                <p className='font-medium'>{item.totalPrice.toLocaleString()} đ</p>
                <p className='text-sm text-gray-500'>Đơn giá: {item.price.toLocaleString()} đ</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Summary */}
      <div className='bg-white shadow rounded-lg p-6 border border-gray-300'>
        <h2 className='text-lg font-semibold mb-4'>Tóm tắt đơn hàng</h2>
        <div className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <span>Tạm tính:</span>
            <span>{record.originMoney.toLocaleString()} đ</span>
          </div>
          <div className='flex justify-between'>
            <span>Giảm giá:</span>
            <span>- {record.reduceMoney.toLocaleString()} đ</span>
          </div>
          <div className='flex justify-between'>
            <span>Phí vận chuyển:</span>
            <span>{record.shippingMoney.toLocaleString()} đ</span>
          </div>
          <div className='border-t pt-2 flex justify-between font-semibold text-base'>
            <span>Tổng cộng:</span>
            <span>{record.totalMoney.toLocaleString()} đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewDetailOrder;
