import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin, message } from "antd";
import { getBlogById, updateBlog } from "../../../../services/blogServices";
import type { BlogDetail } from "../../../../services/blogServices";

const { TextArea } = Input;

const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fetching, setFetching] = useState(true); // loading khi fetch
  const [saving, setSaving] = useState(false); // loading khi submit

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data: BlogDetail = await getBlogById(Number(id));
        form.setFieldsValue({
          title: data.title,
          image: data.image,
          content: data.content,
          author: data.author,
        });
      } catch (err) {
        console.error(err);
        message.error("Không tải được dữ liệu bài viết");
      } finally {
        setFetching(false);
      }
    })();
  }, [id, form]);

  const onFinish = async (values: any) => {
    if (!id) return;
    try {
      setSaving(true);
      await updateBlog(Number(id), values);
      message.success("Cập nhật thành công");
      navigate("/admin/management-article", { state: { reload: true } });
    } catch (err) {
      console.error(err);
      message.error("Cập nhật thất bại");
    } finally {
      setSaving(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow h-[80vh] overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Chỉnh sửa bài viết</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Ảnh (URL)" name="image">
          <Input />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="content"
          rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
        >
          <TextArea rows={10} />
        </Form.Item>

        <Form.Item label="Tác giả" name="author">
          <Input />
        </Form.Item>

        <Form.Item>
          <div className="flex gap-2">
            <Button type="primary" htmlType="submit" loading={saving}>
              Lưu thay đổi
            </Button>
            <Button onClick={() => navigate("/admin/management-article")}>
              Hủy
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditArticle;
