
import ShoppingTrend from "../ShoppingTrend"
import Sale from "../Sale"
import HomeBannerv2 from "../HomeBanner_v2"
import { useCategories } from "../../../productdetail/hook/useCategories"
import { useProducts } from "../../../productdetail/hook/useProduct"
import ProductList from "../../../productdetail/components/ProductList"


const HomePage = () => {

    const { isLoading: loadingProducts } = useProducts();
    const { data: categoryData, isLoading: loadingCategories } = useCategories();

     // LẤY ĐÚNG MẢNG
    // const products = productData?.data?.content || [];
    const categories = categoryData?.data?.content || [];

    if (loadingProducts || loadingCategories) return <div>Loading...</div>;

    return(
        <>
            <section className="my-[30px]">
                <HomeBannerv2 />
            </section>
            <section className="my-[30px]">
                <Sale />
            </section>
            <section className="my-[30px]">
                <ShoppingTrend />
            </section>
            
            <ProductList categories={categories}/>
            
        </>
    )
}
export default HomePage