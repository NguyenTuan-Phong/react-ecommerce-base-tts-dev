// import {
//   DollarOutlined,
//   LeftOutlined,
//   LoadingOutlined,
//   RightOutlined,
//   ShoppingCartOutlined,
//   ShoppingOutlined,
//   StarOutlined,
// } from '@ant-design/icons';
// import { Button } from 'antd';
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import ImageWithFallback from '../../../components/img/ImageWithFallback';
// import SkeletonCategory from '../../../components/skeleton/SkeletonCategory';
// import { useGetAllCombo } from '../../admin/combo/hook/useGetAllCombo';
// import '../../../assets/css/ProductAnimation.css';
// import useAddCart from '../../cart/hook/useAddCart';
// import { useCart } from '../../cart/hook/useCart';
// import useUserStore from '../../../store/useUserStore';
// 
// const DealComboProduct = () => {
//   const [index, setIndex] = useState(0);
//   const { isLoadingGetAllCombo, ResponseDataGetAllCombo } = useGetAllCombo(0, 10);
//   const { refetchCart } = useCart();
//   const { loadingComboId, handleAddCart } = useAddCart(refetchCart);
//   const userId = useUserStore((state) => state.user?.id);
//   if (!ResponseDataGetAllCombo?.data) return null;
// 
//   const data = ResponseDataGetAllCombo.data;
//   const filterData = data.content.filter((i) => i.isActive === true);
//   const totalSlides = filterData.length;
//   const visibleCount = 4;
//   const visibleSlides = [
//     ...filterData.slice(index, index + visibleCount),
//     ...filterData.slice(0, Math.max(0, index + visibleCount - totalSlides)),
//   ];
// 
//   const handleNext = () => {
//     setIndex((prev) => (prev + 1) % totalSlides);
//   };
// 
//   const handleBack = () => {
//     setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };
// 
//   return (
//     <div className='max-w-[1400px] mx-auto bg-[radial-gradient(circle,_#34C787,_#007F5F)] rounded-xl '>
//       <div className='py-6 text-center rounded-t-xl shadow-md relative'>
//         <h1 className='text-white text-2xl md:text-3xl font-extrabold uppercase tracking-wide'>
//           🎉 Giảm Giá Siêu Hời 🎉
//         </h1>
//         <div className='absolute top-10 right-0 transform -translate-1/2 text-sm flex gap-5'>
//           <div className='text-white cursor-pointer' onClick={handleBack}>
//             <LeftOutlined />
//           </div>
//           <Link to={'/combo-product-page'} className='hover:underline! text-white!'>
//             XEM THÊM
//           </Link>
//           <div className='text-white cursor-pointer' onClick={handleNext}>
//             <RightOutlined />
//           </div>
//         </div>
//       </div>
//       {isLoadingGetAllCombo ? (
//         <div>
//           <SkeletonCategory />
//         </div>
//       ) : (
//         <div className='flex gap-3 p-3 overflow-hidden product-carousel' >
//           {visibleSlides.map((i) => (
//             <React.Fragment key={i.id}>
//               <div className='flex-1 bg-[white]! rounded-[8px] p-3 relative'>
//                 <Link to={'/combo-product'} state={i.id} key={i.id}>
//                 <div className="flex justify-center">
//                   <ImageWithFallback src={i.imageUrl} alt={i.nameCombo} className='h-50 w-60 object-contain' />
//                 </div>
//                   <div className='p-5 mb-15'>
//                     <h1 className='text-xl font-bold text-gray-800 uppercase mb-2 line-clamp-1'>
//                       {i?.nameCombo}
//                     </h1>
//                     <p className='text-gray-600 mb-4 leading-relaxed line-clamp-1'>
//                       {i?.description}
//                     </p>
//                     <div className='space-y-2 border-gray-500 border-t border-dashed pt-4'>
//                       <p className='text-sm text-gray-500 line-through flex items-center gap-1'>
//                         <DollarOutlined />
//                         Giá gốc: {i?.originalTotalPrice.toLocaleString()} VNĐ
//                       </p>
//                       <p className='text-sm text-red-600 flex items-center gap-1'>
//                         <StarOutlined />
//                         Giảm: {i?.discountAmount.toLocaleString()} VNĐ ({i?.discountPercentage}%)
//                       </p>
//                       <p className='text-lg font-semibold text-[#fa7833] flex items-center gap-1'>
//                         <ShoppingOutlined />
//                         Giá sau KM: {i?.price.toLocaleString()} VNĐ
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//                 <div className='content-center flex justify-center absolute bottom-5 left-1/2 transform -translate-x-1/2'>
//                   <Button
//                     className='h-12! px-6! text-white! font-semibold! rounded-lg! bg-gradient-to-r! 
//                                         from-[#FF4E50]! to-[#F9D423]! hover:opacity-90! transition-all! duration-300! hover:border-gray-300!'
//                     disabled={loadingComboId === i.id}
//                     onClick={() => handleAddCart(userId!,false, undefined, undefined, { id: i.id, quantity: 1 })}
//                   >
//                     {loadingComboId === i.id ? (
//                        <LoadingOutlined />
//                     ) : (
//                       <div className="flex items-center justify-center gap-2 text-sm">
//                         <ShoppingCartOutlined className="h-4 w-4" />
//                         Bấm Để Mua Deal Sốc
//                       </div>
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </React.Fragment>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default DealComboProduct;

