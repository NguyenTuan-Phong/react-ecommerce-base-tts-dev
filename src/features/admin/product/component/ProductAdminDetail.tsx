import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import isEqual from 'lodash.isequal';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCategories } from '../../../productdetail/hook/useCategories';
import { useProductById } from '../../../productdetail/hook/useProductById';
import { usePublishers } from '../../publisher/hook/usePublisher';
import { useRemoveProd } from '../hook/useRemoveProd';
import { useUpdateProduct } from '../hook/useUpdateProduct';
const { TextArea } = Input;

const ProductAdminDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProductById(id);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialProductData, setInitialProductData] = useState<any | null>(null);
  const handleBack = () => {
    navigate('/admin/prod-management');
  };

  const { data: categoryData } = useCategories(0, 50);
  const categories = categoryData?.data?.content || [];
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  useEffect(() => {
    if (!product) return;

    setInitialProductData({ ...product });
    setFileList([
      {
        uid: '-1',
        name: 'Ảnh sản phẩm',
        status: 'done',
        url: product.imageUrl,
      },
    ]);

    form.setFieldsValue({
      name: product.name,
      code: product.code,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      publisherId: product.publisher?.id,
      categoryItemIds: product.categoryItems?.[0]?.id,
      imageUrl: [
        {
          uid: '-1',
          name: 'Ảnh sản phẩm',
          status: 'done',
          url: product.imageUrl,
        },
      ],
    });
  }, [product]);

  useEffect(() => {
    if (product && categories.length > 0) {
      const selectedItem = product.categoryItems?.[0];
      const selectedCategory = categories.find((cat: { categoryItems: any[] }) =>
        cat.categoryItems?.some((item) => item.id === selectedItem?.id),
      );

      setSelectedCategoryId(selectedCategory?.id || null);
      setCategoryItems(selectedCategory?.categoryItems || []);

      form.setFieldsValue({
        name: product.name,
        code: product.code,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        publisherId: product.publisher?.id,
        categoryItemIds: selectedItem?.id,
      });
    }
  }, [product, categories, form]);

  const { isPendingRemoveProduct, onClickDelete } = useRemoveProd();

  const { mutate: updateProductMutate, isPending } = useUpdateProduct();

  const handleUpdate = (values: any) => {
    if (!product?.id) return;

    if (isEqual(initialProductData, values)) {
      toast.info('Không có thay đổi nào được thực hiện.!');
    }

    const categoryItemId = values.categoryItemIds;
    if (!categoryItemId) {
      toast.error('Vui lòng chọn loại sản phẩm.');
      return;
    }

    // Xử lý ảnh
    const fileList = values.imageUrl || [];
    const imageFile = fileList[0]?.originFileObj instanceof File ? fileList[0].originFileObj : null;

    updateProductMutate(
      {
        id: product.id,
        payload: {
          name: values.name,
          code: values.code,
          price: Number(values.price),
          quantity: Number(values.quantity),
          description: values.description,
          imageUrl: imageFile, // sẽ là null nếu không đổi
          categoryIds: [Number(categoryItemId)],
          publisherId: Number(values.publisherId),
        },
      },
      {
        onSuccess: () => {
          navigate('/admin/prod-management');
        },
      },
    );
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [categoryItems, setCategoryItems] = useState<any[]>([]);

  const { publisherData } = usePublishers();

  const publishers = publisherData?.data?.content || [];

  if (isLoading) return <div>Loading...</div>;
  if (error || !product) return <div>Không tìm thấy sản phẩm!</div>;

  return (
    <div className='p-3'>
      {/* Header */}
      <div className='max-w-[1440px] mx-auto'>
        <div className='flex gap-3 items-center mb-4'>
          <Button className='bg-[#fa7833] text-white' onClick={handleBack}>
            <ArrowLeftOutlined />
          </Button>
          <h1 className='text-[18px] font-bold'>{product.name}</h1>
        </div>

        {/* Form */}
        <Form form={form} layout='vertical' onFinish={handleUpdate}>
          <Row gutter={[48, 48]}>
            <Col xs={24} sm={24} md={15} lg={15}>
              <p className='font-bold text-[16px] mb-3'>Thông tin sản phẩm</p>

              <Form.Item label='Tên sản phẩm' name='name' rules={[{ required: true }]}>
                <Input className='p-3!' />
              </Form.Item>

              <Form.Item label='Mã sản phẩm' name='code' required>
                <Input />
              </Form.Item>

              <div className='flex gap-5'>
                <Form.Item label='Số lượng sản phẩm' name='quantity' className='flex-1' required>
                  <Input type='number' />
                </Form.Item>

                <Form.Item label='Giá bán' name='price' className='flex-1' required>
                  <Input suffix='₫' />
                </Form.Item>
              </div>

              <Form.Item label='Mô tả' name='description'>
                <TextArea rows={6} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={9} lg={9}>
              <Form.Item
                label='Ảnh sản phẩm'
                name='imageUrl'
                valuePropName='fileList'
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              >
                <Upload
                  listType='picture'
                  maxCount={1}
                  fileList={fileList}
                  onChange={({ fileList: newList }) => setFileList(newList)}
                  beforeUpload={() => false}
                  accept='image/*'
                >
                  <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                </Upload>
              </Form.Item>

              <div className='bg-white shadow rounded-xl p-4 flex flex-col gap-4'>
                <Form.Item label='Danh mục'>
                  <Select
                    placeholder='Chọn danh mục'
                    onChange={(value) => {
                      setSelectedCategoryId(value);
                      const selected = categories.find((cat: any) => cat.id === value);
                      setCategoryItems(selected?.categoryItems || []);
                      form.setFieldsValue({ categoryIds: undefined });
                    }}
                    value={selectedCategoryId}
                  >
                    {categories.map((cat: any) => (
                      <Select.Option key={cat.id} value={cat.id}>
                        {cat.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label='Loại sản phẩm' name='categoryItemIds' required>
                  <Select placeholder='Chọn loại sản phẩm' disabled={!selectedCategoryId}>
                    {categoryItems.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label='Nhãn hiệu' name='publisherId' required>
                  <Select placeholder='Chọn nhãn hiệu'>
                    {publishers.map((pub: any) => (
                      <Select.Option key={pub.id} value={pub.id}>
                        {pub.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Nút Lưu */}
              <div className='flex justify-end mt-5 gap-2 '>
                <button
                  type='button'
                  className='font-bold rounded-[5px] bg-[#ff5c00] text-[white] p-2 text-[14px] w-40 cursor-pointer'
                  onClick={() => onClickDelete(product.id)}
                  disabled={isPendingRemoveProduct}
                >
                  {isPendingRemoveProduct ? 'Đang xóa...' : 'Xóa sản phẩm'}
                </button>
                <Button
                  htmlType='submit'
                  disabled={isPending}
                  className='font-bold! rounded-[5px]! bg-[#fa7833]! text-[white]! h-12! text-[14px]! w-40! cursor-pointer!'
                >
                  Lưu thay đổi
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ProductAdminDetail;
