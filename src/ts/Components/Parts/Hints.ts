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
      return document.querySelectorAll("." + this.styles.hintCounterHelper)
        .length;
    }
  
    parse() {    
      _(this.hints).keys().each( (key, index) => {
        const hintWrapper = document.createElement("div");
        hintWrapper.classList.add("hint");
        hintWrapper.classList.add("hidden-hint");
  
        const hintText = document.createElement("p");
        hintText.innerHTML = this.hints[key];
  
        const hintButton = document.createElement("div");
        hintButton.classList.add(this.styles.hintButton);
  
        hintButton.innerHTML = `» Hint ${index + 1}...`;
  
        document.getElementById("hintContainer")?.appendChild(hintButton);
  
        hintButton.addEventListener("click", () => {
          document
            .querySelectorAll(".hint")
            [index].classList.add(this.styles.hintCounterHelper);
          document
            .querySelectorAll(".hint")
            [index].classList.toggle("hidden-hint");
        });
  
        hintWrapper.appendChild(hintText);
  
        (document.getElementById("hintContainer") as HTMLElement).appendChild(
          hintWrapper
        );
      })
    }
  
    get html() {
      return /*html*/ `
          <div id="hintContainer" class="container">
          </div>
        `;
    }
  }
