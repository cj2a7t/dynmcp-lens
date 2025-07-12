import logo from "@/assets/dynmcp.png";
import { ConnectionData } from "@/request/apis/connection/healthz";
import { LinkOutlined, StarOutlined } from "@ant-design/icons";
import { invoke } from "@tauri-apps/api/core";
import type { FormProps } from "antd";
import { Button, Flex, Form, Input, Select, Typography } from "antd";
import { useFlatInject, useNavigate } from "umi";

const { Option } = Select;
const { Title } = Typography;

export default () => {
    const navigate = useNavigate();
    const [store] = useFlatInject("connection");

    const onFinish: FormProps<ConnectionData>["onFinish"] = async (con) => {
        if (!con.host) return;
        try {
            const result = await invoke<any>("ping", {
                params: {
                    url: `${con.scheme}://${con.host}/healthz`,
                    api_key: con.api_key,
                },
            });
            console.log("Ping response:", result);
        } catch (err) {
            console.error("Ping error:", err);
        }
        navigate("/xds");
    };

    const prefixSelector = (
        <Form.Item name="scheme" noStyle>
            <Select style={{ width: 80 }}>
                <Option value="http">http</Option>
                <Option value="https">https</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Flex justify="center" align="center" style={{ height: "75vh" }}>
            <div
                style={{
                    width: "100%",
                    maxWidth: 500,
                    padding: 12,
                    borderRadius: 12,
                    background: "#fff",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 12,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Title level={5} style={{ margin: 0 }}>
                            Connect to
                        </Title>
                        <img
                            src={logo}
                            alt="logo"
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 6,
                                marginLeft: 2,
                            }}
                        />
                    </div>

                    <Button
                        type="text"
                        icon={
                            <StarOutlined
                                style={{
                                    color: "#fadb14",
                                }}
                            />
                        }
                        style={{ color: "#ff4d4f" }}
                    />
                </div>

                <Form
                    name="connect"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    initialValues={{ scheme: "http" }}
                >
                    <Form.Item<ConnectionData>
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, message: "Please input name" },
                        ]}
                        style={{ marginBottom: 12 }}
                    >
                        <Input placeholder="e.g. dev-server" />
                    </Form.Item>

                    <Form.Item<ConnectionData>
                        label="Host"
                        name="host"
                        rules={[
                            { required: true, message: "Please input host" },
                        ]}
                        style={{ marginBottom: 12 }}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            placeholder="localhost:8000"
                        />
                    </Form.Item>

                    <Form.Item<ConnectionData>
                        label="API Key"
                        name="api_key"
                        rules={[
                            { required: true, message: "Please input API Key" },
                        ]}
                        style={{ marginBottom: 12 }}
                    >
                        <Input.Password placeholder="sk-xxxxx" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ offset: 5, span: 18 }}
                        style={{ marginBottom: 8 }}
                    >
                        <Flex justify="end">
                            <Button
                                size="small"
                                type="primary"
                                icon={<LinkOutlined />}
                                htmlType="submit"
                                style={{ fontSize: 12 }}
                            >
                                Connect
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </div>
        </Flex>
    );
};
