import { Avatar, Table, InputNumber, Button, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useGetCheckProductFlashSale } from "../hook/useGetCheckProductFlashSale";
interface FlashSaleProductSubmit {
    productId: string;
    flashPrice: number;
    availableQuantity: number;
}
interface FormListProductProps {
    onChangeConfirmedRows?: (rows: FlashSaleProductSubmit[]) => void;
    confirmedRows?: FlashSaleProductSubmit[];
    startTime?: string;
    endTime?: string;
}
const FormListProductV2 = ({ onChangeConfirmedRows,confirmedRows,startTime, endTime }: FormListProductProps) => {
    const [pageSize, setPageSize] = useState(0)
    const [size, setSize] = useState(50)
    const {
        isLoadingGetCheckProductFlashSale,
        ResponseDataGetProductFlashSale
    } = useGetCheckProductFlashSale(startTime!, endTime!, pageSize, size)

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
        if (
            confirmedRows &&
            (
                confirmedRows.length !== flashSaleProducts.length ||
                !confirmedRows.every((row, idx) => row.productId === flashSaleProducts[idx]?.productId)
            )
        ) {
            setFlashSaleProducts(confirmedRows);
            setSelectedRowKeys(confirmedRows.map(item => item.productId));
            setEditRows({});
        }
    }, [confirmedRows]);

    const [editRows, setEditRows] = useState<Record<string, {
        quantity?: number;
        percent?: number;
    }>>({});

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const handleConfirm = (record: any) => {
        const { quantity, percent } = editRows[record.id] || {};
        if (quantity && percent !== undefined) {
            const flashPrice = Math.round(record.price - (record.price * percent / 100));
            setFlashSaleProducts(prev => {
                const filtered = prev.filter(item => item.productId !== record.id);
                return [
                    ...filtered,
                    {
                        productId: record.id,
                        flashPrice,
                        availableQuantity: quantity
                    }
                ];
            });
        }
    };

    const handleEdit = (record: any) => {
        setEditRows(prev => ({
            ...prev,
            [record.id]: {
                quantity: flashSaleProducts.find(item => item.productId === record.id)?.availableQuantity,
                percent: flashSaleProducts.find(item => item.productId === record.id)
                    ? Math.round(
                        100 - (flashSaleProducts.find(item => item.productId === record.id)!.flashPrice / record.price) * 100
                    )
                    : undefined
            }
        }));
        setFlashSaleProducts(prev => prev.filter(item => item.productId !== record.id));
    };

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (_: any, __: any, index: number) => pageSize * size + index + 1,
            width: '7%'
        },
        {
            title: "Sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (value: string, record: any) => (
                <div className="flex items-center gap-2">
                    <Avatar
                        className="shrink-0!"
                        shape="square"
                        size={48}
                        src={record.imageUrl}
                    />
                    <span className="text-[black]">{value}</span>
                </div>
            ),
            width: "20%"
        },
        {
            title: "Mã sản phẩm",
            dataIndex: "code",
            key: "code",
            width: "15%"
        },
        {
            title: "Số lượng đang có",
            dataIndex: "quantity",
            key: "quantity",
            width: "15%"
        },
        {
            title: 'Số lượng',
            key: 'quantityFlashSale',
            render: (_: any, record: any) => {
                const confirmed = flashSaleProducts.find(item => item.productId === record.id);
                if (confirmed) return confirmed.availableQuantity;
                if (selectedRowKeys.includes(record.id)) {
                    return (
                        <InputNumber
                            min={1}
                            max={record.quantity}
                            value={editRows[record.id]?.quantity}
                            onChange={val => setEditRows(prev => ({
                                ...prev,
                                [record.id]: { ...prev[record.id], quantity: val }
                            }))}
                            placeholder="Nhập số lượng"
                        />
                    );
                }
                return null;
            }
        },
        {
            title: 'Giá sau khi giảm',
            key: 'discountPrice',
            render: (_: any, record: any) => {
                const confirmed = flashSaleProducts.find(item => item.productId === record.id);
                if (confirmed) return confirmed.flashPrice.toLocaleString();
                if (selectedRowKeys.includes(record.id)) {
                    const percent = editRows[record.id]?.percent ?? 0;
                    const price = record.price;
                    const flashPrice = percent ? Math.round(price - (price * percent / 100)) : "";
                    return (
                        <div className="flex gap-2 items-center">
                            <InputNumber
                                min={1}
                                max={99}
                                value={editRows[record.id]?.percent}
                                onChange={val => setEditRows(prev => ({
                                    ...prev,
                                    [record.id]: { ...prev[record.id], percent: val }
                                }))}
                                placeholder="% giảm"
                            />
                            <span>= {flashPrice ? flashPrice.toLocaleString() : ""}VNĐ</span>
                        </div>
                    );
                }
                return null;
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: any) => {
                const confirmed = flashSaleProducts.find(item => item.productId === record.id);
                if (confirmed) {
                    return (
                        <Button type="primary" onClick={() => handleEdit(record)} className="bg-green-700!">
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
                        <Button type="primary" onClick={() => handleConfirm(record)}>
                            Xác nhận
                        </Button>
                    );
                }
                return null;
            }
        }
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={ResponseDataGetProductFlashSale?.data.content || []}
                rowKey="id"
                loading={isLoadingGetCheckProductFlashSale}
                pagination={false}
                rowSelection={{
                    type: "checkbox",
                    selectedRowKeys,
                    onChange: (keys) => {
                        setSelectedRowKeys(keys as string[]);
                        setEditRows(prev => {
                            const newEditRows = { ...prev };
                            Object.keys(newEditRows).forEach(id => {
                                if (!keys.includes(id)) delete newEditRows[id];
                            });
                            return newEditRows;
                        });
                    }
                }}
            />
            <div className="absolute left-1/2 -bottom-20 transform -translate-x-1/2">
                <Pagination
                    align="center"
                    current={pageSize + 1}
                    pageSize={size}
                    total={ResponseDataGetProductFlashSale?.data?.currentTotalElementsCount ?? 0}
                    pageSizeOptions={["5", "10", "20", "50", "100"]}
                    showSizeChanger
                    onChange={(newPage, newSize) => {
                        setPageSize(newPage - 1);
                        setSize(newSize);
                    }}
                />
            </div>
        </div>
    );
};

export default FormListProductV2;