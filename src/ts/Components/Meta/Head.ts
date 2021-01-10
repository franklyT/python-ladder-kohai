class Head extends KJSMetaComponent {
  styles: any;
  
  constructor() {
    super();

    this.writeComponent();
  }

  get html() {
    return /*html*/ `
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${SITE_DATA.title}</title>
      <meta name="Description" content="{{ renderData.description or description or metadata.description }}">
      <!-- https://github.com/franklyT/mini-web-framework v.0.1-->
    `;
  }
}
