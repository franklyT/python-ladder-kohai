function enableBootstrapPopovers() {
  // @ts-ignore
  $('[data-toggle="popover"]').popover({ delay: { show: 500, hide: 100 } });
}

function selfDestruct() {
  document.currentScript!.remove();
}

// templating
_.each({
  s: "<span ",
  ss: "</span>",
  d: "<div ",
  dd: "</div>",
  p: "<p ",
  pp: "</p>",
  h1: "<h1 ",
  h1h1: "</h1>",
  h2: "<h2 ",
  h2h2: "</h2>"
    }, (outerVal: any, outerKey: any) => {
      _.each({
        call: "call",
        cb: "code-block",
        def: "def",
        num: "number",
        str: "string",
      }, (innerVal: any, innerKey: any) => {
        // @ts-ignore
        window[`$_${outerKey}${innerKey}`] = `${outerVal} class='${innerVal}'>`;
      });
      // @ts-ignore
      window[`$_${outerKey}`] = outerVal;
    });
/*
function templateCode(str: string) {
  let classTemplates = {
    call: "call",
    cb: "code-block",
    def: "def",
    num: "number",
    str: "string",
  };

  let blockTemplates = {
    s: "<span ",
    ss: "</span>"
  }

  _.each(classTemplates, (value, key) => {
    if (str.indexOf(key) === -1) return;
		
    str = str.replace(`&:${key}&`, `class="${value}">`);
    return false;
  });

  _.each(blockTemplates, (value, key) => {
    if (str.indexOf(key) === -1) return;

    str = str.replace(`&:${key}`, `${value}`)
  })

  return str;
}
*/