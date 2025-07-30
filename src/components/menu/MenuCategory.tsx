import { Link } from "react-router-dom";
import { useCategories } from "../../features/productdetail/hook/useCategories";

const MenuCategory = () => {
    const { data: categoryData} = useCategories();
    const categories = categoryData?.data || [];
    return (
        <div className="bg-white max-h-[500px] overflow-y-auto px-4 md:px-10 lg:px-20 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {categories.map((item: any) => (
                    <div key={item.id}>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-primary transition-all">
                            <Link to={`/category/${item.id}`}>{item.name}</Link>
                        </h3>

                        <ul className="space-y-1 list-disc pl-4">
                            {item.categoryItems.map((i: any) => (
                                <li key={i.id} className="leading-tight!">
                                    <Link
                                        to={`/category/${item.id}/${i.id}`}
                                        className="text-sm text-gray-600 hover:text-[#22a085] transition-colors leading-tight h-6 block truncate"
                                    >
                                        {i.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default MenuCategory