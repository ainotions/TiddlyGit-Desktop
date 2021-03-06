const path = require('path');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');

const { LOCALIZATION_FOLDER, isDev } = require('../constants/paths');

i18next.use(Backend).init({
  backend: {
    loadPath: path.join(LOCALIZATION_FOLDER, 'locales/{{lng}}/{{ns}}.json'),
    addPath: path.join(LOCALIZATION_FOLDER, 'locales/{{lng}}/{{ns}}.missing.json'),
  },

  debug: false,
  interpolation: { escapeValue: false },
  saveMissing: isDev,
  saveMissingTo: 'current',
  namespace: 'translation',
  lng: 'zh_CN',
  fallbackLng: isDev ? false : 'en', // set to false when generating translation files locally
});

setTimeout(() => {
  // prevent circular deps
  // eslint-disable-next-line global-require
  const { getPreference } = require('./preferences');
  i18next.changeLanguage(getPreference('language'));
}, 1);

module.exports = i18next;
