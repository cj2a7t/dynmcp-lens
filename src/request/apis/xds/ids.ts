import { IDSResponse, xDSParam } from "@/types/xds";
import { http } from "@/utils/http";

export const fetchIDS = async (params: xDSParam) => {
    console.log("fetchIDS params:", params);
    const headers: Record<string, string> = {
        "x-api-key": params.api_key || "",
    };
    const res = await http.get<IDSResponse>("/admin/ids", { headers });
    if (res.code !== 200) {
        throw new Error(res.message);
    }
    return res.data;
};
