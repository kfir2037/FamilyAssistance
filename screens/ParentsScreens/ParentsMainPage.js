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
      numberOftasks: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  async UNSAFE_componentWillMount() {
    await this.getTasks();
    await this.getCustomTasks();
    // console.log('alltasks222: ',this.state.allTasks)
  }

  getCustomTasks = async () => {
    var user = firebase.auth().currentUser.uid;
    var currentDate = moment(new Date()).format("DD/MM/YYYY");
    var morningTasks = [];
    var noonTasks = [];
    var afternoonTasks = [];
    var eveningTasks = [];
    const swFamilies = await firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", user)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let timeFromTheServer = moment("2020-05-22").format("DD/MM/YYYY");

          Object.keys(data).forEach((name) => {
            console.log(name, data[name]);
          });
          if (timeFromTheServer == currentDate) {
            // console.log("same");
            if (data.category == "morning") {
              // console.log("dataaaaaaa:", data);
              morningTasks.push({
                userUid:data.userUid,
                familyId: data.familyId,
                data: data.date,
                category: data.category,
                tasjs:data.tasks,
              });
            } else if (data.category == "noon") {
              // console.log("dataaaaaaa:", data);
              noonTasks.push({
                userUid:data.userUid,
                familyId: data.familyId,
                data: data.date,
                category: data.category,
                tasjs:data.tasks,
              });
            } else if (data.category == "afternoon") {
              // console.log("dataaaaaaa:", data);
              afternoonTasks.push({
                userUid:data.userUid,
                familyId: data.familyId,
                data: data.date,
                category: data.category,
                tasjs:data.tasks,
              });
            } else if (data.category == "evening") {
              // console.log("dataaaaaaa:", data);
              eveningTasks.push({
                userUid:data.userUid,
                familyId: data.familyId,
                data: data.date,
                category: data.category,
                tasjs:data.tasks,
              });
            }
          } else {
            console.log("not same");
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      this.setState({morningTasks:morningTasks,noonTasks:noonTasks,afternoonTasks:afternoonTasks,eveningTasks:eveningTasks})
  };
  // getCustomTasks = async () => {
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
  //         this.setState({ morningTasks: allData, numberOftasks:this.state.numberOftasks+allData.tasks.length });
  //         // allData.tasks.forEach(task=>{
  //         //   if(task)
  //         // })
  //         // console.log("Document data morning: ", this.state.morningTasks);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error getting document", err);
  //     });

  //   let noonTasks = firebase
  //     .firestore()
  //     .collection("RoutineTasks")
  //     .doc("noon");

  //   getDoc = noonTasks
  //     .get()
  //     .then((doc) => {
  //       if (!doc.exists) {
  //         console.log("No such document!");
  //       } else {
  //         let allData = doc.data();

  //         this.setState({ noonTasks: allData, numberOftasks:this.state.numberOftasks+allData.tasks.length });
  //         // console.log("Document data noon: ", this.state.noonTasks);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error getting document", err);
  //     });

  //   let afternoonTasks = firebase
  //     .firestore()
  //     .collection("RoutineTasks")
  //     .doc("afterNoon");
  //   getDoc = afternoonTasks
  //     .get()
  //     .then((doc) => {
  //       if (!doc.exists) {
  //         console.log("No such document!");
  //       } else {
  //         let allData = doc.data();
  //         this.setState({ afternoonTasks: allData, numberOftasks:this.state.numberOftasks+allData.tasks.length });
  //         // console.log("Document data afternoon: ", this.state.afternoonTasks);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error getting document", err);
  //     });

  //   let eveningTasks = firebase
  //     .firestore()
  //     .collection("RoutineTasks")
  //     .doc("evening");
  //   getDoc = eveningTasks
  //     .get()
  //     .then((doc) => {
  //       if (!doc.exists) {
  //         console.log("No such document!");
  //       } else {
  //         let allData = doc.data();
  //         // console.log('allData: ',allData)
  //         // console.log('allDataaaaaaa: ',allData.tasks.length)

  //         this.setState({ eveningTasks: allData, numberOftasks:this.state.numberOftasks+allData.tasks.length });
  //         // console.log("Document data evening: ", this.state.eveningTasks);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error getting document", err);
  //     });
  // };
  getTasks = async () => {
    let date = new Date();
    let currentDate = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    console.log("day: ", currentDate);
    console.log("month: ", currentMonth);
    console.log("year: ", currentYear);

    let taskDay = "";
    let taskMonth = "";
    let taskYear = "";
    let allTasks = [];
    userUid = await firebase.auth().currentUser.uid;
    let UserDoc = await firebase
      .firestore()
      .collection("users")
      .doc(userUid)
      .get();
    let familyId = UserDoc._document.proto.fields.familyId.stringValue;
    console.log("familyId: ", familyId);
    const swFamilies = await firebase
      .firestore()
      .collection("tasks")
      .where("familyId", "==", familyId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let date = doc._document.proto.fields.date.timestampValue;
          console.log("date: ", date);
          taskDay = date[8] + date[9];
          taskMonth = date[5] + date[6];
          taskYear = date[0] + date[1] + date[2] + date[3];
          let fixTaskDay = (parseInt(taskDay) + 1).toString();
          if (parseInt(fixTaskDay) < 10) {
            // console.log(fixTaskDay);
            fixTaskDay = "0" + fixTaskDay;
            // console.log(fixTaskDay);
          }
          // console.log(taskDay);
          // console.log((parseInt(taskDay)+1).toString())
          if (
            fixTaskDay == currentDate &&
            taskMonth == currentMonth &&
            taskYear == currentYear
          ) {
            console.log("enter if");
            allTasks.push(doc._document.proto.fields);
            this.state.numberOftasks++;
          }
          // console.log('doc: ',doc);
          // allFamilies.push(doc);
          // familyObj[doc.id] = Object.assign({}, doc.data());
        });
        // this.setState({ data: allFamilies });
        // console.log('data: ', this.state.data);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    // console.log("allTasks222: ", allTasks);

    this.setState({ allTasks });
  };
  markMission(x) {
    console.log(x);
    console.log("mission done");
  }
  render() {
    // const buttons = ['שבת', 'שישי', 'חמישי','רביעי','שלישי','שני','ראשון',]
    // const { selectedIndex } = this.state
    // console.log('alltasks: ',this.state.allTasks)
    // for(i in this.state.allTasks){
    //   console.log(i)
    // }
    console.log("dsdsdasd", this.state.morningTasks.length);
    // if((this.state.eveningTasks&&this.state.eveningTasks.length==0)){
    //   return <ActivityIndicator/>
    // }
    // console.log('allTaskssss: ',this.state.allTasks.length)
    console.log("tasksDaone: ", this.state.numberOftasks);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            {/* <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 50,borderRadius:6} }
            /> */}

            {/* <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={numberOftasks/allTasks.length}
              />             */}

            {/* { tasks } */}

            <Accordion
              allTasks={this.state.allTasks}
              morningTasks={this.state.morningTasks}
              noonTasks={this.state.noonTasks}
              afternoonTasks={this.state.afternoonTasks}
              eveningTasks={this.state.eveningTasks}
              customTasks={this.state.allTasks}
              markMission={this.markMission.bind(this)}
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
