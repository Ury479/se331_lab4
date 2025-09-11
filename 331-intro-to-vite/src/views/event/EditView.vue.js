import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import { toRefs } from 'vue';
const props = defineProps();
const { event } = toRefs(props);
const router = useRouter();
const store = useMessageStore();
const edit = () => {
    // If the edit API call successful
    // Push back to the event details view and show flash message INSIDE the event-detail component
    store.updateMessage('The data has been updated');
    setTimeout(() => {
        store.restoreMessage();
    }, 3000);
    router.push({ name: 'event-detail', params: { id: props.event.id } });
};
// 前往详情页
function goToDetailPage() {
    router.push({
        name: 'event-detail',
        params: { id: props.event.id },
        query: { message: 'Event updated successfully!' }
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
(__VLS_ctx.event.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.edit) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.edit) },
});
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            event: event,
            edit: edit,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=EditView.vue.js.map