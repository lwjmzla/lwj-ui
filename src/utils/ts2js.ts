import ts from 'typescript'

export const transpileModule = (input: any, options: { module?: any; target: any; noLib?: boolean; noResolve?: boolean; suppressOutputPathCheck?: boolean; jsx?: any; }) => {
  const inputFileName = options.jsx ? "module.tsx" : "module.ts";
  const sourceFile = ts.createSourceFile(inputFileName, input, options.target || ts.ScriptTarget.ES5);
  // Output
  let outputText;
  const program = ts.createProgram([inputFileName], options, {
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