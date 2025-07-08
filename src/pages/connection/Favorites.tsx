import { ConnectionData } from "@/apis/connection/healthz";
import type { TableProps } from "antd";
import { Space, Table } from "antd";
import { useFlatInject } from "umi";

const columns: TableProps<ConnectionData>["columns"] = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Host",
        dataIndex: "host",
        key: "host",
    },
    {
        title: "Admin Key",
        dataIndex: "admin_key",
        key: "admin_key",
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>Invite</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

export default () => {
    console.log("Favorites loaded");

    const [store] = useFlatInject("connection");
    // useAsyncFn(() => {
    //     store.ping()
    //     return store.fetchAll()
    // })
    return (
        <div
            style={{
                overflowY: "auto",
                height: "calc(100vh - 100px)",
            }}
        >
            <Table<ConnectionData>
                columns={columns}
                dataSource={store.connections}
                pagination={false}
            />
            {/* <Input value={store.count} onChange={(e) => store.setValue(e.target.value)} /> */}
        </div>
    );
};
