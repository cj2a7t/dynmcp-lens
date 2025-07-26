import { useFlatInject } from "@/utils/hooks";
import { initMonacoTheme } from "@/utils/monaco";
import { useTabKey } from "@/utils/tabkey";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Editor } from "@monaco-editor/react";
import { Button } from "antd";
import { useEffect } from "react";
import styles from "./index.module.less";

export default () => {
    useEffect(() => {
        initMonacoTheme();
    }, []);

    const tabKey = useTabKey();
    const [xdsStore] = useFlatInject("xds");

    return (
        <div>
            <div className={styles.header}>
                <span className={styles.title}>Config JSON</span>
                <div>
                    {xdsStore.visiableData.tabData[tabKey]?.editMode ==
                        true && (
                        <>
                            <Button
                                size="small"
                                type="default"
                                danger
                                icon={<DeleteOutlined />}
                                className={`${styles.button} ${styles.deleteButton}`}
                                onClick={() => {}}
                            >
                                Delete
                            </Button>
                            <Button
                                size="small"
                                type="primary"
                                icon={<EditOutlined />}
                                className={styles.button}
                                onClick={() => {}}
                            >
                                Edit
                            </Button>
                        </>
                    )}

                    {xdsStore.visiableData.tabData[tabKey]?.editMode ==
                        false && (
                        <Button
                            size="small"
                            type="primary"
                            icon={<SaveOutlined />}
                            className={styles.button}
                            onClick={() => {}}
                        >
                            Save
                        </Button>
                    )}
                </div>
            </div>

            <Editor
                height="90vh"
                defaultLanguage="json"
                value={xdsStore.visiableData.tabData[tabKey]?.value ?? ""}
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
            />
        </div>
    );
};
