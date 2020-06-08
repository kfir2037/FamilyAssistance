import React from 'react';
import { StyleSheet } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import AppDrawerNavigator from './navigations/ParentsNavigations/AppDrawerNavigator';
import SwDrawerNavigator from './navigations/SwNavigations/SwDrawerNavigator';
import KidsDrawerNavigator from './navigations/KidsNavigations/KidsDrawerNavigator';
import loadingScreen from './screens/loadingScreen';
import firebase from './config/config';
import moment from 'moment';

class App extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

export default App;

const AppSwitchNavigator = createSwitchNavigator({
  loading: loadingScreen,
  Welcome: {
    screen: WelcomeScreen,
  },
  ParentsDashboard: {
    screen: AppDrawerNavigator,
  },
  SwDashboard: {
    screen: SwDrawerNavigator
  },
  KidsDashboard: {
    screen: KidsDrawerNavigator
  }
})

const AppContainer = createAppContainer(AppSwitchNavigator);
setTimeout(async function () {
  var morningFirstAlert=1
  var morningSecondsAlert=1
  var noonFirstAlert=1
  var noonSecondsAlert=1
  var afternoonFirstAlert=1
  var afternoonSecondsAlert=1
  var eveningFirstAlert=1
  var eveningSecondsAlert=1

  var minutesToAdd = 30;
  var currentDate2 = new Date();
  var futureDate = new Date(currentDate2.getTime() + minutesToAdd * 60000);
  console.log('futureDate: ', moment(futureDate).format('DD/MM/YYYY HH:MM A'))
  
  
  let morningTasks = firebase
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

  
  let noonTasks2 = firebase
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




  let afternoonTasks = firebase
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


  let eveningTasks = firebase
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





  const currentDate = moment(new Date()).format('DD/MM/YYYY HH:MM A')
  // const add30Minutes = moment(currentDate).add(30,'minutes');
  var add30Minutes = moment(new Date()).add(30, 'minutes')
  add30Minutes = moment(add30Minutes).format('DD/MM/YYYY HH:MM A')
  console.log('currentDate: ', currentDate)
  console.log('add30Minutes: ', add30Minutes)
  const allTasks = await firebase
    .firestore()
    .collection("tasks")
    // .where("familyId", "==", familyId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (!doc.exists) {
          console.log("No such document!!!!!!");
        } else {
          let allData = doc.data();
          if(allData.category=='morning'){
            if(moment(allData.date).format('DD/M/YYYY HH:MM A')){
              console.log('asdf')
            }
          }
        }
      });
    })
    .catch((err)=>{console.log('tasks ',err)})
    


  // const allTasks = await firebase.firestore().collection('tasks').get()
  // allTasks.docs.map(doc=>doc.data())
  // // .then(doc=>{
  // //   var allData = doc.data()
  // //   console.log('allData: ',allData)
  // // })
  // const allUsers = firebase.firestore().collection('users').get()
  // console.log('alltasks: ',allTasks)
  // console.log('allUsers: ',allUsers)
  console.log('two seconds')
}, 500)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
