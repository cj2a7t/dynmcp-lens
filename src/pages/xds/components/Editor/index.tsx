import SwaggerUploader from "@/components/SwaggerUploader";
import { useFlatInject } from "@/utils/hooks";
import { initMonacoTheme } from "@/utils/monaco";
import { useTabKey } from "@/utils/tabkey";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Editor } from "@monaco-editor/react";
import { Button, message } from "antd";
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
        </div>
    );
};
