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

interface IDS {
    id: string;
    name: string;
    tool_ids: string[];
    tds_list: TDS[];
}

export default () => {
    const dataSource: IDS[] = [
        {
            id: "ids-1",
            name: "User APIs",
            tool_ids: ["get_user", "delete_user"],
            tds_list: [
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
            ],
        },
        {
            id: "ids-2",
            name: "Email APIs",
            tool_ids: ["get_email"],
            tds_list: [
                {
                    id: "tds-3",
                    name: "Get Email",
                    description: "",
                    tds_ext_info: {
                        method: "GET",
                        path: "/v1/emails/:email_id",
                    },
                },
            ],
        },
    ];

    const idsColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 180,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 200,
        },
        {
            title: "Tools",
            key: "toolCount",
            width: 100,
            render: (_: any, record: IDS) => `Tools: ${record.tool_ids.length}`,
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
            columns={idsColumns}
            expandable={{
                expandedRowRender: (record: IDS) => (
                    <Table
                        rowKey="id"
                        columns={tdsColumns}
                        dataSource={record.tds_list}
                        pagination={false}
                        size="small"
                    />
                ),
                rowExpandable: (record) => record.tds_list.length > 0,
            }}
            pagination={false}
        />
    );
};
