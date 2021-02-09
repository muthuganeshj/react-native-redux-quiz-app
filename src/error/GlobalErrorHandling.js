import { setJSExceptionHandler, getJSExceptionHandler } from 'react-native-exception-handler';

const allowInDevMode = true
setJSExceptionHandler((error, isFatal) => {
    console.log('Hitting api for catching js exception to fix');
});

const exceptionhandler = (error, isFatal) => {
    console.log('Hitting api for catching exception to fix');
    console.log(error)
};
setJSExceptionHandler(exceptionhandler, allowInDevMode);