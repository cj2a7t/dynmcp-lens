import { initMonacoTheme } from "@/utils/monaco";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Editor } from "@monaco-editor/react";
import { Button } from "antd";
import { useEffect } from "react";
import styles from "./index.module.less";

const defaultValue = `{
  "id": "tool_10",
  "name": "Tool Name 10",
  "description": "Description for tool 10",
  "input_schema": {
    "param1": {
      "type": "string"
    },
    "param2": {
      "type": "number"
    }
  },
  "tds_ext_info": {
    "domain": "api.example.com",
    "method": "GET",
    "path": "/v1/resource/10",
    "required_params": {
      "param1": "value_10",
      "param2": 10
    },
    "ext_info": {
      "auth_required": true,
      "rate_limit": 9
    }
  }
}`;

export default () => {
    useEffect(() => {
        initMonacoTheme();
    }, []);

    return (
        <div>
            <div className={styles.header}>
                <span className={styles.title}>Config JSON</span>
                <div>
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
                        icon={<SaveOutlined />}
                        className={styles.button}
                        onClick={() => {}}
                    >
                        Save
                    </Button>
                </div>
            </div>

            <Editor
                height="90vh"
                defaultLanguage="json"
                defaultValue={defaultValue}
                theme="customTheme"
            />
        </div>
    );
};
