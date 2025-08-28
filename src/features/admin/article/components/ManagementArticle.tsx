import { useEffect, useState } from "react";
import { Table, Button, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllBlogs, deleteBlog } from "../../../../services/blogServices";
import type { BlogPost } from "../../../../services/blogServices";
import ButtonDelete from '../../../../components/button/ButtonDelete';

const ManagementArticle = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setArticles(data);
    } catch (err) {
      console.error(err);
      message.error("Không tải được danh sách bài viết");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await deleteBlog(id);
      message.success("Xóa thành công");
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      message.error("Xóa thất bại");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <Spin />;

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Quản lý bài viết</h1>
        <Button type="primary" onClick={() => navigate("/admin/create-article")}>
          ➕ Thêm bài viết
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={articles}
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Tiêu đề", dataIndex: "title" },
          {
            title: "Ảnh",
            dataIndex: "image",
            render: (src) =>
              src ? (
                <img src={src} alt="" className="w-16 h-16 object-cover" />
              ) : (
                <span className="text-gray-400">Không có ảnh</span>
              ),
          },

          {
            title: "Thao Tác",
            render: (_, record) => (
              <div className="flex gap-2">
                <Button onClick={() => navigate(`/admin/edit-article/${record.id}`)}>
                  ✏ Sửa
                </Button>
                <Button onClick={() => navigate(`/admin/article/${record.id}`)}>
                  👁 Xem
                </Button>
                <ButtonDelete
                  onConfirm={() => handleDelete(record.id)}
                  isLoading={deletingId === record.id}
                />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ManagementArticle;
