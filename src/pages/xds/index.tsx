import { VisiableComponent } from "@/store/xds";
import { useFlatInject } from "@/utils/hooks";
import { useTabKey } from "@/utils/tabkey";
import { Splitter } from "antd";
import KeepAlive from "react-activation";
import Editor from "./components/Editor";
import IDSTable from "./components/IDSTable";
import MenuTree from "./components/MenuTree";
import Overview from "./components/Overview";
import TDSTable from "./components/TDSTable";

const component2ReactNode: Record<VisiableComponent, React.ReactNode> = {
    [VisiableComponent.Editor]: <Editor />,
    [VisiableComponent.Overview]: <Overview />,
    [VisiableComponent.TDSTable]: <TDSTable />,
    [VisiableComponent.IDSTable]: <IDSTable />,
};

export default () => {
    let tabKey = useTabKey();
    const [xdsStore] = useFlatInject("xds");
    const { mapVisiableComponent } = xdsStore;

    return (
        <KeepAlive name="xdsKeepalive" cacheKey={tabKey}>
            <Splitter>
                <Splitter.Panel defaultSize="20%" max="25%" min={"20%"}>
                    <MenuTree />
                </Splitter.Panel>
                <Splitter.Panel>
                    {component2ReactNode[mapVisiableComponent(tabKey)]}
                </Splitter.Panel>
            </Splitter>
        </KeepAlive>
    );
};
