const { BrowserWindow, app, globalShortcut, } = require("electron");

const { spawn, } = require("child_process");

const path = require("path");

let backendProcess;

app.setName("PDF2AI");

function createMainWindow() {

  const win =
    new BrowserWindow({

      width: 1400,

      height: 900,

      minWidth: 1200,

      minHeight: 800,

      title: "PDF2AI - AI Document Conversion Platform",

      icon: path.join(
        __dirname,
        "icon.ico"
      ),

      autoHideMenuBar: true,

      show: false,

      webPreferences: {
        contextIsolation: true,
      },

    });

  win.loadFile(
    path.join(
      __dirname,
      "../dist/index.html"
    )
  );

  win.webContents.openDevTools();

  return win;

}

function createSplashWindow() {

  const splash =
    new BrowserWindow({

      width: 600,

      height: 500,

      frame: false,

      transparent: false,

      resizable: false,

      movable: false,

      alwaysOnTop: true,

      icon: path.join(
        __dirname,
        "icon.ico"
      ),

      webPreferences: {
        contextIsolation: true,
      }

    });

  splash.loadFile(
    path.join(
      __dirname,
      "splash.html"
    )
  );

  return splash;

}

app.whenReady().then(() => {

  const backendExe =
    app.isPackaged
      ? path.join(
          process.resourcesPath,
          "backend",
          "run_backend.exe"
        )
      : path.join(
          __dirname,
          "../backend/run_backend.exe"
        );

  backendProcess =
    spawn(
      backendExe,
      [],
      {
        shell: false
      }
    );

  backendProcess.stdout.on(
    "data",
    (data) => {
      console.log(
        `[Backend] ${data}`
      );
    }
  );

  backendProcess.stderr.on(
    "data",
    (data) => {
      console.error(
        `[Backend Error] ${data}`
      );
    }
  );

  const splash =
  createSplashWindow();

  const mainWindow =
    createMainWindow();

  setTimeout(() => {

    splash.close();

    mainWindow.show();

  }, 3000);

  globalShortcut.register(
    "F12",
    () => {

      BrowserWindow
        .getFocusedWindow()
        ?.webContents
        .toggleDevTools();

    }
  );

});

app.on(
  "window-all-closed",
  () => {

    if (
      backendProcess
    ) {

      backendProcess.kill();

    }

    app.quit();

  }
);