import { useState } from "react";
import { Button, Table, Modal, Form, Input, Space, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSiteSettings } from "../hook/getAllIdSiteSetting.tsx";
import { useDeleteSiteSetting } from "../hook/DeleteSiteSetting.tsx";
import { useUpdateSiteSetting } from "../hook/UpdateSiteSetting.tsx";
import { useCreateSiteSetting } from "../hook/CreateSiteSetting.tsx";
import { useGetByIdSiteSetting } from "../hook/getByIdSiteSetting.tsx";
import { useGetByIdsSiteSetting } from "../hook/getByIdsSiteSetting.tsx";
import type { SiteSetting } from "../../../../services/siteSettingServices";

const SiteSettingPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<SiteSetting | null>(null);
  const [form] = Form.useForm();

  // Query GET all
  const { data, isLoading } = useSiteSettings(0, 10);
  const siteSettings: SiteSetting[] = data?.items || [];

  // Mutations
  const { mutate: createSetting } = useCreateSiteSetting();
  const { mutate: updateSetting } = useUpdateSiteSetting();
  const { mutate: deleteSetting } = useDeleteSiteSetting();

  // GetById & GetByIds
  const [idKey, setIdKey] = useState("");
  const [idsKey, setIdsKey] = useState("");
  const { data: byIdData, refetch: refetchById } = useGetByIdSiteSetting(idKey, false);
  const { data: byIdsData, refetch: refetchByIds } = useGetByIdsSiteSetting(idsKey.split(","), false);

  // Save (create or update)
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingItem) {
        updateSetting({
          settingKey: editingItem.settingKey,
          settingValue: values.value,
          description: values.description,
        });
      } else {
        createSetting({
          key: values.key,
          value: values.value,
          description: values.description,
        });
      }
      setModalVisible(false);
      setEditingItem(null);
      form.resetFields();
    } catch (err) {
      message.error("Có lỗi khi lưu");
    }
  };

  // Delete
  const handleDelete = (key: string) => {
    deleteSetting(key);
  };

  // Table columns
  const columns: ColumnsType<SiteSetting> = [
    { title: "Key", dataIndex: "settingKey", key: "settingKey" },
    { title: "Value", dataIndex: "settingValue", key: "settingValue" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingItem(record);
              setModalVisible(true);
              form.setFieldsValue({
                key: record.settingKey,
                value: record.settingValue,
                description: record.description,
              });
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.settingKey)}
          >
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Action buttons */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            backgroundColor: "#ff6600",
            borderColor: "#ff6600",
            color: "#fff",
          }}
          onClick={() => {
            setEditingItem(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Thêm mới
        </Button>

        <Space>
          <Input
            value={idKey}
            onChange={(e) => setIdKey(e.target.value)}
            placeholder="Nhập key (GetById)"
            style={{ width: 200 }}
          />
          <Button
            style={{ backgroundColor: "#ff6600", borderColor: "#ff6600", color: "#fff" }}
            onClick={() => idKey && refetchById()}
          >
            GetById
          </Button>

          <Input
            value={idsKey}
            onChange={(e) => setIdsKey(e.target.value)}
            placeholder="Nhập nhiều key, cách nhau dấu phẩy"
            style={{ width: 300 }}
          />
          <Button
            style={{ backgroundColor: "#ff6600", borderColor: "#ff6600", color: "#fff" }}
            onClick={() => idsKey && refetchByIds()}
          >
            GetByIds
          </Button>
        </Space>
      </div>

      {/* Main Table */}
      <Table
        rowKey="settingKey"
        columns={columns}
        dataSource={siteSettings}
        loading={isLoading}
        pagination={false}
      />

      {/* Modal create/update */}
      <Modal
        open={modalVisible}
        title={editingItem ? "Cập nhật Site Setting" : "Thêm mới Site Setting"}
        onCancel={() => setModalVisible(false)}
        onOk={handleOk}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="key"
            label="Key"
            rules={[{ required: true, message: "Vui lòng nhập key" }]}
          >
            <Input disabled={!!editingItem} />
          </Form.Item>
          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: "Vui lòng nhập value" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* GetById result */}
      {byIdData && (
        <div style={{ marginTop: 32 }}>
          <h3>🔍 Kết quả GetById</h3>
          <Table
            rowKey="settingKey"
            columns={columns.filter((c) => c.key !== "action")}
            dataSource={[byIdData]}
            pagination={false}
          />
        </div>
      )}

      {/* GetByIds result */}
      {byIdsData && (
        <div style={{ marginTop: 32 }}>
          <h3>🔍 Kết quả GetByIds</h3>
          <Table
            rowKey="settingKey"
            columns={columns.filter((c) => c.key !== "action")}
            dataSource={byIdsData}
            pagination={false}
          />
        </div>
      )}
    </div>
  );
};

export default SiteSettingPage;
