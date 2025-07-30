import { Button, Empty, Input, List, Modal, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSearchPublisher } from "../hook/useSearchPublisher";
import { SearchOutlined } from "@ant-design/icons";


type Props = {
  onDelete: (id: number) => void;
  onEdit: (publisher: { id: number; name: string }) => void;
};
const { Title } = Typography;

const SearchPublisherAdmin = ({ onDelete, onEdit }: Props) => {
    const [keyword, setKeyword] = useState("");
    const { search, isPendingSearch, dataSearch } = useSearchPublisher();
    const [selectedPublisher, setSelectedPublisher] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editName, setEditName] = useState("");
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
    if (selectedPublisher) {
        setEditName(selectedPublisher.name);
        setIsEditing(false); 
    }
    }, [selectedPublisher]);

    useEffect(() => {
        if (keyword.trim()) {
        const delaySearch = setTimeout(() => {
            search(keyword);
        }, 500);
        return () => clearTimeout(delaySearch);
        }
    }, [keyword]);

    const showModal = (publisher: any) => {
        setSelectedPublisher(publisher);
        setIsModalOpen(true);
    };

    const handleEdit = () => {
        if (!selectedPublisher) return;
        onEdit({ id: selectedPublisher.id, name: selectedPublisher.name });
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        if (!selectedPublisher) return;
        onDelete(selectedPublisher.id);
        setIsModalOpen(false);
    };

  return (
    <div className="relative w-80 mt-3">
      <div className="bg-white rounded-[6px] shadow-md flex items-center px-3 border border-gray-300 h-12">
        <SearchOutlined className="text-gray-700!" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên nhà cung cấp "
          className="border-none outline-none text-sm px-2 py-3 flex-1 bg-transparent"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {keyword.trim() && (
        <div className="absolute top-12 left-0 w-full bg-white rounded-md shadow z-50 max-h-64 overflow-y-auto p-3">
          {isPendingSearch ? (
            <div className="p-4 text-center">
              <Spin tip="Đang tìm kiếm nhà cung cấp..." />
            </div>
          ) : Array.isArray(dataSearch?.data) && dataSearch.data.length > 0 ? (
            <List
              dataSource={dataSearch.data}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  className="hover:bg-gray-100 cursor-pointer p-3"
                  onClick={() => showModal(item)}
                >
                  <div className="flex w-full gap-5">
                    <Title level={5} className="!leading-normal !m-0">
                      {item.name}
                    </Title>
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <div className="p-4 text-center">
              <Empty description="Không tìm thấy nhà cung cấp nào" />
            </div>
          )}
        </div>
      )}

      <Modal
        title="Thông tin nhà cung cấp"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="delete" danger onClick={handleDelete}>
            Xoá
          </Button>,
          <Button key="edit" type="primary" onClick={handleEdit}>
            Sửa
          </Button>,
        ]}
      >
        <Input
            placeholder="Nhập tên nhà cung cấp"
            disabled={!isEditing}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
        />
        
      </Modal>
    </div>
  );
};

export default SearchPublisherAdmin;
