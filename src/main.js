const {app, BrowserWindow, ipcMain} = require('electron')

let mainWindow
let pickerDialog

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 350,
    width: 450,
    resizable: false
  });

  pickerDialog = new BrowserWindow({
    parent: mainWindow,
    skipTaskbar: true,
    modal: true,
    show: false,
    height: 340,
    width: 620
  })
  console.log(__dirname);
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  pickerDialog.loadURL('file://' + __dirname + '/picker.html')
});

ipcMain.on('show-picker', (event, options) => {
  pickerDialog.show()
  pickerDialog.webContents.send('get-sources', options)
})

ipcMain.on('source-id-selected', (event, sourceId) => {
  pickerDialog.hide()
  mainWindow.webContents.send('source-id-selected', sourceId)
})
