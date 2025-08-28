import { ArrowLeftOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Upload } from 'antd';
import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getImageEmbedding } from '../../../../components/mobilenet/getImageEmbedding';
import { useCategories } from '../../../productdetail/hook/useCategories';
import { usePublishers } from '../../publisher/hook/usePublisher';
import { useCreateProduct } from '../hook/useAddProduct';

const { TextArea } = Input;

const AddProductAdmin: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isEmbedding, setIsEmbedding] = useState(false);
  const handleProduct = () => {
    navigate('/admin/prod-management');
  };

  const { createProductMutate, isCreating } = useCreateProduct();

  const handleAddProduct = async (values: any) => {
    const imageFile = values.imageFile?.[0]?.originFileObj;

    if (!imageFile || !(imageFile instanceof File)) {
      toast.error('Ảnh không hợp lệ!');
      return;
    }

    setIsEmbedding(true);
    let embedding;
    try {
      embedding = await getImageEmbedding(imageFile);
    } catch (err) {
      toast.error('Lỗi khi sinh vector từ ảnh!');
      setIsEmbedding(false);
      return;
    }
    setIsEmbedding(false);

    const payload = {
      name: values.name,
      code: values.code,
      quantity: Number(values.quantity),
      price: Number(values.price),
      description: values.description,
      imageUrl: imageFile,
      publisherId: Number(values.publisherId),
      categoryItemIds: [Number(values.categoryItemId)],
      embedding: embedding,
    };

    createProductMutate(payload, {
      onSuccess: () => {
        toast.success('Tạo sản phẩm thành công');
        navigate('/admin/prod-management');
      },
      onError: (err: any) => {
        toast.error(err.message || 'Tạo sản phẩm thất bại');
      },
    });
  };

  const { data: categoryData, isLoading, isError } = useCategories(0, 50);
  const categories = categoryData?.data?.content || [];
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [categoryItems, setCategoryItems] = useState<any[]>([]);

  const { publisherData, isLoadingAllPublisher, error: errorPublishers } = usePublishers();

  const publishers = publisherData?.data?.content || [];

  if (isLoadingAllPublisher) return <div>Đang tải nhãn hiệu...</div>;
  if (errorPublishers) return <div>Lỗi khi tải nhãn hiệu...</div>;

  if (isLoading) return <div>Đang tải danh mục...</div>;
  if (isError) return <div>Lỗi khi tải danh mục...</div>;

  if (isLoadingAllPublisher) return <div>Đang tải nhãn hiệu...</div>;
  if (errorPublishers) return <div>Lỗi khi tải nhãn hiệu...</div>;

  return (
    <>
      <div>
        <div className='flex gap-3'>
          <Button className='bg-[#fa7833] text-white' onClick={handleProduct}>
            <ArrowLeftOutlined />
          </Button>
          <h1 className='text-[18px] font-bold'>Thêm sản phẩm</h1>
        </div>

        <Form layout='vertical' onFinish={handleAddProduct} form={form} className='w-full'>
          <Row gutter={[48, 48]} align={'middle'} className='mt-1 rounded-[12px] w-280'>
            <Col xs={24} sm={24} md={16} lg={16}>
              <p className='font-bold text-[16px]'>Thông tin sản phẩm</p>

              <Form.Item
                label='Tên sản phẩm'
                name='name'
                required
                rules={[
                  {
                    required: true,
                    message: 'Nhập tên sản phẩm',
                  },
                ]}
              >
                <Input className='w-50 p-3!' placeholder='Nhập tên sản phẩm' />
              </Form.Item>

              <Form.Item
                label='Mã sản phẩm'
                name='code'
                required
                rules={[
                  {
                    required: true,
                    message: 'Nhập mã sản phẩm',
                  },
                ]}
              >
                <Input className='p-3!' placeholder='Nhập mã sản phẩm' />
              </Form.Item>

              <div className='flex gap-5'>
                <Form.Item
                  label='Số lượng sản phẩm'
                  name='quantity'
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Nhập tên sản phẩm',
                    },
                  ]}
                >
                  <Input className='p-3!' type='number' placeholder='' />
                </Form.Item>

                <Form.Item
                  label='Giá bán'
                  name='price'
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Nhập giá bán sản phẩm',
                    },
                  ]}
                >
                  <Input className='w-50 p-3!' placeholder='Nhập giá bán' suffix='₫' />
                </Form.Item>
              </div>

              <Form.Item label='Mô tả' name='description'>
                <TextArea rows={6} maxLength={100000} showCount />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8}>
              <Form.Item
                label='Ảnh sản phẩm'
                name='imageFile'
                valuePropName='fileList'
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[{ required: true, message: 'Vui lòng tải ảnh sản phẩm' }]}
              >
                <Upload listType='picture' maxCount={1} beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Tải ảnh</Button>
                </Upload>
              </Form.Item>

              <div className='bg-white shadow rounded-xl p-4 flex flex-col gap-4 mt-5'>
                <Form.Item
                  label='Danh mục'
                  name='categoryId'
                  rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                >
                  <Select
                    placeholder='Chọn danh mục'
                    onChange={(value) => {
                      setSelectedCategoryId(value);
                      const selected = categories.find((cat: any) => cat.id === value);
                      setCategoryItems(selected?.categoryItems || []);
                    }}
                    className='h-12!'
                  >
                    {categories.map((cat: any) => (
                      <Select.Option key={cat.id} value={cat.id}>
                        {cat.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label='Loại sản phẩm'
                  name='categoryItemId'
                  rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
                >
                  <Select
                    placeholder='Chọn loại sản phẩm'
                    disabled={!selectedCategoryId}
                    className='h-12!'
                  >
                    {categoryItems.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label='Nhãn hiệu'
                  name='publisherId'
                  rules={[{ required: true, message: 'Vui lòng chọn nhãn hiệu' }]}
                >
                  <Select
                    placeholder='Chọn nhãn hiệu'
                    loading={isLoadingAllPublisher}
                    className='h-12!'
                  >
                    {publishers.map((pub: any) => (
                      <Select.Option key={pub.id} value={pub.id}>
                        {pub.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>

        <div className='flex justify-end mt-4'>
          <Button
            onClick={() => form.submit()}
            disabled={isCreating || isEmbedding}
            loading={isCreating || isEmbedding}
            className='p-5! bg-[#fa7833]! text-[white]!'
          >
            <PlusCircleOutlined />
            Thêm sản phẩm
          </Button>
        </div>
      </div>
    </>
  );
};
export default AddProductAdmin;
