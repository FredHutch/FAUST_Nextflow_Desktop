/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import process from 'process';
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

export default class AppUpdater {
    constructor() {
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();
    }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    require('electron-debug')();
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload))).catch(console.log);
};

const createWindow = async () => {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
        await installExtensions();
    }

    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        webPreferences:
            process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
                ? {
                      nodeIntegration: true
                  }
                : {
                      preload: path.join(__dirname, 'dist/renderer.prod.js')
                  }
    });

    mainWindow.loadURL(`file://${__dirname}/app.html`);

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();
    mainWindow.webContents.openDevTools();

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', createWindow);

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
});

// -----------------------------------------------------------------------------
// Custom Code
// -----------------------------------------------------------------------------
// ------------------------------
// On Quit of The Application
// ------------------------------
// See:
// https://stackoverflow.com/questions/36031465/electron-kill-child-process-exec
// https://www.electronjs.org/docs/api/app
// https://www.electronjs.org/docs/api/ipc-main
// App close handler

const process_ids: any = [];
// TODO: Fix this to not error
const killAllProcesses = (process_ids: any[]) => {
    const remaining_processes: any[] = [];
    process_ids.forEach(function(process_id: any) {
        try {
            // A simple process_id lookup
            process.kill(process_id);
            console.log(`Process ${process_id} has been killed!`);
        } catch (error) {
            // console.log(error);
            // console.log(error.errno);
            // console.log(error.code);
            // console.log(error.syscall);

            // console.log(error.code.toLowerCase() === 'esrch');
            // console.log(error.syscall.toLowerCase() === 'kill');
            if (error.code.toLowerCase() === 'esrch' && error.syscall.toLowerCase() === 'kill') {
                // This is fine, it means it tried to kill it and didn't find it
            } else {
                console.error('An unexpected error occurred when trying to kill all processes!');
                remaining_processes.push(process_id);
            }
        }
    });
    // TODO: Convert to be a return value instead and then rely on setting this
    // outside of the function
    process_ids = remaining_processes;
};
// --------------------
// Internal Application Exit
// --------------------
ipcMain.on('quit-application', function(event: any, argument: any) {
    app.quit();
});
// --------------------
// Window Exiting - AKA: Ctrl + Q/CMD + Q
// --------------------
ipcMain.on('register-pid', function(event: any, argument: any) {
    process_ids.push(argument);
});
app.on('before-quit', function() {
    killAllProcesses(process_ids);
});
app.on('will-quit', function() {
    killAllProcesses(process_ids);
});
