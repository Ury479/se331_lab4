import { ref, computed, watchEffect } from 'vue';
import PassengerCard from '@/components/PassengerCard.vue';
import PassengerService from '@/services/PassengerService';
const props = defineProps({
    page: {
        type: Number,
        required: true
    }
});
const perPage = 10;
const page = computed(() => props.page);
const passengers = ref(null);
const totalPassengers = ref(0);
const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalPassengers.value / perPage);
    console.log('Current page:', page.value, 'Total pages:', totalPages, 'Total passengers:', totalPassengers.value);
    return page.value < totalPages - 1;
});
// Force reactivity by watching the page prop directly
watchEffect(() => {
    const currentPage = page.value;
    console.log('Page changed to:', currentPage);
    passengers.value = null;
    PassengerService.getPassengers(currentPage, perPage)
        .then((response) => {
        console.log('Full response:', response);
        console.log('Response data:', response.data);
        console.log('Response headers:', response.headers);
        // Handle different possible response structures
        if (response.data.data) {
            passengers.value = response.data.data;
        }
        else if (Array.isArray(response.data)) {
            passengers.value = response.data;
        }
        else {
            passengers.value = [];
        }
        // Try different fields for total count
        totalPassengers.value = response.data.totalPassengers ||
            response.data.total ||
            response.headers['x-total-count'] ||
            100; // fallback for testing
    })
        .catch((error) => {
        console.error('There was an error!', error);
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.page + 1);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.page);
(__VLS_ctx.totalPassengers);
if (__VLS_ctx.passengers && __VLS_ctx.passengers.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "passengers" },
    });
    for (const [passenger] of __VLS_getVForSourceType((__VLS_ctx.passengers))) {
        /** @type {[typeof PassengerCard, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(PassengerCard, new PassengerCard({
            key: (passenger._id),
            passenger: (passenger),
        }));
        const __VLS_1 = __VLS_0({
            key: (passenger._id),
            passenger: (passenger),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
}
else if (__VLS_ctx.passengers && __VLS_ctx.passengers.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pagination" },
});
if (__VLS_ctx.page !== 0) {
    const __VLS_3 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
        id: "page-prev",
        to: ({ name: 'passenger-list', query: { page: __VLS_ctx.page - 1 } }),
        rel: "prev",
        ...{ class: "page-link" },
    }));
    const __VLS_5 = __VLS_4({
        id: "page-prev",
        to: ({ name: 'passenger-list', query: { page: __VLS_ctx.page - 1 } }),
        rel: "prev",
        ...{ class: "page-link" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    __VLS_6.slots.default;
    var __VLS_6;
}
if (__VLS_ctx.hasNextPage) {
    const __VLS_7 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        id: "page-next",
        to: ({ name: 'passenger-list', query: { page: __VLS_ctx.page + 1 } }),
        rel: "next",
        ...{ class: "page-link" },
    }));
    const __VLS_9 = __VLS_8({
        id: "page-next",
        to: ({ name: 'passenger-list', query: { page: __VLS_ctx.page + 1 } }),
        rel: "next",
        ...{ class: "page-link" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_10.slots.default;
    var __VLS_10;
}
/** @type {__VLS_StyleScopedClasses['passengers']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['page-link']} */ ;
/** @type {__VLS_StyleScopedClasses['page-link']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PassengerCard: PassengerCard,
            page: page,
            passengers: passengers,
            totalPassengers: totalPassengers,
            hasNextPage: hasNextPage,
        };
    },
    props: {
        page: {
            type: Number,
            required: true
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        page: {
            type: Number,
            required: true
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=PassengerListView.vue.js.map