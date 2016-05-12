'use strict';

import {app, BrowserWindow, Menu, ipcMain: ipc} from 'electron';
import fs from 'fs';
import path from 'path';
import menuConstructor from './menu';

// report crashes to the Electron project
// require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		'title-bar-style': 'hidden',
		title: 'Transformer'
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);
	win.on('blur', () => {
		win.webContents.send('lost-focus');
	});
	win.on('focus', () => {
		win.webContents.send('gained-focus');
	});

	const menuTemplate = menuConstructor(win);
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);

	return win;
}

ipc.on('write-files', (event, files) => {
	let timesCalled = 0;
	files.forEach((file) => {
		const completeOldPath = path.join(file.path, file.originalFileName);
		const completeNewPath = path.join(file.path, file.updatedFileName);
		fs.rename(completeOldPath, completeNewPath, (err) => {
			if (err) {
				event.sender.send('error', err);
				return console.error(err);
			}
			timesCalled += 1;
			if (timesCalled === files.length) {
				event.sender.send('file-write-success', files.length);
			}
		});
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
