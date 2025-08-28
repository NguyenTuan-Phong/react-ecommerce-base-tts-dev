import { EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Pagination, Row, Table } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonDelete from '../../../../components/button/ButtonDelete';
import { useGetAllCombo } from '../hook/useGetAllCombo';
import { useRemoveCombo } from '../hook/useRemoveCombo';
import type { Combo } from '../type';

const ManagementCombo = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [seacrhName, setSearchName] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const [formSearch] = Form.useForm();
  const { refetchDataGetAllCombo, isLoadingGetAllCombo, ResponseDataGetAllCombo } = useGetAllCombo(
    page,
    size,
    seacrhName,
  );

  const { isLoadingRemoveCombo, handleRemoveCombo } = useRemoveCombo(refetchDataGetAllCombo);

  const handleSeaarch = (value: any) => {
    setSearchName(value.keyword);
  };

  const handleClearSearch = () => {
    formSearch.resetFields();
    setSearchName(undefined);
  };

  const columns = [
    {
      key: 'id',
      render: (record: Combo) => {
        return (
          <Link to={`/admin/view-detail-combo/${record.id}`} className='flex items-center gap-2'>
            <EyeOutlined className='text-blue-500! cursor-pointer' />
          </Link>
        );
      },
      width: '4%',
    },
    {
      title: 'STT',
      key: 'STT',
      render: (_: Combo, __: Combo, index: number) => page * size + index + 1,
      width: '7%',
    },
    {
      title: 'Têm Combo',
      key: 'nameCombo',
      dataIndex: 'nameCombo',
      render: (value: string, record: Combo) => (
        <div className='flex items-center gap-2'>
          <Avatar className='shrink-0!' shape='square' size={48} src={record.imageUrl} />
          <span className='text-[black] line-clamp-2'>{value}</span>
        </div>
      ),
    },
    {
      title: 'Giá',
      key: 'price',
      dataIndex: 'price',
      render: (price: number, record: Combo) => (
        <div className='flex flex-col relative'>
          <p className='text-gray-400 line-through'>
            {record.originalTotalPrice.toLocaleString()} VNĐ
          </p>
          <p className='font-bold text-red-500'>{price.toLocaleString()} VNĐ</p>
          <div className='absolute w-10 right-0 top-0 transform -translate-1/2 text-white bg-red-500 text-[10px] p-1'>
            - {record.discountPercentage} %
          </div>
        </div>
      ),
    },
    {
      title: 'Thời gian khởi tạo',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (createdAt: string) => dayjs(createdAt).format('DD-MM-YYYY'),
    },
    {
      title: 'Trạng thái',
      key: 'isActive',
      dataIndex: 'isActive',
      render: (isActive: boolean) => (
        <div>
          {isActive ? (
            <div className='text-green-500 font-bold'>Đang hoạt động</div>
          ) : (
            <div className='text-red-500 font-bold'>Đã dừng</div>
          )}
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'active',
      render: (record: Combo) => (
        <div className='flex gap-2'>
          <ButtonDelete
            danger={true}
            onConfirm={() => handleRemoveCombo(record.id)}
            isLoading={isLoadingRemoveCombo}
          />

          <Button className='bg-green-700! text-[white]!'>
            <Link to={'/admin/update-combo-product'} state={{ id: record.id }}>
              Cập nhật
            </Link>
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className='relative h-full'>
      <Row gutter={[4, 4]} align='middle'>
        <Col xs={24} sm={24} md={16} lg={16}>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>QUẢN LÝ CÁC LOẠI SẢN PHẨM</p>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} className='text-right flex! justify-end!'>
          <Button
            className='p-5! bg-[#fa7833]! text-[white]! '
            onClick={() => navigate('/admin/create-combo-product')}
          >
            <PlusCircleOutlined />
            Tạo Combo Sản Phẩm
          </Button>
        </Col>
      </Row>

      <div>
        <Form form={formSearch} onFinish={handleSeaarch} style={{ display: 'flex', gap: 10 }}>
          <Form.Item name='keyword'>
            <Input className='h-12! w-[_20vw]!' placeholder='Tìm kiếm theo tên' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='h-12! w-50 bg-[#fa7833]! text-white! font-bold!'>
              Tìm kiếm
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={handleClearSearch}
              className='h-12! w-50 bg-[#fa7833]! text-white! font-bold!'
            >
              Xóa tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className='pt-5'>
        <Table
          columns={columns}
          loading={isLoadingGetAllCombo}
          dataSource={ResponseDataGetAllCombo?.data?.content || []}
          pagination={false}
          rowKey='id'
          scroll={{ y: 'calc(100vh - 450px)' }}
        />
      </div>

      <div className='mt-4 absolute bottom-1 left-1/2 transform -translate-x-1/2'>
        <Pagination
          align='center'
          current={page + 1}
          pageSize={size}
          pageSizeOptions={['5', '10', '20', '50', '100']}
          onChange={(pageNumber, sizeNumber) => {
            setPage(pageNumber - 1), setSize(sizeNumber);
          }}
          total={ResponseDataGetAllCombo?.data.currentTotalElementsCount}
        />
      </div>
    </div>
  );
};
export default ManagementCombo;