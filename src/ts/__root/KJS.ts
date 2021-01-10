abstract class KJSBase {
  styles: any;
  get html():any{return};

  protected constructor() {}

  provideKey() {
    const ALPHA_KEY: string =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let key: string = "";

    [...Array(5)].forEach( () => {
      key += ALPHA_KEY[Math.floor(Math.random() * ALPHA_KEY.length)];
    })
    return key;
  }

  writeStylesFrom(styleObject: any) {
    const SCOPE_KEY: string = this.provideKey();
    let newStyle: HTMLElement = document.createElement("style");

    let key: string;
    let value: any;

    // this scopes each component's CSS to itself
    // append media queries like SASS styles

    for ([key, value] of Object.entries(styleObject)) {
      let capValue: any = value;

      const APPEND_MOD = [
        [
          "@media",
          function () {
            return `${
              capValue.match(new RegExp(`(@media[\\s\\S]*?) {([\\s\\S]*?)}`))[1]
            }{.${SCOPE_KEY}-${key}{${
              capValue.match(/(@media [\s\S]*?) {([\s\S]*?)}/)[2]
            }}}`;
          },
        ],
        [
          ":hover",
          function () {
            return `.${SCOPE_KEY}-${key}${
              capValue.match(new RegExp(`(:hover[\\s\\S]*?) {([\\s\\S]*?)}`))[0]
            }`;
          },
        ],
        [
          ":after",
          function () {
            return `.${SCOPE_KEY}-${key}${
              capValue.match(new RegExp(`(:after[\\s\\S]*?) {([\\s\\S]*?)}`))[0]
            }`;
          },
        ],
        [
          ":before",
          function () {
            return `.${SCOPE_KEY}-${key}${
              capValue.match(
                new RegExp(`(:before[\\s\\S]*?) {([\\s\\S]*?)}`)
              )[0]
            }`;
          },
        ],
      ];

      // currently parses hover and media
      APPEND_MOD.forEach((selectDoBlock: any) => {
        // try-catch to suppress return errors
        try {
          if (selectDoBlock && selectDoBlock[1]()) {
            let shortCircuitLoop = 0;
            let regExp = new RegExp(
              `(${selectDoBlock[0]}[\\s\\S]*?) {([\\s\\S]*?)}`
            );

            while (capValue.match(regExp) && shortCircuitLoop !== 20) {
              shortCircuitLoop += 1;
              newStyle.innerHTML += selectDoBlock[1]();
              capValue = capValue.replace(regExp, "");
            }
          }
        } catch (error) {
          // console.log(error)
        }
      });

      // WRITE STYLE
      newStyle.innerHTML += `.${SCOPE_KEY}-${key}{${capValue}}`;
      styleObject[key] = SCOPE_KEY + "-" + key;
    }
    document.head.appendChild(newStyle);
  }
}
