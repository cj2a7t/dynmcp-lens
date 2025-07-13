import { DynmcpConnection, invokeSaveConnection } from "@/request/ipc/invoke";
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
        (tabKey: string | null | undefined, con: DynmcpConnection) =>
        async (api) => {
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
