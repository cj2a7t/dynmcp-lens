import { getTabKey } from "@/utils/tabkey";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "umi";
import { v4 as uuidv4 } from "uuid";
import "./style.less";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const App: React.FC = () => {
    const nav = useNavigate();

    const [items, setItems] = useState<
        { label: string; key: string; path: string }[]
    >([]);
    const [activeKey, setActiveKey] = useState("");
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        let tabKey = getTabKey(location.search);
        if (!tabKey || tabKey == "") {
            tabKey = uuidv4();
            nav(`${pathname}?tabKey=${tabKey}`, { replace: true });
            return;
        }
        const exists = items.find((item) => item.key === tabKey);
        const labelMap: Record<string, string> = {
            "/new_connection": "New Connection",
            "/xds": "xDS Overview",
        };
        const newLabel = labelMap[pathname] ?? "Untitled Tab";

        if (!exists) {
            const newTab = {
                label: newLabel,
                key: tabKey,
                path: `${pathname}?tabKey=${tabKey}`,
            };
            setItems((prev) => [...prev, newTab]);
        } else {
            setItems((prev) =>
                prev.map((item) =>
                    item.key === tabKey
                        ? {
                              ...item,
                              label: newLabel,
                              path: `${pathname}?tabKey=${tabKey}`,
                          }
                        : item
                )
            );
        }

        setActiveKey(tabKey);
    }, [location]);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
        const matchItem = items.find((item) => item.key === newActiveKey);
        if (matchItem?.path) {
            nav(matchItem.path);
        }
    };

    const add = () => {
        const newKey = uuidv4();
        const newTab = {
            label: "New Connection",
            key: newKey,
            path: `/new_connection?tabKey=${newKey}`,
        };
        const newPanes = [...items, newTab];
        setItems(newPanes);
        setActiveKey(newKey);
        nav(newTab.path);
    };

    const remove = (targetKey: TargetKey) => {
        if (items.length === 1) {
            return;
        }
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) lastIndex = i - 1;
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
        const match = newPanes.find((item) => item.key === newActiveKey);
        if (match) {
            nav(match.path);
        }
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

    const handleDragStart = (event: any) => {
        event.preventDefault();
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
            className="header-tab"
        />
    );
};

export default App;
