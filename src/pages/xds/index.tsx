import HttpMethodTag from "@/components/HttpMethodTag";
import {
    AppstoreOutlined,
    FileTextOutlined,
    PlusOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import { Splitter, Table, Tree, TreeDataNode } from "antd";
import { ReactNode, useState } from "react";
import KeepAlive from "react-activation";
import { useLocation } from "umi";
import Overview from "./components/Overview";

interface ParentTitleProps {
    label: string;
    icon: ReactNode;
    color: string;
    onAdd: () => void;
}

export const ParentTitle: React.FC<ParentTitleProps> = ({
    label,
    icon,
    color,
    onAdd,
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="no-hover-bg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: 4,
                width: "180px",
                height: 24,
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color, marginRight: 6 }}>{icon}</span>
                <span style={{ fontSize: 12 }}>{label}</span>
            </div>

            {hovered && (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        onAdd();
                    }}
                    style={{
                        padding: "2px 4px",
                        borderRadius: 4,
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
                >
                    <PlusOutlined style={{ fontSize: 10 }} />
                </div>
            )}
        </div>
    );
};

const treeData: TreeDataNode[] = [
    {
        title: (
            <ParentTitle
                label="IDS"
                icon={<AppstoreOutlined />}
                color="#1890ff"
                onAdd={() => {}}
            />
        ),
        key: "ids",
        children: [
            {
                key: "key1-1",
                title: "Github MCP Server",
                icon: <FileTextOutlined style={{ color: "#24292e" }} />,
            },
            {
                key: "key1-2",
                title: "Bmap MCP Server",
                icon: <FileTextOutlined style={{ color: "#24292e" }} />,
            },
        ],
    },
    {
        title: (
            <ParentTitle
                label="TDS"
                icon={<ToolOutlined />}
                color="#52c41a"
                onAdd={() => {}}
            />
        ),
        key: "tds",
        children: [
            {
                key: "key2-1",
                title: "Github Top Languages",
                icon: <FileTextOutlined style={{ color: "#24292e" }} />,
            },
            {
                key: "key2-2",
                title: "Get Top Repositories",
                icon: <FileTextOutlined style={{ color: "#24292e" }} />,
            },
        ],
    },
];

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

const IDSTable: React.FC = () => {
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
export default () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tabKey = searchParams.get("tabKey") ?? "default";

    return (
        <KeepAlive name="xdsKeepalive" cacheKey={tabKey}>
            <Splitter>
                <Splitter.Panel defaultSize="20%" max="25%" min={"20%"}>
                    <div
                        style={{
                            height: "calc(100vh)",
                            backgroundColor: "rgba(245, 245, 245, 0.8)",
                            padding: 8,
                            boxSizing: "border-box",
                        }}
                    >
                        <Tree
                            className="custom-tree"
                            checkable
                            showIcon
                            defaultExpandAll
                            defaultSelectedKeys={["0-0-0"]}
                            // showLine
                            // switcherIcon={<DownOutlined />}
                            treeData={treeData}
                            style={{
                                height: "calc(100vh - 120px)",
                                backgroundColor: "rgba(245, 245, 245, 0.8)",
                            }}
                        />
                    </div>
                </Splitter.Panel>
                <Splitter.Panel>
                    {/* <Editor /> */}
                    <Overview />

                    {/* IDS list */}
                    {/* <IDSTable /> */}
                    {/* TDS list */}
                </Splitter.Panel>
            </Splitter>
        </KeepAlive>
    );
};
