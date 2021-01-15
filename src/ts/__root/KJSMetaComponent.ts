class KJSMetaComponent extends KJSBase {
  protected constructor() {
    super();
  }

  writeComponent() {
    this.styles ? this.writeStylesFrom(this.styles) : null;
  }
}
