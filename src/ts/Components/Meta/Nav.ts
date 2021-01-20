class Nav extends KJSMetaComponent {
  previousLink;
  nextLink;

  constructor(previousLink: String, nextLink: String) {
    super();

    this.previousLink = previousLink;
    this.nextLink = nextLink;

    this.writeComponent();
  }

  styles = {
    container: `margin-bottom: 2em;`,

    navSymbol: 
      `font-size: 2.3em; 
       color: #aaa; 
       cursor: pointer;`,

    previous: `margin-right: 0.2em;`,

    home: 
      `font-size: 1.4em; 
       margin-bottom: -0.3em;`,
       
    next: `margin-left: 0.2em;`,
  };

  get html() { 
    return /*html*/`
        <div class="row justify-content-end ml-auto">
            <div onclick="window.location.href='${this.previousLink}'" class="${this.styles.navSymbol} ${this.styles.previous}">«</div>
            <div onclick="window.location.href='../index.html'" class="${this.styles.navSymbol} ${this.styles.home} align-self-center">◆</div>
            <div onclick="window.location.href='${this.nextLink}'" class="${this.styles.navSymbol} ${this.styles.next}">»</div>
        </div>
      `;
  }
}
