import { defineStore } from 'pinia';
export const useEventStore = defineStore('event', {
    state: () => ({
        event: null
    }),
    actions: {
        setEvent(event) {
            this.event = event;
        }
    }
});
//# sourceMappingURL=event.js.map