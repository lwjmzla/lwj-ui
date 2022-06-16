<template>
  <div class="in-coder-panel">
    <textarea style="height: 100% !important;" ref="textarea" v-model="code"></textarea>
  </div>
</template>

<script lang="ts">

import {reactive, defineComponent, toRefs, getCurrentInstance, onMounted, onBeforeUnmount, ref, nextTick} from 'vue'
// 引入全局实例

const codemirrorThemList = [
    "3024-day",
    "3024-night",
    "abbott",
    "abcdef",
    "ambiance-mobile",
    "ambiance",
    "ayu-dark",
    "ayu-mirage",
    "base16-dark",
    "base16-light",
    "bespin",
    "blackboard",
    "cobalt",
    "colorforth",
    "darcula",
    "dracula",
    "duotone-dark",
    "duotone-light",
    "eclipse",
    "elegant",
    "erlang-dark",
    "gruvbox-dark",
    "hopscotch",
    "icecoder",
    "idea",
    "isotope",
    "juejin",
    "lesser-dark",
    "liquibyte",
    "lucario",
    "material-darker",
    "material-ocean",
    "material-palenight",
    "material",
    "mbo",
    "mdn-like",
    "midnight",
    "monokai",
    "moxer",
    "neat",
    "neo",
    "night",
    "nord",
    "oceanic-next",
    "panda-syntax",
    "paraiso-dark",
    "paraiso-light",
    "pastel-on-dark",
    "railscasts",
    "rubyblue",
    "seti",
    "shadowfox",
    "solarized",
    "ssms",
    "the-matrix",
    "tomorrow-night-bright",
    "tomorrow-night-eighties",
    "ttcn",
    "twilight",
    "vibrant-ink",
    "xq-dark",
    "xq-light",
    "yeti",
    "yonce",
    "zenburn"
]

let coder: { setSize: (arg0: string, arg1: string) => void; on: (arg0: string, arg1: (coder: any) => void) => void; off: (arg0: string) => void } | null = null // 编辑器实例

export default defineComponent({
  name: 'codeEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    heightSize: {
      type: Number,
    },
    scene: {
      type: String,
      default: 'look' // add: 新增； edit: 编辑； look: 查看
    },
    eventType: {
      type: String,
      default: 'blur' // 可用事件'change', 'blur'等等；具体参考codemirror文档
    },
    theme: {
      type: String,
      default: 'monokai' // 编辑器主题色
    }
  },
  setup(props, {emit}) {
    const {proxy} = getCurrentInstance() as any
    const CodeMirror = ref()
    const data = reactive({
      code: props.value, // 内部真实的内容
      // 默认配置
      options: {
        mode: 'text/x-vue', // 不设置的话，默认使用第一个引用
        // 缩进格式
        tabSize: 2,
        // 主题，对应主题库 JS 需要提前引入
        theme: props.theme,
        // 显示行号
        lineNumbers: true,
        readOnly: (props.scene === 'add' || props.scene === 'edit') ? false : 'nocursor', // true: 不可编辑  false: 可编辑 'nocursor' 失焦,不可编辑
        indentWithTabs: true,
        smartIndent: true,
        styleActiveLine: true,
        matchBrackets: true,
        autoCloseBrackets: true
      },
      // 初始化
       initialize: async () => {
        await nextTick()
        // 尝试获取全局实例
        if  ( typeof  navigator  !==  'undefined' )  { 
          // @ts-ignore
           const _CodeMirror = await import("codemirror/lib/codemirror")
           CodeMirror.value = (window as any).CodeMirror || _CodeMirror
           // @ts-ignore
            await import("codemirror/mode/javascript/javascript"); // 这js模式必须引入的
            // @ts-ignore
            await import("codemirror/addon/selection/active-line"); //光标行背景高亮，配置里面也需要styleActiveLine设置为true
            // @ts-ignore
            await import("codemirror/mode/vue/vue.js"); // 代码风格
            // @ts-ignore
            await import("codemirror/addon/edit/closebrackets");
            // @ts-ignore
            await import("codemirror/addon/edit/matchbrackets");
            // @ts-ignore
            await import("codemirror/keymap/sublime"); //sublime编辑器效果
            // @ts-ignore
            await import("codemirror/lib/codemirror.css"); // 核心样式
            // @ts-ignore
            await import("codemirror/theme/monokai.css"); //编辑器主题样式，配置里面theme需要设置monokai
            // @ts-ignore
            await import("codemirror/mode/css/css");
        }
        // if(!CodeMirror.value) return

        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        coder = CodeMirror.value.fromTextArea(proxy.$refs.textarea, data.options)
        const propsH = props?.heightSize + 'px'
        const autoH = '80vh'
        const h = props?.heightSize ? propsH : autoH
        coder?.setSize('auto', h)
        // 此处也可使用'change'事件，不过每次书写的过程中都会触发，为了提高性能，故默认使用'blur'
        coder?.on(props.eventType, (coder: { getValue: () => any }) => {
          emit('update:value', coder.getValue())
        })
      },
      // 动态引入语法高亮库
      importThemDynamic: () => {
        return new Promise<void>(resolve => {
          codemirrorThemList.forEach(value => {
            if (props.theme === value) {
              // import(`codemirror/theme/${props.theme}.css`)
              resolve()
            }
          })
        })
      }
    })
    onMounted(() => {
      // console.log('value:', props.value)
      data.importThemDynamic().then(() => {
        data.initialize()
      })
    })
    onBeforeUnmount(() => {
      coder?.off(props.eventType)
    })
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style>
.in-coder-panel {
  flex-grow: 1;
  display: flex;
  position: relative;
}

.in-coder-panel .CodeMirror {
  flex-grow: 1;
  text-align: left !important;
  z-index: 1;
}

.in-coder-panel .CodeMirror .CodeMirror-code {
  line-height: 20px;
}
</style>