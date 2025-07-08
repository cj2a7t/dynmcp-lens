import { ConnectionData } from "@/apis/connection/healthz";
import { LinkOutlined, StarOutlined } from "@ant-design/icons";
import { invoke } from "@tauri-apps/api/core";
import type { FormProps } from "antd";
import { Button, Flex, Form, Input, Select } from "antd";
import { useFlatInject, useNavigate } from "umi";

const { Option } = Select;
export default () => {
    const navigate = useNavigate();

    const [store] = useFlatInject("connection");

    const onFinish: FormProps<ConnectionData>["onFinish"] = async (con) => {
        if (!con.host) {
            console.warn("Host is required");
            return;
        }

        try {
            const result = await invoke<any>("ping", {
                params: {
                    url: con.scheme + "://" + con.host + "/healthz",
                    api_key: con.api_key,
                },
            });

            console.log("Ping response:", result);
        } catch (err) {
            console.error("Ping error:", err);
        }
        navigate("/apisix");
    };

    const prefixSelector = (
        <Form.Item name="scheme" noStyle>
            <Select style={{ width: 90 }} defaultValue={"http"}>
                <Option value="https">https</Option>
                <Option value="http">http</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Flex justify="center" align="center" style={{ height: "75vh" }}>
            <div
                style={{
                    width: "100%",
                    height: 260,
                    maxWidth: 600,
                    padding: 35,
                    backgroundColor: "#fafafa",
                    boxShadow: "0 0 35px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{ scheme: "http" }}
                >
                    <Form.Item<ConnectionData>
                        label="Connection Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input connection name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<ConnectionData>
                        label="Host"
                        name="host"
                        rules={[
                            {
                                required: true,
                                message: "Please input dynmcp host!",
                            },
                        ]}
                    >
                        <Input addonBefore={prefixSelector} />
                    </Form.Item>

                    <Form.Item<ConnectionData>
                        label="API Key"
                        name="api_key"
                        rules={[
                            {
                                required: true,
                                message: "Please input dynmcp API key!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
                        <Button
                            size="small"
                            style={{ width: 100 }}
                            color="danger"
                            variant="solid"
                        >
                            <StarOutlined />
                            star
                        </Button>
                        <Button
                            size="small"
                            style={{ width: 100, marginLeft: 32 }}
                            htmlType="submit"
                            color="primary"
                            variant="solid"
                        >
                            <LinkOutlined />
                            connect
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Flex>
    );
};
