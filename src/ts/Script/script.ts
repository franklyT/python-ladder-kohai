function enableBootstrapPopovers() {
  // @ts-ignore
  $('[data-toggle="popover"]').popover({ delay: { show: 500, hide: 100 } });
}

function selfDestruct() {
  document.currentScript!.remove();
}

function templateTags(str: string) {
  const BLOCK_TEMPLATES = {
    s: "<span ",
    ss: "</span>",
  };

  const CLASS_TEMPLATES = {
    call: "call",
    cb: "code-block",
    def: "def",
    num: "number",
    str: "string",
  };

  _.each(BLOCK_TEMPLATES, (outerVal, outerKey) => {
    _.each(CLASS_TEMPLATES, (innerVal, innerKey) => {
      const FULL_KEY = `${outerKey}${innerKey}`;

      if (str.indexOf(FULL_KEY) === -1) return;

      str = str.split(`<${FULL_KEY}|`).join(`${outerVal} class='${innerVal}'>`);
    });

    if (str.indexOf(outerKey) === -1) return;

    str = str.split(`|${outerKey}>`).join(`${outerVal}`);
  });

  return str;
}
