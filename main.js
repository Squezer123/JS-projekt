const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({

    })
    win.setFullScreen(true);
    win.loadFile('index.html')
  }

  app.whenReady().then(() => {
    createWindow()
  })