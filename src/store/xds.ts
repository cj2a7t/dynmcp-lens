import { fetchIDS } from "@/request/apis/xds/ids";
import { fetchTDS } from "@/request/apis/xds/tds";
import { DynmcpConnection } from "@/types/connection";
import { TabKeyType } from "@/types/tab";
import {
    IDSResponse,
    TDSItem,
    TDSResponse,
    VisiableComponent,
    VisiableData,
} from "@/types/xds";
import { NaturFactory } from "@/utils/NaturFactory";
import { TabData } from "./tabdata";

const initState = {
    tDS: {
        tabData: {},
    } as TabData<TDSResponse>,

    iDS: {
        tabData: {},
    } as TabData<IDSResponse>,
    visiableData: {
        tabData: {},
    } as TabData<VisiableData>,
};

const state = initState;
type State = typeof state;
const createMap = NaturFactory.mapCreator(state);

const actions = NaturFactory.actionsCreator(state)({
    onFetchTDS: (tabKey: TabKeyType, conn: DynmcpConnection) => async (api) => {
        const realKey = tabKey ?? "default";
        const res = await fetchTDS({ api_key: conn.api_key });
        api.setState((s: State) => {
            s.tDS.tabData[realKey] = res;
        });
    },
    onFetchIDS: (tabKey: TabKeyType, conn: DynmcpConnection) => async (api) => {
        const realKey = tabKey ?? "default";
        const res = await fetchIDS({ api_key: conn.api_key });
        api.setState((s: State) => {
            s.iDS.tabData[realKey] = res;
        });
    },
    onVisiableData: (tabKey: TabKeyType, data: VisiableData) => async (api) => {
        const realKey = tabKey ?? "default";
        api.setState((s: State) => {
            s.visiableData.tabData[realKey] = data;
        });
    },
});

export const maps = {
    mapIDS: createMap(
        (state: State) => state.iDS.tabData,
        (state: State) => state.tDS.tabData,
        (
            idsTabData: Record<string, IDSResponse>,
            tdsTabData: Record<string, TDSResponse>
        ) => {
            return (tabKey: TabKeyType): IDSResponse => {
                const key = tabKey ?? "default";
                const idsList = idsTabData[key] ?? [];
                const tdsList = tdsTabData[key] ?? [];
                const tdsMap = new Map<string, TDSItem>();
                for (const tds of tdsList) {
                    tdsMap.set(tds.id, tds);
                }
                return idsList.map((idsItem) => {
                    const tds_items = idsItem.tool_ids
                        .map((tool_id) => tdsMap.get(tool_id))
                        .filter((item): item is TDSItem => !!item);
                    const res = {
                        ...idsItem,
                        tds_items,
                    };
                    console.log("mapIDS", res);
                    return res;
                });
            };
        }
    ),
    mapVisiableData: createMap(
        (state: State) => state.visiableData.tabData,
        (tabData: Record<string, VisiableData>) => {
            return (tabKey: TabKeyType): VisiableData => {
                const key = tabKey ?? "default";
                const defaultData: VisiableData = {
                    component: VisiableComponent.Overview,
                };
                const res = tabData[key] ?? defaultData;
                return res;
            };
        }
    ),
};

export default {
    name: "xds",
    state,
    actions,
    maps,
};
