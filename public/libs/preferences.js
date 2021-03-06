/* eslint-disable no-param-reassign */
const path = require('path');
const semver = require('semver');
const settings = require('electron-settings');
let { app, nativeTheme, ipcMain, remote } = require('electron');

const sendToAllWindows = require('./send-to-all-windows');

app = app || remote.app;

// scope
const v = '2018.2';

const getDefaultDownloadsPath = () => path.join(app.getPath('home'), 'Downloads');

const getDefaultPauseNotificationsByScheduleFrom = () => {
  const d = new Date();
  d.setHours(23);
  d.setMinutes(0);
  return d.toString();
};

const getDefaultPauseNotificationsByScheduleTo = () => {
  const d = new Date();
  d.setHours(7);
  d.setMinutes(0);
  return d.toString();
};

const defaultPreferences = {
  allowNodeInJsCodeInjection: false,
  allowPrerelease: Boolean(semver.prerelease(app.getVersion())),
  askForDownloadPath: true,
  attachToMenubar: false,
  blockAds: false,
  cssCodeInjection: null,
  customUserAgent: null,
  // default Dark Reader settings from its Chrome extension
  darkReader: false,
  darkReaderBrightness: 100,
  darkReaderContrast: 100,
  darkReaderGrayscale: 0,
  darkReaderSepia: 0,
  // default Dark Reader settings from its Chrome extension
  downloadPath: getDefaultDownloadsPath(),
  hibernateUnusedWorkspacesAtLaunch: false,
  hideMenuBar: false,
  ignoreCertificateErrors: false,
  jsCodeInjection: null,
  language: 'zh_CN',
  navigationBar: false,
  pauseNotifications: null,
  pauseNotificationsBySchedule: false,
  pauseNotificationsByScheduleFrom: getDefaultPauseNotificationsByScheduleFrom(),
  pauseNotificationsByScheduleTo: getDefaultPauseNotificationsByScheduleTo(),
  pauseNotificationsMuteAudio: false,
  proxyBypassRules: '',
  proxyPacScript: '',
  proxyRules: '',
  proxyType: 'none',
  rememberLastPageVisited: false,
  shareWorkspaceBrowsingData: false,
  sidebar: true,
  sidebarShortcutHints: true,
  spellcheck: true,
  spellcheckLanguages: ['en-US'],
  swipeToNavigate: true,
  syncDebounceInterval: 1000 * 60 * 30,
  themeSource: 'system',
  titleBar: true,
  unreadCountBadge: true,
  useHardwareAcceleration: true,
};

let cachedPreferences;

function sanitizePreference(preferenceToSanitize) {
  const { syncDebounceInterval } = preferenceToSanitize;
  if (syncDebounceInterval > 86400000 || syncDebounceInterval < -86400000 || !Number.isInteger(syncDebounceInterval)) {
    preferenceToSanitize.syncDebounceInterval = defaultPreferences.syncDebounceInterval;
  }
  return preferenceToSanitize;
}

const initCachedPreferences = () => {
  cachedPreferences = { ...defaultPreferences, ...sanitizePreference(settings.getSync(`preferences.${v}`) || {}) };
};

const getPreferences = () => {
  // store in memory to boost performance
  if (cachedPreferences === undefined) {
    initCachedPreferences();
  }
  return cachedPreferences;
};

const getPreference = name => {
  // store in memory to boost performance
  if (cachedPreferences === undefined) {
    initCachedPreferences();
  }
  return cachedPreferences[name];
};

const setPreference = (name, value) => {
  sendToAllWindows('set-preference', name, value);
  cachedPreferences[name] = value;
  cachedPreferences = sanitizePreference(cachedPreferences);

  // eslint-disable-next-line promise/catch-or-return
  Promise.resolve().then(() => settings.setSync(`preferences.${v}.${name}`, cachedPreferences[name]));

  if (name.startsWith('darkReader')) {
    ipcMain.emit('request-reload-views-dark-reader');
  }

  if (name.startsWith('pauseNotifications')) {
    ipcMain.emit('request-update-pause-notifications-info');
  }

  if (name === 'themeSource') {
    nativeTheme.themeSource = value;
  }
};

const resetPreferences = () => {
  cachedPreferences = undefined;
  settings.unset();

  const preferences = getPreferences();
  Object.keys(preferences).forEach(name => {
    sendToAllWindows('set-preference', name, preferences[name]);
  });
};

module.exports = {
  getPreference,
  getPreferences,
  resetPreferences,
  setPreference,
};
