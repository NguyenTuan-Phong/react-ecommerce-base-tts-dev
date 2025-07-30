import { Button, Form, Input, Modal, Radio, Select, Space} from 'antd';
import { useState } from 'react';
import { cities } from '../../auth/data/vietnamProvinces';
import { useCart, useCreateOrder, useVoucher } from '../hook';
interface Props {
  data: {
    totalQuantity: number | undefined;
    totalPrice: number | undefined;
  };
}
const Pay = ({ data }: Props) => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [form] = Form.useForm();
  const handleProvince = (value: string) => {
    setSelectedProvince(value);
    form.setFieldsValue({ district: undefined });
  };
  const [isOpenModalVoucher, setIsOpenModalVoucher] = useState(false);

  const {
    dataVouchers
  } = useVoucher();
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

  const {
      refetchCart,
  } = useCart();

  const onSuccessCallback = () => {
    refetchCart();  
    setVoucherCode(null);
    form.resetFields();
  }

  const { 
    isPendingCreateOrder, 
    handleCreateOrder,
  } = useCreateOrder(onSuccessCallback);

  if (!dataVouchers) return null;
  
  const handleOpenModalVoucher = () => {
    setIsOpenModalVoucher(true);
  };
  const handleCloseModalVoucher = () => {
    setIsOpenModalVoucher(false);
  };
  const handleSelectVoucher = (voucher: any) => {
    setVoucherCode(voucher.code || null);
    setIsOpenModalVoucher(false);
  };

  const formattedPrice = data.totalPrice !== undefined ? data.totalPrice.toLocaleString() : '';
  return (
    <div className='overflow-x-hidden'>
      <div className='p-3 bg-[white] rounded-[8px] flex gap-4 flex-col mt-10'>
        <div className='flex-1 flex gap-5'>
          <div className='flex gap-3 items-center flex-2'>
            <div className='border w-3 h-4 border-y-[2px]'></div>
            <h1 className='font-bold text-[20px]'>ĐỊA CHỈ NHẬN HÀNG</h1>
          </div>
          <div className='gap-3 items-center flex-1 hidden lg:flex'>
            <div className='border w-3 h-4 border-y-[2px]'></div>
            <h1 className='font-bold text-[20px]'>HÌNH THỨC THANH TOÁN</h1>
          </div>
        </div>
        <div className='flex-2 gap-5 flex flex-col'>
          <Form
            form={form}
            className='flex gap-4 flex-col lg:flex-row'
            initialValues={{
              type: 1,
            }}
            onFinish={(values) => {
              handleCreateOrder({
                ...values,
                voucherCode: voucherCode ?? null,
              });
            }}
          >
            <div className='flex-1 m-0'>
              <Form.Item
                className='m-0'
                name='recipientName'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập Họ và tên!',
                  },
                ]}
              >
                <Input className='h-12' placeholder='Họ và tên' />
              </Form.Item>
              <div className='flex gap-2'>
                <Form.Item
                  className='flex-1 m-0'
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập Email!',
                      type: 'email',
                    },
                  ]}
                >
                  <Input className='h-12' placeholder='Email' />
                </Form.Item>
                <Form.Item
                  className='flex-1 m-0'
                  name='recipientPhone'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số điện thoại!',
                    },
                  ]}
                >
                  <Input className='h-12' placeholder='Số điện thoại' />
                </Form.Item>
              </div>
              <Form.Item
                name='province'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn Tỉnh/Thành phố!',
                  },
                ]}
              >
                <Select
                  style={{ height: '48px', margin: 0 }}
                  placeholder='Tỉnh/Thành phố'
                  onChange={handleProvince}
                >
                  {cities.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='district'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn Quận/Huyện',
                  },
                ]}
              >
                <Select style={{ height: '48px', margin: 0 }} placeholder='Quận/Huyện'>
                  {selectedProvince &&
                    cities
                      .find((item) => item.name === selectedProvince)
                      ?.districts?.map((i) => (
                        <Select.Option key={i.id} value={i.name}>
                          {i.name}
                        </Select.Option>
                      ))}
                </Select>
              </Form.Item>
              <Form.Item
                className='m-0'
                name='shippingAddress'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ của bạn',
                  },
                ]}
              >
                <Input className='h-12' placeholder='Tòa nhà,Tên đường...' />
              </Form.Item>
            </div>
            {/* Note */}
            <div className='flex-1'>
              <Form.Item name='note'>
                <Input.TextArea
                  rows={4}
                  style={{ minHeight: 191, maxHeight: 191 }}
                  placeholder='Nhập ghi chú cho chúng tôi'
                />
              </Form.Item>

              <div className='flex gap-2'>
                <Form.Item className='flex-1'>
                  <Button
                    style={{ height: 48, background: '#757575', color: 'white' }}
                    className='w-full hover:cursor-pointer'
                  >
                    TẢI ĐƠN HÀNG
                  </Button>
                </Form.Item>
                <Form.Item className='flex-1'>
                  <Button
                    style={{ height: 48, background: '#757575', color: 'white' }}
                    className='h-12 w-full hover:cursor-pointer'
                  >
                    TẢI FILE EXCEL
                  </Button>
                </Form.Item>
              </div>
              <Form.Item>
                <Button
                  style={{ height: 48, background: '#757575', color: 'white' }}
                  className='h-12 w-full hover:cursor-pointer'
                >
                  IN BÁO CÁO
                </Button>
              </Form.Item>
            </div>
            {/* phương thức */}
            <div className='text-[16px] flex-1'>
              <Form.Item name='type'>
                <Radio.Group className='flex flex-col gap-4'
                   onChange={e => console.log('selected:', e.target.value)}
                >
                  <Radio value={1}>Thanh toán khi nhận hàng - COD.</Radio>
                  <Radio value={0}>Thanh toán trước qua chuyển khoản.</Radio>
                </Radio.Group>
              </Form.Item>

              <div className='ml-6 text-sm text-gray-600'>
                <p>Ngân hàng thương mại cổ phần Ngoại thương Việt Nam</p>
                <p>VIETCOMBANK</p>
                <p>Số tài khoản: 0541000297408</p>
                <p>Chủ tài khoản: Hoàng Vĩnh Phúc</p>
              </div>
              <div className='mt-5 p-4 bg-[#f5f5f5] '>
                <Space style={{ width: '100%', flex: 1 }}>
                  <div className='flex flex-col sm:flex-row gap-2'>
                    <Input
                      className='h-12 w-full'
                      placeholder='Mã voucher'
                      value={voucherCode || ''}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                    <Button
                      className='h-12! w-full sm:w-auto font-bold'
                      style={{ background: '#ee2e24', color: 'white' }}
                      onClick={handleOpenModalVoucher}
                    >
                      Nhập mã voucher
                    </Button>
                  </div>  
                </Space>
              </div>

              <div className='my-[19px] text-end flex justify-end'>
                Tổng tiền hàng (<p className='text-[red]'>{data.totalQuantity} đơn hàng</p>) :{' '}
                <p className='font-bold text-[red]'> {formattedPrice} VNĐ</p>
              </div>

              <Button
                htmlType='submit'
                style={{
                  width: '100%',
                  height: 50,
                  background: '#29a07e',
                  color: 'white',
                  fontWeight: 'bold',
                }}
                loading={isPendingCreateOrder}
              >
                ĐẶT MUA NGAY
              </Button>
            </div>
          </Form>
          <Modal
          title='Chọn Voucher'
          open={isOpenModalVoucher}
          onCancel={handleCloseModalVoucher}
          footer
          >
            <>
            
            {dataVouchers.data.content.length < 1 ? (
              <div className='text-center'>
                <h2 className='text-lg font-bold'>Không có voucher nào khả dụng</h2>
                <p className='text-gray-500'>Hiện tại không có voucher nào có thể áp dụng cho đơn hàng của bạn.</p>
              </div>
            ) : (
              <div>
                <h2>Voucher có thể áp dụng</h2>
                <section className='flex flex-col gap-2 mt-4'>
                  {dataVouchers?.data.content.map((voucher) => (
                    <div key={voucher.id}>
                      {voucher.statusVoucher === 0 &&
                        <div className='flex gap-4 items-center p-2 border-dashed border-[1px]
                        border-gray-300 rounded-md hover:cursor-pointer hover:border-[red]'
                        onClick={() => handleSelectVoucher(voucher)}
                        >
                          <p className='flex-1 border-dashed border-gray-300 border-r-[1px] p-5'>{voucher.code}</p>
                          <div className='w-[300px] text-end'>
                            <p className='text-[red]'>{voucher.name}</p>
                            <p>{voucher.description}</p>
                          </div>
                        </div>
                      }
                      
                    </div>
                    
                  ))}
                </section>

              </div>
            )}
            </>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default Pay;