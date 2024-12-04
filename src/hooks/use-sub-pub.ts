import { ISafeAny } from '@/type';

// 发布订阅
export default function usePubSub() {
  const eventMap = new Map<string, (value: ISafeAny) => void>();

  const subscribe = (event: string, callback: (value: ISafeAny) => void) => {
    eventMap.set(event, callback);
  };

  const publish = (event: string, value: ISafeAny) => {
    eventMap.get(event)?.(value);
  };

  const unsubscribe = (event: string) => {
    eventMap.delete(event);
  };

  return { subscribe, publish, unsubscribe };
}

class PubSub {
  private eventMap = new Map<string, (value: ISafeAny) => void>();

  subscribe(event: string, callback: (value: ISafeAny) => void) {
    this.eventMap.set(event, callback);
  }

  publish(event: string, value: ISafeAny) {
    this.eventMap.get(event)?.(value);
  }

  unsubscribe(event: string) {
    this.eventMap.delete(event);
  }
}

export const pubSub = new PubSub();
