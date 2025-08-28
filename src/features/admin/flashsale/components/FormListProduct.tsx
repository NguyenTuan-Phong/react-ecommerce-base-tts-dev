import { Avatar, Button, InputNumber, Pagination, Table } from 'antd';
import { useEffect, useState } from 'react';
import type { products } from '../../../../types';
import { useGetCheckProductFlashSale } from '../hook/useGetCheckProductFlashSale';
interface FlashSaleProductSubmit {
  productId: string;
  flashPrice: number;
  availableQuantity: number;
}
interface FormListProductProps {
  onChangeConfirmedRows?: (rows: FlashSaleProductSubmit[]) => void;
  confirmedRows?: FlashSaleProductSubmit[];
  flashSaleData?: products[];
  startTime?: string;
  endTime?: string;
}
const FormListProduct = ({
  onChangeConfirmedRows,
  confirmedRows,
  flashSaleData,
  startTime,
  endTime,
}: FormListProductProps) => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [productItems, setProductItems] = useState<any[]>([]);
  const { isLoadingGetCheckProductFlashSale, ResponseDataGetProductFlashSale } =
    useGetCheckProductFlashSale(startTime!, endTime!, page, size);

  const [editRows, setEditRows] = useState<
    Record<
      string,
      {
        quantity?: number;
        percent?: number;
      }
    >
  >({});

  useEffect(() => {
    if (!flashSaleData && !ResponseDataGetProductFlashSale) return;

    const confirmedMap = new Map((confirmedRows || []).map((item) => [item.productId, item]));

    const flashSaleIds = new Set((flashSaleData || []).map((p) => p.productId));

    const confirmedProducts = (flashSaleData || []).map((product) => {
      if (editRows[product.productId]) {
        return {
          ...product,
          id: product.productId,
          isConfirmed: false,
          price: product.originalPrice,
        };
      }

      const flashPrice = confirmedMap.get(product.productId)?.flashPrice ?? product.flashPrice ?? 0;
      const availableQuantity =
        confirmedMap.get(product.productId)?.availableQuantity ?? product.availableQuantity ?? 0;
      return {
        ...product,
        id: product.productId,
        isConfirmed: true,
        flashPrice,
        availableQuantityFlash: availableQuantity,
        price: product.originalPrice,
      };
    });

    const newProducts = (ResponseDataGetProductFlashSale?.data?.content || [])
      .filter((p: any) => !flashSaleIds.has(p.id))
      .map((p: any) => ({
        ...p,
        isConfirmed: false,
        price: p.price || p.originalPrice,
      }));

    setProductItems([...confirmedProducts, ...newProducts]);
  }, [flashSaleData, confirmedRows, ResponseDataGetProductFlashSale, editRows]);

  const [flashSaleProducts, setFlashSaleProducts] = useState<
    {
      productId: string;
      flashPrice: number;
      availableQuantity: number;
    }[]
  >([]);
  useEffect(() => {
    if (onChangeConfirmedRows) onChangeConfirmedRows(flashSaleProducts);
  }, [flashSaleProducts, onChangeConfirmedRows]);

  useEffect(() => {
    if (flashSaleData && flashSaleData.length > 0) {
      const initialConfirmed = flashSaleData.map((item) => ({
        productId: item.productId,
        flashPrice: item.flashPrice,
        availableQuantity: item.availableQuantity,
      }));
      setFlashSaleProducts(initialConfirmed);
      setSelectedRowKeys(initialConfirmed.map((i) => i.productId));
    }
  }, [flashSaleData]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleConfirm = (record: any) => {
    const { quantity, percent } = editRows[record.id] || {};
    if (quantity && percent !== undefined) {
      const flashPrice = Math.round(record.price - (record.price * percent) / 100);
      setFlashSaleProducts((prev) => {
        const filtered = prev.filter((item) => item.productId !== record.id);
        return [
          ...filtered,
          {
            productId: record.id,
            flashPrice,
            availableQuantity: quantity,
            originalPrice: record.price,
          },
        ];
      });
    }
  };

  const handleEdit = (record: any) => {
    setEditRows((prev) => ({
      ...prev,
      [record.id]: {
        quantity: flashSaleProducts.find((item) => item.productId === record.id)?.availableQuantity,
        percent: flashSaleProducts.find((item) => item.productId === record.id)
          ? Math.round(
              100 -
                (flashSaleProducts.find((item) => item.productId === record.id)!.flashPrice /
                  record.price) *
                  100,
            )
          : undefined,
      },
    }));
    setFlashSaleProducts((prev) => prev.filter((item) => item.productId !== record.id));

    setProductItems((prev) =>
      prev.map((item) => (item.id === record.id ? { ...item, isConfirmed: false } : item)),
    );
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => page * size + index + 1,
      width: '7%',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className='flex items-center gap-2'>
          <Avatar className='shrink-0!' shape='square' size={48} src={record.imageUrl} />
          <span className='text-[black] line-clamp-2'>{text}</span>
        </div>
      ),
      width: '15%',
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Có thể bán',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '8%',
      render: (quantity: number, record: any) => {
        return <p>{quantity ?? record.availableQuantity}</p>;
      },
    },
    {
      title: 'Số lượng',
      key: 'quantityFlashSale',
      render: (_: any, record: any) => {
        if (record.isConfirmed) return record.availableQuantityFlash;
        const confirmed = flashSaleProducts.find((item) => item.productId === record.id);
        if (confirmed) return confirmed.availableQuantity;
        if (selectedRowKeys.includes(record.id)) {
          return (
            <InputNumber
              min={1}
              max={record.quantity}
              value={editRows[record.id]?.quantity}
              onChange={(val) =>
                setEditRows((prev) => ({
                  ...prev,
                  [record.id]: { ...prev[record.id], quantity: val },
                }))
              }
              placeholder='Nhập số lượng'
            />
          );
        }
        return null;
      },
    },
    {
      title: 'Giá sau khi giảm',
      key: 'discountPrice',
      render: (_: any, record: any) => {
        if (record.isConfirmed) return record.flashPrice.toLocaleString();
        const confirmed = flashSaleProducts.find((item) => item.productId === record.id);
        if (confirmed) return confirmed.flashPrice.toLocaleString();
        if (selectedRowKeys.includes(record.id)) {
          const percent = editRows[record.id]?.percent ?? 0;
          const price = record.price;
          const flashPrice = percent ? Math.round(price - (price * percent) / 100) : '';
          return (
            <div className='flex gap-2 items-center'>
              <InputNumber
                min={1}
                max={99}
                value={editRows[record.id]?.percent}
                onChange={(val) =>
                  setEditRows((prev) => ({
                    ...prev,
                    [record.id]: { ...prev[record.id], percent: val },
                  }))
                }
                placeholder='% giảm'
              />
              <span>= {flashPrice ? flashPrice.toLocaleString() : ''}VNĐ</span>
            </div>
          );
        }
        return null;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => {
        if (record.isConfirmed) {
          return (
            <Button className='bg-[#fa7833]! text-white!' onClick={() => handleEdit(record)}>
              Chỉnh sửa
            </Button>
          );
        }
        const confirmed = flashSaleProducts.find((item) => item.productId === record.id);
        if (confirmed) {
          return (
            <Button type='primary' onClick={() => handleEdit(record)} className='bg-green-700!'>
              Chỉnh sửa
            </Button>
          );
        }
        if (
          selectedRowKeys.includes(record.id) &&
          editRows[record.id]?.quantity &&
          editRows[record.id]?.percent !== undefined
        ) {
          return (
            <Button type='primary' onClick={() => handleConfirm(record)}>
              Xác nhận
            </Button>
          );
        }
        return null;
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={productItems}
        rowKey='id'
        loading={isLoadingGetCheckProductFlashSale}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: (keys) => {
            setSelectedRowKeys(keys as string[]);
            setEditRows((prev) => {
              const newEditRows = { ...prev };
              Object.keys(newEditRows).forEach((id) => {
                if (!keys.includes(id)) delete newEditRows[id];
              });
              return newEditRows;
            });
          },
        }}
      />
      <div className='absolute left-1/2 -bottom-20 transform -translate-x-1/2'>
        <Pagination
          align='center'
          current={page + 1}
          pageSize={size}
          total={ResponseDataGetProductFlashSale?.data?.currentTotalElementsCount ?? 0}
          pageSizeOptions={['5', '10', '20', '50', '100']}
          showSizeChanger
          onChange={(newPage, newSize) => {
            setPage(newPage - 1);
            setSize(newSize);
          }}
        />
      </div>
    </div>
  );
};

export default FormListProduct;
