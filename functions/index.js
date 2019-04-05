const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from the other side");
});

const createNotification = (notification => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then((doc) => console.log('notification added', doc));
});

// exports.projectCreated = functions.firestore
//   .document('posts/{postId}')
//   .onCreate(doc => {
//   const post = doc.data();
//   const notification = {
//     content: 'post',
//     user: `${post.username}`,
//     userId: `${post.userId}`,
//     postId: `${post.id}`,
//     time: admin.firestore.FieldValue.serverTimestamp()
//   };
//
//   return createNotification(notification);
// });

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    return admin.firestore().collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        const newUser = doc.data();
        console.log('the newuser here in cloud function is', newUser);
        console.log('the whole doc is: ', doc);
        const notification = {
          content: 'Joined the party',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        };
        return createNotification(notification);
      });
  });
