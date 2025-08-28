import { EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Pagination, Table } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonDelete from '../../../../components/button/ButtonDelete';
import { useDeleteFlashSale } from '../hook/useDeleteFlashSale';
import { useGetAllFlashSale } from '../hook/useGetAllFlashSale';

const ManagementFlashSale = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
  const [searchStartTime, setSearchStartTime] = useState<string | undefined>(undefined);
  const [searchEndTime, setSearchEndTime] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isLoadingGetAllFlashSale, ResponseFlashSale, refetchFlashSale } = useGetAllFlashSale(
    page,
    size,
    searchName,
    searchStartTime,
    searchEndTime,
  );

  const { isLoadingDeleteFlashSale, handleDeleteFlashSale } = useDeleteFlashSale(refetchFlashSale);

  const handleSearch = (value: any) => {
    const startTime = value.startTime ? dayjs(value.startTime).format() : undefined;
    const endTime = value.endTime ? dayjs(value.endTime).format() : undefined;
    const name = value.name ? value.name : undefined;
    setSearchName(name);
    setSearchStartTime(startTime);
    setSearchEndTime(endTime);
  };

  const resetForm = () => {
    form.resetFields();
    setSearchName(undefined);
    setSearchStartTime(undefined);
    setSearchEndTime(undefined);
  };

  const columns = [
    {
      key: 'id',
      render: (record: any) => {
        return (
          <Link
            to={`/admin/view-detail-flashsale/${record.id}`}
            className='flex items-center gap-2'
          >
            <EyeOutlined className='text-blue-500! cursor-pointer' />
          </Link>
        );
      },
      width: '4%',
    },
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => page * size + index + 1,
      width: '5%',
    },
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      width: '5%',
    },
    {
      title: 'Tên chiến dịch',
      key: 'name',
      dataIndex: 'name',
      render: (text: string) => {
        return <p className='font-bold'>{text}</p>;
      },
    },
    {
      title: 'Thời gian bắt đầu',
      key: 'startTime',
      dataIndex: 'startTime',
      render: (text: string) => {
        return <div>{dayjs(text).format('DD/MM/YYYY HH:mm:ss')}</div>;
      },
    },
    {
      title: 'Thời gian kết thúc',
      key: 'endTime',
      dataIndex: 'endTime',
      render: (text: string) => {
        return <div>{dayjs(text).format('DD/MM/YYYY HH:mm:ss')}</div>;
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (record: any) => {
        const now = dayjs();
        const start = dayjs(record.startTime);
        const end = dayjs(record.endTime);

        const descriptors = [
          {
            status: () => start.isAfter(now),
            label: 'Sắp tới',
            color: 'text-blue-500',
          },
          {
            status: () => end.isBefore(now),
            label: 'Đã qua',
            color: 'text-red-500',
          },
          {
            status: () => true,
            label: 'Đang diễn ra',
            color: 'text-green-500',
          },
        ];

        const { label, color } = descriptors.find((d) => d.status())!;

        return <p className={`${color} font-bold`}>{label}</p>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => {
        const now = dayjs();
        const end = dayjs(record.endTime);
        const isExpired = end.isBefore(now);
        return (
          <div className='flex gap-2'>
            <ButtonDelete
              danger={true}
              onConfirm={() => handleDeleteFlashSale(record.id)}
              isLoading={isLoadingDeleteFlashSale}
            />
            {!isExpired && (
              <Button className='bg-green-700! text-[white]!'>
                <Link to={'/admin/update-flashsale'} state={{ id: record.id }}>
                  Cập nhật
                </Link>
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className='flex flex-col gap-3 relative h-full'>
      <div className='flex justify-between'>
        <b className='text-[18px] font-bold'>QUẢN LÝ CÁC CHIẾN DỊCH GIẢM GIÁ</b>
        <div className='flex gap-5'>
          <Button
            icon={<PlusCircleOutlined />}
            className=' p-5! bg-[#fa7833]! text-[white]!'
            onClick={() => navigate('/admin/create-flashsale')}
          >
            Tạo chiến dịch giảm giá
          </Button>
        </div>
      </div>
      <div className='flex gap-3'>
        <Form form={form} className='flex gap-3' onFinish={handleSearch}>
          <Form.Item name='name'>
            <Input className='h-12!' placeholder='Tìm kiếm theo tên chiến dịch' />
          </Form.Item>
          <Form.Item name='startTime'>
            <DatePicker className='h-12!' placeholder='Tìm kiếm theo ngày bắt đầu' />
          </Form.Item>
          <Form.Item name='endTime'>
            <DatePicker className='h-12!' placeholder='Tìm kiếm theo ngày kết thúc' />
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
      <Table
        columns={columns}
        dataSource={ResponseFlashSale?.data.content}
        loading={isLoadingGetAllFlashSale}
        pagination={false}
        scroll={{ y: 'calc(100vh - 440px)' }}
        rowKey={(record: any) => record.productId}
      />
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
        <Pagination
          current={page + 1}
          pageSize={size}
          onChange={(newPage, newSize) => {
            setPage(newPage - 1), setSize(newSize);
          }}
          total={ResponseFlashSale?.data.currentTotalElementsCount}
        />
      </div>
    </div>
  );
};
export default ManagementFlashSale;
