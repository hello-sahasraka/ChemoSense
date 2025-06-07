importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyAvNfEstukksY--T5fEXxr5Hu26CplCe0c",
    authDomain: "chemosense-b421d.firebaseapp.com",
    projectId: "chemosense-b421d",
    storageBucket: "chemosense-b421d.appspot.com",
    messagingSenderId: "612952232003",
    appId: "1:612952232003:web:05955ef7a396cddaad04f6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
