type Listener = (id: string | null) => void;

export default {
  currentTooltipId: null as string | null,
  listeners: new Set<Listener>(),
  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },
  show(id: string | null) {
    this.currentTooltipId = id;
    this.listeners.forEach((listener) => listener(id));
  },
  hide(id: string) {
    if (this.currentTooltipId === id) {
      this.currentTooltipId = null;
      this.listeners.forEach((listener) => listener(null));
    }
  },
};
