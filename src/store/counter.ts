import { NaturFactory } from "@/utils/NaturFactory";

const initState = {
    count: 1
}
const state = initState;
type State = typeof state;

const actions = NaturFactory.actionsCreator(state)({
    add: () => (api) => {
        api.setState((s: State) => {
            s.count = s.count + 1
        })
    },
    del: () => (api) => {
        api.setState((s: State) => {
            s.count = s.count - 1
        })
    }
})

export default {
    name: "counter",
    state,
    actions
}