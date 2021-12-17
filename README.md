# Ionic ticket scanning app

## Installing
Once you have cloned the repository, you'll need to install dependencies to get the application running  :
To install Node.js dependencies
```
npm install
```

To install Node.js dependencies for Ionic
```
cd mobile
npm install
```

To install Ionic
```
npm install -g cordova ionic
```

To recreate all needed files in Ionic
```
ionic state restore
```

If you want to debug the Node.js application, I would highly recommend you to use [Visual Studio Code](https://code.visualstudio.com/)
Here's the [link](https://code.visualstudio.com/Docs/runtimes/nodejs#_debugging-your-express-application) to set up your Visual Studio Code

If you want to emulate the mobile application, I would highly recommend you to use [Genymotion](https://www.genymotion.com/fun-zone/) instead of Android emulator for a better performance

## Launching
To launch the mobile application in a browser
```
cd mobile
ionic serve
```

To launch the mobile application in a real device
```
cd mobile
ionic run android
```
