import { WindowManager } from './windowManager.js';

WindowManager.createWindow({
  title: 'Welcome',
  content: `<iframe src="./applications/welcome.html" width="100%" height="100%" style="border:none;"></iframe>`,
  x: 100,
  y: 100,
  width: 800,
  height: 600
});