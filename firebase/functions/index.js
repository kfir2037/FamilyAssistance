const functions = require('firebase-functions');
const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
var fetch = require('node-fetch')
var moment = require('moment');
//const { doc } = require('prettier');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://family-assistance-f5ebb.firebaseio.com",
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

class IDAlreadyInUseError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.type = 'InvalidIDError';
    }
}

function roleIsValid(role) {
    const validRoles = ['editor', 'parent', 'sw', 'kid']; //To be adapted with your own list of roles
    return validRoles.includes(role);
}

exports.getFamilyMembers = functions.https.onCall(async (data, context) => {
    let family = await admin.firestore().collection('families').doc(data).get();


});

exports.addTask = functions.https.onCall(async (data, context) => {
    let routineTasksDoc = admin.firestore().collection('RoutineTasks').doc(data.docName);
    routineTasksDoc.update({
        tasks: FieldValue.arrayUnion(data.taskToAdd)
    })
});

exports.deleteTask2 = functions.https.onCall(async (data, context) => {

    let routineTasksDoc = admin.firestore().collection('RoutineTasks').doc(data.docName);
    routineTasksDoc.update({
        tasks: FieldValue.arrayRemove(data.taskToDelete)
    })
});

exports.addRoutineTasks = functions.https.onCall(async (data, context) => {
    console.log('addRoutineTasks')
    let routineTasksColl = admin.firestore().collection('RoutineTasks');
    if (data.newMorningTask) {
        var arrUnion = routineTasksColl.doc('morning').update({
            tasks: admin.firestore.FieldValue.arrayUnion(data.newMorningTask)
        });
    }
    if (data.newNoonTasks) {
        var arrUnion = routineTasksColl.doc('noon').update({
            tasks: admin.firestore.FieldValue.arrayUnion(data.newNoonTasks)
        });
    }
    if (data.newAfternoonTask) {
        var arrUnion = routineTasksColl.doc('afternoon').update({
            tasks: admin.firestore.FieldValue.arrayUnion(data.newAfternoonTask)
        });
    }
    if (data.newEveningTask) {
        var arrUnion = routineTasksColl.doc('evening').update({
            tasks: admin.firestore.FieldValue.arrayUnion(data.newEveningTask)
        });
    }
    // routineTasksDoc.update({
    //     tasks: FieldValue.arrayRemove(data.taskToDelete)
    // })
});

