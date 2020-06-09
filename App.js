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
  var morningFirstAlert = 1
  var morningSecondsAlert = 1
  var noonFirstAlert = 1
  var noonSecondsAlert = 1
  var afternoonFirstAlert = 1
  var afternoonSecondsAlert = 1
  var eveningFirstAlert = 1
  var eveningSecondsAlert = 1

  var currentDate2 = new Date();
  var futureDate = moment(new Date(currentDate2.getTime() + 1800000)).format('DD/MM/YYYY HH:MM A');

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





  const currentDate = moment(new Date()).format('DD/MM/YYYY HH:mm')
  var add30Minutes = moment(new Date()).add(30, "minutes")
  add30Minutes = moment(add30Minutes).format('DD/MM/YYYY HH:mm A')

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
          if (allData.category == 'morning') {
            console.log('allData.date.seconds: ', allData.date.seconds * 1000)

            const taskDate = moment(allData.date.seconds * 1000).format('DD/M/YYYY HH:mm');
            const taskDateOnlyDate = moment(allData.date.seconds * 1000).format('DD/M/YYYY');
            const taskDateOnlyTime = moment(allData.date.seconds * 1000).format('HH:mm');
            const currentDateOnlyDate = moment(new Date()).format('DD/M/YYYY');
            const currentDateOnlyTime = moment(new Date()).format('HH:mm');
            const test = new Date();


            if (taskDateOnlyDate == currentDateOnlyDate) {
              console.log('same date')
              // const timeOfAlert = moment(currentDate).add(morningFirstAlert + 5, 'minutes').add(2, 'hours').format('HH:mm')
              const timeOfAlert = moment(currentDate).add(morningFirstAlert + 5, 'minutes').format('HH:mm')
              const timeOfAlert2 = moment(currentDate).add(morningFirstAlert, 'minutes').format('HH:mm')
              console.log('currentDateOnlyDate: ',currentDateOnlyDate)
              console.log('currentDateOnlyTime: ',currentDateOnlyTime)
              console.log('taskDate: ', taskDate)
              console.log('taskDateOnlyTime: ', taskDateOnlyTime)
              console.log('timeOfAlert: ', timeOfAlert)
              console.log('timeOfAlert2: ', timeOfAlert2)
              console.log('morningFirstAlert: ', morningFirstAlert)

              if (taskDateOnlyTime >= timeOfAlert2 && taskDateOnlyTime <= timeOfAlert) {
                console.log('asdf')
              }
            }
          }
        }
      });
    });


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
