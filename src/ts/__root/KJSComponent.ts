class KJSComponent extends KJSBase {
  protected constructor() {
    super();
  }

  writeComponent() {
    this.styles ? this.writeStylesFrom(this.styles) : null;
    document.body.insertAdjacentHTML("beforeend", this.html);
  }

  rewriteDOM(location: HTMLElement, component: Record<string, any>) {
    location.innerHTML = component.get;
  }
}
