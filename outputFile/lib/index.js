var _vue = _interopRequireWildcard(require("vue"));

function _isSlot2(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_vue.isVNode(s);
}

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_vue.isVNode(s);
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) : typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BBUI = {}, global.vue));
})(this, function (exports, vue) {
  'use strict';

  var script$1 = vue.defineComponent({
    name: 'bb-button',
    inheritAttrs: false,
    props: {
      width: {
        type: Number,
        default: null
      }
    },
    setup: function setup(props) {
      var btnStyle = vue.computed(function () {
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

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_el_button = vue.resolveComponent("el-button");

    return vue.openBlock(), vue.createBlock(_component_el_button, vue.mergeProps({
      class: "bbui-button"
    }, _ctx.$attrs, {
      style: _ctx.btnStyle
    }), {
      default: vue.withCtx(function () {
        return [vue.renderSlot(_ctx.$slots, "default")];
      }),
      _: 3
      /* FORWARDED */

    }, 16
    /* FULL_PROPS */
    , ["style"]);
  }

  script$1.render = render$1;
  script$1.__file = "packages/bb-button/src/index.vue"; // @ts-ignore

  var install$3 = function install$3(app) {
    app.component(script$1.name, script$1);
  };

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
  var script = vue.defineComponent({
    name: 'bb-drawer-move',
    props: propsType,
    setup: function setup(props, context) {
      var visible = vue.ref(false);
      var drawerWidth = vue.ref(props.size); // 更改默认值

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

      var storageWidth = vue.ref(); // 获取宽度缓存

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

      vue.onMounted(function () {
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
    return vue.pushScopeId("data-v-435a0cfc"), n = n(), vue.popScopeId(), n;
  };

  var _hoisted_1 = /*#__PURE__*/_withScopeId(function () {
    return /*#__PURE__*/vue.createElementVNode("div", null, " . . . ", -1
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
    var _component_el_button = vue.resolveComponent("el-button");

    var _component_el_drawer = vue.resolveComponent("el-drawer");

    return vue.openBlock(), vue.createBlock(vue.Teleport, {
      to: "body"
    }, [vue.createVNode(_component_el_drawer, vue.mergeProps({
      modelValue: _ctx.visible,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
        return _ctx.visible = $event;
      })
    }, _ctx.initAttrs(), {
      size: _ctx.drawerWidth
    }), {
      default: vue.withCtx(function () {
        return [vue.createElementVNode("div", {
          class: "draw-bar",
          onMousedown: _cache[0] || (_cache[0] = function () {
            return _ctx.barMove && _ctx.barMove.apply(_ctx, arguments);
          })
        }, _hoisted_2, 32
        /* HYDRATE_EVENTS */
        ), vue.createVNode(_component_el_button, {
          class: "fix-drawer-focus"
        }), vue.createElementVNode("div", {
          "element-loading-text": _ctx.loading,
          "element-loading-spinner": "Loading",
          "element-loading-background": "rgba(0, 0, 0, 0.6)",
          class: "drawer-wrapper"
        }, [_ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, [vue.renderSlot(_ctx.$slots, "header")])) : vue.createCommentVNode("v-if", true), _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [vue.renderSlot(_ctx.$slots, "default")])) : vue.createCommentVNode("v-if", true), _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [vue.renderSlot(_ctx.$slots, "footer")])) : vue.createCommentVNode("v-if", true)], 8
        /* PROPS */
        , _hoisted_3), vue.createElementVNode("span", _hoisted_7, null, 512
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

  var css_248z$1 = ".fix-drawer-focus[data-v-435a0cfc]{border:none;height:0;margin:0;opacity:0;padding:0;position:absolute;width:0}.draw-bar[data-v-435a0cfc]{-ms-flex-align:center;align-items:center;cursor:col-resize;display:-ms-flexbox;display:flex;height:100vh;left:0;position:absolute;top:0;-webkit-transition-duration:.5s;-webkit-transition-property:background-color;-webkit-transition-timing-function:ease;width:5px;z-index:1500}.draw-bar div[data-v-435a0cfc]{color:#fff;line-height:10px}.draw-bar[data-v-435a0cfc]:hover{background:#1890ff}.draw-bar[data-v-435a0cfc]{background:#d4d4d4}.drawer-wrapper[data-v-435a0cfc]{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:100%}.drawer-wrapper .drawer-header[data-v-435a0cfc]{-ms-flex-align:center;align-items:center;border-bottom:1px solid #dcdfe6;box-sizing:border-box;display:-ms-flexbox;display:flex;font-size:18px;font-weight:500;-ms-flex-pack:justify;justify-content:space-between;min-height:65px;padding:15px 20px;width:100%}.drawer-wrapper .drawer-body[data-v-435a0cfc]{-ms-flex:1;flex:1;overflow-x:hidden;overflow-y:auto;padding:10px;width:100%}.drawer-wrapper .drawer-footer[data-v-435a0cfc]{-ms-flex-align:center;align-items:center;border-top:1px solid #dcdfe6;display:-ms-flexbox;display:flex;height:auto;-ms-flex-pack:center;justify-content:center;padding:15px 20px;width:100%}";
  styleInject(css_248z$1);
  script.render = render;
  script.__scopeId = "data-v-435a0cfc";
  script.__file = "packages/bb-drawer-move/src/index.vue"; // @ts-ignore

  var install$2 = function install$2(app) {
    app.component(script.name, script);
  };

  var BBResponsiveRow = vue.defineComponent({
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

        return _vue.createVNode(_vue.resolveComponent("el-row"), _vue.mergeProps({
          "gutter": 10
        }, props.row || {}), _isSlot2(_slot = childList.map(function (child) {
          var componentOptions = child.componentOptions;
          if ((componentOptions === null || componentOptions === void 0 ? void 0 : componentOptions.tag) === 'el-col') return child;
          return _vue.createVNode(_vue.resolveComponent("el-col"), genCol, _isSlot(child) ? child : {
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

  var install$1 = function install$1(app) {
    app.component(BBResponsiveRow.name, BBResponsiveRow);
  };

  var css_248z = ".bbui-textEllipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none!important}input[type=number]{-moz-appearance:textfield}::-webkit-scrollbar{height:8px;width:6px}::-webkit-scrollbar-thumb{background:#d8d8d8;border-radius:5px;box-shadow:inset 0 0 5px rgba(0,0,0,.2)}::-webkit-scrollbar-track{background:hsla(0,0%,98%,.9);border-radius:6px;box-shadow:inset 0 0 5px rgba(0,0,0,.2)}.ml-1{margin-left:1px}.mr-1{margin-right:1px}.mt-1{margin-top:1px}.mb-1{margin-bottom:1px}.pl-1{padding-left:1px}.pr-1{padding-right:1px}.pt-1{padding-top:1px}.pb-1{padding-bottom:1px}.ml-2{margin-left:2px}.mr-2{margin-right:2px}.mt-2{margin-top:2px}.mb-2{margin-bottom:2px}.pl-2{padding-left:2px}.pr-2{padding-right:2px}.pt-2{padding-top:2px}.pb-2{padding-bottom:2px}.ml-5{margin-left:5px}.mr-5{margin-right:5px}.mt-5{margin-top:5px}.mb-5{margin-bottom:5px}.pl-5{padding-left:5px}.pr-5{padding-right:5px}.pt-5{padding-top:5px}.pb-5{padding-bottom:5px}.ml-8{margin-left:8px}.mr-8{margin-right:8px}.mt-8{margin-top:8px}.mb-8{margin-bottom:8px}.pl-8{padding-left:8px}.pr-8{padding-right:8px}.pt-8{padding-top:8px}.pb-8{padding-bottom:8px}.ml-10{margin-left:10px}.mr-10{margin-right:10px}.mt-10{margin-top:10px}.mb-10{margin-bottom:10px}.pl-10{padding-left:10px}.pr-10{padding-right:10px}.pt-10{padding-top:10px}.pb-10{padding-bottom:10px}.ml-15{margin-left:15px}.mr-15{margin-right:15px}.mt-15{margin-top:15px}.mb-15{margin-bottom:15px}.pl-15{padding-left:15px}.pr-15{padding-right:15px}.pt-15{padding-top:15px}.pb-15{padding-bottom:15px}.ml-20{margin-left:20px}.mr-20{margin-right:20px}.mt-20{margin-top:20px}.mb-20{margin-bottom:20px}.pl-20{padding-left:20px}.pr-20{padding-right:20px}.pt-20{padding-top:20px}.pb-20{padding-bottom:20px}*{box-sizing:border-box;margin:0;padding:0}#app,body,html{height:100%;width:100%}#app{padding:.1px}.rel{position:relative}.flex{display:-ms-flexbox;display:flex}.flex-1{-ms-flex:1;flex:1}.flex-auto{-ms-flex:auto;flex:auto}.flex-inline{display:-ms-inline-flexbox;display:inline-flex}.flex-center-between{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.flex-center-center{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.bps-form-for-line-format-style{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start}.bps-form-for-line-format-style .el-form-item__content{display:-ms-flexbox;display:flex}.bps-form-for-line-format-style .form-inline-width-33{display:-ms-inline-flexbox;display:inline-flex;margin-right:1%;max-width:440px;width:32.33%}@media only screen and (max-width:1200px){.bps-form-for-line-format-style .form-inline-width-33{width:49%}}@media only screen and (max-width:830px){.bps-form-for-line-format-style .form-inline-width-33{width:45%}}@media only screen and (max-width:820px){.bps-form-for-line-format-style .form-inline-width-33{width:100%}}.order-radio-group-hidden-border .el-radio-button__inner{border-color:transparent!important;border:0;border-radius:4px}.cover-space-20{height:20px}.demo-block table{margin:auto}.demo-block td,.demo-block th{border:none;border-bottom:var(--el-table-border);border-right:var(--el-table-border)}.demo-block div[class*=language-].line-numbers-mode{padding-left:0}.el-date-picker tr{border-top:none}.el-date-picker td,.el-date-picker th{border:none}.el-date-picker td{width:42px}.el-date-picker tr:nth-child(2n){background-color:transparent}body a{color:#409eff;font-weight:500;text-decoration:none}.bbui-dialog .el-dialog__header{background:#f5f7fa;border-top-left-radius:4px;border-top-right-radius:4px;line-height:normal;padding-top:14px}.bbui-dialog .el-dialog__header .el-dialog__title{font-size:16px;font-weight:400}.bbui-dialog .el-dialog__body{padding:30px 40px}.bbui-dialog .el-dialog__footer{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-top:1px solid #eee;padding-bottom:6px;padding-top:6px;text-align:center}.bbui-dialog .el-dialog__footer .el-button+.el-button{margin-left:16px}.bbui-dialog .el-textarea__inner{border-radius:4px}.bbui-empty{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;padding:24px}.bbui-empty.center{bottom:0;left:0;position:absolute;right:0;top:0;z-index:1}.bbui-empty .bbui-empty-box{display:block;text-align:center}.bbui-empty .bbui-empty-img{display:block;margin:0 auto;width:90px}.bbui-empty .bbui-empty-text{color:rgba(0,0,0,.25);font-size:14px;margin-top:16px;text-align:center}";
  styleInject(css_248z);
  var components = {
    BBButton: install$3,
    BBDrawerMove: install$2,
    BBResponsiveRow: install$1
  };

  var install = function install(Vue) {
    if (install.installed) return;
    install.installed = true; // Object.keys(components).forEach((key) => Vue.use(components[key]));

    Object.keys(components).forEach(function (key) {
      return Vue.component(key, components[key]);
    });
  }; // Auto-install when vue is found (eg. in browser via <script> tag)


  if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
  }

  exports.BBButton = install$3;
  exports.BBDrawerMove = install$2;
  exports.BBResponsiveRow = install$1;
  exports["default"] = install;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
