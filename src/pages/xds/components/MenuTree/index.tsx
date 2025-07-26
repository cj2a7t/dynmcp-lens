import { PUT_IDS, PUT_TDS } from "@/consts/xds";
import { VisiableComponent } from "@/types/xds";
import { useFlatInject, useHttp } from "@/utils/hooks";
import { toPrettyJsonString } from "@/utils/json";
import { useTabKey } from "@/utils/tabkey";
import {
    AppstoreOutlined,
    FileTextOutlined,
    PlusOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import { Spin, Tree, TreeDataNode } from "antd";
import { Key, ReactNode, useState } from "react";
import styles from "./index.module.less";

interface ParentTitleProps {
    label: string;
    icon: ReactNode;
    color: string;
    onAdd: () => void;
    onClick: () => void;
}

export const ParentTitle: React.FC<ParentTitleProps> = ({
    label,
    icon,
    color,
    onAdd,
    onClick,
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="no-hover-bg"
            onClick={(e) => {
                onClick();
            }}
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
    const tabKey = useTabKey();
    const [xdsStore] = useFlatInject("xds");
    const { onVisiableData, onFetchIDS, onFetchTDS } = xdsStore;
    const [connStore] = useFlatInject("connection");
    const { mapConnection } = connStore;

    const { loading: loadingIDS } = useHttp(() =>
        onFetchIDS(tabKey, mapConnection(tabKey))
    );
    const { loading: loadingTDS } = useHttp(() =>
        onFetchTDS(tabKey, mapConnection(tabKey))
    );

    const treeData: TreeDataNode[] = [
        {
            title: (
                <ParentTitle
                    label="iDS"
                    icon={<AppstoreOutlined />}
                    color="#1890ff"
                    onAdd={() => {
                        console.log("Add IDS");
                        onVisiableData(tabKey, {
                            component: VisiableComponent.Editor,
                            value: toPrettyJsonString(PUT_IDS),
                            editMode: false,
                        });
                    }}
                    onClick={() =>
                        onVisiableData(tabKey, {
                            component: VisiableComponent.IDSTable,
                        })
                    }
                />
            ),
            key: "ids",
            children:
                xdsStore.iDS.tabData[tabKey]?.map((item) => ({
                    title: item.name,
                    key: item.id,
                    icon: <FileTextOutlined />,
                    item,
                })) ?? [],
        },
        {
            title: (
                <ParentTitle
                    label="tDS"
                    icon={<ToolOutlined />}
                    color="#52c41a"
                    onAdd={() => {
                        console.log("Add TDS");
                        onVisiableData(tabKey, {
                            component: VisiableComponent.Editor,
                            value: toPrettyJsonString(PUT_TDS),
                            editMode: false,
                        });
                    }}
                    onClick={() =>
                        onVisiableData(tabKey, {
                            component: VisiableComponent.TDSTable,
                        })
                    }
                />
            ),
            key: "tds",
            children:
                xdsStore.tDS.tabData[tabKey]?.map((item) => ({
                    title: item.name,
                    key: item.id,
                    icon: <FileTextOutlined />,
                    item,
                })) ?? [],
        },
    ];

    const handleSelect = (_keys: Key[], info: any) => {
        console.log("Selected:", info);
        if (!info.node.children) {
            onVisiableData(tabKey, {
                component: VisiableComponent.Editor,
                value: toPrettyJsonString(info.node.item),
                editMode: true,
            });
        }
    };

    return (
        <Spin spinning={loadingIDS || loadingTDS}>
            <div
                style={{
                    height: "calc(100vh)",
                    backgroundColor: "rgba(245, 245, 245, 0.8)",
                    padding: 8,
                    boxSizing: "border-box",
                }}
            >
                <Tree
                    className={styles.tree}
                    checkable
                    showIcon
                    defaultExpandAll
                    treeData={treeData}
                    style={{
                        height: "calc(100vh - 120px)",
                        backgroundColor: "rgba(245, 245, 245, 0.8)",
                    }}
                    onSelect={handleSelect}
                />
            </div>
        </Spin>
    );
};
