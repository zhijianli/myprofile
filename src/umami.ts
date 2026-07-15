const UMAMI_WEBSITE_ID = "8d1db51c-3180-4331-925b-cf6f2846c0a2";

export function initUmami() {
  if (!import.meta.env.PROD) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://cloud.umami.is/script.js";
  script.setAttribute("data-website-id", UMAMI_WEBSITE_ID);
  document.head.appendChild(script);
}
