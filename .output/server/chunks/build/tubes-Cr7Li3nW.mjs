import { defineComponent, mergeProps, unref, ref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { a as useTubes, u as useMembers } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@vue/shared';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MemberSelect",
  __ssrInlineRender: true,
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const { members } = useMembers();
    const showAddForm = ref(false);
    const newMemberName = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative group" }, _attrs))}>`);
      if (!unref(showAddForm)) {
        _push(`<div class="space-y-2"><div class="max-h-48 overflow-y-auto border rounded-md divide-y bg-white"><!--[-->`);
        ssrRenderList(unref(members), (member) => {
          _push(`<button class="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm">${ssrInterpolate(member.name)}</button>`);
        });
        _push(`<!--]-->`);
        if (unref(members).length === 0) {
          _push(`<div class="px-4 py-2 text-sm text-gray-500 italic"> No members found. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button class="w-full text-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 rounded-md transition-colors"> + Add New Member </button></div>`);
      } else {
        _push(`<div class="space-y-2 p-2 border rounded-md bg-white shadow-sm"><input${ssrRenderAttr("value", unref(newMemberName))} type="text" placeholder="Enter name..." class="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"><div class="flex space-x-2"><button class="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"> Add &amp; Select </button><button class="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded hover:bg-gray-200"> Cancel </button></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MemberSelect.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ShuttlecockCard",
  __ssrInlineRender: true,
  props: {
    tube: {},
    shuttlecock: {}
  },
  setup(__props) {
    const props = __props;
    const { addPlayerToShuttlecock } = useTubes();
    const showPlayerSelect = ref(false);
    const editingFee = ref(false);
    const localFee = ref(props.shuttlecock.feePerPlayer);
    const handleAddPlayer = (member) => {
      addPlayerToShuttlecock(props.tube.id, props.shuttlecock.id, member.id, member.name);
      showPlayerSelect.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MemberSelect = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow" }, _attrs))}><div class="flex justify-between items-start mb-4"><div><h3 class="font-bold text-gray-700">Shuttlecock #${ssrInterpolate(__props.shuttlecock.shuttlecockNo)}</h3><span class="${ssrRenderClass([
        "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full",
        __props.shuttlecock.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
      ])}">${ssrInterpolate(__props.shuttlecock.status)}</span></div><div class="text-right">`);
      if (!unref(editingFee)) {
        _push(`<div class="cursor-pointer group"><span class="text-sm font-semibold text-gray-900">${ssrInterpolate(__props.shuttlecock.feePerPlayer)} \u0E3F</span><span class="text-[10px] block text-gray-400 group-hover:text-indigo-600 italic">Edit Fee</span></div>`);
      } else {
        _push(`<div class="flex items-center space-x-1"><input${ssrRenderAttr("value", unref(localFee))} type="number" class="w-16 px-1 py-0.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"><button class="text-indigo-600 hover:text-indigo-800"><span class="text-xs font-bold">\u2713</span></button></div>`);
      }
      _push(`</div></div><div class="space-y-2 mb-4"><!--[-->`);
      ssrRenderList(__props.shuttlecock.players, (player) => {
        _push(`<div class="flex items-center justify-between bg-gray-50 p-2 rounded text-sm"><div class="flex items-center space-x-2"><button class="${ssrRenderClass([
          "w-5 h-5 rounded flex items-center justify-center border transition-colors",
          player.isPaid ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-300 text-transparent"
        ])}"><span class="text-[10px]">\u2713</span></button><span class="${ssrRenderClass({ "line-through text-gray-400": player.isPaid, "text-gray-700 font-medium": !player.isPaid })}">${ssrInterpolate(player.memberName)}</span></div><button class="text-gray-400 hover:text-red-500 transition-colors"><span class="text-lg leading-none">\xD7</span></button></div>`);
      });
      _push(`<!--]-->`);
      if (__props.shuttlecock.players.length < 4) {
        _push(`<div>`);
        if (!unref(showPlayerSelect)) {
          _push(`<button class="w-full py-2 border-2 border-dashed border-gray-200 rounded text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-all text-xs font-medium"> + Add Player (${ssrInterpolate(__props.shuttlecock.players.length)}/4) </button>`);
        } else {
          _push(`<div class="mt-2"><div class="flex justify-between items-center mb-1"><span class="text-[10px] font-bold text-gray-400 uppercase">Select Member</span><button class="text-[10px] text-gray-400 hover:text-gray-600">Cancel</button></div>`);
          _push(ssrRenderComponent(_component_MemberSelect, { onSelect: handleAddPlayer }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="text-center py-2 bg-gray-100 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest"> Full (4/4) </div>`);
      }
      _push(`</div><div class="pt-3 border-t flex justify-between items-center"><span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expected</span><span class="text-sm font-bold text-gray-900">${ssrInterpolate(__props.shuttlecock.players.length * __props.shuttlecock.feePerPlayer)} \u0E3F</span></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ShuttlecockCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TubeCard",
  __ssrInlineRender: true,
  props: {
    tube: {}
  },
  setup(__props) {
    const props = __props;
    useTubes();
    const isExpanded = ref(false);
    const filterStatus = ref("All");
    const filteredShuttlecocks = computed(() => {
      if (filterStatus.value === "All") return props.tube.shuttlecocks;
      return props.tube.shuttlecocks.filter((s) => s.status === filterStatus.value);
    });
    const completedCount = computed(() => props.tube.shuttlecocks.filter((s) => s.status === "Completed").length);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ShuttlecockCard = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white border rounded-xl shadow-sm overflow-hidden" }, _attrs))}><div class="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"><div class="flex items-center space-x-4 mb-4 md:mb-0"><div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">${ssrInterpolate(__props.tube.tubeNo)}</div><div><h2 class="text-lg font-bold text-gray-900">Tube #${ssrInterpolate(__props.tube.tubeNo)}</h2><p class="text-sm text-gray-500">Created: ${ssrInterpolate(new Date(__props.tube.createdAt).toLocaleDateString())}</p></div></div><div class="flex items-center space-x-6"><div class="text-center"><p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</p><p class="text-lg font-bold text-gray-900">${ssrInterpolate(unref(completedCount))} / 12</p></div><div class="h-8 w-px bg-gray-200"></div><button class="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete Tube"> \u{1F5D1}\uFE0F </button><span class="${ssrRenderClass(["transform transition-transform text-xl", unref(isExpanded) ? "rotate-180" : ""])}"> \u2193 </span></div></div>`);
      if (unref(isExpanded)) {
        _push(`<div class="border-t bg-gray-50 p-4 md:p-6"><div class="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0"><div class="flex space-x-2"><!--[-->`);
        ssrRenderList(["All", "Pending", "Completed"], (status) => {
          _push(`<button class="${ssrRenderClass([
            "px-3 py-1.5 rounded-md text-xs font-bold transition-all",
            unref(filterStatus) === status ? "bg-indigo-600 text-white shadow-md" : "bg-white text-gray-600 border hover:bg-gray-50"
          ])}">${ssrInterpolate(status)}</button>`);
        });
        _push(`<!--]--></div><p class="text-xs text-gray-500 font-medium"> Showing ${ssrInterpolate(unref(filteredShuttlecocks).length)} shuttlecocks </p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"><!--[-->`);
        ssrRenderList(unref(filteredShuttlecocks), (shuttlecock) => {
          _push(ssrRenderComponent(_component_ShuttlecockCard, {
            key: shuttlecock.id,
            tube: __props.tube,
            shuttlecock
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TubeCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tubes",
  __ssrInlineRender: true,
  setup(__props) {
    const { tubes } = useTubes();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TubeCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto" }, _attrs))}><div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"><div><h1 class="text-2xl font-bold text-gray-900">Shuttlecock Tubes</h1><p class="text-gray-500">Manage tubes and track shuttlecock usage.</p></div><button class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"><span>+ Add New Tube</span></button></div><div class="space-y-6"><!--[-->`);
      ssrRenderList([...unref(tubes)].reverse(), (tube) => {
        _push(ssrRenderComponent(_component_TubeCard, {
          key: tube.id,
          tube
        }, null, _parent));
      });
      _push(`<!--]-->`);
      if (unref(tubes).length === 0) {
        _push(`<div class="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center"><div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"><span class="text-4xl text-gray-400">\u{1F3F8}</span></div><h2 class="text-xl font-bold text-gray-900 mb-2">No tubes created yet</h2><p class="text-gray-500 mb-8 max-w-sm mx-auto">Create your first shuttlecock tube to start tracking usage and collecting fees.</p><button class="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"> Create First Tube </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tubes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tubes-Cr7Li3nW.mjs.map
