//sets up connection to firebase databas

import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBbBAymfHpV85iM0AxIY4g8mVlqyQ9r0No",
    authDomain: "expensify-app-1b54d.firebaseapp.com",
    databaseURL: "https://expensify-app-1b54d.firebaseio.com",
    projectId: "expensify-app-1b54d",
    storageBucket: "expensify-app-1b54d.appspot.com",
    messagingSenderId: "283482308517"
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref().set({
    name: 'Ash',
    age: 26,
    adult: false,
    location: {
        lat: 1,
        long: 2
    }
});

database.ref('age').set(27);

database.ref('attributes').set({
    height: '5ft6in',
    weight: 130
});