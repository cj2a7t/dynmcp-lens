import {
    AppstoreOutlined,
    FileTextOutlined,
    PlusOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import { Tree, TreeDataNode } from "antd";
import { ReactNode, useState } from "react";

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

export default () => {
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
    return (
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
    );
};
