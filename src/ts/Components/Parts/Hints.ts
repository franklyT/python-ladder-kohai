class Hints extends KJSComponent {
    hints;
  
    styles = {
      hintButton: `margin-bottom: 0.5em;`,
  
      hintCounterHelper: ``,
    };
  
    constructor({ hints }: { hints: Record<string, string> }) {
      super();
  
      this.hints = hints;
      
      this.writeComponent();
      this.parse();
    }
  
    hintsUsed() {
      return document.querySelectorAll("." + this.styles.hintCounterHelper).length;
    }
  
    parse() {    
      Object.keys(this.hints).forEach( (key, index) => {        
        const HINT_WRAPPER = document.createElement("div");
        HINT_WRAPPER.classList.add("hint", "hidden-hint");
  
        const HINT_TEXT = document.createElement("p");
        HINT_TEXT.innerHTML = this.hints[key];
  
        const HINT_BUTTON = document.createElement("div");
        HINT_BUTTON.classList.add(this.styles.hintButton);
  
        HINT_BUTTON.innerHTML = `» Hint ${index + 1}...`;
  
        document.getElementById("hintContainer")?.appendChild(HINT_BUTTON);
  
        HINT_BUTTON.addEventListener("click", () => {
          document.querySelectorAll(".hint")[index].classList.add(this.styles.hintCounterHelper);
          document.querySelectorAll(".hint")[index].classList.toggle("hidden-hint");
        });
  
        HINT_WRAPPER.appendChild(HINT_TEXT);
  
        (document.getElementById("hintContainer") as HTMLElement).appendChild(HINT_WRAPPER);
      });
    }
  
    get html() {
      return /*html*/ `
          <div id="hintContainer" class="container">
          </div>
        `;
    }
  }
