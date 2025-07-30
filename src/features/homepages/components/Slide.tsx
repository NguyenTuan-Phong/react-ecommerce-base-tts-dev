import { Link } from "react-router-dom";
import { useCategories } from "../../productdetail/hook/useCategories";

const Slide = () => {
    const { data: categoryData} = useCategories();
    const categories = categoryData?.data || [];
    const allCategoryItems = categories.flatMap((category:any) =>
        category.categoryItems.map((item:any) => ({
            ...item,
            categoryId: category.id,
        }))
    );

    return(

        <div className="flex flex-col gap-5">
            <style>
                {`
                    @keyframes marqueeLoop {
                        0%   { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }

                    @keyframes marqueeLoopReverse {
                        0%   { transform: translateX(-50%); }
                        100% { transform: translateX(0); } 
                    }

                    .marquee-loop {
                        display: flex;
                        width: fit-content;
                        animation: marqueeLoop 60s linear infinite;
                    }
                    .marquee-loop-items {
                        display: flex;
                        width: fit-content;
                        animation: marqueeLoopReverse 80s linear infinite;
                    }
                `}
            </style>
            
            <div className="overflow-hidden w-full bg-gray-100">
                <div className="marquee-loop whitespace-nowrap">
                    {[...categories, ...categories,...categories].map((item, i) => (
                        <div key={i} className="min-w-max px-4 py-2 bg-white rounded shadow text-sm font-medium 
                        text-gray-700 mx-2 cursor-pointer hover:bg-[#22a085]">
                            <Link to={`/category/${item.id}`}
                                className="text-black! hover:text-white!"
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="overflow-hidden w-full bg-gray-100">
                <div className="marquee-loop-items whitespace-nowrap">
                    {[...allCategoryItems, ...allCategoryItems,...allCategoryItems].map((item, i) => (
                        <div key={i} className="min-w-max px-4 py-2 bg-white rounded shadow text-sm font-medium 
                        text-gray-700 mx-2 cursor-pointer hover:bg-[#22a085]">
                            <Link
                                to={`/category/${item.categoryId}/${item.id}`}
                                className="text-black! hover:text-white!"
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Slide
