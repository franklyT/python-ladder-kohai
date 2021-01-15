function enableBootstrapPopovers() {
  // @ts-ignore
  $('[data-toggle="popover"]').popover({ delay: { show: 500, hide: 100 } });
}

function selfDestruct() {
  document.currentScript!.remove();
}