import { useFlatInject, useHttp } from "@/utils/hooks";
import { useTabKey } from "@/utils/tabkey";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ReloadOutlined,
    StarFilled,
    StarOutlined,
} from "@ant-design/icons";
import { AutoComplete, Button, Flex, Input, Layout } from "antd";
import { useEffect, useState } from "react";
import { Outlet } from "umi";
import HeaderTab from "./components/HeaderTab";

const { Header, Content } = Layout;
const LayoutFC = () => {
    const [store] = useFlatInject("connection");
    const tabKey = useTabKey();
    const [inputValue, setInputValue] = useState("");
    const { loading: loadingFetchCon } = useHttp(() =>
        store.onFetchConnections()
    );
    const handleDragStart = (event: any) => {
        event.preventDefault();
    };
    const renderItem = (name: string, url: string, isStarred?: boolean) => ({
        value: url,
        label: (
            <div style={{ fontSize: 11, lineHeight: 1.4 }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <span>{name}</span>
                    {isStarred && <StarFilled style={{ color: "#fadb14" }} />}
                </div>
                <div style={{ color: "#888", fontSize: 11 }}>{url}</div>
            </div>
        ),
    });

    const renderEmptyItem = (label: string) => ({
        value: "",
        label: (
            <div
                style={{
                    fontSize: 11,
                    color: "#999",
                    fontStyle: "italic",
                }}
            >
                {label}
            </div>
        ),
        disabled: true,
    });

    const starredConnections = store.connections.filter((c) => c.starred);
    const recentConnections = store.connections.filter((c) => !c.starred);

    const options = [
        {
            label: <span style={{ fontSize: 11 }}>⭐ Starred Connections</span>,
            options:
                starredConnections.length > 0
                    ? starredConnections.map((conn) =>
                          renderItem(conn.name, conn.url, true)
                      )
                    : [renderEmptyItem("No starred connections")],
        },
        {
            label: <span style={{ fontSize: 11 }}>🕑 Recent Connections</span>,
            options:
                recentConnections.length > 0
                    ? recentConnections.map((conn) =>
                          renderItem(conn.name, conn.url, false)
                      )
                    : [renderEmptyItem("No recent connections")],
        },
    ];

    return (
        <Layout className="custom-layout" style={{ minHeight: "100vh" }}>
            <Header
                data-tauri-drag-region
                onMouseDown={handleDragStart}
                style={{
                    backgroundColor: "#595959",
                    height: 36,
                    userSelect: "none",
                }}
                className="tauri-drag"
            >
                <HeaderTab />
            </Header>
            <Layout>
                <Layout>
                    <Flex
                        align="center"
                        style={{
                            height: "45px",
                            borderBottom: "1px solid #f8f9fa",
                            backgroundColor: "white",
                        }}
                    >
                        <Button
                            size="small"
                            style={{
                                border: "none",
                                marginLeft: 10,
                                backgroundColor: "transparent",
                            }}
                        >
                            <ArrowLeftOutlined />
                        </Button>

                        <Button
                            size="small"
                            style={{
                                border: "none",
                                marginLeft: 5,
                                backgroundColor: "transparent",
                            }}
                        >
                            <ArrowRightOutlined />
                        </Button>
                        <Button
                            size="small"
                            style={{
                                border: "none",
                                marginLeft: 5,

                                backgroundColor: "transparent",
                            }}
                        >
                            <ReloadOutlined />
                        </Button>
                        <AutoComplete
                            classNames={{
                                popup: {
                                    root: "certain-category-search-dropdown",
                                },
                            }}
                            style={{
                                width: "100%",
                                marginLeft: 10,
                                marginRight: 20,
                            }}
                            options={options}
                            value={
                                store.tabConnection.tabData[tabKey]?.url ||
                                inputValue
                            }
                            onChange={(value) => setInputValue(value)}
                        >
                            <Input
                                placeholder="http(s)://dynmcp_domain/$api_key"
                                style={{
                                    border: "none",
                                    backgroundColor: "#f8f9fa",
                                    height: 30,
                                    borderRadius: 10,
                                }}
                                disabled={
                                    !!store.tabConnection.tabData[tabKey]?.url
                                }
                                suffix={
                                    <div
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Button
                                            onClick={() => {}}
                                            style={{
                                                border: "none",
                                                backgroundColor: "transparent",
                                            }}
                                        >
                                            <StarOutlined
                                                style={{
                                                    color: "#fadb14",
                                                }}
                                            />
                                        </Button>
                                    </div>
                                }
                            />
                        </AutoComplete>
                    </Flex>
                    <Content className="custom-layout">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LayoutFC;
