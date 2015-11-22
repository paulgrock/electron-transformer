'use strict';
require("babel-core/register");


const app = require('app');
const BrowserWindow = require('browser-window');
const ipc = require('ipc');
const fs = require('fs');
const path = require('path');
const Menu = require('menu');
var dialog = require('dialog');



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

	var template = [
		{
			label: 'File',
			submenu: [
				{
					label: 'Open',
					accelerator: 'CmdOrCtrl+O',
					click: function() {
						// TODO: add , 'openDirectory' to properties when directory support is in
						const options = {
							title: 'Add files to be transmformed',
					    properties: ['openFile', 'multiSelections', 'createDirectory']
						};
						dialog.showOpenDialog(win, options, function(files) {
							if (files == null) {
								return;
							}
							win.webContents.send('new-files', files);
						})
					}
				}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{
					label: 'Undo',
					accelerator: 'CmdOrCtrl+Z',
					role: 'undo'
				},
				{
					label: 'Redo',
					accelerator: 'Shift+CmdOrCtrl+Z',
					role: 'redo'
				},
				{
					type: 'separator'
				},
				{
					label: 'Cut',
					accelerator: 'CmdOrCtrl+X',
					role: 'cut'
				},
				{
					label: 'Copy',
					accelerator: 'CmdOrCtrl+C',
					role: 'copy'
				},
				{
					label: 'Paste',
					accelerator: 'CmdOrCtrl+V',
					role: 'paste'
				},
				{
					label: 'Select All',
					accelerator: 'CmdOrCtrl+A',
					role: 'selectall'
				},
			]
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'CmdOrCtrl+R',
					click: function(item, focusedWindow) {
						if (focusedWindow)
							focusedWindow.reload();
					}
				},
				{
					label: 'Toggle Full Screen',
					accelerator: (function() {
						if (process.platform == 'darwin')
							return 'Ctrl+Command+F';
						else
							return 'F11';
					})(),
					click: function(item, focusedWindow) {
						if (focusedWindow)
							focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
					}
				},
				{
					label: 'Toggle Developer Tools',
					accelerator: (function() {
						if (process.platform == 'darwin')
							return 'Alt+Command+I';
						else
							return 'Ctrl+Shift+I';
					})(),
					click: function(item, focusedWindow) {
						if (focusedWindow)
							focusedWindow.toggleDevTools();
					}
				},
			]
		},
		{
			label: 'Window',
			role: 'window',
			submenu: [
				{
					label: 'Minimize',
					accelerator: 'CmdOrCtrl+M',
					role: 'minimize'
				},
				{
					label: 'Close',
					accelerator: 'CmdOrCtrl+W',
					role: 'close'
				},
			]
		},
		{
			label: 'Help',
			role: 'help'
		},
	];

	if (process.platform == 'darwin') {
		var name = app.getName();
		template.unshift({
			label: name,
			submenu: [
				{
					label: 'About ' + name,
					role: 'about'
				},
				{
					type: 'separator'
				},
				{
					label: 'Services',
					role: 'services',
					submenu: []
				},
				{
					type: 'separator'
				},
				{
					label: 'Hide ' + name,
					accelerator: 'Command+H',
					role: 'hide'
				},
				{
					label: 'Hide Others',
					accelerator: 'Command+Shift+H',
					role: 'hideothers'
				},
				{
					label: 'Show All',
					role: 'unhide'
				},
				{
					type: 'separator'
				},
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: function() { app.quit(); }
				},
			]
		});
		// Window menu.
		template[3].submenu.push(
			{
				type: 'separator'
			},
			{
				label: 'Bring All to Front',
				role: 'front'
			}
		);
	}

	var menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

	return win;
}

ipc.on('write-files', function(event, files) {
	var timesCalled = 0;
	files.forEach(function(file) {
		const completeOldPath = path.join(file.path, file.originalFileName);
		const completeNewPath = path.join(file.path, file.updatedFileName);
		fs.rename(completeOldPath, completeNewPath, function(err) {
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
