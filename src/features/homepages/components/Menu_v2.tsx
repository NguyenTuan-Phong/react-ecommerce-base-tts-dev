import { Link } from "react-router-dom";

interface SubCategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  categoryItems?: SubCategory[];
  icon?: React.ReactNode;
}

interface Props {
  categoryItems: Category[];
}

const Menuv2 = ({ categoryItems }: Props) => {
  if (!categoryItems?.length) return null;

  return (
    <div className="relative flex-1 h-[684px] w-[348px] grid grid-rows-11 text-[20px] rounded-[20px] bg-white overflow-y-auto">
      {categoryItems.map((item) => {
        const firstSub = item.categoryItems?.[0]; 

        return (
          <div key={item.id} className="group relative">
            <div className="hover:bg-[#22a085] h-full flex gap-4 items-center hover:text-white pl-[20px] py-2">
              <div className="text-[16px] w-[40px]">{item?.icon}</div>

              {firstSub ? (
                <Link
                  to={`/category/${item.id}/${firstSub.id}`}
                  className="hover:underline"
                >
                  {item.name}
                </Link>
              ) : (
                <span>{item.name}</span>
              )}
            </div>

            {item.categoryItems && item.categoryItems.length > 0 && (
              <div
                className="hidden group-hover:grid grid-cols-4 gap-2 bg-white w-[1052px] h-[682px]
                rounded-[20px] shadow-xl absolute z-50 left-full top-0"
              >
                {item.categoryItems.map((child) => (
                  <div key={child.id} className="p-5 border-8 border-red-500">
                    <Link
                      to={`/category/${item.id}/${child.id}`}
                      className="text-[16px] text-[#29A07E] hover:cursor-pointer hover:underline"
                    >
                      {child.name.toLocaleUpperCase()}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Menuv2;
