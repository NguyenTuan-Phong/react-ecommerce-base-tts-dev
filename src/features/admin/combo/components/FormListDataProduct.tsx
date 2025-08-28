import { Avatar, Pagination, Table, InputNumber, Button } from "antd";
import { useEffect, useState } from "react";
import { useGetAllProducts } from "../../product/hook/useGetAllProduct";

interface ProductSubmit {
    productId: string;
    quantity: number;
    price: number; 
}

interface FormListDataProductProps {
    onChangeConfirmedRows?: (rows: ProductSubmit[]) => void;
    confirmedRows?: ProductSubmit[];
    onChangeTotalPrice?: (totalPrice: number) => void; 
}

const FormListDataProduct = ({
    onChangeConfirmedRows,
    confirmedRows,
    onChangeTotalPrice
}: FormListDataProductProps) => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(50);

    const { allProductsData, isLoadingAllProducts } = useGetAllProducts(
        page,
        size,
        "createdAt,desc"
    );

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [editRows, setEditRows] = useState<Record<string, number>>({});
    const [confirmedProducts, setConfirmedProducts] = useState<ProductSubmit[]>(
        []
    );

    // Gửi confirmed products về parent
    useEffect(() => {
        if (onChangeConfirmedRows) {
        onChangeConfirmedRows(confirmedProducts);
        }
    }, [confirmedProducts, onChangeConfirmedRows]);

    useEffect(() => {
        if (onChangeTotalPrice && confirmedProducts) {
            const totalPrice = confirmedProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            onChangeTotalPrice(totalPrice);
        }
    }, [confirmedProducts, onChangeTotalPrice]);

    // Khi component cha cập nhật confirmedRows
    useEffect(() => {
        if (confirmedRows) {
            const keys = confirmedRows.map((item) => item.productId);
            const rows: Record<string, number> = {};
            confirmedRows.forEach((item) => {
                rows[item.productId] = item.quantity;
            });
            setSelectedRowKeys(keys);
            setEditRows(rows);
            setConfirmedProducts(confirmedRows);
        }
    }, [confirmedRows]);

    const handleConfirm = (record: any) => {
        const quantity = editRows[record.id];
        if (quantity && quantity > 0) {
        setConfirmedProducts((prev) => {
            const filtered = prev.filter((item) => item.productId !== record.id);
            return [
            ...filtered,
            {
                productId: record.id,
                quantity: quantity,
                price: record.originalPrice
            },
            ];
        });
        }
    };

    const handleEdit = (record: any) => {
        setEditRows((prev) => ({
            ...prev,
            [record.id]:
                confirmedProducts.find((item) => item.productId === record.id)
                ?.quantity ?? 1,
        }));
        setConfirmedProducts((prev) =>
            prev.filter((item) => item.productId !== record.id)
        );
    };

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (_: any, __: any, index: number) => page * size + index + 1,
            width: "7%",
        },
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
            width: "7%",
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
                <span className="text-[black] line-clamp-2">{value}</span>
                </div>
            ),
            width: "40%"
        },
        {
            title: "Có thể bán",
            dataIndex: "availableQuantity",
            key: "availableQuantity",
        },
        {
            title: "Số lượng chọn",
            key: "quantityInput",
            render: (_: any, record: any) => {
                const confirmed = confirmedProducts.find(
                    (item) => item.productId === record.id
                );
                if (confirmed) return confirmed.quantity;
                if (selectedRowKeys.includes(record.id)) {
                return (
                    <InputNumber
                        min={1}
                        max={record.availableQuantity}
                        value={editRows[record.id]}
                        onChange={(val) =>
                            setEditRows((prev) => ({
                            ...prev,
                            [record.id]: val || 1,
                            }))
                        }
                        placeholder="Nhập số lượng"
                    />
                );
                }
                return null;
            },
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_: any, record: any) => {
                const confirmed = confirmedProducts.find(
                (item) => item.productId === record.id
                );
                if (confirmed) {
                return (
                    <Button
                    type="primary"
                    onClick={() => handleEdit(record)}
                    className="bg-green-700!">
                    Chỉnh sửa
                    </Button>
                );
                }
                if (
                selectedRowKeys.includes(record.id) &&
                editRows[record.id] &&
                editRows[record.id] > 0
                ) {
                return (
                    <Button type="primary" onClick={() => handleConfirm(record)}>
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
                dataSource={allProductsData?.data?.content || []}
                rowKey="id"
                loading={isLoadingAllProducts}
                rowSelection={{
                    type: "checkbox",
                    selectedRowKeys,
                    onChange: (keys) => {
                        setSelectedRowKeys(keys as string[]);
                        setEditRows((prev) => {
                        const updated = { ...prev };
                        Object.keys(updated).forEach((key) => {
                            if (!keys.includes(key)) {
                            delete updated[key];
                            }
                        });
                        return updated;
                        });
                    },
                }}
                pagination={false}
                className="mb-5"
            />
            <div className="flex justify-center mt-4">
                <Pagination
                current={page + 1}
                pageSize={size}
                total={allProductsData?.data?.currentTotalElementsCount ?? 0}
                pageSizeOptions={["5", "10", "20", "50", "100"]}
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

export default FormListDataProduct;