exports.createUser = functions.https.onCall(async (data, context) => {
    try {
        //Checking that the user calling the Cloud Function is authenticated
        if (!context.auth) {
            throw new UnauthenticatedError('The user is not authenticated. Only authenticated Admin users can create new users.');
        }

        // let userID = data.id;
        // let userEmail = {
        //     email: data.email
        // };

        // await admin.firestore().collection('usersIDs').doc(userID).set(userEmail);

        await admin.firestore().collection('usersIDs').doc(data.id).get()
            .then(async (doc) => {
                if (!doc.exists) {
                    await admin.firestore().collection('usersIDs').doc(data.id).set({
                        email: data.email
                    })
                        .then(() => {
                            console.log('id-email doc added successfuly');
                        })
                        .catch((err) => {
                            console.log('id-email doc writing Error: ', err);
                        })
                } else {
                    throw new IDAlreadyInUseError('This ID number already signed');
                }
            })
            .catch((err) => {
                console.log('error adding ID number - email document: ', err );
                throw err;
            })


        //Checking that the user calling the Cloud Function is an Admin user
        const callerUid = context.auth.uid;  //uid of the user calling the Cloud Function
        const callerUserRecord = await admin.auth().getUser(callerUid);
        console.log(49);

        //TODO: FIX THIS!!#####
        // if (!callerUserRecord.customClaims.admin) {
        //     throw new NotAnAdminError('Only Admin users can create new users.');
        // }

        //Checking that the new user role is valid
        const role = data.role;
        if (!roleIsValid(role)) {
            throw new InvalidRoleError('The "' + role + '" role is not a valid role');
        }

        const userCreationRequest = {
            userDetails: data,
            status: 'Pending',
            createdBy: callerUid,
            createdOn: FieldValue.serverTimestamp()
        }

        const userCreationRequestRef = await admin.firestore().collection("userCreationRequests").add(userCreationRequest);

        console.log(75);

        const newUser = {
            email: data.email,
            emailVerified: false,
            password: data.id,
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
        //claims['xyzCompanyUser'] = true;

        await admin.auth().setCustomUserClaims(userId, claims);

        if (role === 'parent') {
            await admin.firestore().collection('families').doc(data.familyId)
                .update({
                    parents: FieldValue.arrayUnion(userId)
                })
        } else if (role === 'kid') {
            await admin.firestore().collection('families').doc(data.familyId)
                .update({
                    kids: FieldValue.arrayUnion(userId)
                })
        }


        await admin.firestore().collection("users").doc(userId).set(data);

        await userCreationRequestRef.update({ status: 'Treated' });

        console.log(104);
        return { result: 'The new user has been successfully created.' };

    } catch (error) {

        if (error.type === 'UnauthenticatedError') {
            throw new functions.https.HttpsError('unauthenticated', error.message);
        } else if (error.type === 'NotAnAdminError' || error.type === 'InvalidRoleError' || error.type === 'InvalidIDError') {
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
        data['parents'] = [];
        data['kids'] = [];

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

exports.signinUserEmail = functions.https.onCall(async (data, context) => {
    //admin.firestore().collection('users').where('id')
    const userEmail = await admin.firestore().collection('usersIDs').doc(data).get()
        .then((doc) => {
            if (!doc.exists) {
                console.log('Wrong ID!');
                throw new functions.https.HttpsError('internal', 'ID Does Not Exist!');
            } else {
                console.log('doc.data.email ', doc.data().email)
                return doc.data().email;
            }
        })
        .catch((err) => {
            console.log("Error getting document ", err);
            if (err.message === 'ID Does Not Exist!') {
                throw err;
            }


        })

    return userEmail;




    // admin.auth().createCustomToken(data.idNumber)
    //     .then(function (customToken) {
    //         // Send token back to client
    //     })
    //     .catch(function (error) {
    //         console.log('Error creating custom token:', error);
    //         throw new functions.https.HttpsError('internal', error.message);
    //     });

})

sendPushNotification = async () => {
    console.log('sendPushNotification is running')
    var morningFirstAlert = 1
    var morningSecondsAlert = 1
    var noonFirstAlert = 1
    var noonSecondsAlert = 1
    var afternoonFirstAlert = 1
    var afternoonSecondsAlert = 1
    var eveningFirstAlert = 1
    var eveningSecondsAlert = 1

    var currentDate2 = new Date();

    let morningTasks = admin
        .firestore()
        .collection("RoutineTasks")
        .doc("morning");

    let getDoc = morningTasks
        .get()
        .then((doc) => {
            if (!doc.exists) {
                console.log("No such document!");
            } else {
                let allData = doc.data();
                morningFirstAlert = allData.beforeAlertTime
                morningSecondsAlert = allData.afterAlertTime

            }
        })
        .catch((err) => {
            console.log("Error getting document", err);
        });


    let noonTasks2 = admin
        .firestore()
        .collection("RoutineTasks")
        .doc("noon");

    let getDoc22 = noonTasks2
        .get()
        .then((doc) => {
            if (!doc.exists) {
                console.log("No such document!");
            } else {
                let allData = doc.data();
                noonFirstAlert = allData.beforeAlertTime
                noonSecondsAlert = allData.afterAlertTime
            }
        })
        .catch((err) => {
            console.log("Error getting document", err);
        });




    let afternoonTasks = admin
        .firestore()
        .collection("RoutineTasks")
        .doc("afterNoon");

    let getDoc3 = afternoonTasks
        .get()
        .then((doc) => {
            if (!doc.exists) {
                console.log("No such document!");
            } else {
                let allData = doc.data();
                afternoonFirstAlert = allData.beforeAlertTime
                afternoonSecondsAlert = allData.afterAlertTime
            }
        })
        .catch((err) => {
            console.log("Error getting document", err);
        });


    let eveningTasks = admin
        .firestore()
        .collection("RoutineTasks")
        .doc("evening");

    let getDoc4 = eveningTasks
        .get()
        .then((doc) => {
            if (!doc.exists) {
                console.log("No such document!");
            } else {
                let allData = doc.data();
                eveningFirstAlert = allData.beforeAlertTime
                eveningSecondsAlert = allData.afterAlertTime
            }
        })
        .catch((err) => {
            console.log("Error getting document", err);
        });





    const currentDate = moment(new Date()).format('DD/MM/YYYY HH:mm')
    var add30Minutes = moment(new Date()).add(30, "minutes")
    add30Minutes = moment(add30Minutes).format('DD/MM/YYYY HH:mm A')

    const allTasks = await admin
        .firestore()
        .collection("tasks")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                if (!doc.exists) {
                    console.log("No such document!!!!!!");
                } else {
                    let allData = doc.data();
                    // console.log('category: ', allData.category)
                    if (allData.category == 'morning') {

                        const taskDate = moment(allData.date.seconds * 1000).format('DD/MM/YYYY HH:mm');
                        const taskDateOnlyDate = moment(allData.date.seconds * 1000).format('DD/MM/YYYY');
                        const currentDateOnlyDate = moment(new Date()).format('DD/MM/YYYY');
                        // console.log('taskDateOnlyDate ', taskDateOnlyDate)
                        // console.log('currentDateOnlyDate', currentDateOnlyDate)
                        if (taskDateOnlyDate == currentDateOnlyDate) {
                            console.log('same date')
                            const timeOfAlert = moment(currentDate).add(morningFirstAlert + 5, 'minutes').format('MM/DD/YYYY HH:mm')
                            const timeOfAlert2 = moment(currentDate).add(morningFirstAlert, 'minutes').format('MM/DD/YYYY HH:mm')
                            const timeOfAlert3 = moment(currentDate).add(morningSecondsAlert + 5, 'minutes').format('MM/DD/YYYY HH:mm')
                            const timeOfAlert4 = moment(currentDate).add(morningSecondsAlert, 'minutes').format('MM/DD/YYYY HH:mm')


                            if (moment(taskDate).isAfter(timeOfAlert2) && moment(taskDate).isBefore(timeOfAlert)) {
                                console.log('needs to send push notification - alert number 1')
                                const message = {
                                    to: 'ExponentPushToken[V9Tum4EXGyriFFECBJ5iYO]',
                                    sound: 'default',
                                    title: 'משימה מתקרבת',
                                    body: 'התראה מספר 1',
                                    data: { data: 'goes here' },
                                    _displayInForeground: true,
                                };
                                await fetch('https://exp.host/--/api/v2/push/send', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Accept-encoding': 'gzip, deflate',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(message)

                                }).then(res => {
                                    console.log('res: ', res)
                                });
                            }
                            else if (moment(taskDate).isAfter(timeOfAlert4) && moment(taskDate).isBefore(timeOfAlert3)) {
                                console.log('needs to send push notification - alert number 2')
                                const message = {
                                    to: 'ExponentPushToken[V9Tum4EXGyriFFECBJ5iYO]',
                                    sound: 'default',
                                    title: 'משימה ממש קרובה',
                                    body: 'התראה מספר 2',
                                    data: { data: 'goes here' },
                                    _displayInForeground: true,
                                };
                                await fetch('https://exp.host/--/api/v2/push/send', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Accept-encoding': 'gzip, deflate',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(message)

                                }).then(res => {
                                    console.log('res: ', res)
                                });
                            }
                        }
                    }
                }
            });
        })
        .catch((err) => { console.log('tasks ', err) })



    const allTasks2 = await admin.firestore().collection('tasks').get()
    allTasks2.docs.map(doc => doc.data())
    const allUsers = admin.firestore().collection('users').get()
    // console.log('alltasks: ', allTasks)
    // console.log('allUsers: ', allUsers)
    // console.log('two seconds')






    // const message = {
    //     to: 'ExponentPushToken[V9Tum4EXGyriFFECBJ5iYO]',
    //     sound: 'default',
    //     title: 'Original Title',
    //     body: 'And here is the body!',
    //     data: { data: 'goes here' },
    //     _displayInForeground: true,
    //   };
    //  await fetch('https://exp.host/--/api/v2/push/send', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Accept-encoding': 'gzip, deflate',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(message)

    //         }).then(res=>{
    //             console.log('res: ',res)
    //         });


}

// setInterval(()=>{
//     console.log('test test test')
//     sendPushNotification()
// },500)

sendPushNotification()










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


