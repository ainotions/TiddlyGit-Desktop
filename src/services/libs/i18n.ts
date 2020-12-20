import path from 'path';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/linonetwo/Desktop/repo/TiddlyGit-Desk... Remove this comment to see the full error message
import { LOCALIZATION_FOLDER, isDev as isDevelopment } from '../constants/paths';

i18next.use(Backend).init({
  backend: {
    loadPath: path.join(LOCALIZATION_FOLDER, 'locales/{{lng}}/{{ns}}.json'),
    addPath: path.join(LOCALIZATION_FOLDER, 'locales/{{lng}}/{{ns}}.missing.json'),
  },

  debug: false,
  interpolation: { escapeValue: false },
  saveMissing: isDevelopment,
  saveMissingTo: 'current',
  // namespace: 'translation',
  lng: 'zh_CN',
  fallbackLng: isDevelopment ? false : 'en', // set to false when generating translation files locally
});

setTimeout(() => {
  // prevent circular deps
  // eslint-disable-next-line global-require
  const { getPreference } = require('./preferences');
  i18next.changeLanguage(getPreference('language'));
}, 1);

export default i18next;
