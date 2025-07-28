import { DynmcpConnection, InvokeResult } from "@/types/connection";
import { invoke } from "@tauri-apps/api/core";

export const invokeSaveConnection = async (
    con: DynmcpConnection
): Promise<number> => {
    const payload = {
        ...con,
        starred: con.starred ?? false,
    };

    const res: InvokeResult<number> = await invoke("save_dynmcp_connection", {
        conn: payload,
    });

    console.log("invokeSaveConnection res: ", res);

    if (res.code === 0 && res.data !== undefined) {
        return res.data;
    } else {
        throw new Error(res.message || "Unknown error while saving connection");
    }
};

export const invokeQryConnection = async (): Promise<DynmcpConnection[]> => {
    const res: InvokeResult<DynmcpConnection[]> = await invoke("query_all");
    console.log("invokeQryConnection res: ", res);
    if (res.code === 0 && res.data !== undefined) {
        return res.data;
    } else {
        throw new Error(res.message || "Unknown error while saving connection");
    }
};
