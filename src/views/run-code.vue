<template>
  <div id="test">
    <el-row style="padding: 20px;" align="middle">
      <el-col :span="10">
        <el-button
          type="primary"
          @click="handleRun"
        >运行代码片段</el-button>
      </el-col>
      <el-col :span="14">
        运行结果
      </el-col>
    </el-row>
    <div class="preview-panel">
      <div v-if="codeSource" class="preview-source">
        <CodeMirror 
          v-model:value="codeSource"
          scene="add"
        />
      </div>
      <div class="preview-code">
        <component :is="is" />
      </div> 
    </div>
  </div>
</template>

<script lang="ts">
import  * as _defaultvue from 'vue';
// @ts-ignore
import { defineComponent, ref, shallowRef, onMounted} from "vue/dist/vue.esm-bundler";
import CodeMirror from '../components/codemirror/index.vue'
import { local } from "../utils/storage";
//import ts from "../utils/typescriptService.js"
import ts from 'typescript'
import scss2css from 'scss-to-css'
import { ElMessageBox } from 'element-plus'

// 基础例子
const defaultCode = `
<template>
  <div>
    <el-alert type="success" :closable="false">
      欢迎使用 bb-ui 当前版本为  {{test}}
    </el-alert>
    <el-input  v-model="test" />
    <bb-column-switch
      name="TEST_TABLE"
      v-model:columns="tableColumns"
    ></bb-column-switch>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
			const test = ref(1)
			return {
				test,
        tableColumns: {
          '测试': true
        },
			}
    }
  })
\<\/script>

<style>
.text{

}
</style>`.trim();


export default defineComponent({
  name: "CodePreview",
  components: {CodeMirror},
  setup() {
    const codeSource = ref();
    const is = shallowRef();

    // 将 css 代码块包裹
    const scopedCss = (cssContent: string, wrapper: string) => {
      const reg = /([\s\S]*?)\{([\s\S]*?)\}/gu;
      let scopedHtml = '';
      let result;
      while ((result = reg.exec(cssContent))) {
        const [, selectors, definition] = result;
        scopedHtml += `${selectors
          .replace(/\n/g, '')
          .split(',')
          .map(selector => `.${wrapper} ${selector}`)
          .join(',')}{${definition}}`;
      }
      return scopedHtml;
    }

    
    const stripTemplate = (content: string) => {
      const result = content.match(/<(template)\s*>([\s\S]+)<\/\1>/);
      return result && result[2] ? result[2].trim() : '';
    }


    const stripDefault = (content: string) => {
      const result = content.match(/(export default defineComponent|export default)([\s\S]+)<\/script>/);
      return result && result[2] ? result[2].trim() : '';
    }

    const stripStyle = (content: string) => {
      const result = content.match(/<(style)[^>]*>([\s\S]+)<\/\1>/);

      return result && result[2] ? result[2].trim() : '';
    }

    const transpileModule = (input: any, options: { module?: any; target: any; noLib?: boolean; noResolve?: boolean; suppressOutputPathCheck?: boolean; jsx?: any; }) => {
      var inputFileName = options.jsx ? "module.tsx" : "module.ts";
      var sourceFile = ts.createSourceFile(inputFileName, input, options.target || ts.ScriptTarget.ES5);
      // Output
      var outputText;
      var program = ts.createProgram([inputFileName], options, {
          getSourceFile: function (fileName: string | string[]) { return fileName.indexOf("module") === 0 ? sourceFile : undefined; },
          writeFile: function (_name: any, text: any) { outputText = text; },
          getDefaultLibFileName: function () { return "lib.d.ts"; },
          useCaseSensitiveFileNames: function () { return false; },
          getCanonicalFileName: function (fileName: any) { return fileName; },
          getCurrentDirectory: function () { return ""; },
          getNewLine: function () { return "\r\n"; },
          fileExists: function (fileName: string) { return fileName === inputFileName; },
          readFile: function () { return ""; },
          directoryExists: function () { return true; },
          getDirectories: function () { return []; }
      });
      // Emit
      program.emit();
      if (outputText === undefined) {
          throw new Error("Output generation failed");
      }
      return outputText;
    }

    const renderCode = async ({ script, html }: any) => {
      const parameterStr = '{defineComponent, ref, shallowRef, onMounted, reactive, ElMessageBox}'

      let jsCode = transpileModule(script,  {
                          module: ts.ModuleKind.AMD,
                          target: ts.ScriptTarget.ES5,
                          noLib: true,
                          noResolve: true,
                          suppressOutputPathCheck: true
                      }) as string
      // !兼容Options API
      jsCode = jsCode.replace(/;/g, '')
      const renderComponent = {
        ...new Function(parameterStr, `return ${JSON.parse(JSON.stringify(jsCode))}`)({..._defaultvue, ElMessageBox}),
        template: `<div id="previewApp">${html}</div>`,
      }
      is.value = renderComponent;
      console.log(renderComponent);
      
    }

    const insertCss = ({ style }: any) => {
      let css = document.querySelector("#preview-style");
      if (!css) {
        css = document.createElement("style");
        css.setAttribute("id", "preview-style");
        css.setAttribute("type", "text/css");
      }
      css.innerHTML = scopedCss(scss2css(style), "preview-code");
      document.head.appendChild(css);
    }

    const handleRun = () => {
      	// eslint-disable-next-line @typescript-eslint/no-var-requires
      const nv = codeSource.value
      const html = stripTemplate(nv);
      const script = stripDefault(nv);
      const style = stripStyle(nv);
      renderCode({ script, html });
      insertCss({ style });
    }

    onMounted(() => {
      const source = local.get("preview-source") || defaultCode;
      codeSource.value = source;
    })

    return {
      codeSource,
      is,
      handleRun,
    };
  },
});
</script>

<style lang="scss" scoped>
.preview-block {
  display: flex;
  flex-direction: column;
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.3s;
  height: calc(100vh - 60px);
  overflow: hidden;
}
.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #ffffff;
}
.preview-panel {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: 100%;
}
.preview-source {
  display: block;
  width: 40%;
  background-color: #f3f4f5;
  overflow: auto;
}
.preview-code {
  display: block;
  width: 60%;
  height: 80vh;
  padding: 24px;
  overflow: auto;
  border: 1px solid rgb(119, 155, 233);
  
}
</style>
