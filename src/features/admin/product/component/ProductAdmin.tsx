import { PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Pagination, Row, Table } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import type { Product } from '../../../../types';
import { useGetAllProducts } from '../hook/useGetAllProduct';
interface FormSearch {
  nameProduct: string;
}

const ProductAdmin: React.FC = () => {
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate('/admin/add-product');
  };
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [searchNameProduct, setSearchNameProduct] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();

  const { allProductsData, isLoadingAllProducts } = useGetAllProducts(
    page,
    size,
    'createdAt,desc',
    searchNameProduct,
  );

  const handleSearch = (value: FormSearch) => {
    setSearchNameProduct(value.nameProduct);
  };

  const removeSearch = () => {
    form.resetFields();
    setSearchNameProduct(form.getFieldValue('nameProduct'));
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => page * size + index + 1,
      width: '7%',
    },
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      width: '7%',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (value: string, record: any) => (
        <div className='flex items-center gap-2'>
          <Avatar className='shrink-0!' shape='square' size={48} src={record.imageUrl} />
          <span className='text-[black] line-clamp-2'>{value}</span>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'availableQuantity',
      key: 'availableQuantity',
    },
    {
      title: 'Danh mục',
      key: 'categories',
      render: (record: Product) =>
        record.categories && record.categories.length > 0
          ? record.categories[0].name
          : 'Không xác định',
    },
    {
      title: 'Nhãn hiệu',
      key: 'publisher',
      render: (record: Product) => record.publisher?.name ?? 'Không xác định',
    },
    {
      title: 'Ngày khởi tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) =>
        new Date(text).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
    },
  ];

  return (
    <div className='mx-auto px-4 relative h-full'>
      {/* Header */}
      <Row gutter={[48, 48]} align='middle'>
        <Col xs={24} sm={24} md={16} lg={16}>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>DANH SÁCH SẢN PHẨM</p>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} className='text-right flex! justify-end!'>
          <Button className='p-5! bg-[#fa7833]! text-[white]!' onClick={handleAddProduct}>
            <PlusCircleOutlined />
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>

      <Form form={form} onFinish={handleSearch} className='flex gap-3'>
        <Form.Item name='nameProduct'>
          <Input className='h-12! w-55!' placeholder='Tìm kiếm theo tên sản phẩm' />
        </Form.Item>
        <Form.Item>
          <Button className='h-12! bg-[#fa7833]! text-[white]!' htmlType='submit'>
            Tìm kiếm
          </Button>
        </Form.Item>
        <Form.Item>
          <Button className='h-12! bg-[#fa7833]! text-[white]!' onClick={removeSearch}>
            Xóa tìm kiếm
          </Button>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={allProductsData?.data?.content || []}
        rowKey='id'
        loading={isLoadingAllProducts}
        scroll={{ y: 'calc(100vh - 450px)' }}
        rowSelection={{ type: 'checkbox' }}
        pagination={false}
        onRow={(record) => ({
          onClick: () => {
            navigate(`/admin/prod-detail-admin/${record.id}`);
          },
          style: { cursor: 'pointer' },
        })}
        className='mb-50'
      />
      <div className='absolute left-1/2 bottom-0 transform -translate-x-1/2'>
        <Pagination
          align='center'
          current={page + 1}
          pageSize={size}
          total={allProductsData?.data?.currentTotalElementsCount ?? 0}
          pageSizeOptions={['5', '10', '20', '50', '100']}
          showSizeChanger
          onChange={(newPage, newSize) => {
            setPage(newPage - 1);
            setSize(newSize);
          }}
        />
      </div>

      <Outlet />
    </div>
  );
};

export default ProductAdmin;
