import { defineStore } from 'pinia';
export const useMessageStore = defineStore('message', {
    state: () => ({
        message: ''
    }),
    actions: {
        updateMessage(message) {
            this.message = message;
        },
        restoreMessage() {
            this.message = '';
        }
    }
});
//# sourceMappingURL=message.js.map