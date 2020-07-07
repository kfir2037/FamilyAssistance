import React, { useEffect } from 'react';
import { StyleSheet, I18nManager } from 'react-native';
import { useFonts } from '@use-expo/font';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import AppDrawerNavigator from './navigations/ParentsNavigations/AppDrawerNavigator';
import SwDrawerNavigator from './navigations/SwNavigations/SwDrawerNavigator';
import KidsDrawerNavigator from './navigations/KidsNavigations/KidsDrawerNavigator';
import loadingScreen from './screens/loadingScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import { AppLoading } from 'expo';
import firebase from './config/config';
import moment from 'moment';
import { createStackNavigator } from 'react-navigation-stack';

const App = () => {



  const [fontsLoaded] = useFonts({
    'Heebo': require('./assets/fonts/Heebo-VariableFont_wght.ttf'),
  });

  console.log('isRTL: ', I18nManager.isRTL);
  I18nManager.allowRTL(false);
  // const messaging = firebase.messaging();
  // messaging.usePublicVapidKey('BCeJeaN3JawwJIYicC7n4cNkvfSdxkRuSjkXkiX_lvksdWks0bddHh39QhWnakxdu4PTMRSYKmU4BYhIAAViv10');

  return (
    <AppContainer />
  )

}

export default App;

const AppSwitchNavigator = createSwitchNavigator({
  loading: loadingScreen,
  WelcomeFlow:
    createStackNavigator({
      Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
          header: null
        }
      },
      // ForgotPassword: {
      //   screen: ForgotPasswordScreen,
      //   navigationOptions: {
      //     headerStyle: {
      //       backgroundColor: '#e0aa00'
      //     }
      //   }
      // }
    }

    ),
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
// setTimeout(async function () {
//   var morningFirstAlert = 1
//   var morningSecondsAlert = 1
//   var noonFirstAlert = 1
//   var noonSecondsAlert = 1
//   var afternoonFirstAlert = 1
//   var afternoonSecondsAlert = 1
//   var eveningFirstAlert = 1
//   var eveningSecondsAlert = 1

//   var currentDate2 = new Date();

//   let morningTasks = firebase
//     .firestore()
//     .collection("RoutineTasks")
//     .doc("morning");

//   let getDoc = morningTasks
//     .get()
//     .then((doc) => {
//       if (!doc.exists) {
//         console.log("No such document!");
//       } else {
//         let allData = doc.data();
//         morningFirstAlert = allData.beforeAlertTime
//         morningSecondsAlert = allData.afterAlertTime

//       }
//     })
//     .catch((err) => {
//       console.log("Error getting document", err);
//     });


//   let noonTasks2 = firebase
//     .firestore()
//     .collection("RoutineTasks")
//     .doc("noon");

//   let getDoc22 = noonTasks2
//     .get()
//     .then((doc) => {
//       if (!doc.exists) {
//         console.log("No such document!");
//       } else {
//         let allData = doc.data();
//         noonFirstAlert = allData.beforeAlertTime
//         noonSecondsAlert = allData.afterAlertTime
//       }
//     })
//     .catch((err) => {
//       console.log("Error getting document", err);
//     });




//   let afternoonTasks = firebase
//     .firestore()
//     .collection("RoutineTasks")
//     .doc("afterNoon");

//   let getDoc3 = afternoonTasks
//     .get()
//     .then((doc) => {
//       if (!doc.exists) {
//         console.log("No such document!");
//       } else {
//         let allData = doc.data();
//         afternoonFirstAlert = allData.beforeAlertTime
//         afternoonSecondsAlert = allData.afterAlertTime
//       }
//     })
//     .catch((err) => {
//       console.log("Error getting document", err);
//     });


//   let eveningTasks = firebase
//     .firestore()
//     .collection("RoutineTasks")
//     .doc("evening");

//   let getDoc4 = eveningTasks
//     .get()
//     .then((doc) => {
//       if (!doc.exists) {
//         console.log("No such document!");
//       } else {
//         let allData = doc.data();
//         eveningFirstAlert = allData.beforeAlertTime
//         eveningSecondsAlert = allData.afterAlertTime
//       }
//     })
//     .catch((err) => {
//       console.log("Error getting document", err);
//     });





