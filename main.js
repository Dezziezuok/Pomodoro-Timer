const { app, BrowserWindow } = require('electron');
const path = require('path');
const selectSound = new Audio('select.wav');
const alarmSound = new Audio('alarm.wav');


function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 650,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js')
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);