import { useState } from 'react';
import FlashSale from '../../../flashSale/Component/FlashSale';
import ProductList from '../../../productdetail/components/ProductList';
import HomeBannerv2 from '../HomeBanner_v2';
import ShoppingTrend from '../ShoppingTrend';
import StickPagination from '../StickPagination';
import DealComboProduct from '../DealComboProduct';
import CustomerReviews from '../CustomerReviews';
import CategoriesMenu from '../Menu';
const HomePage = () => {
  const [page, setPage] = useState(0)
  const [size] = useState(10)
  return (
    <>
      <section className='my-[40px]'>
        <HomeBannerv2 />
      </section>
      <section>
        <CategoriesMenu />
      </section>
      <section className="my-[40px]">
        <FlashSale />
      </section>
      <section className='my-[40px]'>
        <ShoppingTrend />
      </section>
      <section className='my-[40px]'>
        <DealComboProduct />
      </section>
      
      <ProductList 
        page={page}
        size={size}
      />
      <section className='my-[10px]'>
        <StickPagination 
          page={page}
          setPage={setPage}
          size={size}
        />
      </section>
      <section className='my-[40px]'>
        <CustomerReviews/>
      </section>
      
    </>
  );
};
export default HomePage;