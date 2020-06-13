import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
// import { Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import NumericInput from "react-native-numeric-input";
import Tabs from "react-native-tabs";
import Task from "./Task";
import firebase from "../../config/config";
import { Select, Option } from "react-native-select-lists";
import SelectableFlatlist, { STATE } from "react-native-selectable-flatlist";
import { FontAwesome } from "@expo/vector-icons";
//const FieldValue = require('firebase-admin').firestore.FieldValue;


export default class Settings extends Component {
  constructor(props) {
    super(props);
    let morningTasks = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("morning");

    this.state = {
      page: "",
      tasks: [],
      morningTasks: [],
      noonTasks: [],
      afternoonTasks: [],
      eveningTasks: [],
      data: [],
      taskToAdd: "",
      taskDeleteSelected: "",
      alertBeforeMorning: "",
      alertBeforeNoon: "",
      alertBeforeAfternoon: "",
      alertBeforeEvening: "",
      alertAfterMorning: "",
      alertAfterNoon: "",
      alertAfterAfternoon: "",
      alertAfterEvening: "",
      isReady: false,
      newMorningTask: '',
      newNoonTask: '',
      newAfternoonTask: '',
      newEveningTask: '',
    };
  }

  componentDidMount() {
    console.log("1");
    let tasks = this.getTasks();
    this.setState({ isReady: true });
    // const socialWorkerUid = firebase.auth().currentUser['uid'];
    // console.log('socialWorkerId ' + socialWorkerUid);
    // let familyObj = {}

    // const swFamilies = await firebase
    // .firestore()
    // .collection('families')
    // .where('swInCharge', '==', socialWorkerUid)
    // .get()
    // .then(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     allFamilies.push(doc);
    //     familyObj[doc.id] = Object.assign({}, doc.data());
    //   });
    //   this.setState({ data: allFamilies });
    //   // console.log('data: ', this.state.data);
    // })
    // .catch(error => {
    //   console.log("Error getting documents: ", error);
    // });
  }