import {
  DollarOutlined,
  LeftOutlined,
  LoadingOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../../../components/img/ImageWithFallback';
import SkeletonCategory from '../../../components/skeleton/SkeletonCategory';
import { useGetAllCombo } from '../../admin/combo/hook/useGetAllCombo';
import '../../../assets/css/ProductAnimation.css';
import useAddCart from '../../cart/hook/useAddCart';
import { useCart } from '../../cart/hook/useCart';
import useUserStore from '../../../store/useUserStore';

const DealComboProduct = () => {
  const [index, setIndex] = useState(0);
  const { isLoadingGetAllCombo, ResponseDataGetAllCombo } = useGetAllCombo(0, 10);
  const { refetchCart } = useCart();
  const { loadingComboId, handleAddCart } = useAddCart(refetchCart);
  const userId = useUserStore((state) => state.user?.id);

  if (!ResponseDataGetAllCombo?.data) return null;

  const data = ResponseDataGetAllCombo.data;
  const filterData = data.content.filter((i) => i.isActive === true);
  const totalSlides = filterData.length;
  const visibleCount = 4;
  const visibleSlides = [
    ...filterData.slice(index, index + visibleCount),
    ...filterData.slice(0, Math.max(0, index + visibleCount - totalSlides)),
  ];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % totalSlides);
  };

  const handleBack = () => {
    setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="mx-auto bg-white rounded-[10px] overflow-visible">

      <div className="py-6 text-center relative">
        <p className="text-[#FF5E62] text-lg font-medium mb-1 italic">
          🔥 Mua Combo – Tiết kiệm nhiều hơn 🔥
        </p>
        <h1 className="bg-gradient-to-r from-[#FF9966] to-[#FF5E62] bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold uppercase tracking-wide drop-shadow-lg">
          Combo Giảm Giá Siêu Hời
        </h1>
        <p className="text-gray-500 mt-2 text-base">
          Lựa chọn thông minh – Nhận ngay ưu đãi khủng!
        </p>

        <div className="absolute top-8 right-6 flex items-center gap-5">
          <div
            className="text-[#FF5E62] text-lg cursor-pointer hover:scale-110 transition-transform"
            onClick={handleBack}
          >
            <LeftOutlined />
          </div>
          <Link
            to={'/combo-product-page'}
            className="px-4 py-1 bg-[#FF5E62] text-white font-semibold rounded-full shadow hover:shadow-lg transition-all"
          >
            Xem thêm
          </Link>
          <div
            className="text-[#FF5E62] text-lg cursor-pointer hover:scale-110 transition-transform"
            onClick={handleNext}
          >
            <RightOutlined />
          </div>
        </div>
      </div>


      {isLoadingGetAllCombo ? (
        <SkeletonCategory />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-10 py-10 overflow-visible">
          {visibleSlides.map((i) => (
            <div
              key={i.id}
              className="group flex-1 bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-visible border border-gray-100"
            >


              <Link to={'/combo-product'} state={i.id}>

                <div className="flex justify-center mb-4 relative z-0">
                  <ImageWithFallback
                    src={i.imageUrl}
                    alt={i.nameCombo}
                    className="h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div>
                  <h1 className="text-lg font-bold text-gray-800 uppercase mb-1 line-clamp-1">
                    {i?.nameCombo}
                  </h1>
                  <p className="text-gray-500 mb-3 text-sm line-clamp-3 h-[64px]">
                    {i?.description}
                  </p>

                  <div className="border-t border-dashed border-gray-300 pt-3 space-y-1 text-sm">
                    <p className="line-through text-gray-400 flex items-center gap-1">
                      <DollarOutlined /> Giá gốc: {i?.originalTotalPrice.toLocaleString()} VNĐ
                    </p>
                    <p className="text-red-500 font-medium flex items-center gap-1">
                      <StarOutlined /> Giảm: {i?.discountAmount.toLocaleString()} VNĐ ({i?.discountPercentage}%)
                    </p>
                    <p className="text-[#FF5E62] font-bold text-base flex items-center gap-1">
                      <ShoppingOutlined /> Giá sau KM: {i?.price.toLocaleString()} VNĐ
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex justify-center mt-4">
                <Button
                  className="h-12! px-6! text-white! font-semibold! rounded-full! bg-gradient-to-r! from-[#FF5E62]! to-[#FF9966]! hover:opacity-90! shadow-lg!"
                  disabled={loadingComboId === i.id}
                  onClick={() =>
                    handleAddCart(userId!, false, undefined, undefined, { id: i.id, quantity: 1 })
                  }
                >
                  {loadingComboId === i.id ? (
                    <LoadingOutlined />
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <ShoppingCartOutlined className="h-4 w-4" />
                      Giỏ hàng
                    </div>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default DealComboProduct;
