import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { u as useMembers, a as useTubes } from "../server.mjs";
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
  __name: "members",
  __ssrInlineRender: true,
  setup(__props) {
    const { members } = useMembers();
    const { tubes } = useTubes();
    const newMemberName = ref("");
    const searchQuery = ref("");
    const expandedMemberId = ref(null);
    const filteredMembers = computed(() => {
      if (!searchQuery.value) return members.value;
      return members.value.filter((m) => m.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });
    const getMemberUnpaidRecords = (memberId) => {
      const records = [];
      tubes.value.forEach((tube) => {
        tube.shuttlecocks.forEach((s) => {
          s.players.forEach((p) => {
            if (p.memberId === memberId && !p.isPaid) {
              records.push({
                tubeId: tube.id,
                tubeNo: tube.tubeNo,
                shuttlecockId: s.id,
                shuttlecockNo: s.shuttlecockNo,
                playerId: p.id,
                fee: s.feePerPlayer
              });
            }
          });
        });
      });
      return records;
    };
    const getMemberOutstandingAmount = (memberId) => {
      let total = 0;
      tubes.value.forEach((tube) => {
        tube.shuttlecocks.forEach((s) => {
          s.players.forEach((p) => {
            if (p.memberId === memberId && !p.isPaid) {
              total += s.feePerPlayer;
            }
          });
        });
      });
      return total;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto" }, _attrs))}><div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"><div><h1 class="text-2xl font-bold text-gray-900">Member Management</h1><p class="text-gray-500">Manage your badminton group members.</p></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-1"><div class="bg-white border rounded-xl p-6 shadow-sm sticky top-24"><h2 class="text-lg font-bold text-gray-900 mb-4">Add New Member</h2><form class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input${ssrRenderAttr("value", unref(newMemberName))} type="text" placeholder="e.g. John Doe" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" required></div><button type="submit" class="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md active:scale-95"> Add Member </button></form></div></div><div class="lg:col-span-2"><div class="bg-white border rounded-xl shadow-sm overflow-hidden"><div class="p-4 border-b bg-gray-50"><div class="relative"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search members..." class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all bg-white"></div></div><div class="divide-y max-h-[600px] overflow-y-auto"><!--[-->`);
      ssrRenderList(unref(filteredMembers), (member) => {
        _push(`<div class="flex flex-col hover:bg-gray-50 transition-colors"><div class="p-4 flex items-center justify-between cursor-pointer"><div class="flex items-center space-x-4"><div class="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold uppercase">${ssrInterpolate(member.name.charAt(0))}</div><div><div class="flex items-center space-x-2"><p class="font-bold text-gray-900">${ssrInterpolate(member.name)}</p>`);
        if (getMemberOutstandingAmount(member.id) > 0) {
          _push(`<span class="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full"> Outstanding: ${ssrInterpolate(getMemberOutstandingAmount(member.id))} ฿ </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-[10px] text-gray-400 uppercase tracking-widest">Added ${ssrInterpolate(new Date(member.createdAt).toLocaleDateString())}</p></div></div><div class="flex items-center space-x-4"><span class="${ssrRenderClass(["transform transition-transform", unref(expandedMemberId) === member.id ? "rotate-180" : ""])}"> ↓ </span><button class="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete Member"> 🗑️ </button></div></div>`);
        if (unref(expandedMemberId) === member.id) {
          _push(`<div class="px-4 pb-4 bg-gray-50 border-t"><div class="pt-4"><h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Outstanding Payments</h3>`);
          if (getMemberUnpaidRecords(member.id).length > 0) {
            _push(`<div class="space-y-2"><!--[-->`);
            ssrRenderList(getMemberUnpaidRecords(member.id), (record) => {
              _push(`<div class="flex items-center justify-between bg-white p-3 rounded-lg border shadow-sm"><div class="flex items-center space-x-4"><div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500"> T${ssrInterpolate(record.tubeNo)}</div><div><p class="text-sm font-bold text-gray-700">Shuttlecock #${ssrInterpolate(record.shuttlecockNo)}</p><p class="text-[10px] text-gray-400">Amount: ${ssrInterpolate(record.fee)} ฿</p></div></div><button class="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-md hover:bg-green-600 hover:text-white transition-all shadow-sm border border-green-100"> Mark Paid </button></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<div class="py-4 text-center text-gray-500 italic text-sm"> No outstanding payments. All caught up! 🎉 </div>`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (unref(filteredMembers).length === 0) {
        _push(`<div class="p-12 text-center text-gray-500"><p class="text-4xl mb-4">👥</p>`);
        if (unref(searchQuery)) {
          _push(`<p>No members match your search.</p>`);
        } else {
          _push(`<p>No members added yet. Add your first member to get started!</p>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/members.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=members-1zBdRVto.js.map
