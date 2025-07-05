import { createUseInject } from 'natur';
import { store } from 'umi';

export const useInject = createUseInject(() => store)
export const useFlatInject = createUseInject(() => store, { flat: true })

export { useAsyncFunction as useHttp } from 'great-async';
export { useAsyncFunction as useAsyncFn } from 'great-async';
