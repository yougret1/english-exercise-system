class SingleEventEmitter extends EventTarget {
  on = this.addEventListener;

  off = this.removeEventListener;

  emit = (type, data) =>
    this.dispatchEvent(new CustomEvent(type, { detail: data }));

  once = (type, listener) =>
    this.on(type, listener, { once: true, capture: true });
}

const emitter = new SingleEventEmitter()

export const on = (type, listener) => {
  emitter.addEventListener(type, listener)
}

export const off = (type, listener) => {
  emitter.removeEventListener(type, listener)
}

export const emit = (type, data) => {
  emitter.dispatchEvent(new CustomEvent(type, { detail: data }))
}

export const once = (type, listener) => {
  emitter.addEventListener(type, listener, { once: true })
}
