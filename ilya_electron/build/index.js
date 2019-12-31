"use strict";

var _path = _interopRequireDefault(require("path"));

var _electron = require("electron");

var _ilya_node = _interopRequireDefault(require("ilya_node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Originally from electron-react-boilerplate
// Modified
const isDevelopment = "production" === 'development';
let mainWindow = null;
let forceQuit = false;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');

  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

_electron.crashReporter.start({
  productName: 'ilya',
  companyName: 'Studio',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false
});

_electron.app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    _electron.app.quit();
  }
});

_electron.app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  mainWindow = new _electron.BrowserWindow({
    width: 375,
    height: 667,
    minWidth: 375,
    minHeight: 667,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(_path.default.resolve(_path.default.join(__dirname, 'index.html'))); // show window once on first load

  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
  });
  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
        }
      });

      _electron.app.on('activate', () => {
        mainWindow.show();
      });

      _electron.app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    }
  });

  if (isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools(); // add inspect element on right click menu

    mainWindow.webContents.on('context-menu', (e, props) => {
      _electron.Menu.buildFromTemplate([{
        label: 'Inspect element',

        click() {
          mainWindow.inspectElement(props.x, props.y);
        }

      }]).popup(mainWindow);
    });
  }
});