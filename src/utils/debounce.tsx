const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | undefined;
  return function (...args: any[]) {
    if (timeoutId as NodeJS.Timeout) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
