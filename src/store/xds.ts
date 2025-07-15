import { DynmcpConnection } from "@/request/ipc/invoke";
import { NaturFactory } from "@/utils/NaturFactory";
import { TabData } from "./tabdata";

const initState = {
    tDS: {
        tabData: {},
    } as TabData<DynmcpConnection>,

    iDS: {
        tabData: {},
    } as TabData<number>,
};

const state = initState;
type State = typeof state;

const actions = NaturFactory.actionsCreator(state)({
    onFetchTDS: () => async (api) => {},
    onFetchIDS: () => async (api) => {},
});

export default {
    state,
    actions,
};
