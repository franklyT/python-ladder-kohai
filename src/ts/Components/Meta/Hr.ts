class Hr extends KJSMetaComponent {
  styles: any;
  width;
  color;
  height;

  constructor({
    width = "100%",
    color = "silver",
    height = "1px",
  }: {
    width?: string;
    color?: string;
    height?: string;
  }) {
    super();

    this.width = width;
    this.color = color;
    this.height = height;

    this.writeComponent();
  }
  get html() {
    return /*html*/ `
    <hr style='width: ${this.width}; border: none; border-bottom: ${this.height} solid ${this.color};'>
    `;
  }
}
