import { useFlatInject } from "@/utils/hooks";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ReloadOutlined,
    StarOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Layout } from "antd";
import { useEffect } from "react";
import { Outlet, useLocation } from "umi";
import HeaderTab from "./components/HeaderTab";

const { Header, Content, Sider } = Layout;
const LayoutFC = () => {
    const [store] = useFlatInject("global");
    const location = useLocation();
    useEffect(() => {
        store.buildConSideMenuList();
        store.selectSideMenu(location.pathname);
    }, [location]);

    const handleDragStart = (event: any) => {
        event.preventDefault(); // 阻止默认文本选择行为
    };

    return (
        <Layout className="custom-layout" style={{ minHeight: "100vh" }}>
            <Header
                data-tauri-drag-region
                onMouseDown={handleDragStart}
                style={{
                    backgroundColor: "#f0f5ff",
                    height: 45,
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
                        <Input
                            placeholder="Input APISIX connection: http(s)://$apisix_host/$connection_name/$admin_key"
                            style={{
                                border: "none",
                                backgroundColor: "#f0f5ff",
                                marginLeft: 10,
                                marginRight: 15,
                                height: 30,
                                borderRadius: 10,
                            }}
                            suffix={
                                <div>
                                    <Button
                                        style={{
                                            border: "none",
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        <StarOutlined />
                                    </Button>
                                </div>
                            }
                        />
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
