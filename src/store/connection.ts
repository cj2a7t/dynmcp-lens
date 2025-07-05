import { NaturFactory } from "@/utils/NaturFactory";
import { invoke } from '@tauri-apps/api/core';
import counter from "./counter";

export type ConnectionData = {
    name?: string;
    host?: string;
    admin_key?: string;
};

const initState = {
    connections: [] as ConnectionData[],
    count: 0,
}
const state = initState;
type State = typeof state;

const actions = NaturFactory.actionsCreator(state)({
    fetchAll: () => async (api) => {
        const res: ConnectionData[] = await invoke("query_all")
        api.setState((s: State) => {
            s.connections = res
        })
    },
    ping: () => async (api) => {
        const res: string = await invoke("req_ping_con")
        console.log("========>>> res:", res)
    },
    setCount: (count: number) => (api) => {
        api.setState((s: State) => {
            s.count = count
        })
    }
})

export default {
    state,
    actions
}