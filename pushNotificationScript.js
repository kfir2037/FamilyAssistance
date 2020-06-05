
// import firebase from './config/config';

const firebase = require('./config/config')


const allTasks = firebase.firestore().collection('tasks')
const allUsers = firebase.firestore().collection('users')
console.log('test')