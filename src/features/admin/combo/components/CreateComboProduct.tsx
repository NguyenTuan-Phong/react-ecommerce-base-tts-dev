import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Row, Upload, type UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { productsProp } from '../../../../services/comboServices';
import { useCreateCombo } from '../hook/useCreateCombo';
import { useGetAllCombo } from '../hook/useGetAllCombo';
import FormListDataProduct from './FormListDataProduct';
interface ProductSubmit {
  productId: string;
  quantity: number;
}
export interface FormCreateComboProduct {
  nameCombo: string;
  description: string;
  price: number;
  products: productsProp[];
  imageUrl: File;
  code: string;
  quantityCombo: number;
}

export interface FromCreateSubmit {
  nameCombo: string;
  description: string;
  price: number;
  imageFile: UploadFile[];
  code: string;
  quantityCombo: number;
}
const CreateComboProduct = () => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<ProductSubmit[]>([]);
  const [showTableProduct, setShowTableProduct] = useState(true);
  const [showFormCreateInfoCombo, setShowFormCreateInfoCombo] = useState(false);
  const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);

  const handleChangeConfirmedRows = (products: ProductSubmit[]) => {
    setSelectedProducts(products);
  };

  const { refetchDataGetAllCombo } = useGetAllCombo(0, 10);

  const onCreateComboSuccess = () => {
    refetchDataGetAllCombo();
    setShowTableProduct(true);
    setShowFormCreateInfoCombo(false);
  };

  const { isLoadingCreateCombo, handleCreateComboProduct } = useCreateCombo(onCreateComboSuccess);

  const handleNext = () => {
    setShowTableProduct(false);
    setShowFormCreateInfoCombo(true);
  };

  const handleBack = () => {
    setShowTableProduct(true);
    setShowFormCreateInfoCombo(false);
  };

  const handleSubmitCreateComboProduct = (values: FromCreateSubmit) => {
    const imageFile = values.imageFile?.[0]?.originFileObj;

    if (!imageFile || !(imageFile instanceof File)) {
      toast.error('Ảnh không hợp lệ!');
      return;
    }

    if (!selectedProducts.length) {
      toast.warning('Tạo sản phẩm cho Combo!.');
      return;
    }

    const data = {
      nameCombo: values.nameCombo,
      description: values.description,
      price: values.price,
      products: selectedProducts,
      imageUrl: imageFile,
      code: values.code,
      quantityCombo: values.quantityCombo,
    };

    handleCreateComboProduct(data);
  };

  return (
    <div className='flex flex-col gap-3 h-full overflow-y-auto'>
      <div className=''>
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
            onChangeConfirmedRows={handleChangeConfirmedRows}
            onChangeTotalPrice={setTotalSelectedPrice}
          />
        </>
      )}

      {showFormCreateInfoCombo && (
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
            onFinish={handleSubmitCreateComboProduct}
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
                    loading={isLoadingCreateCombo}
                    disabled={isLoadingCreateCombo}
                  >
                    Tạo Combo
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
export default CreateComboProduct;
