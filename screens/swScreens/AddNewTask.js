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
  Button,
  TouchableHighlight,
} from "react-native";
import firebase from "../../config/config";
//import {Picker} from '@react-native-community/picker';
import { CheckBox } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
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
          // console.log("66666",morningTasks)
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
    // console.log("22323",morningTasks)

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

    // let userDetails = firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(userId);
    // let details = await userDetails
    //   .get()
    //   .then((doc) => {
    //     if (!doc.exists) {
    //       console.log("No such document!3");
    //     } else {
    //       let allData = doc.data();
    //       familyId = allData.familyId;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error getting document3", err);
    //   });
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
        if (!doc.exists) {
          console.log("No such document!4");
        } else {
          let allData = doc.data();
          // console.log('allData: ',allData)
          allData.kids.forEach((kid) => {
            familyKids.push(kid);
          });
          allData.parents.forEach((parent) => {
            familyParents.push(parent);
          });
        }
      })
      .catch((err) => {
        console.log("Error getting document4", err);
      });

    var allFamily = familyKids.slice();
    var allFamily = familyParents.slice();
    // console.log("allFamily: ", allFamily);
    // selected.filter((key) => {
    //   return key == true;
    // });
    for (let k of selected.keys()) {
      return k ? true : false;
    }
    console.log('selected ',selected)
    console.log('dddd ')
    allFamily.forEach((member) => {
      console.log("3");

      selected.forEach((taskSelected) => {
        console.log("2");

        if (morningTasks.includes(taskSelected)) {
          let flag = true;
          let days = data;
          console.log("1");
          while (flag) {
            let addDoc = db
              .collection("tasks")
              .add({
                date: new Date(
                  moment(days)
                    .format("DD/MM/YYYY A")
                    .toString() +
                    " " +
                    morningTime
                ),
                familyId: familyId,
                userId: member,
                time: morningTime,
                title: taskSelected,
                tasks: [],
                category: "morning",
              })
              .then((ref) => {
                console.log("Added document with ID: ", ref.id);
              });
            days = moment(days, "DD/MM/YYYY HH:MM A").add(1, "days");
            if (
              moment(moment(days).format("DD/MM/YYYY")).isSame(
                moment(moment(dateDestination).format("DD/MM/YYYY")),
                "days"
              )
            ) {
              flag = false;
            }
          }
        }
      });
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
    currentTasks.get().then(function(doc) {
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
          <View>
            <View>
              <Button
                onPress={showDatepicker}
                title={moment(date).format("DD/MM/YYYY")}
              />
            </View>
            <View>
              <Button
                onPress={showTimepicker}
                title={moment(date).format("H:MM:SS A")}
              />
            </View>
            {show && (
              <DateTimePicker
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
          <View>
            <View>
              <Button
                onPress={showDatepickerDestination}
                title={moment(dateDestination).format("DD/MM/YYYY A")}
              />
            </View>
            <View>
              <Button
                onPress={showTimepickerDestination}
                title={moment(dateDestination).format("H:MM:SS A")}
              />
            </View>
            {showDestination && (
              <DateTimePicker
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
        <View>
          <Button onPress={save} title={"הוסף"} />
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
});

export default AddNewTask;
