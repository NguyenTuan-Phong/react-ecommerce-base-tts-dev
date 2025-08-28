import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetAllCombo } from '../../admin/combo/hook/useGetAllCombo';
import ComboProductCard from './ComboProductCard';
import { Pagination } from 'antd';

export default function ComboProductPage() {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const {
    isLoadingGetAllCombo,
    ResponseDataGetAllCombo,
  } = useGetAllCombo(page, size)

  const data = ResponseDataGetAllCombo?.data.content || []
  return (
    <div className="max-w-[1400px] mx-auto py-6">

      <div className="mb-4">
        <nav className="text-sm text-gray-500">
          <Link to="/" className="hover:underline">
            TRANG CHỦ
          </Link>{' '}
          /{' '}
          <span className="text-gray-700 font-semibold">COMBO SẢN PHẨM</span>
        </nav>
      </div>
      {isLoadingGetAllCombo ? (
        <div>Loading</div>
      ) : (
        <section>
          <ComboProductCard
            data = {data}
          />
        </section>
      )}

      <section className='mt-5'>
        <Pagination
          current={page + 1}
          pageSize={size}
          align='center'
          total={ResponseDataGetAllCombo?.data.currentTotalElementsCount}
          onChange={(newPage, newSize) => {
            setPage(newPage - 1)
            setSize(newSize)
          }}
        />
      </section>
    </div>
  );
}