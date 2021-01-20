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

    getHintElement(key: string) {
      const HINT_ELEMENT = document.createElement("div");
      HINT_ELEMENT.classList.add("hint", "hidden-hint");

      const HINT_TEXT = document.createElement("p");
      HINT_TEXT.innerHTML = this.hints[key];

      HINT_ELEMENT.appendChild(HINT_TEXT);

      return HINT_ELEMENT;
    }

    toggleHintVisibility(index: number) {
      return document.querySelectorAll(".hint")[index].classList.add(this.styles.hintCounterHelper), document.querySelectorAll(".hint")[index].classList.toggle("hidden-hint");
    }

    getHintButton(index: number) {
      const TOGGLE_HINT = document.createElement("div");
      TOGGLE_HINT.classList.add(this.styles.hintButton);
      TOGGLE_HINT.innerHTML = `» Hint ${index + 1}...`;

      TOGGLE_HINT.addEventListener("click", () => {
        this.toggleHintVisibility(index);
      });

      return TOGGLE_HINT;
    }

    addSolutionWarning(hintToggle: any, index: number) {
      // clone to kill anonymous event listeners
      const CLONED_NODE = hintToggle.cloneNode(true);
      CLONED_NODE.id = `hintID${index}`;
      CLONED_NODE.innerHTML = "» Solution... (Before you look at this, try reading some of the linked resources again!)";

      CLONED_NODE.addEventListener("click", () => {
        if (confirm("This will reveal the answer. Are you sure you want to do this?")) {
          this.toggleHintVisibility(index);

          // Remove hint toggler from DOM
          document.getElementById(`hintID${index}`)!.innerHTML = '';
        } else {
          alert("Good choice! Keep up the hard work!");
        }
      });
      
      return CLONED_NODE;
    }
  
    parse() {    
      const HINT_KEYS = Object.keys(this.hints);

      HINT_KEYS.forEach( (key, index) => {        
        let toggleHint = this.getHintButton(index);
        let hintElement = this.getHintElement(key);

        if (HINT_KEYS.length === index + 1) toggleHint = this.addSolutionWarning(toggleHint, index);

        document.getElementById("hintContainer")?.appendChild(toggleHint);
        document.getElementById("hintContainer")?.appendChild(hintElement);
      });
    }
  
    get html() {
      return /*html*/ `
          <div id="hintContainer" class="container">
          </div>
        `;
    }
  }
