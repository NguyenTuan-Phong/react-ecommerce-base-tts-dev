import FlashSale from '../../../flashSale/Component/FlashSale';
import ProductList from '../../../productdetail/components/ProductList';
import HomeBannerv2 from '../HomeBanner_v2';
import ShoppingTrend from '../ShoppingTrend';
import Slide from '../Slide';
const HomePage = () => {

  return (
    <>
      <section className='my-[30px]'>
        <HomeBannerv2 />
      </section>
      <section className='my-[30px]'>
        <Slide />
      </section>
      <section className="my-[30px]">
        <FlashSale />
      </section>
      <section className='my-[30px]'>
        <ShoppingTrend />
      </section>

      <ProductList />
    </>
  );
};
export default HomePage;
