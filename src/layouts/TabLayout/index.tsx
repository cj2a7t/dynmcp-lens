import { useFlatInject } from "@/utils/hooks";
import { useTabKey } from "@/utils/tabkey";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ReloadOutlined,
    StarFilled,
    StarOutlined,
} from "@ant-design/icons";
import { AutoComplete, Button, Flex, Input, Layout } from "antd";
import { useState } from "react";
import { Outlet } from "umi";
import HeaderTab from "./components/HeaderTab";

const { Header, Content } = Layout;
const LayoutFC = () => {
    const [store] = useFlatInject("connection");
    const tabKey = useTabKey();
    const [inputValue, setInputValue] = useState("");

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

    const options = [
        {
            label: <span style={{ fontSize: 11 }}>⭐ Starred Connections</span>,
            options: [
                renderItem("Production", "https://prod.dynmcp.com", true),
                renderItem("Development", "https://dev.dynmcp.com", true),
            ],
        },
        {
            label: <span style={{ fontSize: 11 }}>🕑 Recent Connections</span>,
            options: [
                renderItem("Testing", "https://test.dynmcp.com"),
                renderItem("Localhost", "http://localhost:8080"),
            ],
        },
    ];

    return (
        <Layout className="custom-layout" style={{ minHeight: "100vh" }}>
            <Header
                data-tauri-drag-region
                onMouseDown={handleDragStart}
                style={{
                    backgroundColor: "#f0f5ff",
                    height: 36,
                    userSelect: "none",
                }}
            >
                <HeaderTab />
            </Header>
            <Layout>
                <Layout>
                    <Flex
                        align="center"
                        style={{
                            height: "45px",
                            borderBottom: "1px solid #f0f5ff",
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
                                    backgroundColor: "#f0f5ff",
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
