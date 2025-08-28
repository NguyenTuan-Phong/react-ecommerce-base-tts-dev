/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, message, Modal, Pagination, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import type { Notification } from '../../../../types';
import { useSendNotification } from '../hook/SendNotification';
import { useDeleteNotification } from '../hook/useDeleteNotification';
import { useNotification } from '../hook/useNotification';
import { useUpdateNotification } from '../hook/useUpdateNotification';

const AdminNotification = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { updateNotification, isPending: isUpdating } = useUpdateNotification();
  const { mutate: sendNotify, isPending: isSending } = useSendNotification();
  console.log('[LOG] ~ AdminNotification ~ isSending:', isSending);
  const { deleteNotification, isPending: isDeleting } = useDeleteNotification();

  const [sendingId, setSendingId] = useState<string | null>(null);

  const { allNotification, isLoadingNotification } = useNotification(page, size);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedNotification) {
      setEditedTitle(selectedNotification.title);
      setEditedDescription(selectedNotification.description);
      setIsEditing(false);
    }
  }, [selectedNotification]);

  const handleAddNotification = () => {
    navigate('/admin/add-notification');
  };

  const handleSendNotification = (id: number | string, title: string, body: string) => {
    if (!title.trim() || !body.trim()) {
      message.warning('Vui lòng nhập đầy đủ tiêu đề và nội dung!');
      return;
    }
    setSendingId(id.toString());

    sendNotify(
      { id: typeof id === 'string' ? parseInt(id, 10) : id },
      {
        onSuccess: () => message.success('Gửi thông báo thành công!'),
        onError: () => message.error('Gửi thông báo thất bại!'),
        onSettled: () => setSendingId(null),
      },
    );
  };

  const handleUpdate = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    if (!selectedNotification) return;

    try {
      await updateNotification({
        id: selectedNotification.id,
        payload: {
          title: editedTitle,
          description: editedDescription,
          imageUrl: selectedNotification?.imageUrl,
        },
      });
      message.success('Cập nhật thông báo thành công!');
      setIsEditing(false);
      setIsModalOpen(false);
      setSelectedNotification(null);
    } catch (error) {
      console.error(error);
      message.error('Cập nhật thông báo thất bại!');
    }
  };

  const handleDelete = async () => {
    if (!selectedNotification) return;
    try {
      await deleteNotification(selectedNotification.id);
      message.success('Xoá thông báo thành công!');
      setIsModalOpen(false);
      setSelectedNotification(null);
    } catch (error) {
      console.error(error);
      message.error('Xoá thông báo thất bại!');
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => page * size + index + 1,
      width: '7%',
    },
    {
      title: 'Ảnh',
      key: 'imageUrl',
      render: (record: Notification) =>
        record.imageUrl ? (
          <img
            src={record.imageUrl}
            alt='Notification'
            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
          />
        ) : (
          'Không xác định'
        ),
      width: '15%',
    },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Nội dung', dataIndex: 'description', key: 'description' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record: Notification) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleSendNotification(record.id, record.title, record.description);
          }}
          loading={sendingId === record.id}
        >
          Gửi
        </Button>
      ),
      width: '15%',
    },
  ];

  return (
    <div className='mx-auto px-4 relative h-full'>
      <Row gutter={[48, 48]} align='middle'>
        <Col xs={24} sm={24} md={16} lg={16}>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>DANH SÁCH THÔNG BÁO</p>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} className='text-right flex! justify-end!'>
          <Button className='p-5! bg-[#fa7833]! text-[white]! ' onClick={handleAddNotification}>
            <PlusCircleOutlined /> Tạo thông báo
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={allNotification?.data?.content || []}
        rowKey='id'
        loading={isLoadingNotification}
        scroll={{ y: 'calc(100vh - 450px)' }}
        pagination={false}
        onRow={(record) => ({
          onClick: () => {
            setSelectedNotification(record);
            setIsModalOpen(true);
          },
        })}
      />

      <div className='absolute left-1/2 bottom-0 transform -translate-x-1/2'>
        <Pagination
          current={page + 1}
          pageSize={size}
          total={allNotification?.data?.currentTotalElementsCount ?? 0}
          pageSizeOptions={['5', '10', '20', '50', '100']}
          showSizeChanger
          onChange={(newPage, newSize) => {
            setPage(newPage - 1);
            setSize(newSize);
          }}
        />
      </div>

      <Modal
        title='Chi tiết thông báo'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button
            key='delete'
            danger
            loading={isDeleting}
            onClick={() => (isEditing ? setIsEditing(false) : handleDelete())}
          >
            {isEditing ? 'Huỷ bỏ' : 'Xoá thông báo'}
          </Button>,
          <Button key='update' type='primary' onClick={handleUpdate} loading={isUpdating}>
            {isEditing ? 'Lưu' : 'Cập nhật'}
          </Button>,
        ]}
      >
        {selectedNotification && (
          <div className='flex gap-4'>
            {selectedNotification.imageUrl && (
              <img
                src={selectedNotification.imageUrl}
                alt='Notification'
                style={{ width: '40%', borderRadius: 8 }}
              />
            )}
            <div>
              <label>Tiêu đề:</label>
              <input
                type='text'
                value={editedTitle}
                disabled={!isEditing}
                onChange={(e) => setEditedTitle(e.target.value)}
                className='w-full border px-3 py-2 rounded disabled:bg-gray-100'
              />
              <label>Nội dung:</label>
              <textarea
                value={editedDescription}
                disabled={!isEditing}
                onChange={(e) => setEditedDescription(e.target.value)}
                className='w-full border px-3 py-2 rounded disabled:bg-gray-100'
              />
            </div>
          </div>
        )}
      </Modal>

      <Outlet />
    </div>
  );
};

export default AdminNotification;
