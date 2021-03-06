const path = require('path')
const url = require('url')
const { app, BrowserWindow, ipcMain,Menu} = require('electron')
const connectDB = require('./Data/db')
const dataModel = require('./dataModel/dataModel')



connectDB() // connect to Database

let mainWindow


let isDev = false


// setting for prod and devlopement env

if (
	process.env.NODE_ENV !== undefined &&
	process.env.NODE_ENV === 'development'
) {
	isDev = true
}

const sendData = async () => {
	try {
		const tasks = await dataModel.find().sort({ created: 1 })
		mainWindow.webContents.send('data:get', JSON.stringify(tasks))
	  } catch (err) {
		console.log(err)
	  }
}

// opens the main window when main process is booted 

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 1100,
		height: 800,
		show: false,
		//backgroundColor: "black",
		icon: './assets/icons/icon.png',
		webPreferences: {
			nodeIntegration: true,
		},
	})

	let indexPath

	if (isDev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		})
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		})
	}

	mainWindow.loadURL(indexPath)
	mainWindow.removeMenu()

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()

		// Open devtools if dev
		if (isDev) {
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			} = require('electron-devtools-installer')

			installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
				console.log('Error loading React DevTools: ', err)
			)
			mainWindow.webContents.openDevTools()
		}
	})

	mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createMainWindow)
	


// fetch data
ipcMain.on('data:load', sendData)

//clear data
ipcMain.on('data:clear', async (e) => {
	try {
		await dataModel.deleteMany({})
		mainWindow.webContents.send('data:clear')
	  } catch (err) {
		console.log(err)
	  }
})

//add data
ipcMain.on('data:add', async ( e, task) => {
	try {
		await dataModel.create(task)
		sendData()
	  } catch (err) {
		console.log(err)
	  }
} )



ipcMain.on('data:remove', async(e,_id)=> {
	try{
		await dataModel.findOneAndDelete({_id :_id})
		sendData()

	}catch(err){
		console.log(err)
	}
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow()
	}
})

// Stop error
app.allowRendererProcessReuse = true

