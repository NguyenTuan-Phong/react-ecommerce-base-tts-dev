import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetAllFlashSale } from '../hook/useGetAllFlashSale';
import { useGetFlashSaleById } from '../hook/useGetFlashSaleById';
import { useUpdateFlashSale } from '../hook/useUpdateFlashSale';
import FormListProduct from './FormListProduct';

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

const UpdateFlashSaleV2 = () => {
  const navigate = useNavigate();
  const [confirmedRows, setConfirmedRows] = useState<FlashSaleProductSubmit[]>([]);

  const [formUpdateFlashSale] = Form.useForm();
  const location = useLocation();
  const { id } = location.state || {};
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [endTime, setendTime] = useState<string | undefined>(undefined);
  const [getProduct, setGetProduct] = useState(false);
  const { refetchFlashSale } = useGetAllFlashSale(0, 10);

  const {
    // isLoadingGetFlashSaleById,
    ResponseFlashSaleById,
  } = useGetFlashSaleById(id!);
  const flashSaleData = ResponseFlashSaleById?.data;
  useEffect(() => {
    formUpdateFlashSale.setFieldsValue({
      name: flashSaleData?.name,
      startTime: dayjs(flashSaleData?.startTime),
      endTime: dayjs(flashSaleData?.endTime),
    });
    if (flashSaleData?.products) {
      setConfirmedRows(flashSaleData.products);
    }
  }, [flashSaleData?.products]);

  const { isLoadingUpdateFlashSale, handleUpdateFlashSale } = useUpdateFlashSale(refetchFlashSale);

  const submitFormUpdateFlashSale = (value: FormCreatFlashSale) => {
    if (!confirmedRows || confirmedRows.length === 0) {
      toast.error('Vui lòng tạo sản phẩm cho chiến dịch.');
      return;
    }

    const isBasicInfoChanged =
      value.name !== flashSaleData?.name ||
      !dayjs(value.startTime).isSame(dayjs(flashSaleData.startTime)) ||
      !dayjs(value.endTime).isSame(dayjs(flashSaleData.endTime));

    const isProductChanged =
      confirmedRows.length !== flashSaleData?.products.length ||
      confirmedRows.some((row) => {
        const original = flashSaleData.products.find((p) => p.productId === row.productId);
        return (
          !original ||
          original.flashPrice !== row.flashPrice ||
          original.availableQuantity !== row.availableQuantity
        );
      });

    if (!isBasicInfoChanged && !isProductChanged) {
      toast.info('Không có thay đổi nào được thực hiện.');
      return;
    }

    const data = {
      id,
      name: value.name,
      startTime: dayjs(value.startTime).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dayjs(value.endTime).format('YYYY-MM-DD HH:mm:ss'),
      products: confirmedRows,
    };

    handleUpdateFlashSale(data);
  };

  const handleGetProduct = () => {
    const startTime = formUpdateFlashSale.getFieldValue('startTime');
    const endTime = formUpdateFlashSale.getFieldValue('endTime');
    if (!startTime || !endTime) {
      toast.warning('Vui lòng điền đầy đủ thông tin form chiến dịch!');
      return;
    }
    setStartTime(dayjs(startTime).format('YYYY-MM-DDTHH:mm:ss'));
    setendTime(dayjs(endTime).format('YYYY-MM-DDTHH:mm:ss'));
    setGetProduct(true);
  };

  return (
    <div className='flex flex-col gap-3 h-full overflow-y-auto'>
      <div className=''>
        <Button className='bg-[#fa7833] text-white' onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </Button>
      </div>

      <div className='flex flex-col gap-3'>
        <b className='text-start'>Chỉnh sửa chiến dịch giảm giá</b>
        <Form
          form={formUpdateFlashSale}
          onFinish={submitFormUpdateFlashSale}
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
                  loading={isLoadingUpdateFlashSale}
                  disabled={isLoadingUpdateFlashSale}
                >
                  Chỉnh sửa
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <div className='my-5 relative flex flex-col gap-3'>
        <div>
          <Button onClick={handleGetProduct} className='h-12! px-10! bg-blue-500! text-white!'>
            Xem sản phẩm
          </Button>
        </div>
        {getProduct && (
          <FormListProduct
            onChangeConfirmedRows={setConfirmedRows}
            confirmedRows={confirmedRows}
            flashSaleData={flashSaleData?.products}
            startTime={startTime}
            endTime={endTime}
          />
        )}
      </div>
    </div>
  );
};
export default UpdateFlashSaleV2;
