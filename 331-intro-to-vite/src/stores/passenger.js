// src/stores/passenger.ts
import { defineStore } from 'pinia';
export const usePassengerStore = defineStore('passenger', {
    state: () => ({
        passenger: null
    }),
    actions: {
        setPassenger(passenger) {
            this.passenger = passenger;
        }
    }
});
//# sourceMappingURL=passenger.js.map