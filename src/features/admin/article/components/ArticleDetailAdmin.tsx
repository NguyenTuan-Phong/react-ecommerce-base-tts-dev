import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import { getBlogById } from "../../../../services/blogServices";
import type { BlogDetail } from "../../../../services/blogServices";

const ArticleDetailAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getBlogById(Number(id));
        setArticle(data);
      } catch (err) {
        console.error("Failed to fetch article:", err);
        message.error("Không tìm thấy bài viết");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-10 text-gray-500">
        Bài viết không tồn tại
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow h-[80vh] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full rounded-lg mb-6"
        />
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default ArticleDetailAdmin;
