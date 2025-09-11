// src/services/EventService.ts
// Unified EventService (merged)
// - Use Vite env for baseURL
// - Provide typed wrappers for list/get/create/update
import axios from 'axios';
/** Single axios client for the whole app */
const apiClient = axios.create({
    // IMPORTANT: backend base URL from .env.development → VITE_BACKEND_URL
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 15000
});
/** Helper: export so other services can reuse the same client if needed */
export { apiClient };
export default {
    /**
     * GET /events?_limit=&_page=
     * Return a list of events with optional pagination.
     */
    getEvents(params) {
        return apiClient.get('/events', { params });
    },
    /**
     * GET /events/{id}
     * Return a single event by id.
     */
    getEvent(id) {
        return apiClient.get('/events/' + id);
    },
    /**
     * POST /events
     * Create a new event.
     * Alias: saveEvent === createEvent (kept for backward compatibility).
     */
    saveEvent(event) {
        return apiClient.post('/events', event);
    },
    createEvent(event) {
        return apiClient.post('/events', event);
    },
    /**
     * PUT /events
     * Update an existing event (expects id in payload).
     * If your backend uses POST /events/save, change the path below accordingly.
     */
    updateEvent(event) {
        return apiClient.put('/events', event);
    }
};
//# sourceMappingURL=EventService.js.map