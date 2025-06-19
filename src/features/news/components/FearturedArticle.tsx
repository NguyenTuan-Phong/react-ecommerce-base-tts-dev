import { youtubeChanelVideos } from "../data/Data_YT";
import { guides, type Guide } from "../data/Data_HD";
import { intro } from "../data/Data_Intro";
import Img3 from '../../../assets/img_yt/1.jpg'
// interface Blog {
//   id: string;
//   title: string;
//   image:string;
//   description?: string;
//   date?: string;        
//   createdAt?: string;   
// }
const blog : Guide[] =[

    ...youtubeChanelVideos,
    ...guides,
    ...intro,
    
];
// Hàm so sánh ngày tháng giảm dần
const compareByDate = (a: Guide, b: Guide): number => {
  const dateA = new Date(a.date || a.createdAt || 0).getTime();
  const dateB = new Date(b.date || b.createdAt || 0).getTime();
  return dateB - dateA;
};
 const FearturedArticle =() =>{
     const latestPosts = blog
    .filter(item => item.date || item.createdAt)
    .sort(compareByDate)
    .slice(0, 6);
    return (
        <div>
            <h2 className="font-semibold text-[#22a085] text-lg mb-2">BÀI VIẾT MỚI NHẤT</h2>
            <div className="flex flex-col gap-4">
                {latestPosts.map((post) => (
                <a
                key={post.id}
                className="flex gap-3 items-center hover:bg-gray-50 p-2 rounded-lg transition"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <div className="relative w-25! h-15!">
                        <img
                        src={Img3}
                        alt={post.title}
                        className=" object-cover flex-shrink-0 rounded-xl"
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
    );

 };
 export default FearturedArticle;