const { BrowserWindow, app, } = require("electron");

const gotLock =
  app.requestSingleInstanceLock();

if (!gotLock) {

  app.quit();

  process.exit(0);

}

const { spawn, } = require("child_process");

const path = require("path");

let backendProcess;

app.setName("Altair");

function createMainWindow() {

  const win =
    new BrowserWindow({

      width: 1400,

      height: 900,

      minWidth: 1200,

      minHeight: 800,

      title: "Altair - AI Document Conversion Platform",

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
      data.toString()
    );

  }
);






  backendProcess.stderr.on(
    "data",
    (data) => {

      console.log(
        "\n===== BACKEND ERROR ====="
      );

      console.log(
        data.toString()
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

});

app.on(
  "window-all-closed",
  () => {

    if (
      backendProcess
    ) {

      if (
        backendProcess &&
        !backendProcess.killed
      ) {

        backendProcess.kill(
          "SIGTERM"
        );

      }

    }

    app.quit();

  }
);