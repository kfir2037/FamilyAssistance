import React, { useEffect, useState, useCallback } from "react";
import {
  Picker,
  Platform,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Modal,
  FlatList,
  TouchableHighlight,
  TextInput,
} from "react-native";
import firebase from "../../config/config";
//import {Picker} from '@react-native-community/picker';
import { CheckBox, Button } from "react-native-elements";
import {DateTimePicker} from "@react-native-community/datetimepicker";
import moment from "moment";

function Item({ id, title, selected, onSelect }) {
  return (
    <CheckBox
      checkedColor={"black"}
      uncheckedColor={"black"}
      containerStyle={styles.checkBoxStyle}
      textStyle={styles.textCheckBoxStyle}
      iconRight
      right
      title={title}
      checked={selected ? true : false}
      onPress={() => onSelect(id)}
    />
    // <TouchableOpacity
    //   onPress={() => onSelect(id)}
    //   style={[
    //     styles.item,
    //     { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
    //   ]}
    // >
    //   <Text style={styles.title}>{title}</Text>
    // </TouchableOpacity>
  );
}

function UselessTextInput(props) {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

const AddNewTask = (familyId) => {
  const [selected, setSelected] = useState(new Map());
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState("morning");
  const [kidOrParent, setKidOrParent] = useState();
  const [forKid, setForKid] = useState();
  const [forParent, setForParent] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateDestination, setDateDestination] = useState(new Date());
  const [modeDestination, setModeDestination] = useState("date");
  const [showDestination, setShowDestination] = useState(false);
  const [otherTask, setOtherTask] = useState("");

  const onSelect = useCallback(
    (id) => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
      console.log(selected);
    },
    [selected]
  );

  // -----------------------from date--------------------
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  //-----------------------------------------------------
  // -----------------------To date--------------------
  const onChangeDestination = (event, selectedDate) => {
    const currentDate = selectedDate || dateDestiantion;
    setShowDestination(Platform.OS === "ios");
    setDateDestination(currentDate);
  };

  const showModeDestination = (currentMode) => {
    setShowDestination(true);
    setModeDestination(currentMode);
  };

  const showDatepickerDestination = () => {
    showModeDestination("date");
  };

  const showTimepickerDestination = () => {
    showModeDestination("time");
  };

  //-----------------------------------------------------
  const save = async () => {
    let morningTasks = [];
    let noonTasks = [];
    let afternoonTasks = [];
    let eveningTasks = [];
    // let familyId = "";
    let morningTime = "";
    let noonTime = "";
    let afternoonTime = "";
    let eveningTime = "";

    let morning = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("morning");
    let getDoc = await morning
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let allData = doc.data();
          morningTime = allData.time;
          morningTasks = allData.tasks.slice();
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });

    let noon = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("noon");
    let getDoc2 = await noon
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document@!");
        } else {
          let allData = doc.data();
          noonTime = allData.time;
          noonTasks = allData.tasks.slice();
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });

    let afternoon = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("afterNoon");
    let getDoc3 = await afternoon
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!1");
        } else {
          let allData = doc.data();
          afternoonTime = allData.time;
          afternoonTasks = allData.tasks.slice();
        }
      })
      .catch((err) => {
        console.log("Error getting document1", err);
      });

    let evening = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc("evening");
    let getDoc4 = await evening
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!2");
        } else {
          let allData = doc.data();
          eveningTime = allData.time;
          eveningTasks = allData.tasks.slice();
        }
      })
      .catch((err) => {
        console.log("Error getting document2", err);
      });

    let userId = firebase.auth().currentUser.uid;

    var familyId2 = familyId.navigation.state.params.familyId;
    var familyKids = [];
    var familyParents = [];
    console.log("familyId: ", familyId.navigation.state.params.familyId);
    let familyDetails = firebase
      .firestore()
      .collection("families")
      .doc(familyId2);
    let detailsFamily = await familyDetails
      .get()
      .then((doc) => {
        // console.log("doc: ", doc);
        if (!doc.exists) {
          console.log("No such document!4");
        } else {
          let allData = doc.data();
          familyKids = allData.kids.slice();
          familyParents = allData.parents.slice();
        }
      })
      .catch((err) => {
        console.log("Error getting document4", err);
      });
    var allFamily = [];
    if (forKid) {
      allFamily = allFamily.concat(familyKids);
    }
    if (forParent) {
      allFamily = allFamily.concat(familyParents);
    }
    // allFamily = familyKids.concat(familyParents);

    allFamily.forEach((member) => {
      let y = date.toString();
      let temp = new Date(y);

      let sourceDate =
        moment(new Date(temp)).format("DD/MM/YYYY") + " " + morningTime;
      let destinationDate =
        moment(new Date(dateDestination.toString())).format("DD/MM/YYYY") +
        " " +
        morningTime;
      var split = sourceDate.split("/");
      var split2 = destinationDate.split("/");
      var days = date;

      let counter = parseInt(split2[0]) - parseInt(split[0]);
      for (let i = 0; i < counter + 1; i++) {
        let tempMorningTasks = [];
        let tempNoonTasks = [];
        let tempAfternoonTasks = [];
        let tempEveningTasks = [];

        selected.forEach((key, taskSelected) => {
          if (key == false) {
            return;
          }
          console.log("taskSelected: ", taskSelected);
          if (morningTasks.includes(taskSelected)) {
            tempMorningTasks.push(taskSelected);
          } else if (noonTasks.includes(taskSelected)) {
            tempNoonTasks.push(taskSelected);
          } else if (afternoonTasks.includes(taskSelected)) {
            tempAfternoonTasks.push(taskSelected);
          } else if (eveningTasks.includes(taskSelected)) {
            tempEveningTasks.push(taskSelected);
          }
        });
        var daysString = days.toString();
        // var d = "";
        var d;
        // console.log("tempMorningTasks: ", tempMorningTasks);
        // console.log("tempNoonTasks: ", tempNoonTasks);
        // console.log("tempAfternoonTasks: ", tempAfternoonTasks);
        // console.log("tempEveningTasks: ", tempEveningTasks);

        if (tempMorningTasks.length > 0) {
          var split = morningTime.split(":");
          var taskDate = moment(daysString).toDate();
          //var taskDate2 = taskDate.split(":")

          console.log('taskDate', taskDate);

          // var year = taskDate2[0]
          // var month = taskDate2[1]
          // var day = taskDate2[2]
          // var hour = split[0]
          // var minute = split[1]

          // console.log('taskDate2', taskDate2);

          // d = new Date(year, month, day, hour, minute)
          // console.log('d: ', d)
          // d =
          //   moment(new Date(daysString)).format("DD/MM/YYYY") +
          //   " " +
          //   morningTime;

          let addDoc = firebase
            .firestore()
            .collection("tasks")
            .add({
              date: taskDate,
              familyId: familyId2,
              userId: member,
              time: morningTime,
              tasks: tempMorningTasks,
              category: "morning",
              isDone: false,
            })
            .then((ref) => {
              console.log("Added morning document with ID: ", ref.id);
            });
        }
        if (tempNoonTasks.length > 0) {
          var split = noonTime.split(":");
          var taskDate = moment(daysString).format('YYYY:MM:DD')
          var taskDate2 = taskDate.split(":")

          var year = taskDate2[0]
          var month = taskDate2[1]
          var day = taskDate2[2]
          var hour = split[0]
          var minute = split[1]

          d = new Date(year, month, day, hour, minute)
          //   moment(new Date(daysString)).format("DD/MM/YYYY") + " " + noonTime;
          let addDoc2 = firebase
            .firestore()
            .collection("tasks")
            .add({
              date: d,
              familyId: familyId2,
              userId: member,
              time: noonTime,
              tasks: tempNoonTasks,
              category: "noon",
              isDone: false,
            })
            .then((ref) => {
              console.log("Added noon document with ID: ", ref.id);
            });
        }
        if (tempAfternoonTasks.length > 0) {
          var split = afternoonTime.split(":");
          var taskDate = moment(daysString).format('YYYY:MM:DD')
          var taskDate2 = taskDate.split(":")

          var year = taskDate2[0]
          var month = taskDate2[1]
          var day = taskDate2[2]
          var hour = split[0]
          var minute = split[1]

          d = new Date(year, month, day, hour, minute)
          console.log('d: ', d)
          // d =
          //   moment(new Date(daysString)).format("DD/MM/YYYY") +
          //   " " +
          //   afternoonTime;

          let addDoc3 = firebase
            .firestore()
            .collection("tasks")
            .add({
              date: d,
              familyId: familyId2,
              userId: member,
              time: afternoonTime,
              tasks: tempAfternoonTasks,
              category: "afternoon",
              isDone: false,
            })
            .then((ref) => {
              console.log("Added afternoon document with ID: ", ref.id);
            });
        }
        if (tempEveningTasks.length > 0) {
          var split = eveningTime.split(":");
          var taskDate = moment(daysString).format('YYYY:MM:DD')
          var taskDate2 = taskDate.split(":")

          var year = taskDate2[0]
          var month = taskDate2[1]
          var day = taskDate2[2]
          var hour = split[0]
          var minute = split[1]

          d = new Date(year, month, day, hour, minute)
          console.log('d: ', d)
          // d =
          //   moment(new Date(daysString)).format("DD/MM/YYYY") +
          //   " " +
          //   eveningTime;

          let addDoc4 = firebase
            .firestore()
            .collection("tasks")
            .add({
              date: d,
              familyId: familyId2,
              userId: member,
              time: eveningTime,
              tasks: tempEveningTasks,
              category: "evening",
              isDone: false,
            })
            .then((ref) => {
              console.log("Added evening document with ID: ", ref.id);
            });
        }
        var tasksArr = [];
        console.log("otherTask: ", otherTask);
        if (otherTask != "") {
          tasksArr.push(otherTask);
          let addDoc4 = firebase
            .firestore()
            .collection("tasks")
            .add({
              date: days,
              familyId: familyId2,
              userId: member,
              time: moment(days).format("HH:MM"),
              tasks: tasksArr,
              category: "custom tasks",
              isDone: false,
            })
            .then((ref) => {
              console.log("Added special document with ID: ", ref.id);
            });
        }
        var cond;
        var test = moment(days).format("DD/MM/YYYY");
        var test2 = moment(dateDestination).format("DD/MM/YYYY");

        cond = test == test2;

        days = new Date(moment(days, "DD/MM/YYYY HH:MM A").add(1, "days"));
      }
    });
  };

  const setForKidCheckbox = () => {
    forKid ? setForKid(false) : setForKid(true);
  };
  const setForParentCheckbox = () => {
    forParent ? setForParent(false) : setForParent(true);
  };
  useEffect(() => {
    let currentTasks = firebase
      .firestore()
      .collection("RoutineTasks")
      .doc(time);
    currentTasks.get().then(function (doc) {
      if (doc.exists) {
        console.log(doc.data().tasks);
        setTasks(doc.data().tasks);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });

    console.log(tasks);
  }, [time]);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator>
        <Text style={styles.headerTitle}>הגדרת משימה חדשה</Text>
        <View style={styles.chooseType}>
          <Text style={styles.title}>בחר אשכול:</Text>
          <Picker
            accessibilityLabel={'time'}
            mode={"dropdown"}
            itemStyle={{ fontWeight: "bold" }}
            selectedValue={time}
            style={styles.pickerStyle}
            onValueChange={(itemValue, itemIndex) => setTime(itemValue)}
          >
            <Picker.Item label="בוקר" value="morning" />
            <Picker.Item label="צהריים" value="noon" />
            <Picker.Item label="אחר הצהריים" value="afterNoon" />
            <Picker.Item label="ערב" value="evening" />
          </Picker>
        </View>
        <View style={styles.chooseTasks}>
          <Text style={styles.title}>בחר משימות לאשכול:</Text>
          {tasks.length <= 0 ? (
            <ActivityIndicator size={50} color="#767ead" />
          ) : (
              <FlatList
                inverted
                refreshing
                horizontal
                data={tasks}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Item
                    id={item}
                    title={item}
                    selected={!!selected.get(item)}
                    onSelect={onSelect}
                  />
                )}
                extraData={selected}
                contentContainerStyle={{ margin: 5 }}
              ></FlatList>
            )}
        </View>
        <View>
          <View
            style={{
              backgroundColor: "#b5bef5"
            }}
          >
            <Text style={styles.title}>משימה מותאמת:</Text>
            <UselessTextInput
              multiline
              numberOfLines={4}
              onChangeText={(text) => setOtherTask(text)}
              value={otherTask}
              textAlign='right'
              style={{ margin: 5, backgroundColor: "#b5bef5", borderWidth: 1 }}
            />
          </View>
        </View>
        <View style={styles.kidOrParent}>
          <Text style={styles.title}>המשימה עבור:</Text>
          <View style={{ flexDirection: "row" }}>
            <CheckBox
              iconRight
              right
              textStyle={styles.textCheckBoxStyle}
              title="הורה"
              containerStyle={{ ...styles.checkBoxStyle, height: 40 }}
              checkedColor={"black"}
              uncheckedColor={"black"}
              checked={forParent}
              onPress={setForParentCheckbox}
            />
            <CheckBox
              iconRight
              right
              textStyle={styles.textCheckBoxStyle}
              title="ילד"
              containerStyle={{ ...styles.checkBoxStyle, height: 40 }}
              checkedColor={"black"}
              uncheckedColor={"black"}
              checked={forKid}
              onPress={setForKidCheckbox}
            />
          </View>
        </View>

        <View>
          <Text style={styles.title}>מתאריך:</Text>
          <View style={{ flexDirection: 'row-reverse', alignSelf: 'center' }}>
            <View>
              <Button
                onPress={showDatepicker}
                title={moment(date).format("DD/MM/YYYY")}
                buttonStyle={styles.button}
                containerStyle={styles.containerButton}
                titleStyle={{ color: 'black' }}
              />

            </View>
            <View>
              <Button
                onPress={showTimepicker}
                title={moment(date).format("H:MM")}
                buttonStyle={styles.button}
                containerStyle={styles.containerButton}
                titleStyle={{ color: 'black' }}
              />
            </View>
            {show && (
              <DateTimePicker
                accessibilityLabel={'date'}
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
        <View>
          <Text style={styles.title}>עד תאריך:</Text>
          <View style={{ flexDirection: 'row-reverse', alignSelf: 'center' }}>
            <View>
              <Button
                onPress={showDatepickerDestination}
                title={moment(dateDestination).format("DD/MM/YYYY")}
                buttonStyle={styles.button}
                containerStyle={styles.containerButton}
                titleStyle={{ color: 'black' }}
              />

            </View>
            <View>
              <Button
                onPress={showTimepickerDestination}
                title={moment(dateDestination).format("H:MM")}
                buttonStyle={styles.button}
                containerStyle={styles.containerButton}
                titleStyle={{ color: 'black' }}
              />

            </View>
            {showDestination && (
              <DateTimePicker
                accessibilityLabel={'hour'}
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={dateDestination}
                mode={modeDestination}
                is24Hour={true}
                display="default"
                onChange={onChangeDestination}
              />
            )}
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            onPress={save}
            title={"הוסף"}
            buttonStyle={styles.button}
            containerStyle={styles.containerButton}
            titleStyle={{ color: 'black' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b5bef5",
    height: "100%",
    width: "100%",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 5,
  },
  chooseType: {
    margin: 5,
    marginBottom: 10,
    flexDirection: "row-reverse",
    // borderColor:'black',
    // borderWidth:1
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    //alignSelf: 'center',
    marginLeft: 10,
    margin: 5,
  },
  pickerStyle: {
    height: 50,
    width: 170,
  },

  chooseTasks: {
    //flexDirection: 'column',
    //alignSelf: 'flex-end',
    margin: 5,
  },

  checkBoxStyle: {
    height: 50,
    backgroundColor: "#767ead",
    borderColor: "black",
    borderRadius: 10,
  },

  textCheckBoxStyle: {
    color: "black",
  },
  kidOrParent: {
    margin: 5,
    flexDirection: "row-reverse",
  },
  button: {
    backgroundColor: '#767ead',
    width: 120,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black'
  },
  containerButton: {
    alignItems: 'center',
    margin: 5,

  },
});

export default AddNewTask;
