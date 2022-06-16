function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { defineComponent, ref, onMounted, resolveComponent, openBlock, createBlock, Teleport, createVNode, mergeProps, withCtx, createElementVNode, createElementBlock, renderSlot, createCommentVNode, pushScopeId, popScopeId } from 'vue';
var propsType = {
  size: {
    type: Number,
    default: 600
  },
  // 缓存移动宽度
  cache: {
    type: String,
    default: "UNIVERSAL"
  },
  minSize: {
    type: Number,
    default: 400
  },
  loading: {
    type: Boolean,
    default: false
  }
};
var script = defineComponent({
  name: 'bb-drawer-move',
  props: propsType,
  setup: function setup(props, context) {
    var visible = ref(false);
    var drawerWidth = ref(props.size); // 更改默认值

    var initAttrs = function initAttrs() {
      var attrs = Object.assign({
        // 默认不显示 头部和关闭icon（不显示头部不显示titile）
        "show-close": false,
        "with-header": false
      }, context.attrs);
      return attrs;
    }; // 获取当前宽度


    var getCurrentWidth = function getCurrentWidth() {
      return drawerWidth.value;
    }; // 计算移动


    var barMove = function barMove() {
      var windowWidth = window.innerWidth;
      var bodyId = document.querySelector('body');

      bodyId.onmousemove = function (v) {
        v.preventDefault();
        var moveX = v.clientX;

        if (windowWidth - moveX < props.minSize || windowWidth - moveX > windowWidth - 200) {
          return;
        }

        drawerWidth.value = windowWidth - moveX;
      };

      bodyId.onmouseup = function () {
        bodyId.onmousemove = null;
      };

      bodyId.onmouseleave = function () {
        bodyId.onmousemove = null;
      };
    };

    var storageWidth = ref(); // 获取宽度缓存

    var getCache = function getCache() {
      if (!props.cache) return;
      var windowWidth = window.innerWidth;
      var drawerCache = window.localStorage.getItem("DRAWER_CACHE");
      var getDrawerCache = drawerCache ? JSON.parse(drawerCache)[props.cache] : {};

      if (getDrawerCache === null || getDrawerCache === void 0 ? void 0 : getDrawerCache.size) {
        var width = getDrawerCache.size > windowWidth - 200 ? windowWidth - 200 : getDrawerCache.size;
        drawerWidth.value = width;
        storageWidth.value = width;
      }
    }; // 设置缓存


    var setCache = function setCache() {
      if (drawerWidth.value === storageWidth.value) return;
      var drawerCache = window.localStorage.getItem("DRAWER_CACHE");
      var getDrawerCache = drawerCache ? JSON.parse(drawerCache) : {};
      var newCache = Object.assign(Object.assign({}, getDrawerCache), _defineProperty({}, props.cache, {
        size: drawerWidth.value
      }));
      window.localStorage.setItem("DRAWER_CACHE", JSON.stringify(newCache));
    };

    var open = function open() {
      getCache();
      visible.value = true;
    };

    var close = function close() {
      setCache();
      visible.value = false;
    };

    onMounted(function () {
      // 关闭浏览器
      window.addEventListener("beforeunload", function () {
        setCache();
      });
    });
    return {
      // arg
      visible: visible,
      drawerWidth: drawerWidth,
      // fn
      initAttrs: initAttrs,
      getCurrentWidth: getCurrentWidth,
      open: open,
      close: close,
      barMove: barMove,
      getCache: getCache,
      setCache: setCache
    };
  }
});

var _withScopeId = function _withScopeId(n) {
  return pushScopeId("data-v-435a0cfc"), n = n(), popScopeId(), n;
};

var _hoisted_1 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/createElementVNode("div", null, " . . . ", -1
  /* HOISTED */
  );
});

