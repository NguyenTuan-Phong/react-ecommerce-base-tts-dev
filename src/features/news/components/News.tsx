
import { latestPosts } from "../data/Data_New";
import { Col, Row } from "antd";
import FearturedArticle from "./FearturedArticle";
import Img from '../../../assets/img_yt/17-maxresdefault.jpg'
import useIsMobile from "../../../components/responsive/useIsMobile";
import Navbar from "../components/navbar.tsx"; 
const News =()=>{
     const mainPost = latestPosts[0];
     const sidePosts = latestPosts.slice(1);
     const isMobile = useIsMobile(); 
     const displayedPosts = isMobile ? sidePosts.slice(0, 2) : sidePosts; 



    return(
        <div>
            <Navbar/>
            <Row
                gutter={[48, 48]}
                align="middle"
                className=" relative overflow-hidden bg-white mt-5 mb-5 mx-0!"
            >
               <Col xs={24} sm={24} md={24} lg={24}>
               
                    <a href={mainPost.url} className="block relative group">
                        <div className="flex">
                            <img
                            src={mainPost.images[0]}
                            alt={mainPost.title}
                            className="w-1/2 object-cover h-[500px]"
                            />
                            <div className="w-1/2 grid grid-cols-2">
                            {mainPost.images.slice(1).map((img, i) => (
                                <div key={i} className="h-[250px] overflow-hidden">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                            </div>
                            <div className="absolute left-0 w-full bg-gradient-to-t from-transparent to-black/70 p-4">
                                <div className="text-orange-500 text-2xl font-bold mb-2">
                                {mainPost.title}
                                </div>
                                <div className="flex items-center text-orange-500/80 text-sm gap-4">
                                <span>{mainPost.date}</span>
                                <span>0</span>
                                <span>{mainPost.views ?? 0}</span>
                                </div>
                            </div>
                        </div>
                        
                        </a>
                    <h2 className="mt-6 mb-4 text-3xl font-bold text-orange-500">
                        TIN TỨC     
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {displayedPosts.map(post => (
                        <a
                        href={post.url}
                        key={post.id}
                        className="block group"
                        >
                        <div className="w-full h-[250px] overflow-hidden mx-auto">
                            <img
                            src={post.images[0]}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            />
                        </div>
                            <div className="mt-2">
                            {/* Title */}
                            <div className="font-semibold text-base text-black line-clamp-2">
                                {post.title}
                            </div>

                            {/* Date & URL */}
                            <div className="text-sm text-gray-500 flex items-center gap-3 mt-1">
                                <span>{post.date}</span>
                                <a href={post.url} className="text-blue-600 hover:underline">
                                Đọc thêm
                                </a>
                            </div>
                            </div>
                        </a>
                    ))}
                    </div>
                </Col>
            </Row>
            <div>   
                <Row
                    gutter={[48, 48]}
                    align="middle"
                    className=" relative overflow-hidden bg-white mt-5 mb-5 mx-0!"
                >
                <Col xs={24} sm={24} md={16} lg={16}>
                        <a href={mainPost.url} className="block relative group">
                            <img
                            src={Img}
                            alt={mainPost.title}
                            className="w-full object-cover h-[500px]"
                            />
                            <div className="bottom-0 left-0 w-full p-6">
                                <div className=" text-xl font-bold mb-3">
                                    {mainPost.title}
                                </div>
                                <div className="flex items-center /80 text-xs gap-4">
                                    <span>{mainPost.date}</span>
                                    <span>0</span>
                                    <span>{mainPost.views ?? 0}</span> 
                                </div>
                            </div>
                        </a>
                        
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                        <FearturedArticle/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default News;
