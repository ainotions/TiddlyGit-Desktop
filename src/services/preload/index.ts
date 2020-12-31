import { contextBridge } from 'electron';

import './common/i18n';
import './common/require-nodejs';
import './common/simple-context-menu';
import './common/authing-postmessage';
import { WindowNames } from '@/services/windows/WindowProperties';

const extraMetaJSONString = process.argv.pop() as string;
const extraMeta = JSON.parse(extraMetaJSONString) as Record<string, string>;
const windowName = process.argv.pop() as WindowNames;

contextBridge.exposeInMainWorld('meta', { windowName, ...extraMeta });

if (windowName === WindowNames.view) {
  void import('./view');
}