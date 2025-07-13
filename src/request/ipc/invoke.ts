import { invoke } from "@tauri-apps/api/core";

export interface DynmcpConnection {
    id?: number;
    name: string;
    url: string;
    api_key: string;
    starred: boolean;
}

export interface InvokeResponse<T> {
    code: number;
    message: string;
    data?: T;
}

export const invokeSaveConnection = async (
    con: DynmcpConnection
): Promise<number> => {
    const res: InvokeResponse<number> = await invoke("save_dynmcp_connection", {
        conn: con,
    });

    if (res.code === 0 && res.data !== undefined) {
        return res.data;
    } else {
        throw new Error(res.message || "Unknown error while saving connection");
    }
};
