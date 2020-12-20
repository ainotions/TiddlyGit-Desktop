import path from 'path';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

import { LOCALIZATION_FOLDER, isDev } from '../constants/paths';

i18next.use(Backend).init({
  backend: {
    loadPath: path.join(LOCALIZATION_FOLDER, 'locales/{{lng}}/{{ns}}.json'),
    addPath: path.join(LOCALIZATION_FOLDER, 'locales/{{lng}}/{{ns}}.missing.json'),
  },

  debug: false,
  interpolation: { escapeValue: false },
  saveMissing: isDev,
  saveMissingTo: 'current',
  // namespace: 'translation',
  lng: 'zh_CN',
  fallbackLng: isDev ? false : 'en', // set to false when generating translation files locally
});

setTimeout(() => {
  // prevent circular deps
  // eslint-disable-next-line global-require
  const { getPreference } = require('./preferences');
  i18next.changeLanguage(getPreference('language'));
}, 1);

export default i18next;