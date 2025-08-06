import HttpMethodTag from "@/components/HttpMethodTag";
import { useFlatInject } from "@/utils/hooks";
import { useTabKey } from "@/utils/tabkey";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, List, message, Modal, Upload, UploadProps } from "antd";
import styles from "./index.module.less";

export default () => {
    const tabKey = useTabKey();
    const [xdsStore] = useFlatInject("xds");

    const props: UploadProps = {
        name: "file",
        multiple: true,
        action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    return (
        <Modal
            title={<div style={{ fontSize: 12 }}>Import From Swagger JSON</div>}
            open={true}
            footer={null}
            className={styles.customModal}
            closeIcon={<CloseOutlined />}
            styles={{
                body: {
                    maxHeight: 500,
                    overflowY: "auto",
                    padding: 8,
                },
            }}
            onCancel={() => {
                xdsStore.onVisiableUploadSwagger(tabKey, false);
            }}
        >
            <Upload {...props} style={{ width: "100%" }}>
                <Button
                    size="small"
                    icon={<UploadOutlined />}
                    style={{ width: "100%" }}
                >
                    Click to Upload Swagger JSON
                </Button>
            </Upload>
            <List
                size="small"
                className="demo-loadmore-list"
                loading={false}
                itemLayout="horizontal"
                dataSource={[
                    {
                        name: "get_email",
                        description: "Retrieve email details by ID",
                        method: "GET",
                    },
                    {
                        name: "get_email2",
                        description:
                            "Retrieve email details by ID2Retrieve email details by ID2Retrieve email details by ID2Retrieve email details by ID2Retrieve email details by ID2",
                        method: "POST",
                    },
                    {
                        name: "get_email2",
                        description: "Retrieve email details by ID2",
                        method: "POST",
                    },
                    {
                        name: "get_email2",
                        description: "Retrieve email details by ID2",
                        method: "PATCH",
                    },
                    {
                        name: "get_email2",
                        description: "Retrieve email details by ID2",
                        method: "PUT",
                    },
                    {
                        name: "get_email2",
                        description: "Retrieve email details by ID2",
                        method: "DELETE",
                    },
                ]}
                renderItem={(item) => (
                    <List.Item actions={[<a key="use-it">use it</a>]}>
                        <List.Item.Meta
                            title={
                                <>
                                    <a href="https://ant.design">{item.name}</a>
                                    <HttpMethodTag method={item.method} />
                                </>
                            }
                            description={
                                <div
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {item.description}
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
};
