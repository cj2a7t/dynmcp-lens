import React from 'react';
import { Flex, Splitter, Tree, TreeDataNode, Typography } from 'antd';
import { DownOutlined, FrownFilled, FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Editor, loader } from '@monaco-editor/react';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
    <Flex justify="center" align="center" style={{ height: '100%' }}>
        <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
            {props.text}
        </Typography.Title>
    </Flex>
);

const treeData: TreeDataNode[] = [
    {
        title: 'Routes',
        key: 'route',
        children: [
            {
                key: 'route-1',
                title: 'route-111-111-111-111-111',
            },
            {
                key: 'route-2',
                title: 'route-222-222-222-222-222',
            },
        ],
    },
    {
        title: 'Upstreams',
        key: 'upstream',
        children: [
            {
                key: 'upstream-1',
                title: 'upstream-111-111-111-111-111',
            },
            {
                key: 'upstream-2',
                title: 'upstream-222-222-222-222-222',
            },
        ],
    },
    {
        title: 'Plugin Metadata',
        key: 'plugin-metadata',
        children: [
            {
                key: 'plugin-metadata-1',
                title: 'plugin-111-111-111-111-111',
            },
            {
                key: 'plugin-metadata-2',
                title: 'plugin-222-222-222-222-222',
            },
        ],
    },
];
const defaultValue = `{
  "routes": [
    {
      "id": "1",
      "uri": "/api/v1/orders",
      "methods": [
        "GET",
        "POST"
      ],
      "hosts": [
        "example.com"
      ],
      "plugins": {
        "key-auth": {},
        "limit-count": {
          "count": 100,
          "time_window": 60,
          "rejected_code": 429,
          "key": "remote_addr"
        }
      },
      "upstream": {
        "type": "roundrobin",
        "nodes": {
          "192.168.1.10:8080": 1,
          "192.168.1.11:8080": 1
        }
      }
    },
    {
      "id": "2",
      "uri": "/api/v1/users/*",
      "methods": [
        "GET",
        "PUT",
        "DELETE"
      ],
      "hosts": [
        "api.example.com"
      ],
      "plugins": {
        "jwt-auth": {},
        "rate-limit": {
          "rate": 50,
          "burst": 10,
          "default_conn_delay": 0.5,
          "key": "remote_addr"
        }
      },
      "upstream": {
        "type": "chash",
        "key": "remote_addr",
        "nodes": {
          "192.168.1.20:9000": 1,
          "192.168.1.21:9000": 1
        }
      }
    },
    {
      "id": "3",
      "uri": "/health",
      "methods": [
        "GET"
      ],
      "hosts": [
        "health.example.com"
      ],
      "plugins": {
        "prometheus": {},
        "cors": {
          "allow_origins": [
            "*"
          ],
          "allow_methods": [
            "GET"
          ]
        }
      },
      "upstream": {
        "type": "roundrobin",
        "nodes": {
          "192.168.2.10:80": 1
        }
      }
    },
    {
      "id": "4",
      "uri": "/api/v1/payment",
      "methods": [
        "POST"
      ],
      "hosts": [
        "payment.example.com"
      ],
      "plugins": {
        "basic-auth": {},
        "limit-req": {
          "rate": 20,
          "burst": 10,
          "rejected_code": 429,
          "key": "remote_addr"
        }
      },
      "upstream": {
        "type": "roundrobin",
        "nodes": {
          "192.168.3.10:8080": 1
        }
      }
    }
  ]
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
        }
    });
});




export default () => {
    return (
        <Splitter>
            <Splitter.Panel defaultSize="20%" max="25%" min={"1%"}>
                <Tree
                    showIcon
                    defaultExpandAll
                    defaultSelectedKeys={['0-0-0']}
                    // showLine
                    // switcherIcon={<DownOutlined />}
                    treeData={treeData}
                    style={{ height: 'calc(100vh - 95px)', backgroundColor: "#f5f5f5" }}
                />
            </Splitter.Panel>
            <Splitter.Panel>
                {/* <Desc text="Second" /> */}
                <Editor
                    height="90vh"
                    defaultLanguage="json"
                    defaultValue={defaultValue}
                    theme="customTheme"
                />
            </Splitter.Panel>
        </Splitter>
    )
}