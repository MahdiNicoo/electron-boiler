
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
const { app, BrowserWindow } = require('electron')

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
    app.quit()
} 

function createWindow () {

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true,
    })

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    win.maximize()

    win.loadURL(startUrl)

    if (isDev) {
        
        win.webContents.openDevTools({
            mode: "detach",
        })
        
        // const edi = require('electron-devtools-installer')
        // edi.default(edi.REACT_DEVELOPER_TOOLS)
        //     .then((name) => console.log(`Added Extension:  ${name}`))
        //     .catch((err) => console.log('An error occurred: ', err));
    }

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})