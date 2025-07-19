import HttpMethodTag from "@/components/HttpMethodTag";
import { Table } from "antd";

interface TDSx {
    method: string;
    path: string;
}

interface TDS {
    id: string;
    name: string;
    description: string;
    tds_ext_info: TDSx;
}

export default () => {
    const dataSource: TDS[] = [
        {
            id: "tds-1",
            name: "Get User",
            description: "Get user by ID",
            tds_ext_info: {
                method: "GET",
                path: "/v1/users/:id",
            },
        },
        {
            id: "tds-2",
            name: "Delete User",
            description: "Delete user by ID",
            tds_ext_info: {
                method: "DELETE",
                path: "/v1/users/:id",
            },
        },
    ];

    const tdsColumns = [
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
            width: 150,
        },
        {
            title: "Method",
            key: "method",
            width: 100,
            render: (_: any, record: TDS) => {
                return <HttpMethodTag method={record.tds_ext_info.method} />;
            },
        },
        {
            title: "Path",
            key: "path",
            width: 260,
            render: (_: any, record: TDS) => record.tds_ext_info.path,
        },
        {
            title: "Description",
            key: "description",
            width: 240,
            render: (_: any, record: TDS) => record.description || "-",
        },
    ];

    return (
        <Table
            rowKey="id"
            size="small"
            dataSource={dataSource}
            columns={tdsColumns}
            pagination={false}
        />
    );
};
