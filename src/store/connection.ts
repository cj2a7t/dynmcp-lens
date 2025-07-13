import { DynmcpConnection, invokeSaveConnection } from "@/request/ipc/invoke";
import { NaturFactory } from "@/utils/NaturFactory";
import { TabData } from "./tabdata";

const initState = {
    conForm: {} as TabData<DynmcpConnection>,
    conId: {} as TabData<number>,
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
                s.conForm.tabData[realKey] = con;
                s.conId.tabData[realKey] = id;
            });
        },
});

export default {
    state,
    actions,
};
