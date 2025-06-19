import { Link } from "react-router-dom";
import { latestPosts } from "../data/Data_New";
import { Col, Row } from "antd";
import FearturedArticle from "./FearturedArticle";
import Img from '../../../assets/img_yt/17-maxresdefault.jpg'
const News =()=>{
     const mainPost = latestPosts[0];
    const sidePosts = latestPosts.slice(1);

    return(
        <div>
            <section className="flex gap-4 py-[20px]">
                <Link style={{color : 'black', fontWeight : 'bold'}} to={'/'}>
                    TRANG CHỦ
                </Link>
                <p>/</p>
                <p className="font-bold">TIN TỨC</p>
            </section>
            <div className="flex gap-5">
                <Link style={{color : 'black'}} to={'/yt'}>
                    YOUTUBE CHANEL
                </Link>
                <Link style={{color : 'black'}} to={'/game'}>
                    GAME
                </Link>
                <Link style={{color : 'black'}} to={'/hd'}>
                    HƯỚNG DẪN
                </Link>
                <Link style={{color : 'black'}} to={'/intro'}>
                    GIỚI THIỆU
                </Link>
            </div>
            <Row
                gutter={[48, 48]}
                align="middle"
                className="rounded-xl shadow p-4 relative overflow-hidden bg-white mt-5 mb-5 mx-0!"
            >
               <Col xs={24} sm={24} md={16} lg={16}>
                    <a href={mainPost.url} className="block relative group">
                        <img
                            src={Img}
                            alt={mainPost.title}
                            className="w-full h-[380px] object-cover rounded-[24px]"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent rounded-b-[24px] p-6">
                            <div className="text-white text-xl font-bold mb-3">
                                {mainPost.title}
                            </div>
                            <div className="flex items-center text-white/80 text-xs gap-4">
                                <span>{mainPost.date}</span>
                                <span>0</span>
                                 <span>{mainPost.views ?? 0}</span> 
                            </div>
                        </div>
                    </a>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {sidePosts.map(post => (
                            <a
                                href={post.url}
                                key={post.id}
                                className="block group"
                            >
                                <img
                                    src={Img}
                                    alt={post.title}
                                    className="w-full h-[120px] object-cover rounded-[16px] mb-2"
                                />
                                <div className="font-medium text-sm line-clamp-2" style={{color:'black'}}>{post.title}</div>
                            </a>
                        ))}
                    </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                    <FearturedArticle/>
                </Col>
            </Row>
        </div>
    )
}
export default News;
