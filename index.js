'use strict';
require("babel-core/register");


const app = require('app');
const BrowserWindow = require('browser-window');
const ipc = require('ipc');
const fs = require('fs');

// report crashes to the Electron project
require('crash-reporter').start();

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
		height: 800
	});

	win.loadUrl(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

ipc.on('write-files', function(event, files) {
	files.forEach(function(file) {
		fs.rename(file.oldFilePath, file.newFilePath, function(err) {
			if (err) {
			  event.sender.send('error', err);
				return console.error(err);
			}
		});
	})
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
