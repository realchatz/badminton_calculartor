import { a as useTubes, _ as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import "D:/badminton_calculator/badminton-fee-app/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/badminton_calculator/badminton-fee-app/node_modules/hookable/dist/index.mjs";
import "D:/badminton_calculator/badminton-fee-app/node_modules/unctx/dist/index.mjs";
import "D:/badminton_calculator/badminton-fee-app/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/badminton_calculator/badminton-fee-app/node_modules/defu/dist/defu.mjs";
import "D:/badminton_calculator/badminton-fee-app/node_modules/ufo/dist/index.mjs";
import "D:/badminton_calculator/badminton-fee-app/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "D:/badminton_calculator/badminton-fee-app/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { tubes } = useTubes();
    const stats = computed(() => {
      let totalShuttlecocks = 0;
      let completedShuttlecocks = 0;
      let totalExpected = 0;
      let totalPaid = 0;
      let totalUnpaidPlayers = 0;
      tubes.value.forEach((tube) => {
        tube.shuttlecocks.forEach((s) => {
          totalShuttlecocks++;
          if (s.status === "Completed") completedShuttlecocks++;
          const shuttlecockExpected = s.players.length * s.feePerPlayer;
          totalExpected += shuttlecockExpected;
          s.players.forEach((p) => {
            if (p.isPaid) {
              totalPaid += s.feePerPlayer;
            } else {
              totalUnpaidPlayers++;
            }
          });
        });
      });
      return {
        totalTubes: tubes.value.length,
        totalShuttlecocks,
        pendingShuttlecocks: totalShuttlecocks - completedShuttlecocks,
        completedShuttlecocks,
        totalExpected,
        totalPaid,
        totalUnpaid: totalExpected - totalPaid,
        totalUnpaidPlayers
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto" }, _attrs))}><div class="mb-8"><h1 class="text-2xl font-bold text-gray-900">Dashboard</h1><p class="text-gray-500">Overview of shuttlecock usage and fee collection.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><div class="bg-white p-6 rounded-xl border shadow-sm"><p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Tubes</p><p class="text-3xl font-bold text-gray-900">${ssrInterpolate(unref(stats).totalTubes)}</p></div><div class="bg-white p-6 rounded-xl border shadow-sm"><p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Completed / Total</p><div class="flex items-baseline space-x-2"><p class="text-3xl font-bold text-green-600">${ssrInterpolate(unref(stats).completedShuttlecocks)}</p><p class="text-xl font-medium text-gray-400">/ ${ssrInterpolate(unref(stats).totalShuttlecocks)}</p></div></div><div class="bg-white p-6 rounded-xl border shadow-sm"><p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Paid</p><p class="text-3xl font-bold text-green-600">${ssrInterpolate(unref(stats).totalPaid)} ฿</p></div><div class="bg-white p-6 rounded-xl border shadow-sm border-orange-100 bg-orange-50/30"><p class="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">Pending Amount</p><p class="text-3xl font-bold text-orange-600">${ssrInterpolate(unref(stats).totalUnpaid)} ฿</p></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="bg-white rounded-xl border shadow-sm overflow-hidden"><div class="p-4 border-b bg-gray-50 font-bold text-gray-700">Detailed Statistics</div><div class="p-6 space-y-4"><div class="flex justify-between items-center"><span class="text-gray-600">Pending Shuttlecocks</span><span class="font-bold text-yellow-600">${ssrInterpolate(unref(stats).pendingShuttlecocks)}</span></div><div class="flex justify-between items-center"><span class="text-gray-600">Total Expected Amount</span><span class="font-bold text-gray-900">${ssrInterpolate(unref(stats).totalExpected)} ฿</span></div><div class="flex justify-between items-center"><span class="text-gray-600">Unpaid Players Count</span><span class="font-bold text-red-500">${ssrInterpolate(unref(stats).totalUnpaidPlayers)}</span></div></div></div><div class="bg-white rounded-xl border shadow-sm overflow-hidden"><div class="p-4 border-b bg-gray-50 font-bold text-gray-700">Quick Actions</div><div class="p-6 grid grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tubes",
        class: "flex flex-col items-center justify-center p-4 border rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-2xl mb-2 group-hover:scale-110 transition-transform"${_scopeId}>🏸</span><span class="text-sm font-bold text-gray-700"${_scopeId}>Add Tube</span>`);
          } else {
            return [
              createVNode("span", { class: "text-2xl mb-2 group-hover:scale-110 transition-transform" }, "🏸"),
              createVNode("span", { class: "text-sm font-bold text-gray-700" }, "Add Tube")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/members",
        class: "flex flex-col items-center justify-center p-4 border rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-2xl mb-2 group-hover:scale-110 transition-transform"${_scopeId}>👥</span><span class="text-sm font-bold text-gray-700"${_scopeId}>Add Member</span>`);
          } else {
            return [
              createVNode("span", { class: "text-2xl mb-2 group-hover:scale-110 transition-transform" }, "👥"),
              createVNode("span", { class: "text-sm font-bold text-gray-700" }, "Add Member")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-B30aO428.js.map
