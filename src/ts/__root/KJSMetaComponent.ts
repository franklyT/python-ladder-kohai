class KJSMetaComponent extends KJSBase {
  constructor() {
    super();
  }

  writeComponent() {
    this.styles ? this.writeStylesFrom(this.styles) : null;
  }
}
