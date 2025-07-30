import { Button, Form, Input, Modal, Select, Skeleton, Space, Table, type TableColumnsType } from "antd";
import { useGetCategory } from "../../../homepages/hook/useGetCategory";
import { EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import SkeletonTableCategory from "../../../../components/skeleton/SkeletonTableCategory";
import { useGetCategoryDetail } from "../hook/useGetCategoryDetail";
import { useState } from "react";
import { useGetCategoryItemsDetail } from "../hook/useGetCategoryItemsDetail";
import { useCreateCategory, type FormCreateCategory } from "../hook/useCreateCategory";
import { useCreateCategoryItems, type FormCreateCategoryItems } from "../hook/useCreateCategoryItems";
import { useRemoveCategory } from "../hook/useRemoveCategory";
import { useRemoveCategoryItems } from "../hook/useRemoveCategoryItems";
import { useUpdateCategory} from "../hook/useUpdateCategory";
import { useUpdateCategoryItems } from "../hook/useUpdateCategoryItems";
import { toast } from "react-toastify";
import isEqual from "lodash.isequal";
import ButtonDelete from "../../../../components/button/ButtonDelete";
import type { DataType, ExpandedDataType, FormUpdateCategory, FormUpdateCategoryItems, Item, SubItem } from "../type";
import ButtonUpdate from "../../../../components/button/ButtonUpdate";


const ManagementCategory = () => {

    const [isIdCategory, setIsIdCaegory] = useState<string | null>(null);
    const [isOpenModalViewDetailCategory, setIsOPpenModalViewDetailCategory] = useState(false);
    const [isIdCategoryItems, setIsIdCaegoryItems] = useState<string | null>(null);
    const [isCategory, setIsCategory] = useState(false);
    const [idEditting, setIdEditting] = useState<string | null>(null);
    const [idEdittingItems, setIdEdittingItems] = useState<string | null>(null);
    const [formCategoryItems] = Form.useForm();
    const [formCategory] =Form.useForm();
    const [initialEditValues, setInitialEditValues] = useState<FormUpdateCategory | null>(null);
    const [initialEditValuesItems, setInitialEditValuesItems] = useState<FormUpdateCategoryItems | null>(null);
    const {
        isPendingGetCategory,
        ResponseGetCategory,
        refetchCategory
    } = useGetCategory()

    const data = ResponseGetCategory?.data?.map((item) => ({
        ...item,
        key: item.id,
        isParent: true,
        categoryItems: item.categoryItems.map((subItem) => ({
            ...subItem,
            key: subItem.id,
            isParent: false,
            categoryId: item.id
        })),
    })) || [];

    const {
        isPendingGetCategoryDetail,
        ResponseCategoryDetail
    } = useGetCategoryDetail(isIdCategory)

    const {
        isPendingGetCategoryItemsDetail,
        ResponseGetCategoryItemsDetail
    } = useGetCategoryItemsDetail(isIdCategoryItems)

    const {
        isPendingCreateCategory,
        handleCreateCategory,
        isOpenModalCreateCategory,
        setIsOpenModalCreateCategory
    } = useCreateCategory(refetchCategory)

    const {
        isPendingCreateCategoryItems,
        isOpenModalCreateCategoryItems,
        setIsOpenModalCreateCategoryItems,
        handleCreateCategoryItems
    } = useCreateCategoryItems(refetchCategory)

    const {
        isPendingRemoveCategory,
        handleRemoveCategory
    } = useRemoveCategory(refetchCategory)

    const {
        isPendingRemoveCategoryItems,
        handleRemoveCategoryItems
    } = useRemoveCategoryItems(refetchCategory)

    const {
        isPendingUpdateCategory,
        handleUpdateCategory,
        isOpenModalUpdateCategory,
        setIsOpenModalUpdateCategory
    } = useUpdateCategory(refetchCategory)

    const {
        isPendingUpdateCategoryItems,
        handleUpdateCategoryItems,
        isOpenModalUpdateCategoryItems,
        setIsOpenModalUpdateCategoryItems
    } = useUpdateCategoryItems(refetchCategory)

    const handleViewDetail = (id: string, isParent: boolean) => {
        if(isParent) {
            setIsIdCaegory(id)
            setIsCategory(true)
        } else {
            setIsIdCaegoryItems(id)
        }
        setIsOPpenModalViewDetailCategory(true)
    }

    const handleRemove = (id: string, isParent: boolean) => {
        if(isParent) {
            setIsIdCaegory(id)
            handleRemoveCategory(id)
        } else {
            setIsIdCaegoryItems(id)
            handleRemoveCategoryItems(id)
        }
    }

    const handleUpdate = (record: any) => {
        if(record.isParent) {
            setIdEditting(record.id)
            setIsOpenModalUpdateCategory(true)
            formCategory.setFieldsValue({ name: record.name });
            setInitialEditValues({ name: record.name });
        } else {
            setIdEdittingItems(record.id)
            setIsOpenModalUpdateCategoryItems(true)
            formCategoryItems.setFieldsValue({ name: record.name, categoryId: record.categoryId });
            setInitialEditValuesItems({ name: record.name, categoryId: record.categoryId });
        }
    }

    const handleCreateOrUpdateCategory = (value: FormCreateCategory) => {
        if(idEditting) {
            if(isEqual(initialEditValues, value)) {
                toast.info("Không có thay đổi nào được thực hiện.!");
                return;
            }
            const data = {
                id: idEditting,
                name : value.name
            }
            handleUpdateCategory(data)
            setIdEditting(null)
        } else {
            handleCreateCategory(value)
        }
        formCategory.resetFields();
    }
    
    const handleCreateOrUpdateCategoryItems = (value: FormCreateCategoryItems) => {

        if(idEdittingItems) {
            if(isEqual(initialEditValuesItems, value)) {
                toast.info("Không có thay đổi nào được thực hiện.!");
                return;
            }
            const data = {
                id: idEdittingItems,
                name : value.name,
                categoryId : value.categoryId
            }
            handleUpdateCategoryItems(data)
            setIdEditting(null)
        } else {
            handleCreateCategoryItems(value)
        }
        formCategoryItems.resetFields();
    }

    const expandColumns: TableColumnsType<ExpandedDataType> = [
        {
            key:"view",
            render: (record: SubItem) => {
                return <div>
                     <EyeOutlined className="text-blue-500! cursor-pointer" 
                        onClick={() => handleViewDetail(record.id, record.isParent)}
                     />
                </div>
            },
            width: "5%"
        }, 
        {
            width:"20.5%"
        },
        { 
            title: 'ID', 
            dataIndex: 'id', 
            key: 'id',
            width: "15%",
            render: (text: string) => <span> ID - {text}</span>
        },
        { 
            title: 'Tên loại sản phẩm con', 
            dataIndex: 'name', 
            key: 'name' 
        },
        {
            key:"action",
            render: (record: SubItem) => (
                <Space className="flex!">
                    <ButtonDelete
                        description={`Xóa danh mục con: ${record.name}`}
                        onConfirm={() => handleRemove(record.id, record.isParent)}
                        isLoading={isPendingRemoveCategoryItems}
                        danger={true}
                    />
                    <ButtonUpdate
                        onclick={() => handleUpdate(record)}
                    />
                </Space>
            ),
            width: "15%"
        }
    ];
    
    // Danh mục cha
    const columns: TableColumnsType<DataType> = [
        {
            key:"view",
            render: (record: Item) => {
                return <div>
                     <EyeOutlined className="text-blue-500! cursor-pointer" 
                        onClick={() => handleViewDetail(record.id, record.isParent)}
                     />
                </div>
            },
            width: "5%"
        },
        {
            title: "STT",
            key:"stt",
            render: (_:any, __:any, index:number) => <p className="font-bold">{index + 1}</p>,
        },
        { 
            title: 'ID', 
            dataIndex: 'id', 
            key: 'id',
            width: "14.5%",
            render: (text: string) => <span className="font-bold">{text}</span>
        },
        { 
            title: 'Tên loại sản phẩm', 
            dataIndex: 'name', 
            key: 'name',
            render: (text: string) => <span className="font-bold">{text}</span>
        },
        {
            title: "Thao tác",
            key:"action",
            render: (record: Item) => (
                <Space className="flex!">
                    <ButtonDelete
                        description={`Xóa danh mục cha: ${record.name}`}
                        onConfirm={() => handleRemove(record.id, record.isParent)}
                        isLoading={isPendingRemoveCategory}
                        danger={true}
                    />
                    <ButtonUpdate
                        onclick={() => handleUpdate(record)}
                    />
                </Space>
            ),
            width: "14.5%"
        }
    ];

    const expandedRowRender = (record: DataType) => (
        <Table
            columns={expandColumns}
            dataSource={record.categoryItems}
            pagination={false}
            rowKey="id"
            showHeader={false}
        />
    );

    return(
        <div className="">
            <b className="text-[18px] font-bold">QUẢN LÝ CÁC LOẠI SẢN PHẨM</b>
            <div className="flex gap-5">
                <Button 
                    icon={<PlusCircleOutlined />}
                    className="mt-5! p-5! bg-[#22a085]! text-[white]!"
                    onClick={() => setIsOpenModalCreateCategory(true)}
                >
                    Tạo Loại Sản phẩm
                </Button>
                <Button 
                    icon={<PlusCircleOutlined />}
                    className="mt-5! p-5! bg-[#22a085]! text-[white]!"
                    onClick={() => setIsOpenModalCreateCategoryItems(true)}
                >
                    Tạo Loại Sản phẩm con
                </Button>
            </div>
            <div>
                {isPendingGetCategory ? (
                    <div>
                        <SkeletonTableCategory />
                    </div>
                ) : (
                    <div>
                        {!ResponseGetCategory ? (
                            <div className="text-center h-100 content-center">
                                <b className="text-[20px]">Shop của bạn chưa có danh sách các loại sản phẩm</b>
                                <p className="text-gray-700">
                                    Vui lòng tạo các loại sản phẩm cho shop của bạn.
                                </p>
                                <Button
                                    icon={<PlusCircleOutlined/>}
                                    className="mt-5! p-5! bg-[#22a085]! text-[white]!"
                                >
                                    Tạo Category
                                </Button>
                            </div>
                        ) : (
                            <div>
                                {ResponseGetCategory.data.length < 1 ? (
                                    <div className="text-center h-100 content-center">
                                        <b className="text-[20px]">Shop của bạn chưa có danh sách các loại sản phẩm</b>
                                        <p className="text-gray-700">
                                            Vui lòng tạo các loại sản phẩm cho shop của bạn.
                                        </p>
                                        <Button
                                            icon={<PlusCircleOutlined/>}
                                            className="mt-5! p-5! bg-[#22a085]! text-[white]!"
                                        >
                                            Tạo Category
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="mt-10 h-[100%] overflow-y-auto">
                                        <Table
                                            columns={columns}
                                            key="id"
                                            pagination={false}
                                            dataSource={data}
                                            scroll={{ x: "max-content", y: "calc(100vh - 420px)"}}
                                            expandable={{ expandedRowRender }}
                                            rowKey="id"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                
            </div>

            <Modal
                title={ <div> THÔNG TIN LOẠI SẢN PHẨM </div> }
                open={isOpenModalViewDetailCategory}
                onCancel={() => {
                        setIsOPpenModalViewDetailCategory(false)
                        setIsCategory(false)
                    }
                }
                footer
            >
                <div>
                    {isCategory ? (
                        <div>
                            {isPendingGetCategoryDetail ? (
                                <div className="flex flex-col gap-3">
                                    <Skeleton.Input
                                        active
                                        className="w-10"
                                    />
                                    <Skeleton.Input
                                        active
                                        className="w-10"
                                    />
                                </div>
                            ) : (
                                <div>
                                    {!ResponseCategoryDetail ? (
                                        <div>Không lấy được loại sản phẩm.</div>
                                    ) : (
                                        <div className="text-[black]">
                                            <p className="flex"><span className="w-20 block">ID: </span>{ResponseCategoryDetail.data.id}</p>
                                            <p className="flex"><span className="w-20 block">Tên loại: </span>{ResponseCategoryDetail.data.name}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                        </div>
                    ) : (
                        <div>
                            {isPendingGetCategoryItemsDetail ? (
                                <div className="flex flex-col gap-3">
                                    <Skeleton.Input
                                        active
                                        className="w-10"
                                    />
                                    <Skeleton.Input
                                        active
                                        className="w-10"
                                    />
                                </div>
                            ) : (
                                <div>
                                    {!ResponseGetCategoryItemsDetail ? (
                                        <div></div>
                                    ) : (
                                        <div className="text-[black]">
                                            <p className="flex"><span className="w-20 block">ID: </span>{ResponseGetCategoryItemsDetail.data.id}</p>
                                            <p className="flex"><span className="w-20 block">Tên loại: </span>{ResponseGetCategoryItemsDetail.data.name}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                        </div>
                    )}
                    
                    
                </div>
            </Modal>

            <Modal
                title={<div className="text-center font-bold">
                    {idEditting ? `Chỉnh sửa lại tên cho loại sản phẩm ID: ${idEditting}` : "Thêm loại sản phẩm"}
                </div>}
                open={idEditting ? isOpenModalUpdateCategory : isOpenModalCreateCategory}
                onCancel={() => {
                    if (idEditting) {
                        setIsOpenModalUpdateCategory(false);
                        setIdEditting(null)
                        formCategory.resetFields()
                    } else {
                        setIsOpenModalCreateCategory(false);
                        formCategory.resetFields();
                    }
                }}
                footer
            >
                <Form
                    onFinish={handleCreateOrUpdateCategory}
                    className="mt-10!"
                    layout="vertical"
                    form={formCategory}
                >
                    <Form.Item
                        name="name"
                        label="Tên loại sản phẩm:"
                        rules={[
                            {
                                required: true, message: "Vui lòng  nhập tên loại sản phẩm"
                            }
                        ]}
                    >
                        <Input 
                            placeholder="Nhập tên loại sản phẩm"
                            className="p-3!"
                        />
                    </Form.Item>
                    <Form.Item
                        className="text-end"
                    >
                        <Button
                            loading={idEditting ? isPendingUpdateCategory : isPendingCreateCategory}
                            className="py-5! px-10! bg-[#22a085]! text-[white]!"
                            htmlType="submit"
                        >
                            {idEditting ? "Sửa" : "Tạo"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={<div className="text-center font-bold">
                    {idEdittingItems? `Chỉnh sửa lại loại sản phẩm con ID:${idEdittingItems}` : "Thêm loại sản phẩm"}
                    
                </div>}
                open={idEdittingItems ? isOpenModalUpdateCategoryItems : isOpenModalCreateCategoryItems}
                onCancel={ () => {
                    if(idEdittingItems) {
                        setIsOpenModalUpdateCategoryItems(false)
                        setIdEdittingItems(null)
                        formCategoryItems.resetFields()
                    } else {
                        setIsOpenModalCreateCategoryItems(false)
                        formCategoryItems.resetFields();
                    }
                }}
                footer
                
            >
                <Form
                    form={formCategoryItems}
                    onFinish={handleCreateOrUpdateCategoryItems}
                    className="mt-10!"
                    // labelCol={{span: 8}}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Tên loại sản phẩm con:"
                        rules={[
                            {
                                required: true, message: "Vui lòng  nhập tên loại sản phẩm"
                            }
                        ]}
                    >
                        <Input 
                            placeholder="Nhập tên loại sản phẩm."
                            className="p-3!"
                        />
                    </Form.Item>
                    <Form.Item
                        name="categoryId"
                        label="Loại sản phẩm"
                        rules={[
                            {
                                required: true, message: "Vui chọn loại sản phẩm."
                            }
                        ]}
                    >
                        <Select
                            className="h-12!"
                            placeholder="Chọn loại sản phẩm"

                        >
                            {ResponseGetCategory?.data.map((i) => (
                                <Select.Option key={i.id} value={i.id}>{i.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        className="text-end"
                    >
                        <Button
                            loading={idEdittingItems ? isPendingUpdateCategoryItems : isPendingCreateCategoryItems}
                            className="py-5! px-10! bg-[#22a085]! text-[white]!"
                            htmlType="submit"
                        >
                            { idEdittingItems ? "Sửa" : "Tạo"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default ManagementCategory