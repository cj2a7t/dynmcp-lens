import { invokeSaveConnection } from "@/request/ipc/invoke";
import { DynmcpConnection } from "@/types/connection";
import { TabKeyType } from "@/types/tab";
import { NaturFactory } from "@/utils/NaturFactory";
import { TabData } from "./tabdata";

const initState = {
    tabConnection: {
        tabData: {},
    } as TabData<DynmcpConnection>,

    tabConnectionId: {
        tabData: {},
    } as TabData<number>,
};

const state = initState;
type State = typeof state;

const actions = NaturFactory.actionsCreator(state)({
    onFinishFrom:
        (tabKey: TabKeyType, con: DynmcpConnection) => async (api) => {
            const realKey = tabKey ?? "default";
            const id = await invokeSaveConnection(con);
            api.setState((s: State) => {
                s.tabConnection.tabData[realKey] = con;
                s.tabConnectionId.tabData[realKey] = id;
            });
        },
});

export default {
    state,
    actions,
};
