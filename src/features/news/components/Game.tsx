import { Link } from "react-router-dom";
import { youtubeChanelVideos } from "../data/Data_YT";
import { Col, Row } from "antd";
import ImgGame from '../../../assets/img_news_event/14-maxresdefault-2-711x400.jpg'
const Intro = () => {
    const mainPost = youtubeChanelVideos[0];
  
  return (
    <div>
      <section className="flex gap-4 py-[20px]">
        <Link style={{ color: "black", fontWeight: "bold" }} to={"/"}>
          TRANG CHỦ
        </Link>
        <p>/</p>
        <Link style={{ color: "black", fontWeight: "bold" }} to={"/news"}>
          TIN TỨC
        </Link>
        <p>/</p>
        <p className="font-bold">GAME</p>
      </section>
      <div className="flex gap-5 mb-2">
        <Link style={{ color: "black" }} to={"/yt"}>
          YOUTUBE CHANEL
        </Link>
        <Link style={{ color: "black" }} to={"/game"}>
          GAME
        </Link>
        <Link style={{ color: "black" }} to={"/hd"}>
          HƯỚNG DẪN
        </Link>
        <Link style={{ color: "black" }} to={"/intro"}>
          GIỚI THIỆU
        </Link>
      </div>
      <Row
        gutter={[48, 48]}
        align="top"
        className="rounded-xl shadow p-4 relative overflow-hidden bg-white mt-5 mb-5 mx-0!"
      >
        <Col xs={24} sm={24} md={15} lg={15}>
          {/* Danh sách video nhỏ hơn | 2 cột */}
          <p>Đang cập nhật...</p>
        </Col>
        <Col xs={24} sm={24} md={9} lg={9}>
            <div>
               <h2 className="font-semibold text-[#22a085] text-lg mb-2">BÀI VIẾT MỚI NHẤT</h2>
                <div className="flex flex-col gap-4">
                    {youtubeChanelVideos.map((post) => (
                    <a
                        href={post.videoUrl}
                        key={post.id}
                        className="flex gap-3 items-center hover:bg-gray-50 p-2 rounded-lg transition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="relative w-25! h-15!">
                          <img
                              src={ImgGame}
                              alt={post.title}
                              className="object-cover flex-shrink-0 rounded-xl"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm line-clamp-2" style={{ color: "black" }}>
                              {post.title}
                          </div>
                          <p className="font-sm text-sm" style={{ color: "gray" }} >{post.date}</p>
                        </div>
                    </a>
                    ))}
                </div>
            </div>
            <div className="mt-5">
                 <h2 className="font-semibold text-[#22a085] text-lg mb-2">BÀI VIẾT NỔI BẬT</h2>
                    <a href={mainPost. videoUrl} className="block relative group">
                        <img
                            src={ImgGame}
                            alt={mainPost.title}
                            className="w-full h-[200px] object-cover rounded-[24px]"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent rounded-b-[24px] p-6">
                            <div className="text-white text-xl font-bold mb-3">
                                {mainPost.title}
                            </div>
                        </div>
                    </a>
            </div>
         


        </Col>
      </Row>
    </div>
  );
};

export default Intro;