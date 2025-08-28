/* eslint-disable @typescript-eslint/no-unused-expressions */
import { EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input, Pagination, Select, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { contentOrder } from '../../../profile/type';
import { useGetAllOrderByAdmin } from '../hook/useGetAllOrderByAdmin';
interface FormSearch {
  code: string;
  recipientName: string;
  recipientPhone: number;
  shippingAddress: string;
}
const ManagementOrder = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [status, setStatus] = useState<string | null>(null);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [recipientName, setRecipientName] = useState<string | undefined>(undefined);
  const [recipientPhone, setrecipientPhone] = useState<number | undefined>(undefined);
  const [shippingAddress, setShippingAddress] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();

  const { isPendingGetALlOrderByAdmin, ResponseGetAllOrderByAdmin } = useGetAllOrderByAdmin(
    page,
    size,
    status !== null ? Number(status) : undefined,
    code,
    recipientName,
    recipientPhone,
    shippingAddress,
  );

  const dataAllOrder = ResponseGetAllOrderByAdmin?.data.content;

  useEffect(() => {
    setPage(0);
  }, [status]);

  const handleSearch = (value: FormSearch) => {
    setCode(value.code);
    setRecipientName(value.recipientName);
    setrecipientPhone(value.recipientPhone);
    setShippingAddress(value.shippingAddress);
  };

  const resetForm = () => {
    form.resetFields();
    setCode(undefined);
    setRecipientName(undefined);
    setrecipientPhone(undefined);
    setShippingAddress(undefined);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: any = [
    {
      key: 'view',
      render: (_: never, record: contentOrder) => {
        return (
          <Link to={'/admin/view-detail-order'} state={{ record }}>
            <EyeOutlined className='text-blue-500! cursor-pointer' />
          </Link>
        );
      },
      width: '4%',
    },
    {
      title: 'STT',
      key: 'index',
      render: (_: never, __: never, index: number) => page * size + index + 1,
      width: '6%',
    },
    {
      title: 'Mã đơn hàng',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Ngày đặt hàng',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (_: never, record: contentOrder) => {
        return <div>{dayjs(record.createdAt).format('DD/MM/YYYY')}</div>;
      },
    },
    {
      title: 'Tên khách hàng',
      key: 'recipientName',
      dataIndex: 'recipientName',
    },
    {
      title: 'Số điện thoại',
      key: 'recipientPhone',
      dataIndex: 'recipientPhone',
    },
    {
      title: 'Trạng thái đơn hàng',
      key: 'orderStatusText',
      dataIndex: 'orderStatusText',
      render: (text: string, record: contentOrder) => {
        let color = '';
        switch (record.orderStatus) {
          case 0:
            color = '#D48806';
            break;
          case 1:
            color = '#1677FF';
            break;
          case 2:
            color = '#1D39C4';
            break;
          case 3:
            color = '#389E0D';
            break;
          case 4:
            color = '#CF1322';
            break;
          default:
            color = 'gray';
        }

        return <b style={{ color }}>{text}</b>;
      },
    },
    {
      title: 'Thành tiền',
      key: 'totalMoney',
      dataIndex: 'totalMoney',
      render: (text: number) => (
        <p className='text-red-600 font-bold'>{text.toLocaleString()} VNĐ</p>
      ),
    },
    {
      title: 'Phương thức thanh toán',
      key: 'typeText',
      dataIndex: 'typeText',
      render: (text: string, record: contentOrder) => {
        let color = '';
        switch (record.type) {
          case 0:
            color = 'blue';
            break;
          case 1:
            color = 'orange';
            break;
          default:
            color = 'gray';
        }
        return <b style={{ color }}>{text}</b>;
      },
    },
  ];
  return (
    <div className='flex flex-col gap-3 relative h-full'>
      <b className='text-[18px] font-bold'>QUẢN LÝ CÁC LOẠI ĐƠN HÀNG</b>
      <div className='flex gap-3'>
        <Form>
          <Select
            className='w-50 h-12! shadow-md! rounded-[6px]!'
            defaultValue='all'
            onChange={(value) => setStatus(value === 'all' ? null : value)}
          >
            <Select.Option value='all'>Tất cả</Select.Option>
            <Select.Option value={0}>Chờ xác nhận</Select.Option>
            <Select.Option value={1}>Đang vận chuyển</Select.Option>
            <Select.Option value={2}>Đang giao</Select.Option>
            <Select.Option value={3}>Hoàn thành</Select.Option>
            <Select.Option value={4}>Đã hủy</Select.Option>
          </Select>
        </Form>
        <Form form={form} className='flex gap-3' onFinish={handleSearch}>
          <Form.Item name='code'>
            <Input className='h-12!' placeholder='Tìm kiếm theo mã đơn hàng' />
          </Form.Item>
          <Form.Item name='recipientName'>
            <Input className='h-12!' placeholder='Tìm kiếm theo tên khách hàng' />
          </Form.Item>
          <Form.Item name='recipientPhone'>
            <Input className='h-12!' placeholder='Tìm kiếm theo số điện thoại' />
          </Form.Item>
          <Form.Item name='shippingAddress'>
            <Input className='h-12!' placeholder='Tìm kiếm theo địa chỉ nhận hàng' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='h-12! bg-[#fa7833]! text-[white]!'>
              Tìm kiếm
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={resetForm} className='h-12! bg-[#fa7833]! text-[white]!'>
              Xóa tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <Table
          columns={columns}
          pagination={false}
          dataSource={dataAllOrder}
          scroll={{ y: 'calc(100vh - 440px)' }}
          rowKey={(record) => record.id}
          loading={isPendingGetALlOrderByAdmin}
        />
      </div>
      {ResponseGetAllOrderByAdmin?.data.currentTotalElementsCount !== 0 && (
        <div className='mt-4 absolute bottom-1 left-1/2 transform -translate-x-1/2'>
          <Pagination
            align='center'
            current={page + 1}
            pageSize={size}
            pageSizeOptions={['5', '10', '20', '50', '100']}
            onChange={(pageNumber, sizeNumber) => {
              setPage(pageNumber - 1), setSize(sizeNumber);
            }}
            total={ResponseGetAllOrderByAdmin?.data.currentTotalElementsCount}
            showSizeChanger
          />
        </div>
      )}
    </div>
  );
};
export default ManagementOrder;
