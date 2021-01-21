class TestCases extends KJSComponent {
  cases: any;

  constructor({ cases }: { cases: String }) {
    super();
    
    this.cases = cases;

    this.writeComponent();

    this.parse(this.cases, "test-yourcode");
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

    // testOutput: `font-size: 0.7rem; height: 8vh;`,

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

      myCodeMirror.setSize("100%", "100%");
    });
  

  (window as any).testIt = () => {
    document.querySelectorAll('.testFeedback').forEach( (elm) => {
      elm.remove();
    });

    _.each(this.cases, (separateCase: any, index: any) => {
      const INDEX_NUM = index.replace(/\D/g,'') - 1;

      if (document.getElementById("test-output")!.innerHTML.includes(separateCase.expectedReturn)) {
        document.querySelector('#test-yourcode')!.querySelectorAll('.CodeMirror-line')[INDEX_NUM].innerHTML += `<span class="testFeedback" id=testLine${INDEX_NUM} style="color: green;"> ✔</span>`;
      } else {
        document.querySelector('#test-yourcode')!.querySelectorAll('.CodeMirror-line')[INDEX_NUM].innerHTML += `<span class="testFeedback" id=testLine${INDEX_NUM} style="color: red;"> X</span>`;
      }
      // return String(document.getElementById("test-output")!.innerHTML).includes(separateCase.expectedReturn);
    });
    return;
  };
}

  get html() {
    return /*html*/ `
        <div class="container ${this.styles.container}">
        <h1 class=${this.styles.testCasesHeader}>TEST CASES</h1>
        <div class="row d-flex">
          <div class="col">
            <div id="test-yourcode" class="code ${this.styles.testYourCode}"> </div>
            <textarea id="test-holder" style="display: none;"></textarea>
            <div class="d-flex">
              <button id="runTestsButton" class="${this.styles.submitButton} btn btn-success" type="button" onclick="runIt('test-yourcode', 'test-output', true); setTimeout( () => {testIt()}, 50)"
                data-trigger="hover" data-toggle="popover" data-content="Shift+Enter outside code editor">
                check_code()
              </button>   
              <pre id="test-output" style="display: none; margin-top: 3em;"></pre>
            </div> 
          </div>
        </div>

      </div>
      <div id="mycanvas"></div>
    `;
  }
}
        /*
        <div class="col">
        </div>

            if (
      hasRightAnswers &&
      !document.getElementById("test-output")!.innerHTML.includes("Error")
    ) {
      document.getElementById('successButton') ? document.getElementById('successButton')?.remove() : null;
      document.getElementById("test-output")!.insertAdjacentHTML('afterend', `<div style="position: absolute;" id="successButton"> <br /> <button onclick="document.querySelector('#elmNext').click()" style='font-size: 0.7rem;' class='btn btn-success mx-auto d-block'>✓ Green light. You did it!</button> </div>`);
    } else {
      document.getElementById('failButton') ? document.getElementById('failButton')?.remove() : null;
      document.getElementById("test-output")!.insertAdjacentHTML('afterend', `<div style="position: absolute;" id="failButton"> <br /> <button style='font-size: 0.7rem;' class='btn btn-danger mx-auto d-block'>X Red light. Check your code!</button> </div>`);
    }
        */