import logo from "@/assets/dynmcp.png";
import {
    AppstoreOutlined,
    DeleteOutlined,
    FileTextOutlined,
    SaveOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import { Editor, loader } from "@monaco-editor/react";
import { Button, Flex, Splitter, Tree, TreeDataNode, Typography } from "antd";
import React from "react";

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
    <Flex justify="center" align="center" style={{ height: "100%" }}>
        <Typography.Title
            type="secondary"
            level={5}
            style={{ whiteSpace: "nowrap" }}
        >
            {props.text}
        </Typography.Title>
    </Flex>
);

const treeData: TreeDataNode[] = [
    {
        title: "IDS",
        key: "ids",
        icon: <AppstoreOutlined style={{ color: "#1890ff" }} />,
        children: [
            {
                key: "key1-1",
                title: "Github MCP Server",
                icon: <FileTextOutlined style={{ color: "#24292e" }} />,
            },
            {
                key: "key1-2",
                title: "Bmap MCP Server",
                icon: <FileTextOutlined style={{ color: "#24292e" }} />,
            },
        ],
    },
    {
        title: "TDS",
        key: "tds",
        icon: <ToolOutlined style={{ color: "#52c41a" }} />,
        children: [
            {
                key: "key2-1",
                title: "Github Top Languages",
                icon: <FileTextOutlined style={{ color: "#24292e" }} />,
            },
            {
                key: "key2-2",
                title: "Get Top Repositories",
                icon: <FileTextOutlined style={{ color: "#24292e" }} />,
            },
        ],
    },
];
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

loader.init().then((monaco) => {
    monaco.editor.defineTheme("customTheme", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
            "editor.background": "#f5f5f5",
            // "editor.lineHighlightBackground": "#333333",
            // "editorCursor.foreground": "#ff0000",
        },
    });
});

export default () => {
    return (
        <Splitter>
            <Splitter.Panel defaultSize="20%" max="25%" min={"20%"}>
                <div
                    style={{
                        height: "calc(100vh)",
                        backgroundColor: "rgba(245, 245, 245, 0.8)",
                        padding: 8,
                        boxSizing: "border-box",
                    }}
                >
                    <Tree
                        className="custom-tree"
                        checkable
                        showIcon
                        defaultExpandAll
                        defaultSelectedKeys={["0-0-0"]}
                        // showLine
                        // switcherIcon={<DownOutlined />}
                        treeData={treeData}
                        style={{
                            height: "calc(100vh - 120px)",
                            backgroundColor: "rgba(245, 245, 245, 0.8)",
                        }}
                    />
                </div>
            </Splitter.Panel>
            <Splitter.Panel>
                {/* editor */}
                {/* <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px 12px",
                            backgroundColor: "rgba(245, 245, 245, 0.8)", 
                            borderBottom: "1px solid #eee",
                        }}
                    >
                        <span style={{ fontSize: 12, fontWeight: 500 }}>
                            Config JSON
                        </span>

                        <div>
                            <Button
                                size="small"
                                type="default"
                                danger
                                icon={<DeleteOutlined />}
                                style={{
                                    marginRight: 12,
                                    fontSize: 11,
                                    height: 22,
                                    padding: "0 8px",
                                }}
                                onClick={() => {}}
                            >
                                Delete
                            </Button>

                            <Button
                                size="small"
                                type="primary"
                                icon={<SaveOutlined />}
                                style={{
                                    fontSize: 11,
                                    height: 22,
                                    padding: "0 10px",
                                }}
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
                </div> */}
                {/* welcome */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: 24,
                        color: "#555",
                        height: "calc(75vh)",
                    }}
                >
                    <img
                        src={logo}
                        alt="Dynamic MCP Logo"
                        style={{
                            width: 220,
                            maxWidth: "80%",
                        }}
                    />

                    <div style={{ fontSize: 18, fontWeight: 600 }}>
                        Welcome to Dynamic MCP Lens 👋
                    </div>

                    <div style={{ fontSize: 14, color: "#888", maxWidth: 480 }}>
                        A visual control plane for managing Dynamic MCP.
                    </div>
                </div>
                {/* list */}

            </Splitter.Panel>
        </Splitter>
    );
};
