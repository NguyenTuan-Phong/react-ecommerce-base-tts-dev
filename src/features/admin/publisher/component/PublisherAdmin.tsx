import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Table, message } from 'antd';
import isEqual from 'lodash.isequal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ButtonDelete from '../../../../components/button/ButtonDelete';
import ButtonUpdate from '../../../../components/button/ButtonUpdate';
import { useCreatePublisher } from '../hook/useAddPublisher';
import { usePublishers } from '../hook/usePublisher';
import { useRemovePublisher } from '../hook/useRemovePublisher';
import { useUpdatePublisher } from '../hook/useUpdatePublisher';
interface Publisher {
  id: number;
  name: string;
}

const PublisherAdmin: React.FC = () => {
  const [page, setPage] = useState(0);
  const size = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPublisherName, setNewPublisherName] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPublisherId, setEditPublisherId] = useState<number | null>(null);
  const [editPublisherName, setEditPublisherName] = useState('');
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();
  const {
    publisherData,
    isLoadingAllPublisher,
    error: errorPublishers,
  } = usePublishers(page, size, searchName);

  const { createPublisherMutate, isCreating } = useCreatePublisher();
  const { removePublisherMutate } = useRemovePublisher();
  const { mutate: updatePublisherMutate, isPending: isUpdating } = useUpdatePublisher();

  const publishers = publisherData?.data?.content || [];
  const [initialValues, setInitialValues] = useState<any>(null);
  const handleRemovePublisher = (id: number) => {
    removePublisherMutate(id.toString(), {
      onSuccess: () => {
        message.success('Xóa nhà cung cấp thành công');
      },
      onError: () => {
        message.error('Xóa nhà cung cấp thất bại');
      },
    });
  };

  const handleAddPublisher = () => {
    setIsModalOpen(true);
  };

  const handleCreatePublisher = () => {
    if (!newPublisherName.trim()) {
      toast.warning('Vui lòng nhập tên nhà cung cấp');
      return;
    }

    createPublisherMutate(
      { name: newPublisherName },
      {
        onSuccess: () => {
          toast.success('Thêm nhà cung cấp thành công');
          setNewPublisherName('');
          setIsModalOpen(false);
        },
        onError: () => {
          toast.error('Thêm nhà cung cấp thất bại');
        },
      },
    );
  };

  const handleEditClick = (publisher: Publisher) => {
    setEditPublisherId(publisher.id);
    setEditPublisherName(publisher.name);
    setInitialValues({ name: publisher.name });
    setIsEditModalOpen(true);
  };

  const handleUpdatePublisher = () => {
    if (!editPublisherName.trim() || editPublisherId === null) {
      toast.warning('Vui lòng nhập tên hợp lệ');
      return;
    }

    if (isEqual(initialValues, { name: editPublisherName })) {
      toast.info('Không có thay đổi nào được thực hiện.!');
      return;
    }

    updatePublisherMutate(
      {
        id: editPublisherId,
        payload: { name: editPublisherName },
      },
      {
        onSuccess: () => {
          message.success('Cập nhật nhà cung cấp thành công');
          setIsEditModalOpen(false);
        },
        onError: () => {
          message.error('Cập nhật thất bại');
        },
      },
    );
  };

  if (errorPublishers) return <div>Lỗi khi tải nhãn hiệu...</div>;

  const handleSearch = (value: Publisher) => {
    setSearchName(value.name);
  };
  const removeSearch = () => {
    form.resetFields();
    setSearchName(form.getFieldValue('name'));
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
      width: '10%',
    },
    {
      title: 'Tên NCC',
      dataIndex: 'name',
      key: 'name',
      width: '65%',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record: Publisher) => (
        <div className='flex gap-2'>
          <ButtonDelete
            isLoading={isUpdating}
            danger={true}
            onConfirm={() => handleRemovePublisher(record.id)}
          />
          <ButtonUpdate onclick={() => handleEditClick(record)} />
        </div>
      ),
      width: '25%',
    },
  ];

  return (
    <div className=''>
      <Row gutter={[48, 48]} align='middle'>
        <Col xs={24} sm={24} md={16} lg={16}>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>DANH SÁCH NHÀ CUNG CẤP</p>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} className='text-right'>
          <Button className='p-5! bg-[#fa7833]! text-[white]!' onClick={handleAddPublisher}>
            <PlusCircleOutlined />
            Thêm nhà cung cấp
          </Button>
        </Col>
      </Row>
      <div className=' mb-5'>
        <Form onFinish={handleSearch} className='flex gap-3' form={form}>
          <Form.Item name='name'>
            <Input placeholder='Tìm kiếm theo tên nhà cung cấp' className='h-12! w-60!' />
          </Form.Item>
          <Form.Item>
            <Button className='h-12! bg-[#fa7833]! text-[white]!' onClick={removeSearch}>
              Xóa tìm kiếm
            </Button>
          </Form.Item>
          <Form.Item>
            <Button className='h-12! bg-[#fa7833]! text-[white]!' htmlType='submit'>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Table
        columns={columns}
        dataSource={publishers}
        rowKey='id'
        loading={isLoadingAllPublisher}
        scroll={{ y: 'calc(100vh - 440px)' }}
        rowSelection={{ type: 'checkbox' }}
        pagination={{
          current: page + 1,
          pageSize: size,
          total: publisherData?.data?.currentTotalElementsCount ?? 0,
          onChange: (newPage) => setPage(newPage - 1),
        }}
      />

      {/* Modal thêm nhà cung cấp */}
      <Modal
        title='Thêm nhà cung cấp'
        open={isModalOpen}
        onOk={handleCreatePublisher}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isCreating}
        okText='Thêm'
        cancelText='Hủy'
      >
        <Input
          placeholder='Nhập tên nhà cung cấp'
          value={newPublisherName}
          onChange={(e) => setNewPublisherName(e.target.value)}
          className='h-12!'
        />
      </Modal>

      <Modal
        title='Cập nhật nhà cung cấp'
        open={isEditModalOpen}
        onOk={handleUpdatePublisher}
        onCancel={() => setIsEditModalOpen(false)}
        confirmLoading={isUpdating}
        okText='Cập nhật'
        cancelText='Hủy'
      >
        <Input
          placeholder='Nhập tên nhà cung cấp mới'
          value={editPublisherName}
          onChange={(e) => setEditPublisherName(e.target.value)}
          className='h-12!'
        />
      </Modal>
    </div>
  );
};

export default PublisherAdmin;
