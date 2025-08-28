import { api } from '../config/axios-config';
import { API_PATHS } from "../constants/apiPath";

// Kiểu dữ liệu của bài viết tóm tắt (dùng ở danh sách / home / quản lý)
export type BlogPost = {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  url: string;
};

// Kiểu dữ liệu chi tiết bài viết
export type BlogDetail = {
  id: number;
  title: string;
  image: string;
  content: string;
  author?: string;
  createdAt?: string;
  tags?: string[];
};

// -----------------------------
// Helpers
// -----------------------------
function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toBlogPost(p: any): BlogPost {
  const image = p.image || p.thumbnailUrl || p.featuredImageUrl || "";
  const excerpt =
    p.excerpt || (p.content ? stripHtml(p.content).slice(0, 140) + "…" : "");
  const slug = p.slug || p.id;

  return {
    id: p.id,
    title: p.title ?? "",
    image,
    excerpt,
    url: `/article/${slug}`, // link frontend
  };
}

// -----------------------------
// API Services
// -----------------------------

// Lấy tất cả bài viết
export async function getAllBlogs(): Promise<BlogPost[]> {
  const res = await api.get(API_PATHS.posts.getAll);
  const raw = Array.isArray(res.data) ? res.data : res.data.content || [];
  return raw.map(toBlogPost);
}

// Lấy chi tiết 1 bài viết
export async function getBlogById(id: number): Promise<BlogDetail> {
  const res = await api.get(`${API_PATHS.posts.getById}/${id}`);
  const p = res.data;
  return {
    id: p.id,
    title: p.title ?? "",
    image: p.image || p.thumbnailUrl || p.featuredImageUrl || "",
    content: p.content || "",
    author: p.author?.name ?? "",
    createdAt: p.createdAt,
    tags: p.tags?.map((t: any) => t.name) || [],
  };
}

// Tạo mới bài viết
export const createBlog = async (data: any) => {
  const res = await api.post(API_PATHS.posts.create, data);
  return res.data;
};

export const updateBlog = async (id: number | string, data: any) => {
  const res = await api.put(API_PATHS.posts.update(id), data);
  return res.data;
};
// Xóa bài viết
export async function deleteBlog(id: number): Promise<void> {
  await api.delete(`${API_PATHS.posts.delete}/${id}`);
}
