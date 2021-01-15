class TestCases extends KJSComponent {
  cases: any;

  constructor({ cases }: { cases: String }) {
    super();
    
    this.cases = cases;

    this.writeComponent();

    this.parse(this.cases, "test-yourcode");
    enableBootstrapPopovers();
    this.styleCode();
  }

  styles = {
    container: `margin-bottom: 2em;`,

    submitButton: 
      `font-family: monospace; 
       font-size: 1.1em; 
       font-weight: 700; 
       border-radius: 0.2em !important; 
       margin-top: 0.5em;`,

    testCasesHeader: `margin-top: 0em !important;`,

    testOutput: `font-size: 0.7rem;`,

    testYourCode: `margin-bottom: 1em;`,
  };

  parse(cases: Record<string, any>, appendID: any) {
    _.each(cases, (value: any, key: any) => {
      (document.getElementById("test-holder") as HTMLInputElement).value +=
      value.case + "\n";
    document.getElementById("test-holder")!.innerHTML +=
      value.case + "\n";

    // @ts-ignore
    this[key] = value.testCases;
    let appendTestCase = document.createElement("p");
    appendTestCase.innerHTML =
      value.case + " -> " + value.expectedReturn + "\n";

    document.getElementById(appendID)!.appendChild(appendTestCase);
    })
  }

  styleCode() {
    _.each(document.querySelectorAll(".code"), (elm: any) => {
      let code = elm.textContent.trim();
      elm.innerHTML = "";

      let myCodeMirror = CodeMirror(elm, {
        value: code,
        mode: "python",
        readOnly: true
      });

      myCodeMirror.setSize("100%", "auto");
    });
  

  (window as any).testIt = () => {
    // this passed with fat arrow
    let hasRightAnswers = _.every(this.cases, (separateCase: any) => {
      return String(document.getElementById("test-output")!.innerHTML).includes(
        separateCase.expectedReturn
      );
    });

    if (
      hasRightAnswers &&
      !document.getElementById("test-output")!.innerHTML.includes("Error")
    ) {
      console.log("You did it!");
    } else {
      console.log("nooooo!");
    }

    return;
  };
}

  get html() {
    return /*html*/ `
        <div class="container ${this.styles.container}">
        <h1 class=${this.styles.testCasesHeader}>TEST CASES</h1>
        <div class="row d-flex">
          <div class="col-md-6">
            <div id="test-yourcode" class="code ${this.styles.testYourCode}"> </div>
            <textarea id="test-holder" style="display: none;"></textarea>
            <div class="d-flex">
              <button id="runTestsButton" class="${this.styles.submitButton} btn btn-success" type="button" onclick="runIt('test-yourcode', 'test-output', true); setTimeout( () => {testIt()}, 50)"
                data-trigger="hover" data-toggle="popover" data-content="Shift+Enter outside code editor">
                check_code()
              </button>   
            </div> 
          </div>
          <div class="col-md-6">
            <pre class=${this.styles.testOutput} id="test-output" style="min-height: 7vh;"></pre>
          </div>
        </div>
      </div>
      <div id="mycanvas"></div>
    `;
  }
}
