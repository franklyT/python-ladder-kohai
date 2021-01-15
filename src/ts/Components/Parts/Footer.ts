class Footer extends KJSComponent {
  constructor() {
    super();

    this.writeComponent();
  }

  styles = {
    container: 
      `padding-top: 5em; 
       padding-bottom: 5em;`,
  };

  get html() {
    return /*html*/ `
      <div class="${this.styles.container}"></div>
    `;
  }
}