//   const currentDate = moment(new Date()).format('DD/MM/YYYY HH:mm')
//   var add30Minutes = moment(new Date()).add(30, "minutes")
//   add30Minutes = moment(add30Minutes).format('DD/MM/YYYY HH:mm A')

//   const allTasks = await firebase
//     .firestore()
//     .collection("tasks")
//     // .where("familyId", "==", familyId)
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         if (!doc.exists) {
//           console.log("No such document!!!!!!");
//         } else {
//           let allData = doc.data();
//           if (allData.category == 'morning') {
//             // console.log('allData.date.seconds: ', allData.date.seconds * 1000)

//             const taskDate = moment(allData.date.seconds * 1000).format('DD/MM/YYYY HH:mm');
//             const taskDateOnlyDate = moment(allData.date.seconds * 1000).format('DD/MM/YYYY');
//             // const taskDateOnlyTime = moment(allData.date.seconds * 1000).format('HH:mm');
//             const currentDateOnlyDate = moment(new Date()).format('DD/MM/YYYY');
//             // const currentDateOnlyTime = moment(new Date()).format('HH:mm');

//             // console.log('taskDate123: ', taskDate)
//             // console.log('taskDateOnlyDate: ', taskDateOnlyDate)
//             // console.log('currentDateOnlyDate: ', currentDateOnlyDate)
//             if (taskDateOnlyDate == currentDateOnlyDate) {
//               console.log('same date')
//               // const timeOfAlert = moment(currentDate).add(morningFirstAlert + 5, 'minutes').add(2, 'hours').format('HH:mm')
//               const timeOfAlert = moment(currentDate).add(morningFirstAlert + 5, 'minutes').format('MM/DD/YYYY HH:mm')
//               const timeOfAlert2 = moment(currentDate).add(morningFirstAlert, 'minutes').format('MM/DD/YYYY HH:mm')
//               const timeOfAlert3 = moment(currentDate).add(morningSecondsAlert + 5, 'minutes').format('MM/DD/YYYY HH:mm')
//               const timeOfAlert4 = moment(currentDate).add(morningSecondsAlert, 'minutes').format('MM/DD/YYYY HH:mm')
//               // console.log('timeOfAlert11111111: ', timeOfAlert)
//               // console.log('timeOfAlert22222222: ', timeOfAlert2)
//               // console.log('currentDateOnlyDate: ', currentDateOnlyDate)
//               // console.log('currentDateOnlyTime: ', currentDateOnlyTime)
//               // console.log('taskDate: ', taskDate)
//               // console.log('taskDateOnlyTime: ', taskDateOnlyTime)
//               // console.log('timeOfAlert: ', timeOfAlert)
//               // console.log('timeOfAlert2: ', timeOfAlert2)
//               // console.log('morningFirstAlert: ', morningFirstAlert)
//               // var testDate = '2009-12-31'
//               // var testTime = ' 09:57'
//               // var test123 = testDate + testTime
//               // console.log('test123: ', test123)

//               // if (moment(test123).isAfter('2009-12-31 09:58')) {
//               //   console.log('kfir kfirrrr')
//               // }
//               // console.log('taskDate:::::::: ', taskDate)
//               // console.log('timeOfAlert2::::::: ', timeOfAlert2)
//               // console.log('timeOfAlert:::::::: ', timeOfAlert)


//               if (moment(taskDate).isAfter(timeOfAlert2)  && moment(taskDate).isBefore(timeOfAlert)) {
//                 console.log('needs to send push notification - alert number 1')
//               }
//               else if (moment(taskDate).isAfter(timeOfAlert4)  && moment(taskDate).isBefore(timeOfAler3)) {
//                 console.log('needs to send push notification - alert number 2')
//               }
//             }
//           }
//         }
//       });
//     })
//     .catch((err) => { console.log('tasks ', err) })



//   const allTasks = await firebase.firestore().collection('tasks').get()
//   allTasks.docs.map(doc=>doc.data())
//   // .then(doc=>{
//   //   var allData = doc.data()
//   //   console.log('allData: ',allData)
//   // })
//   const allUsers = firebase.firestore().collection('users').get()
//   console.log('alltasks: ',allTasks)
//   console.log('allUsers: ',allUsers)
//   console.log('two seconds')
// }, 500)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
