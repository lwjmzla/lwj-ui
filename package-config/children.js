/* eslint-disable @typescript-eslint/no-var-requires */
// rollup.config.js
const path = require('path');
const { getPackages } = require('@lerna/project'); // !根据lerna项目的格式getPackages
const rollup = require('rollup');
const base = require('./rollup-config-base');
const fs = require("fs");
const ts = require('typescript');


function resolve(dir) {
  return path.join(__dirname, `../${dir}`);
}

const transpileModule = (input, options) => {
  const inputFileName = options.jsx ? "module.tsx" : "module.ts";
  const sourceFile = ts.createSourceFile(inputFileName, input, options.target || ts.ScriptTarget.ES5);
  // Output
  let outputText;
  const program = ts.createProgram([inputFileName], options, {
      getSourceFile: function (fileName) { return fileName.indexOf("module") === 0 ? sourceFile : undefined; },
      writeFile: function (_name, text) { outputText = text; },
      getDefaultLibFileName: function () { return "lib.d.ts"; },
      useCaseSensitiveFileNames: function () { return false; },
      getCanonicalFileName: function (fileName) { return fileName; },
      getCurrentDirectory: function () { return ""; },
      getNewLine: function () { return "\r\n"; },
      fileExists: function (fileName) { return fileName === inputFileName; },
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

const runBuild = async () => {
  let index = 0;
  const pkgs = await getPackages();
  //console.log(pkgs)
  //console.log(process.argv)
  //debugger
  const config = base.baseConfig({type: base.TYPE['分包']});
  const inputs = pkgs
    .map(pkg => pkg.name)
    .filter(name => name.includes('@bb-ui'))
    .slice(process.argv[2], process.argv[3]); // !得到['@bb-ui/bb-button','@bb-ui/bb-drawer-move','@bb-ui/bb-responsive-row']

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  build(inputs[index]);

  async function buildIndex() {
    //let fileCont = await fs.promises.readFile(path.resolve( 'packages/index.ts'), 'utf-8'); // !可以更换个方式
    let fileCont = fs.readFileSync(path.resolve( 'packages/index.ts')).toString()
    console.log(fileCont)

    // to css
    fileCont =  fileCont.replace("scss", "css");

    // to js
    const jsCode = transpileModule(fileCont,  {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES5,
      noLib: true,
      noResolve: true,
      suppressOutputPathCheck: true
    })
    const fileName = path.resolve( 'outputFile/lib-sub/index.js');
    //console.log(fileName)
    //console.log(jsCode)
    //await fs.promises.writeFile(fileName, jsCode, {encoding: 'utf-8', flag: 'w'});
    fs.writeFileSync(fileName, jsCode);
    console.log('all done');
  }

  async function build(name) {
    try {
      if (!name) return;
      name = name.split('@bb-ui/')[1]
      const inputOptions = {
        ...config,
        input: resolve(`packages/${name}/index.ts`)
      };
      const getOutFile = () => {
        return `outputFile/lib-sub/${name}/index.js`;
      };
      const outOptions = {
        format: 'es',
        file: getOutFile(),
        // paths(id) {
        //   if (/^@bb-ui/.test(id)) {
        //     return id.replace('@bb-ui', '..');
        //   }
        // }
      };

        const bundle = await rollup.rollup(inputOptions); // !主要
        console.log(name, 'done');
        await bundle.write(outOptions); // !主要
        index++;
        if (index < inputs.length) {
          await build(inputs[index]);
        } else {
          await buildIndex()
        }
    } catch(e) {
      console.log(e);
    }
  }
};

runBuild();
