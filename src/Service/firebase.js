
import { AddDeviceToken } from 'APIstore/apiCalls';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
    apiKey: "AIzaSyBvtIE7QuDRI4ecaTy5nM9skw6MUqD-Q3Q",
    authDomain: "etows-392d2.firebaseapp.com",
    projectId: "etows-392d2",
    storageBucket: "etows-392d2.appspot.com",
    messagingSenderId: "743719899115",
    appId: "1:743719899115:web:dd1b2c83cb2248f6ce53ae",
    measurementId: "G-0JG1K4QJKX"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (loggedData) => {
    return getToken(messaging, { vapidKey: 'BLqPLBrRPuC3bofTjWIDaqbfx6lTs8LY_K3wKQFUtZOz2aXWbBjCwwtt7HIzdfeVJtrauim6baPhITZQ75ZUbcE' }).then((currentToken) => {
        if (currentToken) {
            const obj = {
                userId: loggedData?.id,
                deviceId: currentToken,
                active: 1
            }
            try {
                AddDeviceToken(obj, async (res) => {
                    if (res.sucess) {
                        console.warn("Add Device", res.sucess);

                    } else {
                        console.log("errrrr")
                    }
                });
            } catch (error) {
                console.log("error", error)
            }
        } else {
            console.log('No registration token available. Request permission to generate one.');
            // setTokenFound(false);
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () => {
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payloadpayload", payload);
            resolve(payload);
        });
    })
};