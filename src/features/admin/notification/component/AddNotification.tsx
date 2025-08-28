import { ArrowLeftOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddNotification } from '../hook/useAddNotification';

const AddNotification: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleNotification = () => {
    navigate('/admin/management-notification');
  };
  const { createNotificationMutate } = useAddNotification();

  const handleAddNotification = async (values: any) => {
    const imageFile = values.imageFile?.[0]?.originFileObj;

    if (!imageFile || !(imageFile instanceof File)) {
      toast.error('Ảnh không hợp lệ!');
      return;
    }

    createNotificationMutate(
      {
        title: values.title,
        description: values.description,
        imageUrl: imageFile,
      },
      {
        onSuccess: async () => {
          toast.success('Tạo thông báo thành công');
          navigate('/admin/management-notification');
        },
        onError: (err: any) => {
          toast.error(err.message || 'Tạo thông báo thất bại');
        },
      },
    );
  };

  return (
    <div>
      <div className='flex gap-3'>
        <Button className='bg-[#fa7833] text-white' onClick={handleNotification}>
          <ArrowLeftOutlined />
        </Button>
        <h1 className='text-[18px] font-bold'>Tạo thông báo</h1>
      </div>
      <Form layout='vertical' onFinish={handleAddNotification} form={form} className='w-full'>
        <Row gutter={[48, 48]} align={'middle'} className='mt-1 rounded-[12px] w-280'>
          <Col xs={24} sm={24} md={16} lg={16}>
            <Form.Item
              label='Tiêu đề'
              name='title'
              required
              rules={[
                {
                  required: true,
                  message: 'Nhập tiêu đề',
                },
              ]}
            >
              <Input className='w-50 p-3!' placeholder='Nhập tiêu đề' />
            </Form.Item>

            <Form.Item label='Nội dung' name='description'>
              <TextArea rows={6} maxLength={100000} showCount />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <Form.Item
              label='Ảnh sản phẩm'
              name='imageFile'
              valuePropName='fileList'
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) return e;
                return e?.fileList;
              }}
              rules={[{ required: true, message: 'Vui lòng tải ảnh sản phẩm' }]}
            >
              <Upload listType='picture' maxCount={1} beforeUpload={() => false} accept='image/*'>
                <Button icon={<UploadOutlined />}>Tải ảnh</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className='flex justify-end mt-4'>
        <Button onClick={() => form.submit()} className='p-5! bg-[#fa7833]! text-[white]!'>
          <PlusCircleOutlined />
          Tạo thông báo
        </Button>
      </div>
    </div>
  );
};
export default AddNotification;
