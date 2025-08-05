import HttpMethodTag from "@/components/HttpMethodTag";
import SwaggerUploader from "@/components/SwaggerUploader";
import { useFlatInject } from "@/utils/hooks";
import { initMonacoTheme } from "@/utils/monaco";
import { useTabKey } from "@/utils/tabkey";
import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { Editor } from "@monaco-editor/react";
import { Button, List, message, Modal, Upload, UploadProps } from "antd";
import { useEffect } from "react";
import styles from "./index.module.less";

export default () => {
    useEffect(() => {
        initMonacoTheme();
    }, []);

    const tabKey = useTabKey();
    const [xdsStore] = useFlatInject("xds");
    const [connStore] = useFlatInject("connection");
    const { mapConnection } = connStore;
    const { onPutTDS, onPutIDS, onDeleteIDS, onDeleteTDS } = xdsStore;
    const visiableData = xdsStore.visiableData.tabData[tabKey];

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
        <div>
            <div className={styles.header}>
                <span className={styles.title}>Config JSON</span>
                <div>
                    {visiableData?.editMode == true && (
                        <>
                            <Button
                                size="small"
                                type="default"
                                danger
                                icon={<DeleteOutlined />}
                                className={`${styles.button} ${styles.deleteButton}`}
                                onClick={async () => {
                                    try {
                                        if (visiableData?.scene === "put_tds") {
                                            await onDeleteTDS(
                                                tabKey,
                                                mapConnection(tabKey)
                                            );
                                            message.success(
                                                `TDS deleted successfully`
                                            );
                                        } else {
                                            await onDeleteIDS(
                                                tabKey,
                                                mapConnection(tabKey)
                                            );
                                            message.success(
                                                `IDS deleted successfully`
                                            );
                                        }
                                    } catch (error) {
                                        message.error(
                                            "Failed to delete. Please try again."
                                        );
                                    }
                                }}
                            >
                                Delete
                            </Button>

                            <Button
                                size="small"
                                type="primary"
                                icon={<EditOutlined />}
                                className={styles.button}
                                onClick={async () => {
                                    try {
                                        if (visiableData?.scene === "put_tds") {
                                            await onPutTDS(
                                                tabKey,
                                                mapConnection(tabKey)
                                            );
                                            message.success(
                                                `TDS saved successfully`
                                            );
                                        } else {
                                            await onPutIDS(
                                                tabKey,
                                                mapConnection(tabKey)
                                            );
                                            message.success(
                                                `IDS saved successfully`
                                            );
                                        }
                                    } catch (error) {
                                        message.error(
                                            "Failed to save. Please check your input."
                                        );
                                    }
                                }}
                            >
                                Edit
                            </Button>
                        </>
                    )}

                    {visiableData?.editMode == false && (
                        <>
                            {visiableData?.scene === "put_tds" && (
                                <SwaggerUploader
                                    className={styles.button}
                                ></SwaggerUploader>
                            )}
                            <Button
                                size="small"
                                type="primary"
                                icon={<SaveOutlined />}
                                className={styles.button}
                                onClick={() => {
                                    visiableData?.scene == "put_tds"
                                        ? onPutTDS(
                                              tabKey,
                                              mapConnection(tabKey)
                                          )
                                        : onPutIDS(
                                              tabKey,
                                              mapConnection(tabKey)
                                          );
                                    message.success(
                                        visiableData?.scene === "put_tds"
                                            ? `TDS saved successfully`
                                            : `IDS saved successfully`
                                    );
                                }}
                            >
                                Save
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <Editor
                height="90vh"
                defaultLanguage="json"
                value={visiableData?.value ?? ""}
                theme="customTheme"
                options={{
                    fontSize: 11,
                    tabSize: 4,
                    insertSpaces: true,
                    detectIndentation: false,
                    autoIndent: "full",
                    minimap: { enabled: false },
                    scrollbar: {
                        verticalScrollbarSize: 8,
                        horizontalScrollbarSize: 8,
                        useShadows: false,
                    },
                }}
                onChange={(value) => {
                    console.log("===>>", value);
                    xdsStore.onEditVisiableValue(tabKey, value ?? "");
                }}
            />
            <Modal
                title={
                    <div style={{ fontSize: 12 }}>
                        Extract from swagger JSON
                    </div>
                }
                open={true}
                footer={null}
                closable={{ "aria-label": "Custom Close Button" }}
                className={styles.customModal}
                closeIcon={<CloseOutlined />}
                styles={{
                    body: {
                        maxHeight: 500,
                        overflowY: "auto",
                        padding: 8,
                    },
                }}
            >
                <Upload {...props} style={{ width: "100%" }}>
                    <Button
                        size="small"
                        icon={<UploadOutlined />}
                        style={{ width: "100%" }}
                    >
                        Click to Upload
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
                                        <HttpMethodTag method={item.method} />
                                        <a href="https://ant.design">
                                            {item.name}
                                        </a>
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
        </div>
    );
};
