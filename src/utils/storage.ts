// 保存原始的 localStorage.setItem 方法
const originalSetItem = localStorage.setItem.bind(localStorage);

localStorage.setItem = (key, value) => {
  const oldValue = localStorage.getItem(key);
  // 调用原始的 setItem 方法
  originalSetItem(key, value);
  // 触发自定义事件通知变化
  window.dispatchEvent(
    new CustomEvent('storage-change', {
      detail: { key, newValue: value, oldValue },
    }),
  );
  return true;
};

export const $storage = localStorage;