  getTasks = async () => {
    // YellowBox.ignoreWarnings(['Setting a timer']);
    // const familyId = this.props.navigation.state.params.familyId;

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
          console.log("alert ", allData.beforeAlertTime);
          console.log(
            "statetpeof:33333 ",
            typeof this.state.alertBeforeMorning
          );
          this.setState({
            morningTasks: allData.tasks,
            alertBeforeMorning: allData.beforeAlertTime,
            alertAfterMorning: allData.afterAlertTime,
          });
          console.log("statetpeof: ", typeof this.state.alertBeforeMorning);
          // console.log('Document data:', this.state.morningTasks);
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });

    let noonTasks = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("noon");
    getDoc = noonTasks
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let allData = doc.data();
          this.setState({
            noonTasks: allData.tasks,
            alertBeforeNoon: allData.beforeAlertTime,
            alertAfterNoon: allData.afterAlertTime,
          });
          // console.log('Document data:', this.state.noonTasks);
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });

    let afternoonTasks = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("afterNoon");
    getDoc = afternoonTasks
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let allData = doc.data();
          this.setState({
            afternoonTasks: allData.tasks,
            alertBeforeAfternoon: allData.beforeAlertTime,
            alertAfterAfternoon: allData.afterAlertTime,
          });
          // console.log('Document data:', this.state.afternoonTasks);
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });

    let eveningTasks = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("evening");
    getDoc = eveningTasks
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let allData = doc.data();
          this.setState({
            eveningTasks: allData.tasks,
            alertBeforeEvening: allData.beforeAlertTime,
            alertAfterEvening: allData.afterAlertTime,
          });
          // console.log('Document data:', this.state.eveningTasks);
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });

    return null;
  };

  changeTasksToCategory = (el) => {
    // console.log(el.props.name)
    if (el.props.name == "בוקר") {
      this.setState({ tasks: this.state.morningTasks });
    } else if (el.props.name == "צהריים") {
      // this.setState({ tasks: this.tasks2 })
      this.setState({ tasks: this.state.noonTasks });
    } else if (el.props.name == "אחר הצהריים") {
      // this.setState({ tasks: this.tasks3 })
      this.setState({ tasks: this.state.afternoonTasks });
    } else if (el.props.name == "ערב") {
      // this.setState({ tasks: this.tasks4 })
      this.setState({ tasks: this.state.eveningTasks });
    }

    this.setState({ page: el.props.name });
    console.log("tasks: ", this.state.tasks);
  };

  itemsSelected = (selectedItem) => {
    console.log("select: ", selectedItem);
    if (typeof selectedItem[0] === "undefined") {
      console.log("selected still undefined");
    } else {
      console.log("selected: ", selectedItem[0]);
      this.setState({ taskDeleteSelected: selectedItem[0] });
    }
  };

  saveAlerts = () => {
    const swFamilies = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("morning")
      .update({
        beforeAlertTime: this.state.alertBeforeMorning,
        afterAlertTime: this.state.alertAfterMorning,
      });
    const swFamilies2 = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("noon")
      .update({
        beforeAlertTime: this.state.alertBeforeNoon,
        afterAlertTime: this.state.alertAfterNoon,
      });
    const swFamilies3 = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("afterNoon")
      .update({
        beforeAlertTime: this.state.alertBeforeAfternoon,
        afterAlertTime: this.state.alertAfterAfternoon,
      });
    const swFamilies4 = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("evening")
      .update({
        beforeAlertTime: this.state.alertBeforeEvening,
        afterAlertTime: this.state.alertAfterEvening,
      });
  };
  saveNewTasks = () => {
    console.log('44444444')
    let addTasks = firebase.functions().httpsCallable("addRoutineTasks");
    console.log('55555555555')
    let data = {
      newMorningTask : this.state.newMorningTask,
      newNoonTask : this.state.newNoonTask,
      newAfternoonTask : this.state.newAfternoonTask,
      newEveningsTask : this.state.newEveningsTask,
    };
    console.log('saveNewTasks')
    addTasks(data);
  }

  deleteTask = () => {
    console.log("task to delete: ", this.state.taskDeleteSelected);
    //deleteTask2(this.state.taskDeleteSelected)
    let deleteTask = firebase.functions().httpsCallable("deleteTask2");
    if (this.state.page == "בוקר") {
      let data = {
        taskToDelete: this.state.taskDeleteSelected,
        docName: "morning",
      };
      deleteTask(data);
      // doc.update({"tasks":FieldValue.arrayRemove(this.state.taskDeleteSelected)});
      // firebase.functions().httpsCallable()("deleteTask2")(
      //   this.state.taskDeleteSelected
      // );
      console.log("2222");
    } else if (this.state.page == "צהריים") {
      let data = {
        taskToDelete: this.state.taskDeleteSelected,
        docName: "noon",
      };
      deleteTask(data);
    } else if (this.state.page == "אחר הצהריים") {
      let data = {
        taskToDelete: this.state.taskDeleteSelected,
        docName: "afterNoon",
      };
      deleteTask(data);
    } else if (this.state.page == "ערב") {
      let data = {
        taskToDelete: this.state.taskDeleteSelected,
        docName: "evening",
      };
      deleteTask(data);
    }
  };

  addTask = (taskType) => {
    let addTask = firebase.functions().httpsCallable("addTask");
    addTask(taskType);
  };
  test = () => {
    console.log("testtttt ", this.state.alertBeforeMorning);
  };

  rowItem = (item) => {
    console.log("item :", item);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#b5bef5",
          //borderWidth: 1,
          alignItems: "flex-end",
          justifyContent: "center",
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderColor: "#767ead",
        }}
      >
        {/* <Text>HI</Text> */}
        <Text>{item}</Text>
      </View>
    );
  };

  render() {
    if (
      this.state.alertBeforeMorning == "" ||
      this.state.alertBeforeNoon == "" ||
      this.state.alertBeforeAfternoon == "" ||
      this.state.alertBeforeEvening == "" ||
      this.state.alertAfterMorning == "" ||
      this.state.alertAfterNoon == "" ||
      this.state.alertAfterAfternoon == "" ||
      this.state.alertAfterEvening == ""
    ) {
      return <ActivityIndicator />;
    }
    // var x
    // console.log('alertBeforeMorning ',this.state.alertBeforeMorning)
    // if(this.state.alertBeforeMorning==''){
    //     x=22;
    // }
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text>הגדרות</Text>
          </View>
          <View>
            <Text>כמה דקות לפני יקבלו התרעה</Text>
          </View>
          <View>
            <View style={styles.fields}>
              <Text style={styles.text}>בוקר</Text>
              <View style={styles.numbers}>
                {/* <NumericInput2
                                type='decimal'
                                // decimalPlaces={5}
                                value={this.state.alertBeforeMorning}
                                onUpdate={(value) => setValue(value)}
                                /> */}
                <NumericInput
                  value={this.state.alertBeforeMorning}
                  onChange={(value) =>
                    this.setState({ alertBeforeMorning: value })
                  }
                  // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                  totalWidth={140}
                  totalHeight={35}
                  iconSize={25}
                  step={1}
                  valueType="real"
                  rounded
                  textColor="#B0228C"
                  iconStyle={{ color: "white" }}
                  rightButtonBackgroundColor="#EA3788"
                  leftButtonBackgroundColor="#E56B70"
                />
              </View>
            </View>
            <View style={styles.fields}>
              <Text style={styles.text}>צהריים</Text>
              <View style={styles.numbers}>
                <NumericInput
                  value={this.state.alertBeforeNoon}
                  onChange={(value) =>
                    this.setState({ alertBeforeNoon: value })
                  }
                  // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                  totalWidth={140}
                  totalHeight={35}
                  iconSize={25}
                  maxValue={60}
                  step={1}
                  valueType="real"
                  rounded
                  textColor="#B0228C"
                  iconStyle={{ color: "white" }}
                  rightButtonBackgroundColor="#EA3788"
                  leftButtonBackgroundColor="#E56B70"
                />
              </View>
            </View>
            <View style={styles.fields}>
              <Text style={styles.text}>אחר הצהריים</Text>
              <View style={styles.numbers}>
                <NumericInput
                  value={this.state.alertBeforeAfternoon}
                  onChange={(value) =>
                    this.setState({ alertBeforeAfternoon: value })
                  }
                  // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                  totalWidth={140}
                  totalHeight={35}
                  iconSize={25}
                  step={1}
                  valueType="real"
                  rounded
                  textColor="#B0228C"
                  iconStyle={{ color: "white" }}
                  rightButtonBackgroundColor="#EA3788"
                  leftButtonBackgroundColor="#E56B70"
                />
              </View>
            </View>
            <View style={styles.fields}>
              <Text style={styles.text}>ערב</Text>
              <View style={styles.numbers}>
                <NumericInput
                  value={this.state.alertBeforeEvening}
                  onChange={(value) =>
                    this.setState({ alertBeforeEvening: value })
                  }
                  // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                  totalWidth={140}
                  totalHeight={35}
                  iconSize={25}
                  step={1}
                  valueType="real"
                  rounded
                  textColor="#B0228C"
                  iconStyle={{ color: "white" }}
                  rightButtonBackgroundColor="#EA3788"
                  leftButtonBackgroundColor="#E56B70"
                />
              </View>
            </View>
          </View>
          <View>
            <Text>כמה דקות לפני יקבלו הודעת תזכורת</Text>
          </View>
          <View>
            <View style={styles.fields}>
              <Text style={styles.text}>בוקר</Text>
              <View style={styles.numbers}>
                <NumericInput
                  value={this.state.alertAfterMorning}
                  onChange={(value) =>
                    this.setState({ alertAfterMorning: value })
                  }
                  // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                  totalWidth={140}
                  totalHeight={35}
                  iconSize={25}
                  step={1}
                  valueType="real"
                  rounded
                  textColor="#B0228C"
                  iconStyle={{ color: "white" }}
                  rightButtonBackgroundColor="#EA3788"
                  leftButtonBackgroundColor="#E56B70"
                />
              </View>
            </View>
            <View style={styles.fields}>
              <Text style={styles.text}>צהריים</Text>
              <View style={styles.numbers}>
                <NumericInput
                  value={this.state.alertAfterNoon}
                  onChange={(value) => this.setState({ alertAfterNoon: value })}
                  // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                  totalWidth={140}
                  totalHeight={35}
                  iconSize={25}
                  step={1}
                  valueType="real"
                  rounded
                  textColor="#B0228C"
                  iconStyle={{ color: "white" }}
                  rightButtonBackgroundColor="#EA3788"
                  leftButtonBackgroundColor="#E56B70"
                />
              </View>
            </View>
            <View style={styles.fields}>
              <Text style={styles.text}>אחר הצהריים</Text>
              <View style={styles.numbers}>
                <NumericInput
                  value={this.state.alertAfterAfternoon}
                  onChange={(value) =>
                    this.setState({ alertAfterAfternoon: value })
                  }
                  // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                  totalWidth={140}
                  totalHeight={35}
                  iconSize={25}
                  step={1}
                  valueType="real"
                  rounded
                  textColor="#B0228C"
                  iconStyle={{ color: "white" }}
                  rightButtonBackgroundColor="#EA3788"
                  leftButtonBackgroundColor="#E56B70"
                />
              </View>
            </View>
            <View style={styles.fields}>
              <Text style={styles.text}>ערב</Text>
              <View style={styles.numbers}>
                <NumericInput
                  value={this.state.alertAfterEvening}
                  onChange={(value) =>
                    this.setState({ alertAfterEvening: value })
                  }
                  // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                  totalWidth={140}
                  totalHeight={35}
                  iconSize={25}
                  step={1}
                  valueType="real"
                  rounded
                  textColor="#B0228C"
                  iconStyle={{ color: "white" }}
                  rightButtonBackgroundColor="#EA3788"
                  leftButtonBackgroundColor="#E56B70"
                />
              </View>
            </View>


          </View>
          <Button
            onPress={this.saveAlerts}
            icon={<Icon name="trash" size={20} color="white" />}
            title="  שמור  "
          />
          <View style={styles.lineStyle} />
          <View style={styles.container2}>
            <Tabs
              selected={this.state.page}
              style={{ backgroundColor: "white" }}
              // selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name,tasks:el.props.name})}>
              selectedStyle={{ color: "red" }}
              onSelect={(el) => this.changeTasksToCategory(el)}
            >
              <Text name="בוקר">בוקר</Text>
              <Text
                name="צהריים"
                selectedIconStyle={{ borderTopWidth: 2, borderTopColor: "red" }}
              >
                צהריים
              </Text>
              {/* <Text name="tasks2" >צהריים</Text> */}
              <Text name="אחר הצהריים">אחר הצהריים</Text>
              <Text name="ערב" selectedStyle={{ color: "green" }}>
                ערב
              </Text>
              {/* <Text name="tasks4" >ערב</Text> */}
            </Tabs>
            <Text style={styles.welcome}>הוספה והסרה של משימות</Text>
          </View>
          {/* <Select onSelect={(selectedItem) => this.itemsSelected(selectedItem)}>
                        <Option value={1} 
                        >List item 55551</Option>
                        <Option value={2}>List item 2</Option>
                        <Option value={3}>List item 3</Option>
                    </Select> */}
          <View style={styles.familiesList}>
            <SelectableFlatlist
              data={this.state.tasks}
              state={STATE.EDIT}
              multiSelect={false}
              itemsSelected={(selectedItem) => this.itemsSelected(selectedItem)}
              initialSelectedIndex={[0]}
              cellItemComponent={(item) => this.rowItem(item)}
              checkIcon={() => (
                <FontAwesome name="circle" size={25} color="#767ead" />
              )}
              uncheckIcon={() => (
                <FontAwesome name="circle-o" size={25} color="#767ead" />
              )}
              touchStyles={{ backgroundColor: "#b5bef5" }}
            />
          </View>
          <View style={{ margin: 20 }}>
            <Button
              onPress={this.deleteTask}
              icon={<Icon name="trash" size={20} color="white" />}
              title="  הסרת משימה  "
            />
          </View>
          {/* <View>
                        <View style={{ height: 200, backgroundColor: 'lightblue' }}>
                            <Text style={styles.instructions}>
                                משימות שנבחרו: {this.state.page}
                            </Text>
                            <View>
                                {this.state.tasks.map(task => {
                                    console.log("map task: ",{task})
                                    return <Task task={task}></Task>
                                })}
                            </View>
                        </View>
                        <View style={{ margin: 20 }}>
                            <Button
                                icon={
                                    <Icon
                                        name="trash"
                                        size={20}
                                        color="white"
                                    />
                                }
                                title="  הסרת משימה  "
                            />
                        </View>
                    </View> */}
          <View style={styles.lineStyle} />
          <View>
            <View style={styles.addTask}>
              <Text>בוקר</Text>
              <View style={styles.addTaskInputContainer}>
                <TextInput
                  style={styles.addTaskInput}
                  // onChangeText={(text) => this.setState({ taskToAdd: text })}
                  onChangeText={(text) => this.setState({ newMorningTask: text })}
                // value={this.state.text}
                />
              </View>
            </View>
            {/* <Button style={styles.addButton}
                    // icon={
                    //     <Icon
                    //     name="trash"
                    //     size={20}
                    //     color="white"
                    //     />
                    // }
                    title="הוספת משימה  "
                ></Button> */}
            <View style={{ marginTop: 30, alignContent: "center" }}>
              {/* <Button
                title="הוספת משימה"
                add
                // color="#0000ff"
              /> */}
            </View>
          </View>
          <View>
            <View style={styles.addTask}>
              <Text>צהריים</Text>
              <View style={styles.addTaskInputContainer}>
                <TextInput
                  style={styles.addTaskInput}
                  onChangeText={(text) => this.setState({ newNoonTask: text })}
                // value={this.state.text}
                />
              </View>
            </View>
            {/* <Button style={styles.addButton}
                    // icon={
                    //     <Icon
                    //     name="trash"
                    //     size={20}
                    //     color="white"
                    //     />
                    // }
                    title="הוספת משימה  "
                ></Button> */}
            <View style={{ marginTop: 30, alignContent: "center" }}>
              {/* <Button
                title="הוספת משימה"

                // color="#0000ff"
              /> */}
            </View>
          </View>
          <View>
            <View style={styles.addTask}>
              <Text>אחר הצהריים</Text>
              <View style={styles.addTaskInputContainer}>
                <TextInput
                  style={styles.addTaskInput}
                  onChangeText={(text) => this.setState({ newAfternoonTask: text })}
                // value={this.state.text}
                />
              </View>
            </View>
            {/* <Button style={styles.addButton}
                    // icon={
                    //     <Icon
                    //     name="trash"
                    //     size={20}
                    //     color="white"
                    //     />
                    // }
                    title="הוספת משימה  "
                ></Button> */}
            <View style={{ marginTop: 30, alignContent: "center" }}>
              {/* <Button
                title="הוספת משימה"
                // color="#0000ff"
              /> */}
            </View>
          </View>
          <View>
            <View style={styles.addTask}>
              <Text>ערב</Text>
              <View style={styles.addTaskInputContainer}>
                <TextInput
                  style={styles.addTaskInput}
                  onChangeText={(text) => this.setState({ newEveningTask: text })}
                // value={this.state.text}
                />
              </View>
            </View>
            {/* <Button style={styles.addButton}
                    // icon={
                    //     <Icon
                    //     name="trash"
                    //     size={20}
                    //     color="white"
                    //     />
                    // }
                    title="הוספה  "
                ></Button> */}
            <View style={{ marginTop: 30, alignContent: "center" }}>
              <Button
                title="הוספת משימות"
                onPress={this.saveNewTasks}
              // color="#0000ff"
              />
            </View>
          </View>
        </View>

        <View style={{ height: 60 }}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:2,
    // flexGrow: 1,
    // alignItems: 'stretch',
  },
  fields: {
    flexDirection: "row-reverse",
    // alignItems: 'stretch',
    marginTop: 10,
  },
  text: {
    flex: 3,
    textAlign: "right",
    marginRight: 50,
    fontSize: 20,
  },
  numbers: {
    flex: 3,
    textAlign: "left",
    marginLeft: 50,
  },

  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    marginTop: 20,
  },
  familiesList: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#767ead",
    height: 400,
  },

  addTask: {
    flexDirection: "row-reverse",
    marginTop: 10,
    // textAlign: 'center',
  },
  addTaskInput: {
    // flex:3,
    // backgroundColor:'red',
    // width:200,
    textAlign: "right",
    //marginRight: 10,
  },
  addTaskInputContainer: {
    // flex:1,
    width: 300,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d6d7da",
    textAlign: "left",
  },
  addButton: {
    margin: 20,
    backgroundColor: "black",
  },
});

AppRegistry.registerComponent("Settings", () => Settings);
