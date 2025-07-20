import { http } from "@/utils/http";
import { IDSResponse, xDSParam } from "../../../types/xds";

export const fetchIDS = async (params: xDSParam) => {
    const headers: Record<string, string> = {
        api_key: params.api_key || "",
    };
    const res = await http.get<IDSResponse>("/admin/ids", { headers });
    if (res.code !== 0) {
        throw new Error(res.message);
    }
    return res.data;
};
