// src/stores/event.ts
import { defineStore } from 'pinia'

export interface Event {
    id: number
    category: string
    title: string
    description: string
    location: string
    date: string
    time: string
    petsAllowed: boolean
    organizer: string
}

interface EventState {
    event: Event | null
}

export const useEventStore = defineStore('event', {
    state: (): EventState => ({
        event: null
    }),
    actions: {
        setEvent(event: Event) {
            this.event = event
        }
    }
})
