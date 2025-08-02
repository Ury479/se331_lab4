// src/stores/passenger.ts
import { defineStore } from 'pinia'

export interface Passenger {
    id: number
    name: string
    age: number
    airline: string
}

interface PassengerState {
    passenger: Passenger | null
}

export const usePassengerStore = defineStore('passenger', {
    state: (): PassengerState => ({
        passenger: null
    }),
    actions: {
        setPassenger(passenger: Passenger) {
            this.passenger = passenger
        }
    }
})
