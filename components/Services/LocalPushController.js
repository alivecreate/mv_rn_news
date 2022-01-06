// // import PushNotification from 'react-native-push-notification'


// import PushNotification from "react-native-push-notification";

// // Must be outside of any component LifeCycle (such as `componentDidMount`).
// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log("TOKEN Register 11111 :", token);
//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);

//     // process the notification

//     // (required) Called when a remote is received or opened, or local notification is opened
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//   onAction: function (notification) {
//     console.log("ACTION:", notification.action);
//     console.log("NOTIFICATION:", notification);

//     // process the action
//   },

//   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//   onRegistrationError: function(err) {
//     console.error(err.message, err);
//   },

//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    * - if you are not using remote notification or do not have Firebase installed, use this:
//    *     requestPermissions: Platform.OS === 'ios'
//    */
//   requestPermissions: true,
// });

// PushNotification.localNotificationSchedule({
//     //... You can use all the options from localNotifications
//     message: "My Notification Message", // (required)
//     date: new Date(Date.now() + 60 * 1000), // in 60 secs
//     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
//   });



// PushNotification.configure({
//     // (required) Called when a remote or local notification is opened or received
//     onNotification: function(notification) {
//       console.log('LOCAL NOTIFICATION ==>', notification)
//     },
//   popInitialNotification: true,
//     requestPermissions: true
//   })

//   export const LocalNotification = () => {
      
//     //   alert('work');
//     // PushNotification.localNotification({
//     //   autoCancel: true,
//     //   bigText:
//     //     'This is local notification demo in React Native app. Only shown, when expanded.',
//     //   subText: 'Local Notification Demo',
//     //   title: 'Local Notification Title',
//     //   message: 'Expand me to see more',
//     //   vibrate: true,
//     //   vibration: 300,
//     //   playSound: true,
//     //   soundName: 'default',
//     //   actions: '["Yes", "No"]'
//     // })

//     PushNotification.localNotification({
//         foreground: true, // BOOLEAN: If the notification was received in foreground or not
//         userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
//         message: 'My Notification Message', // STRING: The notification message
//         data: {},

//     });

      
//   }