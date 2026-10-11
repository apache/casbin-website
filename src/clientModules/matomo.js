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
  setTimeout(() => {
    paq.push(["setReferrerUrl", referrer]);
    paq.push(["setCustomUrl", window.location.href]);
    paq.push(["setDocumentTitle", document.title]);
    paq.push(["trackPageView"]);
  }, 0);
}
