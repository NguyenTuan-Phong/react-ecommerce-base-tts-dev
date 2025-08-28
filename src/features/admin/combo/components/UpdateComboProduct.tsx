import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Row, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetAllCombo } from '../hook/useGetAllCombo';
import { useGetDetailCombo } from '../hook/useGetDetailCombo';
import { useUpdateCombo } from '../hook/useUpdateCombo';
import type { FromCreateSubmit } from './CreateComboProduct';
import FormListDataProduct from './FormListDataProduct';

interface ProductSubmit {
  productId: string;
  quantity: number;
  price: number;
}
type FromUpdateSubmit = FromCreateSubmit;

const UpdateComboProduct = () => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<ProductSubmit[]>([]);
  const [showTableProduct, setShowTableProduct] = useState(true);
  const [showFormUpdateInfoCombo, setShowFormUpdateInfoCombo] = useState(false);
  const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);
  const location = useLocation();
  const { id } = location.state || {};
  const [form] = Form.useForm();
  const { ResponseDataGetDetailCombo } = useGetDetailCombo(id);

  const { refetchDataGetAllCombo } = useGetAllCombo(0, 10);

  const { isLoadingUpdateCombo, handleUpdateComboProduct } = useUpdateCombo(refetchDataGetAllCombo);

  useEffect(() => {
    if (ResponseDataGetDetailCombo && ResponseDataGetDetailCombo.data) {
      const mappedProducts = ResponseDataGetDetailCombo.data.comboProducts.map((product: any) => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.productPrice,
      }));
      setSelectedProducts(mappedProducts);

      const combo = ResponseDataGetDetailCombo.data;

      form.setFieldsValue({
        nameCombo: combo.nameCombo,
        description: combo.description,
        price: combo.price,
        quantityCombo: combo.quantity,
        code: combo.code,
        imageFile: combo.imageUrl
          ? [
              {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: combo.imageUrl,
              },
            ]
          : [],
      });
    }
  }, [ResponseDataGetDetailCombo]);

  const handleNext = () => {
    setShowTableProduct(false);
    setShowFormUpdateInfoCombo(true);
  };

  const handleBack = () => {
    setShowTableProduct(true);
    setShowFormUpdateInfoCombo(false);
  };

  const handleSubmitUpdateComboProduct = (value: FromUpdateSubmit) => {
    const imageData = value.imageFile?.[0];

    let imageUrl: File | string | undefined;

    if (imageData?.originFileObj) {
      imageUrl = imageData.originFileObj;
    } else if (imageData?.url) {
      imageUrl = imageData.url;
    }

    if (!imageUrl) {
      toast.error('Ảnh không hợp lệ!');
      return;
    }

    const data = {
      nameCombo: value.nameCombo,
      description: value.description,
      price: value.price,
      products: selectedProducts,
      imageUrl: imageUrl,
      code: value.code,
      quantityCombo: value.quantityCombo,
      id: id,
    };

    handleUpdateComboProduct(data);
  };

  return (
    <div className='flex flex-col gap-3 h-full overflow-y-auto'>
      <div>
        <Button className='bg-[#fa7833] text-white' onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </Button>
      </div>

      {showTableProduct && (
        <>
          <div className='relative justify-end flex pr-5'>
            <p className='font-bold absolute left-1/2 transform -translate-x-1/2'>
              BƯỚC 1: CHỌN SẢN PHẨM
            </p>
            <Button
              className={`h-12! w-25 ${
                selectedProducts.length < 2 ? 'bg-gray-300' : 'bg-[#fa7833]! text-white!'
              }`}
              onClick={handleNext}
              disabled={selectedProducts.length < 2}
            >
              Tiếp tục
            </Button>
          </div>

          <FormListDataProduct
            confirmedRows={selectedProducts}
            onChangeTotalPrice={setTotalSelectedPrice}
          />
        </>
      )}
      {showFormUpdateInfoCombo && (
        <div>
          <div className='relative justify-start flex'>
            <p className='font-bold absolute left-1/2 transform -translate-x-1/2'>
              BƯỚC 2: TẠO THÔNG TIN CHO COMBO SẢN PHẨM
            </p>
            <Button className={`h-12! w-25 bg-[#fa7833]! text-white!`} onClick={handleBack}>
              QUAY LẠI
            </Button>
          </div>
          <Form
            form={form}
            onFinish={handleSubmitUpdateComboProduct}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            className='m-0! p-0!'
          >
            <Row>
              <Col xs={24} md={12} className='p-3'>
                <Form.Item
                  label='Tên Combo'
                  name='nameCombo'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập Tên Combo',
                    },
                  ]}
                >
                  <Input className='h-12!' placeholder='Nhập tên Combo sản phẩm' />
                </Form.Item>
                <Form.Item
                  label='Mô tả'
                  name='description'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập Mô tả',
                    },
                  ]}
                >
                  <TextArea
                    rows={6}
                    maxLength={100000}
                    showCount
                    placeholder='Mô tả về Combo sản phẩm'
                  />
                </Form.Item>
                <div>
                  <div className='text-end'>Giá gốc: {totalSelectedPrice.toLocaleString()} VNĐ</div>
                  <Form.Item
                    label='Giá'
                    name='price'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập giá',
                      },
                    ]}
                  >
                    <InputNumber
                      min={10000}
                      max={totalSelectedPrice}
                      className='w-full! h-12!'
                      placeholder='Vui lòng nhập giá'
                      controls={false}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      parser={(value) => parseFloat(value?.replace(/\./g, '') ?? '') || 0}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} md={12} className='p-3'>
                <Form.Item
                  label='Mã Combo'
                  name='code'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập Mã Combo',
                    },
                  ]}
                >
                  <Input className='h-12!' placeholder='Nhập mã định danh Combo (VD: COMBO001)' />
                </Form.Item>

                <Form.Item
                  label='Số lượng Combo'
                  name='quantityCombo'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số lượng Combo',
                    },
                    {
                      type: 'number',
                      min: 1,
                      message: 'Số lượng phải lớn hơn 0',
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    className='w-full! h-12!'
                    placeholder='Nhập số lượng Combo có thể bán'
                    controls={false}
                  />
                </Form.Item>
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
                <Form.Item label={null}>
                  <Button
                    className='h-12! w-full bg-[#fa7833]! font-bold! text-white!'
                    htmlType='submit'
                    loading={isLoadingUpdateCombo}
                    disabled={isLoadingUpdateCombo}
                  >
                    Update Combo
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </div>
  );
};

export default UpdateComboProduct;
