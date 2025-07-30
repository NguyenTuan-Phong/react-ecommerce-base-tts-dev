import { Skeleton, Table } from "antd";

const SkeletonTableCategory = () => {

    const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: () => <Skeleton.Input active size="small" />,
    },
    {
        title: "Tên danh mục cha",
        dataIndex: "name",
        key: "name",
        render: () => <Skeleton.Input active size="default" />,
    },
    ];

    const fakeData = Array.from({ length: 5 }).map((_, index) => ({
        key: index,
        id: "",
        name: "",
    }));
    return(
        <Table
            columns={columns}
            dataSource={fakeData}
            pagination={false}
            bordered
        />
    )
}

export default SkeletonTableCategory