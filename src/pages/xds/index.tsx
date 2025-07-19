import { Splitter } from "antd";
import KeepAlive from "react-activation";
import { useLocation } from "umi";
import MenuTree from "./components/MenuTree";
import TDSTable from "./components/TDSTable";
import IDSTable from "./components/IDSTable";

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
                    {/* <TDSTable /> */}
                </Splitter.Panel>
            </Splitter>
        </KeepAlive>
    );
};
