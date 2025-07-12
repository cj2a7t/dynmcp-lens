export interface TabState<T> {
    tableState: Record<string, T>;
}

export const createDefaultTabState = <T>(
    defaultTabId = "default",
    defaultData: T
): TabState<T> => ({
    tableState: {
        [defaultTabId]: defaultData,
    },
});
