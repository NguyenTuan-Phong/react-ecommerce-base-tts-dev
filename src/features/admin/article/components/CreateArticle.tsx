import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { createBlog } from "../../../../services/blogServices";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const CreateArticle = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await createBlog(values);
      message.success("Tạo bài viết thành công");
      navigate("/admin/management-article", { state: { reload: true } });
    } catch (err) {
      console.error(err);
      message.error("Tạo bài viết thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow h-[80vh] overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Thêm bài viết</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Ảnh">
          <Input placeholder="URL ảnh" />
        </Form.Item>
        <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}>
          <TextArea rows={10} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Lưu
        </Button>
      </Form>
    </div>
  );
};

export default CreateArticle;
