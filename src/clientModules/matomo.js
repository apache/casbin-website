// Docusaurus is a single-page app: the tracking code in <head> records the first page, later navigations are recorded here.
export function onRouteDidUpdate({location, previousLocation}) {
  if (!previousLocation || location.pathname === previousLocation.pathname) {
    return;
  }
  const paq = window._paq;
  if (!paq) {
    return;
  }
  const referrer = window.location.origin + previousLocation.pathname + previousLocation.search;
  const oldTitle = document.title;
  let tries = 0;
  // The page title is updated shortly after the route change.
  const track = () => {
    if (document.title === oldTitle && tries++ < 20) {
      setTimeout(track, 50);
      return;
    }
    paq.push(["setReferrerUrl", referrer]);
    paq.push(["setCustomUrl", window.location.href]);
    paq.push(["setDocumentTitle", document.title]);
    paq.push(["trackPageView"]);
  };
  setTimeout(track, 0);
}
