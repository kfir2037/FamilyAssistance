const functions = require('firebase-functions');
const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://family-assistance-f5ebb.firebaseio.com"
});

class UnauthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.type = 'UnauthenticatedError';
    }
}

class NotAnAdminError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.type = 'NotAnAdminError';
    }
}

class InvalidRoleError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.type = 'InvalidRoleError';
    }
}

function roleIsValid(role) {
    const validRoles = ['editor', 'author', 'sw']; //To be adapted with your own list of roles
    return validRoles.includes(role);
}

exports.createUser = functions.https.onCall(async (data, context) => {
    console.log(38);
    try {
        console.log(40);
        //Checking that the user calling the Cloud Function is authenticated
        if (!context.auth) {
            throw new UnauthenticatedError('The user is not authenticated. Only authenticated Admin users can create new users.');
        }
        console.log(44);

        //Checking that the user calling the Cloud Function is an Admin user
        const callerUid = context.auth.uid;  //uid of the user calling the Cloud Function
        const callerUserRecord = await admin.auth().getUser(callerUid);
        console.log(49);


        //TODO: FIX THIS!!#####
        if (!callerUserRecord.customClaims.admin) {
            throw new NotAnAdminError('Only Admin users can create new users.');
        }

        console.log(54);

        //Checking that the new user role is valid
        const role = data.role;
        if (!roleIsValid(role)) {
            throw new InvalidRoleError('The "' + role + '" role is not a valid role');
        }
        console.log(61);


        const userCreationRequest = {
            userDetails: data,
            status: 'Pending',
            createdBy: callerUid,
            createdOn: FieldValue.serverTimestamp()
        }
        console.log(70);


        const userCreationRequestRef = await admin.firestore().collection("userCreationRequests").add(userCreationRequest);

        console.log(75);

        const newUser = {
            email: data.email,
            emailVerified: false,
            password: data.password,
            displayName: data.firstName + ' ' + data.lastName,
            disabled: false
        }
        console.log(84);

        const userRecord = await admin
            .auth()
            .createUser(newUser);

        console.log(89);

        const userId = userRecord.uid;

        const claims = {};
        claims[role] = true;
        claims['xyzCompanyUser'] = true;

        await admin.auth().setCustomUserClaims(userId, claims);

        await admin.firestore().collection("users").doc(userId).set(data);

        await userCreationRequestRef.update({ status: 'Treated' });

        console.log(104);
        return { result: 'The new user has been successfully created.' };



    } catch (error) {

        if (error.type === 'UnauthenticatedError') {
            throw new functions.https.HttpsError('unauthenticated', error.message);
        } else if (error.type === 'NotAnAdminError' || error.type === 'InvalidRoleError') {
            throw new functions.https.HttpsError('failed-precondition', error.message);
        } else {
            throw new functions.https.HttpsError('internal', error.message);
        }

    }

});


exports.createFamily = functions.https.onCall(async (data, context) => {
    try {

        //Checking that the user calling the Cloud Function is authenticated
        if (!context.auth) {
            throw new UnauthenticatedError('The user is not authenticated. Only authenticated Admin users can create new users.');
        }

        //Checking that the user calling the Cloud Function is an Admin user
        const callerUid = context.auth.uid;  //uid of the user calling the Cloud Function
        console.log(callerUid);
        const callerUserRecord = await admin.firestore().collection('users').doc(callerUid).get()
            .then(doc => {
                return doc.data();
            })
            .catch(err => {
                console.log('Error getting document', err);
            });

        console.log(callerUserRecord);
        const role = callerUserRecord.role;
        console.log(role);
        if (role !== 'sw') {
            throw new InvalidRoleError('Only SW can create family!');
        }

        const familyCreationRequest = {
            familyDetails: data,
            status: 'Pending',
            createdBy: callerUid,
            createdOn: FieldValue.serverTimestamp()
        }

        data['swInCharge'] = callerUid;
        data['status'] = 'active';

        const familyCreationRequestRef = await admin.firestore().collection("familyCreationRequests").add(familyCreationRequest);

        await admin.firestore().collection('families').doc().set(data);

        await familyCreationRequestRef.update({ status: 'Treated' });

        return { result: 'The new family has been successfully created.' };


    } catch (error) {
        if (error.type === 'UnauthenticatedError') {
            throw new functions.https.HttpsError('unauthenticated', error.message);
        } else if (error.type === 'NotAnAdminError' || error.type === 'InvalidRoleError') {
            throw new functions.https.HttpsError('failed-precondition', error.message);
        } else {
            throw new functions.https.HttpsError('internal', error.message);
        }
    }
})













// // The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// const functions = require('firebase-functions');
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const routesConfig = require('./users/routes-config');

// // The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     databaseURL: 'https://family-assistance-f5ebb.firebaseio.com'
// });

// const app = express();
// app.use(bodyParser.json());
// app.use(cors({origin: true}));
// routesConfig(app);
// exports.api = functions.https.onRequest(app);



// // Take the text parameter passed to this HTTP endpoint and insert it into the
// // Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     const snapshot = await admin.database().ref('/messages').push({ original: original });
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     res.redirect(303, snapshot.ref.toString());
// });

// // Listens for new messages added to /messages/:pushId/original and creates an
// // uppercase version of the message to /messages/:pushId/uppercase
// exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
//     .onCreate((snapshot, context) => {
//         // Grab the current value of what was written to the Realtime Database.
//         const original = snapshot.val();
//         console.log('Uppercasing', context.params.pushId, original);
//         const uppercase = original.toUpperCase();
//         // You must return a Promise when performing asynchronous tasks inside a Functions such as
//         // writing to the Firebase Realtime Database.
//         // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//         return snapshot.ref.parent.child('uppercase').set(uppercase);
//     }
// );


