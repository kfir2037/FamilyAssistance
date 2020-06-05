import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  Switch,
  ProgressBarAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Header,
  Button,
  ButtonGroup,
} from "react-native-elements";
import Accordion from "../../src/components/Accordion";
import firebase from "../../config/config";
import moment from "moment";
import AwesomeAlert from "react-native-awesome-alerts";
import * as Permissions from 'expo-permissions';
import {Notifications } from 'expo';
// import {Notifications} from 'expo-permissions';
import * as firebasePush from 'firebase'; 

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
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  async UNSAFE_componentWillMount() {
    // await this.getTasks();
    await this.getCustomTasks();
  }

  componentDidMount() {
    this.registerForPushNotification()
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
    let token = await Notifications.getExpoPushTokenAsync();
    console.log('123123123: ', token)
    const user = firebase.auth().currentUser.uid;
 
    var userDoc = firebase.firestore().collection('users').doc(user)
    var addTokenToUser = userDoc.set({  
      pushNotificationToken:token
    },{merge:true});

  }
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
      .catch((error) => { });
    if (isDone) {
      console.log(
        "this.state.numberOftasksDone+1: ",
        this.state.numberOftasksDone + 1
      );
      console.log("this.state.numberOftasks: ", this.state.numberOftasks);
      if ((this.state.numberOftasksDone + 1) / this.state.numberOftasks >= 0.6 && (this.state.numberOftasksDone + 1) / this.state.numberOftasks != 1) {
        console.log("111");
        this.setState({
          numberOftasksDone: this.state.numberOftasksDone + 1,
          textForAlert: "אתה בדרך הנכונה, כל הכבוד!",
        });
        this.showAlert();
      } else if ((this.state.numberOftasksDone + 1) / this.state.numberOftasks == 1) {
        console.log("2222");
        this.setState({
          numberOftasksDone: this.state.numberOftasksDone + 1,
          textForAlert: "סיימת את המשימות להיום, כל הכבוד!",
        });
        this.showAlert();
      }

      else {
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
      });
  }
  render() {
    const { showAlert } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            {/* <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              // progress={tasks / tasksDone}
              progress={this.state.numberOftasksDone / this.state.numberOftasks}
            /> */}
            <Accordion
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
              message="אתה בדרך הנכונה!"
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
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8b96d9",
    // alignItems: 'center',
    justifyContent: "center",
    paddingTop: 15,
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
    textAlign: "left",
  },
});
