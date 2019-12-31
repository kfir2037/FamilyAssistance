import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from '@expo/vector-icons/Ionicons';
import WelcomeScreen from './screens/WelcomeScreen';
import DashboardScreen from './screens/ParentsScreens/DashboardScreen';
import WatchTasks from './screens/swScreens/WatchTasks';
import KidsWatchTasks from './screens/kidsScreens/KidsWatchTasks';
import AddNewFamily from './screens/swScreens/AddNewFamily';
import WatchFamilies from './screens/swScreens/WatchFamilies';
import DashboardTabNavigator from './navigations/ParentsNavigations/DashboardTabNavigator';
import DashboardStackNavigator from './navigations/ParentsNavigations/DashboardStackNavigator';
import AppDrawerNavigator from './navigations/ParentsNavigations/AppDrawerNavigator';
import WatchTasksStackNavigator from './navigations/ParentsNavigations/WatchTasksStackNavigator';
import SwAddNewFamilyStackNavigator from './navigations/SwNavigations/SwAddNewFamilyStackNavigator';
import SwWatchFamiliesStackNavigator from './navigations/SwNavigations/SwWatchFamiliesStackNavigator';
import SwDrawerNavigator from './navigations/SwNavigations/SwDrawerNavigator';
import {KidsStackNavigator} from './navigations/KidsNavigations/KidsStackNavigator'
import KidsDrawerNavigator from './navigations/KidsNavigations/KidsDrawerNavigator';


class App extends React.Component{
  render(){
    return(
        <AppContainer/>
    )   
  }
}
export default App


//kfir2 


const AppSwitchNavigator = createSwitchNavigator({
  Welcome:{ 
    screen:WelcomeScreen,
  },
  Dashboard:{
    screen:AppDrawerNavigator,
  },
  SwDashboard:{
    screen:SwDrawerNavigator
  },
  KidsDashboard:{
    screen:KidsDrawerNavigator
  }
})

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var ObjectId = require('mongodb').ObjectID;
// var url = 'mongodb://family-assistance-cosmos-db:xVaN8YmydxMp851gvxXZxwTjXYgeOeM2SDdiYGrTQrNcrM6SJIBKxZpvvSNlH8IPyf1XjWcJFSY57Qf5bBVsSw==@family-assistance-cosmos-db.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';

// var insertDocument = function(db, callback) {
// db.collection('families').insertOne( {
//         "id": "AndersenFamily",
//         "lastName": "Andersen",
//         "parents": [
//             { "firstName": "Thomas" },
//             { "firstName": "Mary Kay" }
//         ],
//         "children": [
//             { "firstName": "John", "gender": "male", "grade": 7 }
//         ],
//         "pets": [
//             { "givenName": "Fluffy" }
//         ],
//         "address": { "country": "USA", "state": "WA", "city": "Seattle" }
//     }, function(err, result) {
//     assert.equal(err, null);
//     console.log("Inserted a document into the families collection.");
//     callback();
// });
// };

// var findFamilies = function(db, callback) {
// var cursor =db.collection('families').find( );
// cursor.each(function(err, doc) {
//     assert.equal(err, null);
//     if (doc != null) {
//         console.dir(doc);
//     } else {
//         callback();
//     }
// });
// };

// var updateFamilies = function(db, callback) {
// db.collection('families').updateOne(
//     { "lastName" : "Andersen" },
//     {
//         $set: { "pets": [
//             { "givenName": "Fluffy" },
//             { "givenName": "Rocky"}
//         ] },
//         $currentDate: { "lastModified": true }
//     }, function(err, results) {
//     console.log(results);
//     callback();
// });
// };

// var removeFamilies = function(db, callback) {
// db.collection('families').deleteMany(
//     { "lastName": "Andersen" },
//     function(err, results) {
//         console.log(results);
//         callback();
//     }
// );
// };

// MongoClient.connect(url, function(err, client) {
// assert.equal(null, err);
// var db = client.db('familiesdb');
// insertDocument(db, function() {
//     findFamilies(db, function() {
//     updateFamilies(db, function() {
//         removeFamilies(db, function() {
//             client.close();
//         });
//     });
//     });
// });
// });