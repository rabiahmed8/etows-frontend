// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBvtIE7QuDRI4ecaTy5nM9skw6MUqD-Q3Q",
  authDomain: "etows-392d2.firebaseapp.com",
  projectId: "etows-392d2",
  storageBucket: "etows-392d2.appspot.com",
  messagingSenderId: "743719899115",
  appId: "1:743719899115:web:dd1b2c83cb2248f6ce53ae",
  measurementId: "G-0JG1K4QJKX"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(async(payload) => {
  console.log('Received background message: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";
// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyBvtIE7QuDRI4ecaTy5nM9skw6MUqD-Q3Q",
//   authDomain: "etows-392d2.firebaseapp.com",
//   projectId: "etows-392d2",
//   storageBucket: "etows-392d2.appspot.com",
//   messagingSenderId: "743719899115",
//   appId: "1:743719899115:web:dd1b2c83cb2248f6ce53ae",
//   measurementId: "G-0JG1K4QJKX"
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging(firebaseApp);

// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message: ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = { body: payload.notification.body };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });