import { fetchIDS } from "@/request/apis/xds/ids";
import { fetchTDS } from "@/request/apis/xds/tds";
import { DynmcpConnection } from "@/types/connection";
import { TabKeyType } from "@/types/tab";
import { IDSResponse, TDSItem, TDSResponse } from "@/types/xds";
import { NaturFactory } from "@/utils/NaturFactory";
import { TabData } from "./tabdata";

const initState = {
    tDS: {
        tabData: {},
    } as TabData<TDSResponse>,

    iDS: {
        tabData: {},
    } as TabData<IDSResponse>,
};

const state = initState;
type State = typeof state;

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
});

export const maps = {
    mapIDS: [
        (state: State) => state.iDS.tabData,
        (state: State) => state.tDS.tabData,
        (
            idsTabData: Record<string, IDSResponse>,
            tdsTabData: Record<string, TDSResponse>
        ): TabData<IDSResponse> => {
            const result: TabData<IDSResponse> = { tabData: {} };

            for (const tabKey in idsTabData) {
                const idsList = idsTabData[tabKey] ?? [];
                const tdsList = tdsTabData[tabKey] ?? [];

                const tdsMap = new Map<string, TDSItem>();
                for (const tds of tdsList) {
                    tdsMap.set(tds.id, tds);
                }

                result.tabData[tabKey] = idsList.map((idsItem) => {
                    const tds_items = idsItem.tool_ids
                        .map((tool_id) => tdsMap.get(tool_id))
                        .filter((item): item is TDSItem => !!item);

                    return {
                        ...idsItem,
                        tds_items,
                    };
                });
            }

            return result;
        },
    ],
};

export default {
    state,
    actions,
    maps,
};
