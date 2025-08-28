import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  Pagination,
  Table,
  type FormInstance,
} from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetAllProducts } from '../../product/hook/useGetAllProduct';
import { useCreateFlashSale } from '../hook/useCreateFlashSale';
import { useGetAllFlashSale } from '../hook/useGetAllFlashSale';
type FlashSaleProduct = {
  quantityFlashSale?: number;
  discount?: number;
  isQuantityConfirmed?: boolean;
  isDiscountConfirmed?: boolean;
};
type FormCreatFlashSale = {
  name: string;
  startTime: string;
  endTime: string;
};
interface FlashSaleProductSubmit {
  productId: string;
  flashPrice: number;
  availableQuantity: number;
}

const CreateFlashSale = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [lockedRowKeys, setLockedRowKeys] = useState<React.Key[]>([]);
  const [confirmedRows, setConfirmedRows] = useState<FlashSaleProductSubmit[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Record<number, FlashSaleProduct>>({});
  const formQuantityMap = useRef<Record<number, FormInstance>>({});
  const formDiscountMap = useRef<Record<number, FormInstance>>({});
  const [fromCreateFlashSale] = Form.useForm();
  const { allProductsData, isLoadingAllProducts } = useGetAllProducts(page, size, 'createdAt,desc');

  const { refetchFlashSale } = useGetAllFlashSale(0, 10);

  const { isLoadingCreateFlashSale, handleCreateFlashSale } = useCreateFlashSale(refetchFlashSale);

  // const {
  //         isLoadingGetFlashSaleById,
  //         ResponseFlashSaleById
  //     } = useGetFlashSaleById(id!)
  // const data = ResponseFlashSaleById?.data

  const submitFormCreateFlashSale = (value: FormCreatFlashSale) => {
    if (!confirmedRows || confirmedRows.length === 0) {
      toast.error('Vui lòng tạo sản phẩm cho chiến dịch.');
      return;
    }
    const data = {
      name: value.name,
      startTime: dayjs(value.startTime).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dayjs(value.endTime).format('YYYY-MM-DD HH:mm:ss'),
      products: confirmedRows,
    };
    handleCreateFlashSale(data);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys: React.Key[], selectedRows: any[]) => {
      const unlockedKeys = newSelectedKeys.filter((key) => !lockedRowKeys.includes(String(key)));
      const updatedKeys = Array.from(new Set([...lockedRowKeys, ...unlockedKeys]));
      setSelectedRowKeys(updatedKeys);

      const newSelectedMap = selectedRows.reduce((acc, row) => {
        const id = row.id;
        if (!lockedRowKeys.includes(String(id))) {
          acc[id] = {
            ...row,
            quantityFlashSale: undefined,
            discount: undefined,
            isQuantityConfirmed: false,
            isDiscountConfirmed: false,
          };
        }
        return acc;
      }, {} as Record<number, FlashSaleProduct>);

      setSelectedProducts((prev) => ({ ...prev, ...newSelectedMap }));
    },
    getCheckboxProps: (record: any) => ({
      disabled: lockedRowKeys.includes(String(record.id)),
    }),
  };

  const clearFormCreateFlashSale = () => {
    setConfirmedRows([]);
    fromCreateFlashSale.resetFields();
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => page * size + index + 1,
      width: '7%',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className='flex items-center gap-2'>
          <Avatar className='shrink-0!' shape='square' size={48} src={record.imageUrl} />
          <span className='text-[black]'>{text}</span>
        </div>
      ),
    },
    {
      title: 'Có thể bán',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '10%',
    },
    {
      title: 'Danh mục',
      key: 'categories',
      render: (_: any, record: any) =>
        record.categories && record.categories.length > 0
          ? record.categories[0].name
          : 'Không xác định',
    },
    {
      title: 'Nhãn hiệu',
      key: 'publisher',
      render: (_: any, record: any) => record.publisher?.name ?? 'Không xác định',
    },
    {
      title: 'Số lượng',
      key: 'quantityFlashSale',
      render: (_: any, record: any) => {
        const shouldShow =
          selectedRowKeys.includes(record.id) || lockedRowKeys.includes(String(record.id));
        if (!shouldShow) return null;

        const product = selectedProducts[record.id];

        if (product?.quantityFlashSale) {
          return <span>{product.quantityFlashSale}</span>;
        }

        return (
          <Form
            onFinish={({ quantityFlashSale }) => {
              setSelectedProducts((prev) => ({
                ...prev,
                [record.id]: {
                  ...prev[record.id],
                  quantityFlashSale,
                  isQuantityConfirmed: true,
                },
              }));
            }}
            initialValues={{ quantityFlashSale: product?.quantityFlashSale || '' }}
            className='flex gap-2'
          >
            <Form.Item
              name='quantityFlashSale'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền giá trị số lượng',
                },
                {
                  validator: (_, value) =>
                    value >= 0 ? Promise.resolve() : Promise.reject('Số lượng phải >= 0'),
                },
              ]}
            >
              <Input type='number' placeholder='Số lượng' className='h-12 w-full max-w-xs' />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='h-12!'>
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        );
      },
    },
    {
      title: 'Giá sau khi giảm',
      key: 'discountPrice',
      render: (_: any, record: any) => {
        const shouldShow =
          selectedRowKeys.includes(record.id) || lockedRowKeys.includes(String(record.id));
        if (!shouldShow) return null;

        const product = selectedProducts[record.id];

        if (product?.discount) {
          const discountPrice = record.price - (record.price * product.discount) / 100;
          return <span>{discountPrice.toFixed(2)} VND</span>;
        }

        return (
          <Form
            onFinish={({ discount }) => {
              setSelectedProducts((prev) => ({
                ...prev,
                [record.id]: {
                  ...prev[record.id],
                  discount,
                  isDiscountConfirmed: true,
                },
              }));
            }}
            initialValues={{ discount: product?.discount || '' }}
            className='flex gap-2'
          >
            <Form.Item
              name='discount'
              rules={[
                { required: true, message: 'Vui lòng điền giá trị giảm giá' },
                {
                  validator: (_, value) =>
                    value >= 0 && value <= 100
                      ? Promise.resolve()
                      : Promise.reject('Giảm giá phải từ 0 đến 100'),
                },
              ]}
            >
              <Input
                type='number'
                placeholder='% giảm'
                suffix='%'
                className='h-12 w-full max-w-xs'
              />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='h-12!'>
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => {
        const product = selectedProducts[record.id];
        const isSelected = selectedRowKeys.includes(record.id);
        const isConfirmed = confirmedRows.some((row) => row.productId === record.id);

        if (!isSelected && !lockedRowKeys.includes(String(record.id))) return null;

        const confirmedQuantity = product?.isQuantityConfirmed;
        const confirmedDiscount = product?.isDiscountConfirmed;

        if (confirmedQuantity && confirmedDiscount && !isConfirmed) {
          const flashPrice = record.price - (record.price * product.discount!) / 100;

          return (
            <Button
              type='primary'
              onClick={() => {
                const idStr = String(record.id);

                setConfirmedRows((prev) => [
                  ...prev,
                  {
                    productId: record.id,
                    flashPrice: parseFloat(flashPrice.toFixed(2)),
                    availableQuantity: Number(product.quantityFlashSale)!,
                  },
                ]);

                setLockedRowKeys((prev) => [...new Set([...prev, idStr])]);
                setSelectedRowKeys((prev) => [...new Set([...prev, idStr])]);

                setSelectedProducts((prev) => ({
                  ...prev,
                  [record.id]: {
                    ...prev[record.id],
                    isQuantityConfirmed: true,
                    isDiscountConfirmed: true,
                  },
                }));
              }}
            >
              Xác nhận
            </Button>
          );
        }

        if (isConfirmed) {
          return (
            <Button
              className='bg-green-700! text-white!'
              onClick={() => {
                const idStr = String(record.id);
                setConfirmedRows((prev) => prev.filter((row) => row.productId !== record.id));
                setLockedRowKeys((prev) => prev.filter((key) => key !== idStr));
                setSelectedRowKeys((prev) => prev.filter((key) => key !== idStr));

                setSelectedProducts((prev) => {
                  const newMap = { ...prev };
                  delete newMap[record.id];
                  return newMap;
                });

                formQuantityMap.current[record.id]?.resetFields?.();
                formDiscountMap.current[record.id]?.resetFields?.();
              }}
            >
              Chỉnh sửa
            </Button>
          );
        }

        return null;
      },
    },
  ];
  return (
    <div className='flex flex-col gap-3 h-full overflow-y-auto'>
      <div className=''>
        <Button className='bg-[#fa7833] text-white' onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </Button>
      </div>

      <div className='flex flex-col gap-3'>
        <b className='text-start'>Form Tạo chiến dịch giảm giá</b>
        <Form
          form={fromCreateFlashSale}
          onFinish={submitFormCreateFlashSale}
          className='grid grid-cols-2 gap-5'
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          labelAlign='left'
        >
          <div>
            <Form.Item
              name='name'
              label='Tên chiến dịch'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền tên chiến dịch',
                },
              ]}
            >
              <Input placeholder='Điền tên chiến dịch' className='h-12!' />
            </Form.Item>
            <Form.Item
              name='startTime'
              label='Thời gian bắt đầu chiến dịch'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn thời gian bắt đầu',
                },
              ]}
            >
              <DatePicker
                placeholder='Điền thời gian bắt đầu'
                className='h-12! flex-1! w-full!'
                showTime
              />
            </Form.Item>
            <Form.Item
              name='endTime'
              label='Thời gian kết thức chiến dịch'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn thời gian kết thúc',
                },
              ]}
            >
              <DatePicker
                placeholder='Điền thời gian kết thúc'
                className='h-12! w-full!'
                showTime
              />
            </Form.Item>
          </div>
          <div className='flex-1 flex'>
            <div className='w-[50%]'></div>
            <div className='flex flex-col'>
              <Form.Item noStyle>
                <Button
                  htmlType='submit'
                  className='h-12! px-15! w-full bg-[#fa7833]! text-white!'
                  loading={isLoadingCreateFlashSale}
                  disabled={isLoadingCreateFlashSale}
                >
                  Tạo
                </Button>
              </Form.Item>
              <Form.Item noStyle>
                <Button
                  className='h-12! px-15! w-full bg-red-500! text-white!'
                  onClick={() => clearFormCreateFlashSale()}
                >
                  Xóa Form
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <div className='my-5 relative'>
        <Table
          columns={columns}
          dataSource={allProductsData?.data?.content || []}
          rowKey='id'
          loading={isLoadingAllProducts}
          scroll={{ y: '450px)' }}
          rowSelection={rowSelection}
          pagination={false}
          className='min-h-50'
        />
        <div className='absolute left-1/2 -bottom-20 transform -translate-x-1/2'>
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
      </div>
    </div>
  );
};
export default CreateFlashSale;
