import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateFlashSale } from '../hook/useCreateFlashSale';
import { useGetAllFlashSale } from '../hook/useGetAllFlashSale';
import FormListProductV2 from './FormListProductV2';

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

const CreateFlashSaleV2 = () => {
  const navigate = useNavigate();
  const [confirmedRows, setConfirmedRows] = useState<FlashSaleProductSubmit[]>([]);
  const [fromCreateFlashSale] = Form.useForm();
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [endTime, setendTime] = useState<string | undefined>(undefined);
  const [getProduct, setGetProduct] = useState(false);
  const { refetchFlashSale } = useGetAllFlashSale(0, 10);

  const { isLoadingCreateFlashSale, handleCreateFlashSale } = useCreateFlashSale(refetchFlashSale);

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

  const clearFormCreateFlashSale = () => {
    setConfirmedRows([]);
    fromCreateFlashSale.resetFields();
  };

  const handleGetProduct = () => {
    const startTime = fromCreateFlashSale.getFieldValue('startTime');
    const endTime = fromCreateFlashSale.getFieldValue('endTime');
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
      <div className='my-5 relative flex flex-col gap-5'>
        <div>
          <Button onClick={handleGetProduct} className='h-12! px-10! bg-blue-500! text-white!'>
            Lấy sản phẩm
          </Button>
        </div>
        {getProduct && (
          <FormListProductV2
            onChangeConfirmedRows={setConfirmedRows}
            confirmedRows={confirmedRows}
            startTime={startTime}
            endTime={endTime}
          />
        )}
      </div>
    </div>
  );
};
export default CreateFlashSaleV2;
