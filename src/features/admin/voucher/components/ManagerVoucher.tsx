import { EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Row,
  Select,
  Spin,
  Table,
  Tag,
} from 'antd';
import dayjs from 'dayjs';
import isEqual from 'lodash.isequal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ButtonDelete from '../../../../components/button/ButtonDelete';
import ButtonUpdate from '../../../../components/button/ButtonUpdate';
import { useVoucher } from '../../../cart/hook';
import type { ItemVoucher } from '../../../cart/type';
import { useCreateVoucher } from '../hook';
import { useRemoveVoucher } from '../hook/useRemoveVoucher';
import { useUpdateVoucher } from '../hook/useUpdateVoucher';
import { useViewDetailVoucher } from '../hook/useViewDetailVoucher';
const ManagementVoucher = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [isIdVoucher, setIsIdVoucher] = useState<string | null>(null);
  const [isOpenModalViewDetailVoucher, setIsOpenModalViewDetailVoucher] = useState(false);
  const type = Form.useWatch('type', form);
  const [isOpenModalCreateOrUpdateVoucher, setIsOpenModalCreateOrUpdateVoucher] = useState(false);
  const [initialValues, setInitialValues] = useState<any>(null);
  const { dataVouchers, refetchVouchers, isPending } = useVoucher(page,size);

  const { isPendingRemoveVoucher, handleRemoveVoucher } = useRemoveVoucher(refetchVouchers);

  const { isPendingGetDetailVoucher, ResponseGetDetailVoucher } = useViewDetailVoucher(isIdVoucher);

  const dataVoucherDetail = ResponseGetDetailVoucher?.data;

  const { isPendingCreateVoucher, handleCreateVoucher } = useCreateVoucher(refetchVouchers);

  const { isPendingUpdateVoucher, handleUpdateVoucher } = useUpdateVoucher(refetchVouchers);

  const handleViewDetailVoucher = (id: string) => {
    setIsIdVoucher(id);
    setIsOpenModalViewDetailVoucher(true);
  };

  const showModal = (record: any) => {
    if (record) {
      setEditingId(record.id);
      setInitialValues({
        name: record.name,
        code: record.code,
        description: record.description,
        type: record.type,
        value: record.value,
        quantity: record.quantity,
        minOrderAmount: record.minOrderAmount,
        maxDiscountAmount: record.maxDiscountAmount,
        startDate: dayjs(record.startDate),
        endDate: dayjs(record.endDate),
        usageLimitPerUser: record.usageLimitPerUser,
        isPublic: record.isPublic,
      });
      form.setFieldsValue({
        name: record.name,
        code: record.code,
        description: record.description,
        type: record.type,
        value: record.value,
        quantity: record.quantity,
        minOrderAmount: record.minOrderAmount,
        maxDiscountAmount: record.maxDiscountAmount,
        startDate: dayjs(record.startDate),
        endDate: dayjs(record.endDate),
        usageLimitPerUser: record.usageLimitPerUser,
        isPublic: record.isPublic,
      });
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsOpenModalCreateOrUpdateVoucher(true);
  };

  const handleOK = () => {
    try {
      const value = form.getFieldsValue();
      if (isEqual(initialValues, value)) {
        toast.info('Không có thay đổi nào được thực hiện.!');
        return;
      }

      if (editingId) {
        handleUpdateVoucher(editingId, value);
      } else {
        handleCreateVoucher(value);
      }
      form.resetFields();
      setIsOpenModalCreateOrUpdateVoucher(false);
    } catch (err) {}
  };

  const columns = [
    {
      key: 'id',
      render: (record: ItemVoucher) => {
        return (
          <div
            className='flex items-center gap-2'
            onClick={() => handleViewDetailVoucher(record.id)}
          >
            <EyeOutlined className='text-blue-500! cursor-pointer' />
          </div>
        );
      },
      width: '4%',
    },
    {
      title: 'STT',
      width: '6%',
      render: (_: any, __: any, index: number) => page * size + index + 1,
    },
    {
      title: 'Tên Khuyến mại',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Mã Khuyến mại',
      key: 'code',
      dataIndex: 'code',
    },
    // {
    //     title: "Mô tả",
    //     key: "description",
    //     dataIndex: "description",
    //     render: (text: string) => (
    //         <div className="line-clamp-2">
    //             {text}
    //         </div>
    //     )
    // },
    {
      title: 'Áp dụng cho',
      key: 'typeText',
      dataIndex: 'typeText',
    },
    {
      title: 'Giá trị',
      key: 'value',
      dataIndex: 'value',
      render: (_: any, record: ItemVoucher) => {
        if (record.type) {
          return `${record.value.toLocaleString()} VNĐ`;
        } else {
          return `${record.value} %`;
        }
      },
      width: '8%',
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      dataIndex: 'quantity',
      width: '8%',
    },
    {
      title: 'Thời gian sử dụng',
      key: 'Date',
      render: (record: ItemVoucher) => {
        const start = new Date(record.startDate).toLocaleDateString('vi-VN');
        const end = new Date(record.endDate).toLocaleDateString('vi-VN');
        return `${start} - ${end}`;
      },
    },
    {
      title: 'Trạng thái',
      key: 'statusText',
      dataIndex: 'statusText',
      render: (text: string) => {
        let color = '';
        switch (text) {
          case 'Đang hoạt động':
            color = 'green';
            break;
          case 'Đã hủy':
            color = 'red';
            break;
          default:
            color = 'gray';
        }
        return <span style={{ color, fontWeight: 'bold' }}>{text}</span>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: ItemVoucher) => (
        <div className='flex gap-2'>
          {record.statusVoucher !== 4 && (
            <>
              <ButtonDelete
                onConfirm={() => handleRemoveVoucher(record.id)}
                danger={true}
                isLoading={isPendingRemoveVoucher}
              />
              <ButtonUpdate onclick={() => showModal(record)} />
            </>
          )}
        </div>
      ),
      width: '15%',
    },
  ];
  return (
    <div className='relative h-full'>
      <Row gutter={[48, 48]}>
        <Col xs={24} sm={16} md={16} lg={16}>
          <b className='text-[18px] font-bold'> DANH SÁCH KHUYẾN MẠI</b>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} className='text-right'>
          {dataVouchers && (
            <Button
              icon={<PlusCircleOutlined />}
              className='p-5! bg-[#fa7833]! text-[white]!'
              onClick={() => showModal(null)}
            >
              Tạo khuyến mại
            </Button>
          )}
        </Col>
      </Row>
      <div className=''>
        <div className='h-[100%]'>
          <div className='bg-white rounded-xl mt-5 pt-5 h-[100%]'>
            <Table
              columns={columns}
              dataSource={dataVouchers?.data.content}
              rowKey='id'
              pagination={false}
              scroll={{ y: 'calc(100vh - 420px)' }}
              loading={isPending}
            />
          </div>
        </div>
      </div>
      {dataVouchers?.data?.content?.length! > 0 && (
        <div className='flex justify-center mt-10 absolute bottom-5 left-1/2 transform -translate-x-1/2'>
          <Pagination
            align='center'
            current={page + 1}
            pageSize={size}
            pageSizeOptions={['5', '10', '20', '50', '100']}
            onChange={(pageNumber, sizeNumber) => {
              setPage(pageNumber - 1), setSize(sizeNumber);
            }}
            total={dataVouchers?.data.currentTotalElementsCount}
            showSizeChanger
          />
        </div>
      )}

      <Modal
        title={
          editingId ? (
            <div className='text-center py-4 font-bold text-xl'>Chỉnh sửa mã khuyến mại</div>
          ) : (
            <div className='text-center py-4 font-bold text-xl'>Thêm mã khuyến mại</div>
          )
        }
        open={isOpenModalCreateOrUpdateVoucher}
        className='w-[800px]!'
        onCancel={() => setIsOpenModalCreateOrUpdateVoucher(false)}
        footer
      >
        <Form layout='vertical' className='px-4' form={form} onFinish={handleOK}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label='Tên mã khuyến mại'
                name='name'
                rules={[{ required: true, message: 'Vui lòng nhập tên mã khuyến mại' }]}
              >
                <Input placeholder='Nhập tên mã khuyến mại' className='p-3!' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Mã code'
                name='code'
                rules={[{ required: true, message: 'Vui lòng nhập mã code' }]}
              >
                <Input placeholder='Nhập mã code' className='p-3! uppercase' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label='Mô tả mã khuyến mại'
                name='description'
                rules={[{ required: true, message: 'Vui lòng mô tả mã khuyến mại' }]}
              >
                <Input placeholder='Nhập mô tả' className='p-3!' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Loại khuyến mại'
                name='type'
                rules={[{ required: true, message: 'Vui lòng nhập loại khuyến mại' }]}
              >
                <Select
                  className='h-12!'
                  placeholder='Chọn loại khuyến mại'
                  options={[
                    { label: 'Phần trăm (%)', value: 0 },
                    { label: 'VNĐ', value: 1 },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label='Giá trị khuyến mại'
                name='value'
                rules={[
                  { required: true, message: 'Vui lòng nhập giá trị mã khuyến mại' },
                  ({ getFieldValue }) => ({
                    validator(_, val) {
                      const currentType = getFieldValue('type');
                      if (currentType === 0 && (val < 0 || val > 30)) {
                        return Promise.reject(new Error('Giá trị phần trăm phải từ 0 đến 30'));
                      }
                      if (val < 0) {
                        return Promise.reject(new Error('Giá trị không được nhỏ hơn 0'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber
                  className='w-full [&_.ant-input-number-input]:h-11'
                  min={0}
                  max={type === 0 ? 30 : undefined}
                  addonAfter={type === 0 ? '%' : 'VNĐ'}
                  placeholder={type === 0 ? 'Nhập % khuyến mại' : 'Nhập số tiền khuyến mại'}
                  disabled={type === undefined}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Số lượng'
                name='quantity'
                rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
              >
                <Input type='number' placeholder='Nhập số lượng' className='p-3!' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label='Giá trị tối thiểu đơn hàng'
                name='minOrderAmount'
                rules={[{ required: true, message: 'Vui lòng nhập giá trị tối thiểu' }]}
              >
                <Input type='number' placeholder='Nhập giá trị tối thiểu' className='p-3!' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Giá trị giảm tối đa'
                name='maxDiscountAmount'
                rules={[{ required: true, message: 'Vui lòng nhập giá trị tối đa' }]}
              >
                <Input type='number' placeholder='Nhập giá trị tối đa' className='p-3!' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label='Thời gian bắt đầu áp dụng'
                name='startDate'
                rules={[{ required: true, message: 'Vui lòng nhập thời gian bắt đầu áp dụng' }]}
              >
                <DatePicker
                  placeholder='Chọn thời gian bắt đầu'
                  className='p-3! w-full'
                  format='DD/MM/YYYY'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Thời gian kết thúc'
                name='endDate'
                rules={[{ required: true, message: 'Vui lòng nhập thời gian kết thúc' }]}
              >
                <DatePicker
                  placeholder='Chọn thời gian kết thúc'
                  className='p-3! w-full'
                  format='DD/MM/YYYY'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label='Số lần người dùng có thể sử dụng'
                name='usageLimitPerUser'
                rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
              >
                <Input placeholder='Nhập số lần sử dụng mỗi người dùng' className='p-3!' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Mở mã khuyến mại'
                name='isPublic'
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái.' }]}
              >
                <Select
                  placeholder='Chọn trạng thái'
                  className='h-12!'
                  options={[
                    { label: 'Mở', value: true },
                    { label: 'Đóng', value: false },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className='flex justify-end gap-3 pt-6'>
            <Button onClick={() => setIsOpenModalCreateOrUpdateVoucher(false)}>Hủy</Button>
            <Button
              type='primary'
              htmlType='submit'
              loading={editingId ? isPendingUpdateVoucher : isPendingCreateVoucher}
            >
              OK
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        open={isOpenModalViewDetailVoucher}
        onCancel={() => setIsOpenModalViewDetailVoucher(false)}
        footer
        className='w-212!'
      >
        <div>
          {isPendingGetDetailVoucher ? (
            <div className='text-center items-center content-center'>
              <Spin />
            </div>
          ) : (
            <div>
              {!dataVoucherDetail ? (
                <div>Có lỗi xảy ra vui lòng quay lại sau it phút.</div>
              ) : (
                <div className='bg-white p-6 rounded-xl shadow-md w-200!'>
                  <h2 className='text-xl font-bold mb-4 text-center'>Thông tin mã khuyến mãi</h2>
                  <Descriptions
                    bordered
                    column={2}
                    labelStyle={{ fontWeight: '600', width: 200 }}
                    contentStyle={{ fontWeight: '500' }}
                  >
                    <Descriptions.Item label='ID'>{dataVoucherDetail.id}</Descriptions.Item>
                    <Descriptions.Item label='Mã khuyến mãi'>
                      {dataVoucherDetail.code}
                    </Descriptions.Item>

                    <Descriptions.Item label='Tên'>{dataVoucherDetail.name}</Descriptions.Item>
                    <Descriptions.Item label='Mô tả'>
                      {dataVoucherDetail.description}
                    </Descriptions.Item>

                    <Descriptions.Item label='Loại khuyến mãi'>
                      {dataVoucherDetail.typeText}
                    </Descriptions.Item>
                    <Descriptions.Item label='Giá trị'>
                      {dataVoucherDetail.value}%
                    </Descriptions.Item>

                    <Descriptions.Item label='Đơn hàng tối thiểu'>
                      {dataVoucherDetail.minOrderAmount}
                    </Descriptions.Item>
                    <Descriptions.Item label='Giảm tối đa'>
                      {dataVoucherDetail.maxDiscountAmount}
                    </Descriptions.Item>

                    <Descriptions.Item label='Số lượng tổng'>
                      {dataVoucherDetail.quantity} SL
                    </Descriptions.Item>
                    <Descriptions.Item label='Đã sử dụng'>
                      {dataVoucherDetail.usedCount}
                    </Descriptions.Item>

                    <Descriptions.Item label='Giới hạn mỗi người'>
                      {dataVoucherDetail.usageLimitPerUser} lần
                    </Descriptions.Item>
                    <Descriptions.Item label='Còn lại'>
                      {dataVoucherDetail.remainingUsage}
                    </Descriptions.Item>

                    <Descriptions.Item label='Ngày bắt đầu'>
                      {dataVoucherDetail.startDate}
                    </Descriptions.Item>
                    <Descriptions.Item label='Ngày kết thúc'>
                      {dataVoucherDetail.endDate}
                    </Descriptions.Item>

                    <Descriptions.Item label='Trạng thái'>
                      <Tag color={dataVoucherDetail.statusVoucher === 0 ? 'green' : 'red'}>
                        {dataVoucherDetail.statusText}
                      </Tag>
                    </Descriptions.Item>

                    <Descriptions.Item label='Mở'>
                      <Tag color={dataVoucherDetail.isPublic ? 'blue' : 'default'}>
                        {dataVoucherDetail.isPublic ? 'Có' : 'Không'}
                      </Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
export default ManagementVoucher;
