
import { Link } from "react-router-dom";
import { Col, Row, Button, Spin } from "antd";
import { useState ,useEffect} from 'react';
// import { Article_data } from "../data/Article_data.ts";
import FearturedArticle from "./FearturedArticle";
import Img from '../../../assets/img/home-bg-collection.png'
import Navbar from "../components/navbar.tsx"; 
import { getAllBlogs } from "../../../services/blogServices";
import type { BlogPost } from "../../../services/blogServices";

const Article = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllBlogs();
        setPosts(data);
      } catch (err) {
        console.error("Fetch blogs failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const displayed = showAll ? posts : posts.slice(0, 6);

  return (
    <div>
      <Navbar/>
      <div
        className="relative w-full h-[450px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${Img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10">
          <h1 className="text-white text-4xl font-bold mb-4">BÀI VIẾT</h1>
          <p className="text-gray-200">
            <span className="text-white">CODEC.VN</span>{" "}
            <span className="text-orange-500">› BÀI VIẾT</span>
          </p>
        </div>
      </div>

      <Row gutter={[48, 48]} className="rounded-xl shadow p-4 bg-white mt-5 mb-5 mx-0!">
        <Col xs={24} sm={24} md={18} lg={18}>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spin />
            </div>
          ) : (
            <>
              <Row gutter={[24, 24]} className="bg-white mt-5 mb-5 mx-0!">
                {displayed.map((article) => (
                  <Col key={article.id} xs={24} sm={12} md={8}>
                    <Link to={article.url}>
                      <div className="relative w-full h-[260px] overflow-hidden shadow-md group rounded-xl">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-white text-lg font-semibold line-clamp-2">
                            {article.title}
                          </h3>
                          {article.excerpt && (
                            <p className="text-gray-200 text-sm overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-[100px] mt-2">
                              {article.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>

              {posts.length > 6 && !showAll && (
                <div className="flex justify-center mb-6">
                  <Button
                    type="primary"
                    className="!bg-orange-500 hover:!bg-orange-600 !border-none !text-white px-6 py-2 rounded-lg"
                    onClick={() => setShowAll(true)}
                  >
                    Xem thêm
                  </Button>
                </div>
              )}
            </>
          )}
        </Col>

        <Col xs={24} sm={24} md={6}>
          <FearturedArticle />
        </Col>
      </Row>
    </div>
  );
};

export default Article;