var _hoisted_2 = [_hoisted_1];
var _hoisted_3 = ["element-loading-text"];
var _hoisted_4 = {
  key: 0,
  class: "drawer-header"
};
var _hoisted_5 = {
  key: 1,
  class: "drawer-body"
};
var _hoisted_6 = {
  key: 2,
  class: "drawer-footer"
};
var _hoisted_7 = {
  ref: "focus"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_button = resolveComponent("el-button");

  var _component_el_drawer = resolveComponent("el-drawer");

  return openBlock(), createBlock(Teleport, {
    to: "body"
  }, [createVNode(_component_el_drawer, mergeProps({
    modelValue: _ctx.visible,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.visible = $event;
    })
  }, _ctx.initAttrs(), {
    size: _ctx.drawerWidth
  }), {
    default: withCtx(function () {
      return [createElementVNode("div", {
        class: "draw-bar",
        onMousedown: _cache[0] || (_cache[0] = function () {
          return _ctx.barMove && _ctx.barMove.apply(_ctx, arguments);
        })
      }, _hoisted_2, 32
      /* HYDRATE_EVENTS */
      ), createVNode(_component_el_button, {
        class: "fix-drawer-focus"
      }), createElementVNode("div", {
        "element-loading-text": _ctx.loading,
        "element-loading-spinner": "Loading",
        "element-loading-background": "rgba(0, 0, 0, 0.6)",
        class: "drawer-wrapper"
      }, [_ctx.$slots.header ? (openBlock(), createElementBlock("div", _hoisted_4, [renderSlot(_ctx.$slots, "header")])) : createCommentVNode("v-if", true), _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_5, [renderSlot(_ctx.$slots, "default")])) : createCommentVNode("v-if", true), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_6, [renderSlot(_ctx.$slots, "footer")])) : createCommentVNode("v-if", true)], 8
      /* PROPS */
      , _hoisted_3), createElementVNode("span", _hoisted_7, null, 512
      /* NEED_PATCH */
      )];
    }),
    _: 3
    /* FORWARDED */

  }, 16
  /* FULL_PROPS */
  , ["modelValue", "size"])]);
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".fix-drawer-focus[data-v-435a0cfc]{border:none;height:0;margin:0;opacity:0;padding:0;position:absolute;width:0}.draw-bar[data-v-435a0cfc]{-ms-flex-align:center;align-items:center;cursor:col-resize;display:-ms-flexbox;display:flex;height:100vh;left:0;position:absolute;top:0;-webkit-transition-duration:.5s;-webkit-transition-property:background-color;-webkit-transition-timing-function:ease;width:5px;z-index:1500}.draw-bar div[data-v-435a0cfc]{color:#fff;line-height:10px}.draw-bar[data-v-435a0cfc]:hover{background:#1890ff}.draw-bar[data-v-435a0cfc]{background:#d4d4d4}.drawer-wrapper[data-v-435a0cfc]{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:100%}.drawer-wrapper .drawer-header[data-v-435a0cfc]{-ms-flex-align:center;align-items:center;border-bottom:1px solid #dcdfe6;box-sizing:border-box;display:-ms-flexbox;display:flex;font-size:18px;font-weight:500;-ms-flex-pack:justify;justify-content:space-between;min-height:65px;padding:15px 20px;width:100%}.drawer-wrapper .drawer-body[data-v-435a0cfc]{-ms-flex:1;flex:1;overflow-x:hidden;overflow-y:auto;padding:10px;width:100%}.drawer-wrapper .drawer-footer[data-v-435a0cfc]{-ms-flex-align:center;align-items:center;border-top:1px solid #dcdfe6;display:-ms-flexbox;display:flex;height:auto;-ms-flex-pack:center;justify-content:center;padding:15px 20px;width:100%}";
styleInject(css_248z);
script.render = render;
script.__scopeId = "data-v-435a0cfc";
script.__file = "packages/bb-drawer-move/src/index.vue"; // @ts-ignore

var install = function install(app) {
  app.component(script.name, script);
};

export { install as default };
