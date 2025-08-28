import { Link } from "react-router-dom";
import { useCategories } from "../../productdetail/hook/useCategories";

const CategoriesMenu = () => {
  const { data: categoryData, isLoading, isError } = useCategories(0, 10);
  const categories = categoryData?.data?.content || [];

  if (isLoading) return <div>Đang tải danh mục...</div>;
  if (isError) return <div>Lỗi khi tải danh mục...</div>;

  const pattern = [
    [null, 0, 1, 2, null],
    [3, 4, 5, 6, null],
    [null, 7, 8, 9, null],
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full py-20">
      <h1 className="mb-6 text-3xl font-bold">Danh mục sản phẩm</h1>

      <div className="relative ">
        <div className="grid grid-cols-5 gap-4 transform ">
          {pattern.flat().map((idx, i) => {
            const item = idx !== null ? categories[idx] : null;

            return (
              <div
                key={i}
                className={`w-30 h-30 flex items-center justify-center text-center shadow-lg rounded-lg transition hover:text-white hover:cursor-pointer ${
                  item ? "bg-orange-400 hover:bg-orange-500" : "bg-transparent"
                }`}
              >
                {item && (
                  <Link
                    to={`/category/${item.id}`}
                    className="w-full h-full flex items-center justify-center transform -rotate-45 font-bold"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesMenu;
