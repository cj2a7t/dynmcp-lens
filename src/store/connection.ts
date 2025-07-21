import { invokeSaveConnection } from "@/request/ipc/invoke";
import { DynmcpConnection } from "@/types/connection";
import { TabKeyType } from "@/types/tab";
import { NaturFactory } from "@/utils/NaturFactory";
import { TabData } from "./tabdata";

const initState = {
    tabConnection: {
        tabData: {},
    } as TabData<DynmcpConnection>,
};

const state = initState;
type State = typeof state;
const createMap = NaturFactory.mapCreator(state);

const actions = NaturFactory.actionsCreator(state)({
    onFinishFrom:
        (tabKey: TabKeyType, con: DynmcpConnection) => async (api) => {
            const realKey = tabKey ?? "default";
            const id = await invokeSaveConnection(con);
            con.id = id;
            api.setState((s: State) => {
                s.tabConnection.tabData[realKey] = con;
            });
        },
});

export const maps = {
    mapConnection: createMap(
        (state: State) => state.tabConnection.tabData,
        (tabData: Record<string, DynmcpConnection>) => {
            return (tabKey: TabKeyType) => {
                const key = tabKey ?? "default";
                const res = tabData[key];
                console.log("mapConnection", res);
                return res;
            };
        }
    ),
};

export default {
    name: "connection",
    state,
    actions,
    maps,
};
