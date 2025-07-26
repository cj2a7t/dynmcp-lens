export const toPrettyJsonString = (obj: unknown): string => {
    try {
        return JSON.stringify(obj, null, 4);
    } catch {
        return "Failed to stringify JSON";
    }
};
