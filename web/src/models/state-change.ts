let onStateChangedCallback: (() => void) | null = null;

export function stateChanged() {
  if (onStateChangedCallback) {
    onStateChangedCallback();
  }
}

export function onStateChanged(callback: () => void) {
  onStateChangedCallback = callback;
}
