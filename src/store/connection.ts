import { ConnectionData, healthz } from "@/apis/connection/healthz";
import { NaturFactory } from "@/utils/NaturFactory";

const initState = {
    connections: [] as ConnectionData[],
};
const state = initState;
type State = typeof state;

const actions = NaturFactory.actionsCreator(state)({
    ping: (con: ConnectionData) => async (api) => {
        healthz(con);
    },
});

export default {
    state,
    actions,
};
