import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
  Platform,
  RefreshControl,
  ProgressBarAndroid
} from "react-native";
import Accordion2 from "../../src/components/Accordion";
import firebase from "../../config/config";
import moment from "moment-timezone";
import AwesomeAlert from "react-native-awesome-alerts";
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
//import * as firebasePush from 'firebase';

export default class ParentsMainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 2,
      allTasks: [],
      morningTasks: [],
      noonTasks: [],
      afternoonTasks: [],
      eveningTasks: [],
      customTasks: [],
      numberOftasks: 1,
      numberOftasksDone: 1,
      showAlert: false,
      loadingTasks: true,
      refreshing: false
    };
    this.updateIndex = this.updateIndex.bind(this);


  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  async UNSAFE_componentWillMount() {
    // await this.getTasks();
    //await this.getCustomTasks();
  }

  async componentDidMount() {
    this.registerForPushNotification();
    await this.getCustomTasks();

    const currentTime = moment(new Date());
    console.log('currentTime: ', currentTime.format('HH:mm'));
    const currentTimePlusFive = moment(new Date()).add(5, 'minutes');
    console.log('currentTimePlusFive: ', currentTimePlusFive.format('HH:mm'));

    const betweenTime = moment(new Date()).add(3, 'minutes');
    console.log('betweenTime: ', betweenTime.format('HH:mm'));
    console.log(betweenTime.isBetween(currentTime, currentTimePlusFive));
    console.log('date string: ', moment(new Date()).set({ hour: parseInt('15'), minute: parseInt('00') }))

    const currentDate = moment(new Date()).tz('Asia/Tel_Aviv');
    console.log('currentDate for the query: ', currentDate.format('YYYY/MM/DD 00:01'));
    console.log('currentDate for the query: ', new Date(currentDate.format('YYYY/MM/DD 00:01')));


    // firebase.firestore().collection('tasks')
    //   .where("date", ">=", new Date(currentTime.format("YYYY/MM/DD HH:mm")))
    //   .get()
    //   .then(snap => {
    //     snap.forEach(doc => {
    //       console.log(moment.tz(new Date(doc.data().date.seconds * 1000),"Asia/Tel_Aviv").format());
    //     });
    //   })
    //   .catch(err => {
    //     console.log('query Error: ', err)
    //   })


  }

  registerForPushNotification = async () => {

    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;
    console.log('finalStatus ', finalStatus)

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    console.log('token: ', token);
    // .then(() => { console.log('token: ', token) })
    // .catch((err) => { console.log('getExpoPushTokenAsync Error: ', err) })


    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('tasks', {
        name: 'tasks',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
      console.log('created android push channel');
    }

    const user = firebase.auth().currentUser.uid;

    var userDoc = firebase.firestore().collection('users').doc(user)
    if (token) {
      var addTokenToUser = userDoc.set({
        pushNotificationToken: token
      }, { merge: true })
        .then(() => { console.log('Added token to User') })
        .catch((err) => { console.log('Adding Token Error ', err) });
    }

  };

  getCustomTasks = async () => {
    var user = firebase.auth().currentUser.uid;
    var currentDate = moment(new Date()).format("DD/MM/YYYY");
    var morningTasks = [];
    var noonTasks = [];
    var afternoonTasks = [];
    var eveningTasks = [];
    var customTasks = [];
    let taskId = "";
    var numberOftasks = 0;
    var numberOftasksDone = 0;
    console.log("user: ", user);
    const swFamilies = await firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", user)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          taskId = doc.id;

          let timeFromTheServer = moment(
            new Date(data.date.seconds * 1000)
          ).format("DD/MM/YYYY");

          if (timeFromTheServer == currentDate) {
            if (data.category == "morning") {
              numberOftasks = numberOftasks + 1;
              if (data.isDone == true) {
                numberOftasksDone = numberOftasksDone + 1;
              }
              morningTasks.push({
                userUid: data.userUid,
                familyId: data.familyId,
                data: data.date,
                category: data.category,
                tasks: data.tasks,
                taskId: taskId,
                isDone: data.isDone,
              });
              console.log("added to morning tasks");
            } else if (data.category == "noon") {
              numberOftasks = numberOftasks + 1;
              if (data.isDone == true) {
                numberOftasksDone = numberOftasksDone + 1;
              }
              noonTasks.push({
                userUid: data.userUid,
                familyId: data.familyId,
                data: data.date,
                category: data.category,
                tasks: data.tasks,
                taskId: taskId,
                isDone: data.isDone,
              });
              console.log("added to noon tasks");
            } else if (data.category == "afternoon") {
              numberOftasks = numberOftasks + 1;
              if (data.isDone == true) {
                numberOftasksDone = numberOftasksDone + 1;
              }
              afternoonTasks.push({
                userUid: data.userUid,
                familyId: data.familyId,
                data: data.date,
                category: data.category,
                tasks: data.tasks,
                taskId: taskId,
                isDone: data.isDone,
              });
              console.log("added to afternoon tasks");
            } else if (data.category == "evening") {
              numberOftasks = numberOftasks + 1;
              if (data.isDone == true) {
                numberOftasksDone = numberOftasksDone + 1;
              }
              eveningTasks.push({
                userUid: data.userUid,
                familyId: data.familyId,
                data: data.date,
                category: data.category,
                tasks: data.tasks,
                taskId: taskId,
                isDone: data.isDone,
              });
              console.log("added to evening tasks");
            } else if (data.category == "custom tasks") {
              numberOftasks = numberOftasks + 1;
              if (data.isDone == true) {
                numberOftasksDone = numberOftasksDone + 1;
              }
              customTasks.push({
                userUid: data.userUid,
                familyId: data.familyId,
                data: data.date,
                category: data.category,
                tasks: data.tasks,
                taskId: taskId,
                isDone: data.isDone,
              });
              console.log("added to custom tasks");
            }
          } else {
            console.log("not same");
          }

        });
        this.setState({ refreshing: false })
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    // console.log("numberOftasks2222: ", this.state.numberOftasks);
    // console.log("numberOftasksDone22222: ", this.state.numberOftasksDone);
    this.setState({
      morningTasks: morningTasks,
      noonTasks: noonTasks,
      afternoonTasks: afternoonTasks,
      eveningTasks: eveningTasks,
      customTasks: customTasks,
      numberOftasks: numberOftasks,
      numberOftasksDone: numberOftasksDone,
      loadingTasks: false
    });
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  async markMission(task) {
    // this.showAlert()
    console.log('task: ', task)
    var isDone;
    await firebase
      .firestore()
      .collection("tasks")
      .doc(task)
      .get()
      .then((doc) => {
        var data = doc.data();
        isDone = data.isDone;
      })
      .catch((error) => {
        console.log('GETTING TASKS ERROR ', error);
      });
    if (!isDone) {
      console.log(
        "this.state.numberOftasksDone+1: ",
        this.state.numberOftasksDone + 1
      );
      console.log("this.state.numberOftasks: ", this.state.numberOftasks);
      var tasksPercentDone = (this.state.numberOftasksDone + 1) / (this.state.numberOftasks)
      console.log('tasksPercentDone: ', tasksPercentDone)
      var notAllTasks = (this.state.numberOftasksDone + 1) / (this.state.numberOftasks)
      console.log('notAllTasks: ', notAllTasks)

      if (tasksPercentDone >= 0.6 && notAllTasks != 1) {
        console.log("111");
        this.setState({
          numberOftasksDone: this.state.numberOftasksDone + 1,
          textForAlert: "אתה בדרך הנכונה, כל הכבוד!",
        });
        this.showAlert();
      } else if (tasksPercentDone == 1) {
        console.log("2222");
        this.setState({
          numberOftasksDone: this.state.numberOftasksDone + 1,
          textForAlert: "סיימת את המשימות להיום, כל הכבוד!",
        });
        this.showAlert();
      }

      else {
        console.log('4444')
        this.setState({ numberOftasksDone: this.state.numberOftasksDone + 1 });
      }
      console.log("count+1");
    } else {
      this.setState({ numberOftasksDone: this.state.numberOftasksDone - 1 });
      console.log("count-1");
    }
    await firebase
      .firestore()
      .collection("tasks")
      .doc(task)
      .update({
        isDone: !isDone,
      })
      .then(() => { console.log('updated') })
      .catch(() => { console.log('update error ') })


  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getCustomTasks();
  }

  render() {

    const { showAlert } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground style={{ height: '100%', width: '100%' }} source={require('../../assets/new_background08.png')}>
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              enabled
              colors={['#e0aa00']}
            />
          }>
            <Image style={styles.image} source={require('../../src/images/30456.jpg')} />
            <View style={styles.container}>
              {this.state.loadingTasks
                ? <ActivityIndicator size={40} color='#e0aa00' style={{ marginTop: 10 }} />
                : <View style={styles.container}>
                  {Platform.OS == 'android'
                    ? <ProgressBarAndroid
                      styleAttr="Horizontal"
                      indeterminate={false}
                      // progress={tasks / tasksDone}

                      progress={this.state.numberOftasksDone / this.state.numberOftasks}
                    />
                    : null
                  }
                  <Accordion2
                    allTasks={this.state.allTasks}
                    morningTasks={this.state.morningTasks}
                    noonTasks={this.state.noonTasks}
                    afternoonTasks={this.state.afternoonTasks}
                    eveningTasks={this.state.eveningTasks}
                    customTasks={this.state.customTasks}
                    markMission={this.markMission.bind(this)}
                  />
                  <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="כל הכבוד"
                    // message="אתה בדרך הנכונה!"
                    message={this.state.textForAlert}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="סגור"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                      this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                      this.hideAlert();
                    }}
                  />
                </View>}
            </View>

          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#b5bef5",
    // alignItems: 'center',
    justifyContent: "center",
    //paddingTop: 5,
  },
  days: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 45,
    marginLeft: 6,
  },
  text: {
    fontSize: 30,
  },
  task: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    backgroundColor: "#9ec3ff",
    marginBottom: 10,
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
  field: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 0.5,
    flexDirection: "row-reverse",
    margin: 7,
    borderRadius: 4,
  },
  temp: {
    flex: 1,
    textAlign: "right",
  },
  image: {
    width: '100%',
    height: 220,

  },
});
