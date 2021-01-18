function enableBootstrapPopovers() {
  // @ts-ignore
  $('[data-toggle="popover"]').popover({ delay: { show: 500, hide: 100 } });
}

function selfDestruct() {
  document.currentScript!.remove();
}

function shorthandTags(str: string) {
  const BLOCK_TEMPLATES = {
    "<s": "<span",
    "s>": "span>",
    "<d": "<div",
    "d>": "div>"
  };

  const MOD_TEMPLATES = {
    "c|": "class=",
    "h|": "href=",
  };

  _(BLOCK_TEMPLATES).each((blockVal, blockKey) => {
    if (str.indexOf(blockKey) !== -1) str = str.split(blockKey).join(blockVal);
  });

  _(MOD_TEMPLATES).each((modVal, modKey) => {
    if (str.indexOf(modKey) === -1) str = str.split(modKey).join(modVal);
  });

  return str;
}
