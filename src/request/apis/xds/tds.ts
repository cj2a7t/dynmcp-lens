import { http } from "@/utils/http";
import { TDSResponse, xDSParam } from "../../../types/xds";

export const fetchTDS = async (params: xDSParam) => {
    const headers: Record<string, string> = {
        "x-api-key": params.api_key || "",
    };
    const res = await http.get<TDSResponse>("/admin/tds", { headers });
    if (res.code !== 200) {
        throw new Error(res.message);
    }
    return res.data;
};
