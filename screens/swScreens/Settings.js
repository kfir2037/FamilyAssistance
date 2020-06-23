import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import NumericInput from "react-native-numeric-input";
import { Card } from 'react-native-elements';
// import { Tabs, Tab } from 'native-base';
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
      page: "בוקר",
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
      isReady: true,
      newMorningTask: '',
      newNoonTask: '',
      newAfternoonTask: '',
      newEveningTask: '',
      isDeleted: false,
      isAdded: false,
      addMsg: '',
      deleteMsg: '',
      refreshing: false
    };
  }


  async componentDidMount() {
    console.log('isReady ', this.state.isReady);

    let tasks = await this.getTasks();
    this.changeTasksToCategory(<Text name='בוקר' />)
    console.log('isReady ', this.state.isReady)
    //this.setState({ isReady: true });
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

    let getDoc = await morningTasks
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
            isReady: false,

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
            isReady: false

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
            isReady: false

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
            isReady: false,
            refreshing: false
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
      newMorningTask: this.state.newMorningTask,
      newNoonTask: this.state.newNoonTask,
      newAfternoonTask: this.state.newAfternoonTask,
      newEveningTask: this.state.newEveningTask,
    };
    console.log('saveNewTasks ', data)
    addTasks(data)
      .then(() => {
        console.log('task added');

        this.setState({ isAdded: false, addMsg: 'משימה נוספה' });
      })
      .catch(() => {
        console.log('task didnt added');
        this.setState({ isAdded: false, addMsg: 'אירעה שגיאה' });

      })
  }

  deleteTask = () => {
    console.log("task to delete: ", this.state.taskDeleteSelected);
    this.setState({
      isDeleted: true
    })
    //deleteTask2(this.state.taskDeleteSelected)
    let deleteTask = firebase.functions().httpsCallable("deleteTask2");
    if (this.state.page == "בוקר") {
      let data = {
        taskToDelete: this.state.taskDeleteSelected,
        docName: "morning",
      };
      deleteTask(data)
        .then(() => {
          //console.log(resp.data.result)
          this.setState({
            isDeleted: false,
            deleteMsg: 'משימה נמחקה'
          })
        })
        .catch((err) => {
          //console.log(err.message)
          this.setState({
            isDeleted: false,
            deleteMsg: 'אירעה שגיאה'
          })
        })
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
      deleteTask(data)
        .then(() => {
          //console.log(resp.data.result)
          this.setState({
            isDeleted: false,
            deleteMsg: 'משימה נמחקה'
          })
        })
        .catch((err) => {
          //console.log(err.message)
          this.setState({
            isDeleted: false,
            deleteMsg: 'אירעה שגיאה'
          })
        })
    } else if (this.state.page == "אחר הצהריים") {
      let data = {
        taskToDelete: this.state.taskDeleteSelected,
        docName: "afterNoon",
      };
      deleteTask(data)
        .then(() => {
          //console.log(resp.data.result)
          this.setState({
            isDeleted: false,
            deleteMsg: 'משימה נמחקה'
          })
        })
        .catch((err) => {
          //console.log(err.message)
          this.setState({
            isDeleted: false,
            deleteMsg: 'אירעה שגיאה'
          })
        })
    } else if (this.state.page == "ערב") {
      let data = {
        taskToDelete: this.state.taskDeleteSelected,
        docName: "evening",
      };
      deleteTask(data)
        .then(() => {
          //console.log(resp.data.result)
          this.setState({
            isDeleted: false,
            deleteMsg: 'משימה נמחקה'
          })
        })
        .catch((err) => {
          //console.log(err.message)
          this.setState({
            isDeleted: false,
            deleteMsg: 'אירעה שגיאה'
          })
        })
    }
  };

  addTask = (taskType) => {
    let addTask = firebase.functions().httpsCallable("addTask");
    addTask(taskType)
      .then(() => {
        console.log('Task Added to Routine');
        //this.setState({ isAdded: false })
      })
      .catch(() => {
        console.log('error adding task');
        //this.setState({ isAdded: false })

      })
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
          //backgroundColor: "white",
          //borderWidth: 1,
          marginHorizontal: 5,
          borderRadius: 20,
          //alignItems: 'flex-end',
          justifyContent: "center",
          // paddingVertical: 20,
          // paddingHorizontal: 10,
          //borderColor: "#767ead",
        }}
      >
        {/* <Text>HI</Text> */}
        <Text>{item}</Text>
      </View>
    );
  };

  async _onRefresh() {
    this.setState({ refreshing: true });
    await this.getTasks();
    this.changeTasksToCategory(<Text name='בוקר' />);
    this.setState({ deleteMsg: '', addMsg: '' });
  }

  render() {
    if (
      this.state.alertBeforeMorning == "" ||
      this.state.alertBeforeNoon == "" ||
      this.state.alertBeforeAfternoon == "" ||
      this.state.alertBeforeEvening == "" ||
      this.state.alertAfterMorning == "" ||
      this.state.alertAfterNoon == "" ||
      this.state.alertAfterAfternoon == "" ||
      this.state.alertAfterEvening == "" &&
      this.state.isReady
    ) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbc213', height: '100%' }}>
          <ActivityIndicator color='#e0aa00' size={60} />
        </View>
      );
    }
    // var x
    // console.log('alertBeforeMorning ',this.state.alertBeforeMorning)
    // if(this.state.alertBeforeMorning==''){
    //     x=22;
    // }
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
          enabled
          colors={['#e0aa00']}
        />

      } style={{ backgroundColor: '#fbc213' }}>
        <View style={styles.container}>
          <View>
            <Text style={{ marginRight: 5, color: 'white', fontSize: 27, fontWeight: 'bold' }}>הגדרות</Text>
          </View>

          <Card containerStyle={{ borderRadius: 20 }} titleStyle={{ fontSize: 17, textAlign: 'right' }} title='דקות לפני קבלת התראה' >
            <View>
              <View style={styles.fields}>
                <Text style={styles.text}>בוקר</Text>
                <View style={styles.numbers}>
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
                    inputStyle={{ fontWeight: 'bold' }}
                    borderColor='#0ca5e5'
                    textColor='#0ca5e5'
                    iconStyle={{ color: "white", fontSize: 20 }}
                    rightButtonBackgroundColor='#0ca5e5'
                    leftButtonBackgroundColor='#0ca5e5'
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
                    step={1}
                    valueType="real"
                    rounded
                    inputStyle={{ fontWeight: 'bold' }}
                    borderColor='#0ca5e5'
                    textColor='#0ca5e5'
                    iconStyle={{ color: "white", fontSize: 20 }}
                    rightButtonBackgroundColor='#0ca5e5'
                    leftButtonBackgroundColor='#0ca5e5'
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
                    inputStyle={{ fontWeight: 'bold' }}
                    containerStyle={{}}
                    borderColor='#0ca5e5'
                    textColor='#0ca5e5'
                    iconStyle={{ color: "white", fontSize: 20 }}
                    rightButtonBackgroundColor="#0ca5e5"
                    leftButtonBackgroundColor='#0ca5e5'
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
                    inputStyle={{ fontWeight: 'bold' }}
                    borderColor='#0ca5e5'
                    textColor='#0ca5e5'
                    iconStyle={{ color: "white", fontSize: 20 }}
                    rightButtonBackgroundColor='#0ca5e5'
                    leftButtonBackgroundColor='#0ca5e5'
                  />
                </View>
              </View>
            </View>
          </Card>

          <Card titleStyle={{ fontSize: 17, textAlign: 'right' }} title='דקות לפני קבלת תזכורת' containerStyle={{ marginBottom: 10, borderRadius: 20 }}>
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
                    inputStyle={{ fontWeight: 'bold' }}
                    borderColor='#0ca5e5'
                    textColor='#0ca5e5'
                    iconStyle={{ color: "white", fontSize: 20 }}
                    rightButtonBackgroundColor='#0ca5e5'
                    leftButtonBackgroundColor='#0ca5e5'
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
                    inputStyle={{ fontWeight: 'bold' }}
                    borderColor='#0ca5e5'
                    textColor='#0ca5e5'
                    iconStyle={{ color: "white", fontSize: 20 }}
                    rightButtonBackgroundColor='#0ca5e5'
                    leftButtonBackgroundColor='#0ca5e5'
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
                    inputStyle={{ fontWeight: 'bold' }}
                    borderColor='#0ca5e5'
                    textColor='#0ca5e5'
                    iconStyle={{ color: "white", fontSize: 20 }}
                    rightButtonBackgroundColor='#0ca5e5'
                    leftButtonBackgroundColor='#0ca5e5'
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
                    inputStyle={{ fontWeight: 'bold' }}
                    borderColor='#0ca5e5'
                    textColor='#0ca5e5'
                    iconStyle={{ color: "white", fontSize: 20 }}
                    rightButtonBackgroundColor='#0ca5e5'
                    leftButtonBackgroundColor='#0ca5e5'
                  />
                </View>
              </View>
            </View>
          </Card>

          <Button
            onPress={this.saveAlerts}
            buttonStyle={styles.button}

            containerStyle={{borderWidth:2,borderColor:'white', alignSelf: 'center', marginBottom: 10, width: '30%' }}
            //icon={<Icon name="trash" size={20} color="white" />}
            title="שמור"
            titleStyle={{ justifyContent: 'center', fontWeight:'bold' }}
            color='#c0d747'
          />

          <View style={styles.lineStyle} />

          <Text style={styles.welcome}>הוספה והסרה של משימות</Text>

          <View style={styles.container2}>
            <Tabs
              selected={this.state.page}
              style={{ alignContent: "center", justifyContent: 'center', backgroundColor: "white", borderRadius: 20, marginHorizontal: 18, marginVertical: 10 }}
              selectedStyle={{ color: '#e0aa00' }}
              onSelect={(el) => this.changeTasksToCategory(el)}
            >
              <Text name="ערב" >ערב</Text>
              <Text name="אחר הצהריים">אחר הצהריים</Text>
              <Text name="צהריים">צהריים</Text>
              <Text name="בוקר">בוקר</Text>
            </Tabs>

          </View>
          {/* <Select onSelect={(selectedItem) => this.itemsSelected(selectedItem)}>
                        <Option value={1} 
                        >List item 55551</Option>
                        <Option value={2}>List item 2</Option>
                        <Option value={3}>List item 3</Option>
                    </Select> */}
          <ScrollView style={styles.familiesList}>

            <SelectableFlatlist

              data={this.state.tasks}
              state={STATE.EDIT}
              multiSelect={false}
              itemsSelected={(selectedItem) => this.itemsSelected(selectedItem)}
              initialSelectedIndex={[0]}
              cellItemComponent={(item) => this.rowItem(item)}
              checkIcon={() => (
                <FontAwesome name="circle" size={25} color="#0ca5e5" />
              )}
              uncheckIcon={() => (
                <FontAwesome name="circle-o" size={25} color="#0ca5e5" />
              )}
              touchStyles={{
                borderRadius: 20,
                backgroundColor: "white",
                //borderWidth: 1,
                width: '99%'
              }}
            //checkUncheckContainerStyle={{borderWidth:1, borderColor:'red', backgroundColor:'white'}}
            />
          </ScrollView>

          {this.state.isDeleted
            ? <ActivityIndicator style={{ marginVertical: 10 }} color='#e0aa00' size={25} />
            :
            <Button
              onPress={this.deleteTask}
              icon={<Icon name="trash" size={20} color="white" />}
              title="  הסרת משימה  "
              iconRight
              titleStyle={{ justifyContent: 'center' }}
              containerStyle={{borderWidth:2,borderColor:'white', alignSelf: 'center', marginVertical: 10, width: '50%' }}
              buttonStyle={{ ...styles.button, }}
            />
          }
          {this.state.deleteMsg == 'משימה נמחקה'
            ? <Text style={{ fontWeight: 'bold', marginBottom: 10, color: 'green', fontSize: 18, alignSelf: 'center' }}>משימה נמחקה</Text>
            : this.state.deleteMsg == 'אירעה שגיאה'
              ? <Text style={{ fontWeight: 'bold', marginBottom: 10, color: 'crimson', fontSize: 18, alignSelf: 'center' }}>אירעה שגיאה</Text>
              : null
          }

          <View style={styles.lineStyle} />

          <View>
            <View style={{ borderWidth: 1, borderColor: '#e0aa00', backgroundColor: 'white', borderRadius: 20, justifyContent: 'center', width: '90%', alignSelf: 'center', alignItems: 'flex-end', paddingVertical: 20 }}>

              <Input
                containerStyle={styles.addTaskInputContainer}
                onChangeText={(text) => this.setState({ newMorningTask: text })}
                value={this.state.newMorningTask}
                placeholder='בוקר'
                placeholderTextColor='lightgray'
                textAlign='right'
              // value={this.state.text}
              />

              <Input
                containerStyle={styles.addTaskInputContainer}
                onChangeText={(text) => this.setState({ newNoonTask: text })}
                value={this.state.newNoonTask}
                placeholder='צהריים'
                placeholderTextColor='lightgray'
                textAlign='right'
              // value={this.state.text}
              />

              <Input
                containerStyle={styles.addTaskInputContainer}
                placeholder='אחר הצהריים'
                placeholderTextColor='lightgray'
                onChangeText={(text) => this.setState({ newAfternoonTask: text })}
                textAlign='right'
                value={this.state.newAfternoonTask}
              />

              <Input
                containerStyle={styles.addTaskInputContainer}
                placeholder='ערב'
                placeholderTextColor='lightgray'
                onChangeText={(text) => this.setState({ newEveningTask: text })}
                value={this.state.newEveningTask}
              />


            </View>


            {this.state.isAdded
              ? <ActivityIndicator style={{ marginVertical: 10 }} color='#e0aa00' size={25} />
              :
              <View style={{ alignContent: "center" }}>
                <Button
                  title="  הוספת משימות"
                  onPress={() => {
                    this.setState({ isAdded: true })
                    this.saveNewTasks();
                  }}
                  icon={<Icon name="plus" size={20} color="white" />}
                  iconRight
                  titleStyle={{ justifyContent: 'center' }}
                  containerStyle={{ borderWidth:2,borderColor:'white', alignSelf: 'center', marginVertical: 10, width: '50%' }}
                  buttonStyle={styles.button}
                />
              </View>
            }
            {this.state.addMsg == 'משימה נוספה'
              ? <Text style={{ fontWeight: 'bold', marginBottom: 10, color: 'green', fontSize: 18, alignSelf: 'center' }}>משימה נוספה</Text>
              : this.state.deleteMsg == 'אירעה שגיאה'
                ? <Text style={{ fontWeight: 'bold', marginBottom: 10, color: 'crimson', fontSize: 18, alignSelf: 'center' }}>אירעה שגיאה</Text>
                : null
            }
          </View>
        </View>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:2,
    // flexGrow: 1,
    alignItems: 'stretch',

  },
  fields: {
    flexDirection: "row-reverse",
    // alignItems: 'stretch',
    marginTop: 10,
  },
  text: {
    flex: 3,
    textAlign: "right",
    // marginRight: 50,
    fontSize: 15
  },
  numbers: {
    flex: 3,
    textAlign: "left",
    marginLeft: 50,
  },

  container2: {
    //width:'95%',
    // flex: 1,
    // borderRadius: 20,
    justifyContent: "center",
    alignContent: "center",
    //backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'white',
    marginRight: 10
    // marginTop: 20,
    //marginBottom: 50,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    marginTop: 20,
  },
  familiesList: {
    //justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0aa00",
    //height: 400,
    backgroundColor: 'white'
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
    //flexDirection: "row-reverse",
    // alignItems: 'stretch',
    width: '90%',
    marginTop: 10,
    marginRight: 10,
    // borderRadius: 4,
    // borderWidth: 1,
    // borderColor: "#d6d7da",
  },
  addButton: {
    margin: 20,
    backgroundColor: "black",
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#c0d747',
    //width:'30%',
    // alignContent:'center'
  },
  lineStyle: {

    borderWidth: 1,
    borderColor: 'whitesmoke',
    marginHorizontal: 10,
    marginBottom: 10
  }
});

AppRegistry.registerComponent("Settings", () => Settings);
