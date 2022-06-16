import { mergeProps as _mergeProps, createVNode as _createVNode, isVNode as _isVNode, resolveComponent as _resolveComponent } from "vue";
import { defineComponent } from 'vue';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var BBResponsiveRow = defineComponent({
  name: 'bb-responsive-row',
  props: {
    row: {
      type: Object
    },
    col: {
      type: Object
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var childList = slots.default && slots.default() || []; // 处理默认参数

    var defaultColProps = {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 6
    }; // @ts-ignore

    var genCol = Object.assign({}, props.col || defaultColProps);
    return function () {
      var _slot;

      return _createVNode(_resolveComponent("el-row"), _mergeProps({
        "gutter": 10
      }, props.row || {}), _isSlot(_slot = childList.map(function (child) {
        var componentOptions = child.componentOptions;
        if ((componentOptions === null || componentOptions === void 0 ? void 0 : componentOptions.tag) === 'el-col') return child;
        return _createVNode(_resolveComponent("el-col"), genCol, _isSlot(child) ? child : {
          default: function _default() {
            return [child];
          }
        });
      })) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      });
    };
  }
}); // @ts-ignore

var install = function install(app) {
  app.component(BBResponsiveRow.name, BBResponsiveRow);
};

export { install as default };
