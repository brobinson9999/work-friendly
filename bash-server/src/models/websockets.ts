const invalidateCallbacks: Set<() => void> = new Set();

export function registerInvalidateCallback(callback: () => void) {
  invalidateCallbacks.add(callback);
}

export function invalidateCache() {
  invalidateCallbacks.forEach((callback) => {
    callback();
  });
}
