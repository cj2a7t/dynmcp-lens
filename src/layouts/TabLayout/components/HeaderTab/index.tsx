import { getTabKey } from "@/utils/tabkey";
import { LinkOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "umi";
import { v4 as uuidv4 } from "uuid";
import "./style.less";

interface TabItem {
    label: string;
    key: string;
    path: string;
}

const MIN_TABS = 1;
const MAX_TABS = 20;

const HeaderTab: React.FC = () => {
    const nav = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<TabItem[]>([]);
    const [activeKey, setActiveKey] = useState("");
    const location = useLocation();

    const canRemoveTab = items.length > MIN_TABS;
    const canAddTab = items.length < MAX_TABS;

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

    const switchTab = (tabKey: string) => {
        setActiveKey(tabKey);
        const matchItem = items.find((item) => item.key === tabKey);
        if (matchItem?.path) {
            nav(matchItem.path);
        }
    };

    const addTab = () => {
        if (!canAddTab) {
            return;
        }

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

    const removeTab = (tabKey: string, e: React.MouseEvent) => {
        e.stopPropagation();

        if (items.length <= MIN_TABS) {
            return;
        }

        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === tabKey) lastIndex = i - 1;
        });

        const newPanes = items.filter((item) => item.key !== tabKey);
        if (newPanes.length && newActiveKey === tabKey) {
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

    return (
        <div
            className="custom-header-tab"
            data-tauri-drag-region
            ref={containerRef}
        >
            <Flex align="center" gap={8} className="tab-container">
                <div className="tab-items-container">
                    {items.map((item) => (
                        <div
                            key={item.key}
                            className={`tab-item ${
                                activeKey === item.key ? "active" : ""
                            }`}
                            onClick={() => switchTab(item.key)}
                        >
                            <LinkOutlined className="tab-icon" />
                            <span className="tab-label" title={item.label}>
                                {item.label}
                            </span>
                            {canRemoveTab && (
                                <Button
                                    type="text"
                                    size="small"
                                    className="tab-close-btn"
                                    onClick={(e) => removeTab(item.key, e)}
                                >
                                    ×
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
                {canAddTab && (
                    <Button
                        type="text"
                        size="small"
                        className="tab-add-btn"
                        onClick={addTab}
                        title={`Add new tab (${items.length}/${MAX_TABS})`}
                    >
                        +
                    </Button>
                )}
            </Flex>
        </div>
    );
};

export default HeaderTab;
