// App store links shown on the website ("حمّل التطبيق").
// Set `live: true` on launch day, once the app is public in that store.
export const APP_LINKS = {
  play: {
    live: false,
    url: "https://play.google.com/store/apps/details?id=sy.bety.properties",
    label: "Google Play",
  },
  appStore: {
    live: false,
    url: "https://apps.apple.com/app/id6804361913",
    label: "App Store",
  },
} as const;

export const liveAppLinks = Object.values(APP_LINKS).filter((l) => l.live);
