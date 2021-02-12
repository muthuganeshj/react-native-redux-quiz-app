## Requirements

*The project was developed on MacBook air M1 and all the instructions in this guide are based on macOS Big Sur.*
Before proceeding it is needed that you have installed on your machine the following tools:

1. brew install node
2. brew install watchman
3. brew tap wix/brew
4. brew install --HEAD applesimutils
5. npm install -g detox-cli
6. Follow the installation process on [react-native-setup](https://reactnative.dev/docs/environment-setup)
7. Create a .env file with the following structure and add the accordinly values:

```
FIREBASE_API_KEY=''
FIREBASE_AUTH_DOMAIN=''
FIREBASE_PROJECT_ID=''
FIREBASE_STORAGE_BUCKET=''
FIREBASE_MESSAGING_SENDER_ID=''
FIREBASE_APP_ID=''
FIREBASE_MEASUREMENT_ID=''
FIREBASE_DATABASE_URL=''
```
---

## Running the project in development mode

In order to run the project in development mode please execute the following steps:

1. npm install // on root directory of the project

### Android

2. npm run android

### iOS

2. cd ios && pod install && cd ..
3. npm run ios

**PS**: In order to execute the projects the android emulator must be running or for ios it starts automatically. For more information about how to configure android emulator on your machine check [react-native-android](https://reactnative.dev/docs/environment-setup)

---

## Unit test

In order to execute unit test you need to execute **npm run test** on root directory of the project

---

## E2E

For e2e i chose the wix framework which is very used on the marked and has a high support on community and in order to execute e2e you need to execute the following command on root directory of the project:

### Android

1. npm run e2e:buid:android
2. npm run e2e:test:android

### iOS

1. npm run e2e:buid:ios
2. npm run e2e:test:ios

---

## Architecture

On this app Its being followed the flux architecture using duck pattern in order to make code cleaner and easy to maintain.
Besides that redux is being used as a state management and redux-thunk acting as middleware for async data fetch before passing the data to the reducers.

On [redux-thunk-architecture](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif) you can see how it works.

---

## Troubleshooting

### Android

1. In case you have any trouble executing the app on Android please make sure ANDROID_HOME are properly exported on your ~/.bashrc

export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

2. If there is any problem when building android project It is highly recommended to increase the memory heap on gradle properties.

1. Open the file android/gradle.properties with your prefered editing text tool then add the lines below in the file
2. org.gradle.daemon=true
3. org.gradle.jvmargs=-Xmx4096m

---

## Known Issues

1. On iOS has a problem to load the remote config, so there is a fallback to dont let app stop working
2. I wasnt able to execute e2e for iOS

---
