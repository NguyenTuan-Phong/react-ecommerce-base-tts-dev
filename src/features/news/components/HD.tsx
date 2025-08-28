import { PlayCircleOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

import ImgHD from '../../../assets/img_news_event/ps4.jpg';
import Img from '../../../assets/img_yt/1.jpg';
import { guides } from '../data/Data_HD';
import { youtubeChanelVideos } from '../data/Data_YT';
import FearturedArticle from './FearturedArticle';
import Navbar from "../components/navbar.tsx"; 
const HD = () => {
  const mainPost = youtubeChanelVideos[0];
  // Chia video nhỏ thành 2 cột
  const sideVideos = guides.map((video, idx) => ({ ...video, idx }));

  const half = Math.ceil(sideVideos.length / 2);
  const sideCol1 = sideVideos.slice(0, half);
  const sideCol2 = sideVideos.slice(half);

  return (
    <div>
      <Navbar/>
      <Row
        gutter={[48, 48]}
        align='top'
        className='rounded-xl shadow p-4 relative overflow-hidden bg-white mt-5 mb-5 mx-0!'
      >
        <Col xs={24} sm={24} md={15} lg={15}>
          {/* Danh sách video nhỏ hơn | 2 cột */}
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              {sideCol1.map((post) => (
                <button
                  key={post.id}
                  className='block w-full text-left group bg-transparent border-none p-0'
                  style={{ cursor: 'pointer' }}
                >
                  <div className='relative mt-3'>
                    <img
                      src={ImgHD}
                      alt={post.title}
                      className='w-full h-[120px] object-cover rounded-[16px] mb-2 rounded-xl'
                    />
                    <span className='absolute inset-0 flex items-center justify-center'>
                      <PlayCircleOutlined
                        style={{ fontSize: '40px', color: 'rgba(124, 117, 117, 0.7)' }}
                      />
                    </span>
                  </div>
                  <div className='font-medium text-sm line-clamp-2' style={{ color: 'black' }}>
                    {post.title}
                  </div>
                </button>
              ))}
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              {sideCol2.map((post) => (
                <button
                  key={post.id}
                  className='block w-full text-left group bg-transparent border-none p-0'
                  style={{ cursor: 'pointer' }}
                >
                  <div className='relative mt-3'>
                    <img
                      src={ImgHD}
                      alt={post.title}
                      className='w-full h-[120px] object-cover rounded-[16px] mb-2 object-cover'
                    />
                    <span className='absolute inset-0 flex items-center justify-center'>
                      <PlayCircleOutlined
                        style={{ fontSize: '40px', color: 'rgba(124, 117, 117, 0.7)' }}
                      />
                    </span>
                  </div>
                  <div className='font-medium text-sm line-clamp-2' style={{ color: 'black' }}>
                    {post.title}
                  </div>
                </button>
              ))}
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={9} lg={9}>
          <FearturedArticle />
          <div className='mt-5'>
            <h2 className='font-semibold text-[#fa7833] text-lg mb-2'>BÀI VIẾT NỔI BẬT</h2>
            <a href={mainPost.videoUrl} className='block relative group'>
              <img
                src={Img}
                alt={mainPost.title}
                className='w-full h-[200px] object-cover rounded-[24px]'
              />
              <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent rounded-b-[24px] p-6'>
                <div className='text-white text-xl font-bold mb-3'>{mainPost.title}</div>
              </div>
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HD;
