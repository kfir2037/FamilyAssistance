import React, {useEffect} from 'react';
import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyDYAzG_86k9LixkL5S3mPtWGVIx4ihQe_M",
    authDomain: "family-assistance-f5ebb.firebaseapp.com",
    databaseURL: "https://family-assistance-f5ebb.firebaseio.com",
    projectId: "family-assistance-f5ebb",
    storageBucket: "family-assistance-f5ebb.appspot.com",
    messagingSenderId: "877515379565",
    appId: "1:877515379565:web:b912c78dbc4fd891c78064",
    measurementId: "G-LJ3LEHMJHQ"
};


//firebase.initializeApp(config);

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

// export const f = firebase;
// export const database = firebase.database();
// export const auth = firebase.auth();
// export const storage = firebase.storage();