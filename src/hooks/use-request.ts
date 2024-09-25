import { useCallback, useEffect, useRef, useState } from 'react';

import { ISafeAny } from '@/type';

interface IUseRequestOptions<T> {
  params?: ISafeAny;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  ready?: boolean;
  deps?: ISafeAny[];
  cancelOnUnmount?: boolean;
}

interface IUseRequest<T> {
  loading: boolean;
  data: T | undefined;
  refresh: () => void;
  cancelRequest: () => void;
}

export const useRequest = <T>(request: (params?: ISafeAny) => Promise<T>, options?: IUseRequestOptions<T>): IUseRequest<T> => {
  const [state, setState] = useState<{ loading: boolean; data: T | undefined }>({
    loading: false,
    data: undefined,
  });
  const abortControllerRef = useRef<AbortController>();

  const { params, ready = true, onSuccess, onError, deps = [], cancelOnUnmount = true } = options ?? {};

  const fetchData = useCallback(async () => {
    abortControllerRef.current = new AbortController();
    setState((prevState) => ({ ...prevState, loading: true }));
    const _params = { ...params, signal: abortControllerRef.current?.signal };
    try {
      const response = await request(_params);
      setState({ loading: false, data: response });
      onSuccess?.(response);
    } catch (error) {
      if (error instanceof Error) {
        setState({ loading: false, data: undefined });
        onError?.(error);
      }
    }
  }, [params, onSuccess, onError]);

  const refresh = useCallback(() => fetchData(), [fetchData]);

  useEffect(() => {
    if (ready) {
      fetchData();
    }
    return () => {
      if (cancelOnUnmount) {
        abortControllerRef.current?.abort();
      }
    };
  }, [ready, fetchData, cancelOnUnmount, ...deps]);

  const cancelRequest = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return { ...state, refresh, cancelRequest };
};
