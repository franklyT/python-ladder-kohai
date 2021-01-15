class Exercise extends KJSComponent {
  exerciseNum;
  header;
  instructions;
  links;

  constructor({
    exerciseNum,
    header,
    instructions,
    links,
  }: {
    exerciseNum: string;
    header: string;
    instructions: string;
    links: any;
  }) {
    super();

    this.exerciseNum = exerciseNum;
    this.header = header;
    this.instructions = instructions;
    this.links = links;

    this.writeComponent();
  }

  styles = {
    container: `display: block;`,

    exerciseNum: 
      `font-size: 1.2em !important;
       color: #aaa;
       margin-bottom: -0.2em !important;
       margin-left: -3.2em !important;`,

    exerciseTitle: 
      `margin-top: 0.1em !important;
       margin-left: -2em !important;`,

    instructions: `margin-bottom: 1.75em !important;`,
  };

  get html() {
    return /*html*/ `
     <div class="container ${this.styles.container}">
      <div class="row align-items-center">
        <div class="col">
          <h1 class="${this.styles.exerciseNum} col-sm-4"> Exercise #${
      this.exerciseNum
    } </h1>
        </div>
        <div class="col">
          ${new Nav(this.links.previous, this.links.next).html}
        </div>
      </div>
      <h2 class=${this.styles.exerciseTitle}> ${this.header} </h2>
      <p class=${this.styles.instructions}> ${this.instructions} </p>
      </div>
  `;
  }
}
