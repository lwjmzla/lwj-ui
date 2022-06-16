import { defineComponent, computed, resolveComponent, openBlock, createBlock, mergeProps, withCtx, renderSlot } from 'vue';
var script = defineComponent({
  name: 'bb-button',
  inheritAttrs: false,
  props: {
    width: {
      type: Number,
      default: null
    }
  },
  setup: function setup(props) {
    var btnStyle = computed(function () {
      var ret = {};

      if (props.width) {
        ret['width'] = setToPx(props.width);
      }

      return ret;
    });

    var setToPx = function setToPx(value) {
      return value + 'px';
    };

    return {
      btnStyle: btnStyle,
      setToPx: setToPx
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_button = resolveComponent("el-button");

  return openBlock(), createBlock(_component_el_button, mergeProps({
    class: "bbui-button"
  }, _ctx.$attrs, {
    style: _ctx.btnStyle
  }), {
    default: withCtx(function () {
      return [renderSlot(_ctx.$slots, "default")];
    }),
    _: 3
    /* FORWARDED */

  }, 16
  /* FULL_PROPS */
  , ["style"]);
}

script.render = render;
script.__file = "packages/bb-button/src/index.vue"; // @ts-ignore

var install = function install(app) {
  app.component(script.name, script);
};

export { install as default };
