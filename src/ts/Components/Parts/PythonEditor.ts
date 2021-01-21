declare let Sk: any;
class PythonEditor extends KJSComponent {
  constructor() {
    super();

    this.writeComponent();
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

  get html() {
    return /*html*/ `
        <div class="container">
        <div class="row">
          <div class="col" style="padding-right: 0em !important;">
                <textarea id="yourcode"># Your code goes under this line&#10;&#10;</textarea>
                <div class="align-items-end d-flex">
                  <button class="${this.styles.submitButton} btn btn-primary ml-auto" id="runShellButton" type="button" onclick="runIt()"
                  data-trigger="hover" data-toggle="popover" data-content="Shift+Enter inside code editor"
                  >
                  run_code()
                  </button>       
               </div>
          </div>
          <div class="col" style="padding-left: 0em !important;">
            <pre id="output" style="height: 82%;"></pre>
        </div>
      </div>
      <div id="mycanvas"></div>
      `;
  }
}
