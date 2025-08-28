import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import { getBlogById } from "../../../services/blogServices";
import type { BlogDetail } from "../../../services/blogServices";
import Navbar from "../components/navbar.tsx";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("❌ Không tìm thấy ID trong URL");
      setLoading(false);
      return;
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      console.error("❌ ID không hợp lệ:", id);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const data = await getBlogById(numericId);
        console.log("✅ ArticleDetail API data:", data);

        // fallback cho content nếu API trả về body/description
        setArticle({
          ...data,
          content: data.content || (data as any).body || (data as any).description || "",
        });
      } catch (err) {
        console.error("❌ Failed to fetch article:", err);
        message.error("Không tải được bài viết");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-40">
          <Spin />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-10 text-gray-500">
          Bài viết không tồn tại
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        {article.image && article.image.trim() !== "" && (
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
        <p className="text-gray-400 text-sm mt-6">
          {article.author && <>Tác giả: {article.author} – </>}
          {article.createdAt && (
            <>Ngày đăng: {new Date(article.createdAt).toLocaleDateString()}</>
          )}
        </p>
      </div>
    </div>
  );
};

export default ArticleDetail;
