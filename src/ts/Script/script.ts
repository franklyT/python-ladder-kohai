(function enableBootstrapPopovers() {
  // @ts-ignore
  $('[data-toggle="popover"]').popover({ delay: { show: 500, hide: 100 } });
})();

function selfDestruct() {
  document.currentScript!.remove();
}

function shorthandTags(str: string) {
  const BLOCK_TEMPLATES = {
    "<s": "<span",
    "s>": "span>",
    "<d": "<div",
    "d>": "div>",
  };

  const MOD_TEMPLATES = {
    "c|": "class",
    "h|": "href",
    "oc|": "onclick",
  };

  _(BLOCK_TEMPLATES).each((blockVal, blockKey) => {
    if (str.indexOf(blockKey) !== -1) str = str.split(blockKey).join(blockVal);
  });

  _(MOD_TEMPLATES).each((modVal, modKey) => {
    if (str.indexOf(modKey) !== -1) str = str.split(modKey).join(`${modVal}=`);
  });

  return str;
}

/* SKULPT */
let skulptEditor: any;
let skulptGlobalOutput: string;
let skulptGlobalInput: string;

function outf(text: String) {
  let mypre: HTMLElement | null = document.getElementById(skulptGlobalOutput);

  mypre!.innerHTML = mypre!.innerHTML + text;
}

function builtinRead(x: string) {
  if (
    Sk.builtinFiles === undefined ||
    Sk.builtinFiles["files"][x] === undefined
  )
    throw "File not found: '" + x + "'";

  return Sk.builtinFiles["files"][x];
}

function runIt(
  codeID: string = "yourcode",
  outputID: string = "output",
  testing: boolean = false
) {
  let prog: string = (document.getElementById(codeID) as HTMLInputElement)
    .value;
  let mypre: HTMLElement | null = document.getElementById(outputID);

  skulptGlobalOutput = outputID;

  testing === false
    ? (skulptGlobalInput = skulptEditor.getValue())
    : (skulptGlobalInput =
        skulptEditor.getValue() +
        "\n" +
        (document.getElementById("test-holder") as HTMLInputElement).value);

  mypre!.innerHTML = "";
  Sk.pre = outputID;
  Sk.configure({
    __future__: Sk.python3,
    inputfun: function (prompt: any) {
      return window.prompt(prompt);
    },
    inputfunTakesPrompt: true,
    output: outf,
    read: builtinRead,
  });
  (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = "mycanvas";

  let myPromise = Sk.misceval.asyncToPromise(() => {
    return Sk.importMainWithBody("<stdin>", false, skulptGlobalInput, true);
  });

  myPromise.then(
    function (mod: any) {
      // console.log('success');
    },
    function (err: any) {
      outf(err.toString());
    }
  );
}

window.addEventListener("load", function () {
  skulptEditor = CodeMirror.fromTextArea(
    <HTMLTextAreaElement>document.getElementById("yourcode"),
    {
      mode: {
        mode: "python",
        name: "python",
        version: 2,
        singleLineStringErrors: false,
      },
      lineNumbers: true,
      indentUnit: 4,
    }
  );
});

(function addRunShortCuts() {
  document
    .querySelectorAll(".CodeMirror")[0]
    .addEventListener("keydown", (evt) => {
      if (
        (evt as KeyboardEvent).key == "Enter" &&
        (evt as KeyboardEvent).shiftKey
      ) {
        evt.preventDefault();
        (document.querySelector("#runShellButton") as HTMLElement).click();
      }
    });

  document.body.addEventListener("keydown", (evt) => {
    if (
      (evt as KeyboardEvent).key == "Enter" &&
      (evt as KeyboardEvent).shiftKey &&
      (evt.target as any).type !== "textarea"
    ) {
      evt.preventDefault();
      (document.querySelector("#runTestsButton") as HTMLElement).click();
    }
  });
})();

/* SKULPT END */
