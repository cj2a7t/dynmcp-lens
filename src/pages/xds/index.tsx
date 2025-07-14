import { Splitter } from "antd";
import KeepAlive from "react-activation";
import { useLocation } from "umi";
import IDSTable from "./components/IDSTable";
import MenuTree from "./components/MenuTree";

export default () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tabKey = searchParams.get("tabKey") ?? "default";

    return (
        <KeepAlive name="xdsKeepalive" cacheKey={tabKey}>
            <Splitter>
                <Splitter.Panel defaultSize="20%" max="25%" min={"20%"}>
                    <MenuTree />
                </Splitter.Panel>
                <Splitter.Panel>
                    {/* <Editor /> */}
                    {/* <Overview /> */}
                    <IDSTable />
                    {/* TDS list */}
                </Splitter.Panel>
            </Splitter>
        </KeepAlive>
    );
};
