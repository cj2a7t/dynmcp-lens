import { Tabs } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "umi";
import "./CustomTab.less";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [{ label: "New Connection", key: "1", path: "/apisix" }];

const App: React.FC = () => {
    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);
    const nav = useNavigate();

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
        const matchItem = items.find((item) => item.key == newActiveKey);
        console.log(matchItem);
        if (matchItem?.path) {
            nav(`${matchItem.path}`);
        } else {
            console.error("Path is missing or invalid:", matchItem);
        }
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({
            label: "New Tab",
            key: newActiveKey,
            path: "/favorites/" + newActiveKey,
        });
        setItems(newPanes);
        setActiveKey(newActiveKey);
        nav("/favorites/" + newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const handleDragStart = (event: any) => {
        event.preventDefault();
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: "add" | "remove"
    ) => {
        if (action === "add") {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <Tabs
            data-tauri-drag-region
            onMouseDown={handleDragStart}
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            items={items}
            size="small"
            className="custom-tab"
        ></Tabs>
    );
};

export default App;
