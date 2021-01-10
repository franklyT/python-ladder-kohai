// noinspection PointlessBooleanExpressionJS
class PythonEditor extends KJSComponent {
  constructor() {
    super();

    this.writeComponent();

    enableBootstrapPopovers();
    this.initSkulpt();
  }

  styles = {
    container: `display: block;`,

    submitButton: 
      `margin-top: 1em !important; 
       font-family: monospace; 
       font-size: 0.9em; 
       font-weight: 700; 
       border-radius: 0.2em !important; 
       margin-bottom: 1.2em;`,
  };

  initSkulpt() {
    let editor: any, globalOutput: any, globalInput: any;

    function outf(text: String) {
      let mypre: HTMLElement | null = document.getElementById(globalOutput);

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

    (window as any).runIt = function (
      codeID: string = "yourcode",
      outputID: string = "output",
      testing: boolean = false
    ) {
      // @ts-ignore
      let prog: HTMLInputElement = document.getElementById(codeID)!.value,
        mypre: HTMLElement | null = document.getElementById(outputID);

      globalOutput = outputID;

      // noinspection PointlessBooleanExpressionJS
      testing === false
        ? (globalInput = editor.getValue())
        : (globalInput =
            editor.getValue() +
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
        return Sk.importMainWithBody("<stdin>", false, globalInput, true);
      });

      myPromise.then(
        function (mod: any) {
          // console.log('success');
        },
        function (err: any) {
          outf(err.toString());
        }
      );
    };

    function addRunShortCuts() {
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
    }

    window.onload = function () {
      editor = CodeMirror.fromTextArea(document.getElementById("yourcode"), {
        mode: {
          mode: "python",
          name: "python",
          version: 2,
          singleLineStringErrors: false,
        },
        lineNumbers: true,
        indentUnit: 4,
      });

      addRunShortCuts();
    };
  }

  get html() {
    return /*html*/ `
        <div class="container">
        <div class="row">
          <div class="col">
                <textarea id="yourcode"># Your code goes under this line&#10;&#10;</textarea>
                <div class="align-items-end d-flex">
                  <button class="${this.styles.submitButton} btn btn-primary ml-auto" id="runShellButton" type="button" onclick="runIt()"
                  data-trigger="hover" data-toggle="popover" data-content="Shift+Enter inside code editor"
                  >
                  run_code()
                  </button>       
               </div>
          </div>
          <div class="col">
            <pre id="output" style="min-height: 30vh;"></pre>
          </div>
        </div>
      </div>
      <div id="mycanvas"></div>
      `;
  }
}
