//sets up connection to firebase databas

import * as firebase from 'firebase';

var config = { //uses different environment variables depending on whether we are testing or building for development
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export {firebase, database as default};

// // child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// // child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// //child_added - also gets called for existing children at render
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];
        
//         //below method forEach on a snapshot iterates over ever item in the data, pushing an object created from the data into the expenses array
//         //This method is important for integrated firebase with redux
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key, //.key is a method that returns the snapshot key, the unique id it is referenced by
//                 ...childSnapshot.val()
//             })
//         });

//         console.log(expenses);
//     })
//     .catch((err) => console.log(err));

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
        
//     //below method forEach on a snapshot iterates over ever item in the data, pushing an object created from the data into the expenses array
//     //This method is important for integrated firebase with redux
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key, //.key is a method that returns the snapshot key, the unique id it is referenced by
//             ...childSnapshot.val()
//         })
//     });

//     console.log(expenses);
// });

// const expense = 
//     {
//         description: 'Nintendo Switch',
//         amount: 200,
//         createdAt: 10000
//     }
// database.ref('expenses').push(expense);

// database.ref().on('value', (snapshot) => {
//     const val = shapshot.val();
//     console.log(val);
// });

// database.ref('location/city').once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((err) => {
//         console.log('Error fetching data');
//     });

// database.ref().set({
//     name: 'Ash',
//     age: 26,
//     stressLevel: 2,
//     job: {
//         title: 'Web Developer',
//         company: 'self-employed'
//     },
//     location: {
//         city: 'Denver',
//         country: 'USA'
//     }
// }).then(() => {
//     console.log('success');
// }).catch((err) => {
//     console.log('This failed.', err);
// });

// database.ref('adult').remove().then(() => {
//     console.log('Removed successfully');
// }).catch((err) => {
//     console.log('Removal not successful', err);
// });

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// });