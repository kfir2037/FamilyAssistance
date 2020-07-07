import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  YellowBox,
  Image,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Card } from 'react-native-elements';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import _ from "lodash";
import firebase from "../../config/config";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import Spinner from '../../src/components/Spinner';
import { FontAwesome } from '@expo/vector-icons';

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      morningTasks: [],
      noonTasks: [],
      afternoonTasks: [],
      eveningTasks: [],
      customTasks: [],
      selected: '',
      loadingTasks: false

    };

    LocaleConfig.locales['heb'] = {
      monthNames: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
      monthNamesShort: ["'ינו'", "פבר", "מרץ", "אפר'", 'מאי', "יונ'", "יול'", "אוג,", "ספט'", "אוק'", "נוב'", "דצמ'"],
      dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
      dayNamesShort: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
      today: 'היום\'hui'
    };
    LocaleConfig.defaultLocale = 'heb';
  }

  async componentDidMount() {
    let tasks = await this.getTasks(new Date());
  }

  getTasks = async (date) => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    this.setState({
      loadingTasks: true
    })
    const familyId = this.props.navigation.state.params.familyId;
    var morningTasks = [];
    var noonTasks = [];
    var afternoonTasks = [];
    var eveningTasks = [];
    var customTasks = [];
    // var today = moment(new Date()).format("DD/MM/YYYY");
    var today = moment(date).format("DD/MM/YYYY");
    var allTasks = [];
    var familyMembers = {};
    console.log("family id: ", familyId);
    const family = await firebase
      .firestore()
      .collection("users")
      .where("familyId", "==", familyId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (!doc.exists) {
            console.log("No such document!!!!!!");
          } else {
            let allData = doc.data();
            familyMembers[doc.id] = allData.firstName + " " + allData.lastName;
          }
        });
      });

    const tasks = await firebase
      .firestore()
      .collection("tasks")
      .where("familyId", "==", familyId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let allData = doc.data();
          let taskDate = allData.date.seconds;
          taskDate = moment(taskDate * 1000).format("DD/MM/YYYY");

          if (taskDate == today) {
            console.log("day");
            if (allData.category == "morning") {
              morningTasks.push({
                name: familyMembers[allData.userId],
                time: allData.time,
                isDone: allData.isDone,
                date: allData.date,
                tasks: allData.tasks.slice(),
              });
            } else if (allData.category == "noon") {
              noonTasks.push({
                name: familyMembers[allData.userId],
                time: allData.time,
                isDone: allData.isDone,
                date: allData.date,
                tasks: allData.tasks.slice(),
              });
            } else if (allData.category == "afternoon") {
              afternoonTasks.push({
                name: familyMembers[allData.userId],
                time: allData.time,
                isDone: allData.isDone,
                date: allData.date,
                tasks: allData.tasks.slice(),
              });
            } else if (allData.category == "evening") {
              eveningTasks.push({
                name: familyMembers[allData.userId],
                time: allData.time,
                isDone: allData.isDone,
                date: allData.date,
                tasks: allData.tasks.slice(),
              });
            } else if (allData.category == "custom tasks") {
              console.log('custom')
              customTasks.push({
                name: familyMembers[allData.userId],
                time: allData.time,
                isDone: allData.isDone,
                date: allData.date,
                tasks: allData.tasks.slice(),
              });
            }
          }
        });

      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        this.setState({
          loadingTasks: false
        })
      });

    this.setState({
      morningTasks: morningTasks,
      noonTasks: noonTasks,
      afternoonTasks: afternoonTasks,
      eveningTasks: eveningTasks,
      customTasks: customTasks,
      loadingTasks: false
    });
    return familyId;
  };

  async onChangeDate(date) {
    console.log('dateChanged: ', date);
    this.setState({
      selected: date
    })
    this.getTasks(date)
  }


  returnMorningTasks() {
    return (
      <Card containerStyle={{ width: '90%', borderRadius: 20 }} title="משימות בוקר">
        {
          this.state.morningTasks.map((obj, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row-reverse' }} >
                {obj.isDone
                  ? <View style={{ paddingTop: 3 }}>
                    <FontAwesome name='check-square-o' color='green' size={18} />
                  </View>
                  : <View style={{ marginTop: 3 }}>
                    <FontAwesome name='square-o' color='red' size={18} />
                  </View>
                }
                <Text style={styles.taskHour}> | {obj.time} | {obj.tasks} | עבור: {obj.name} </Text>

              </View>
            );
          })
        }
      </Card>
    );
  }

  returnNoonTasks() {
    return (
      <Card containerStyle={{ width: '90%', borderRadius: 20 }} title="משימות צהריים">
        {
          this.state.noonTasks.map((obj, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row-reverse' }} >
                {obj.isDone
                  ? <View style={{ paddingTop: 3 }}>
                    <FontAwesome name='check-square-o' color='green' size={18} />
                  </View>
                  : <View style={{ paddingTop: 3 }}>
                    <FontAwesome name='square-o' color='red' size={18} />
                  </View>
                }
                <Text style={styles.taskHour}> | {obj.time} | {obj.tasks} | עבור: {obj.name} </Text>

              </View>
            );
          })
        }
      </Card>
    );
  }

  returnAfternoonTasks() {
    return (
      <Card containerStyle={{ width: '90%', borderRadius: 20 }} title="משימות אחר הצהריים">
        {
          this.state.afternoonTasks.map((obj, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row-reverse' }} >
                {obj.isDone
                  ? <View style={{ paddingTop: 3 }}>
                    <FontAwesome name='check-square-o' color='green' size={18} />
                  </View>
                  : <View style={{ paddingTop: 3 }}>
                    <FontAwesome name='square-o' color='red' size={18} />
                  </View>
                }
                <Text style={styles.taskHour}> | {obj.time} | {obj.tasks} | עבור: {obj.name} </Text>
              </View>
            );
          })
        }
      </Card>
    );
  }

  returnEveningTasks() {
    return (
      <Card containerStyle={{ width: '90%', borderRadius: 20 }} title="משימות ערב">
        {
          this.state.eveningTasks.map((obj, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row-reverse' }} >
                {obj.isDone
                  ? <View style={{ paddingTop: 3 }}>
                    <FontAwesome name='check-square-o' color='green' size={18} />
                  </View>
                  : <View style={{ paddingTop: 3 }}>
                    <FontAwesome name='square-o' color='red' size={18} />
                  </View>
                }
                <Text style={styles.taskHour}> | {obj.time} | {obj.tasks} | עבור: {obj.name} </Text>
              </View>
            );
          })
        }
      </Card>
    );
  }

  returnCustomTasks() {
    return (
      <Card containerStyle={{ width: '90%', borderRadius: 20 }} title="משימות">
        {
          this.state.customTasks.map((obj, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row-reverse' }} >
                {obj.isDone
                  ? <View style={{ paddingTop: 3 }}>
                    <FontAwesome name='check-square-o' color='green' size={18} />
                  </View>
                  : <View style={{ paddingTop: 3 }}>
                    <FontAwesome name='square-o' color='red' size={18} />
                  </View>
                }
                <Text style={styles.taskHour}> | {obj.time} | {obj.tasks} | עבור: {obj.name} </Text>
              </View>
            );
          })
        }
      </Card>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground style={{ height: '100%' }} source={require('../../assets/new_background08.png')}>


          <View style={{ backgroundColor: 'white', marginVertical: 20, marginHorizontal: 10, borderRadius: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 10, color: 'black' }}>לוח משימות חודשי</Text>
            </View>
            <Calendar
              markedDates={{
                '2020-06-12': { selected: true, marked: true, selectedColor: 'blue' }
              }}
              onDayPress={(day) => this.onChangeDate(day.dateString)}
              monthFormat={'MMM yyyy'}
              displayLoadingIndicator
              markedDates={{
                [this.state.selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: '#0ca5e5',
                  selectedTextColor: 'red'
                }
              }}
              style={{ borderRadius: 20, marginHorizontal: 10, paddingBottom: 10 }}
              theme={{
                arrowColor: '#e0aa00',
                calendarBackground: 'white',
                todayTextColor: '#0ca5e5',
                todayTextBackground: 'lightgray',
                selectedDayBackgroundColor: '#e0aa00',
                selectedDayTextColor: 'white',
                textSectionTitleColor: 'gray',
                textDayFontWeight: 'bold',
                textDayHeaderFontWeight: 'bold',
                textMonthFontWeight: 'bold',
                dayTextColor: '#e0aa00',
                textDisabledColor: 'lightgray',
                monthTextColor: '#e0aa00'
              }}
            />

          </View>
          <ScrollView>
            {this.state.loadingTasks
              ? <Spinner />
              :
              <View >
                {this.state.morningTasks.length == 0
                  ? null
                  : <View style={styles.tasksGroup}>
                    <View style={styles.tasksList}>{this.returnMorningTasks()}</View>
                  </View>
                }
                {this.state.noonTasks.length == 0
                  ? null
                  : <View style={styles.tasksGroup}>
                    <View style={styles.tasksList}>{this.returnNoonTasks()}</View>
                  </View>
                }
                {this.state.afternoonTasks.length == 0
                  ? null
                  : <View style={styles.tasksGroup}>
                    <View style={styles.tasksList}>{this.returnAfternoonTasks()}</View>
                  </View>
                }
                {this.state.eveningTasks.length == 0
                  ? null
                  : <View style={styles.tasksGroup}>
                    <View style={styles.tasksList}>{this.returnEveningTasks()}</View>
                  </View>
                }
                {this.state.customTasks.length == 0
                  ? null
                  : <View style={styles.tasksGroup}>
                    <View style={styles.tasksList}>{this.returnCustomTasks()}</View>
                  </View>
                }
              </View>}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: '#b5bef5',
    height: '100%',
    width: '100%'
  },
  task: {
    flexDirection: "row-reverse",
  },
  courses: {
    flexDirection: "column",
  },
  tasks: {
    alignItems: "center",
    color: "green",
    width: 400,
    height: 250,
    alignSelf: "center",
    borderWidth: 3,
    bottom: -400,
    flex: 3,
  },
  tasksTitle: {
    fontSize: 20,
    color: "#767ead",
    fontWeight: "bold",
  },
  tasksList: {
    alignItems: 'flex-end',
    //marginRight: 10,
    marginBottom: 7
  },
  tasksGroup: {

    marginRight: 10,
  },
  icLockRed: {
    width: 13 / 2,
    height: 9,
    position: "absolute",
    top: 2,
    left: 1,
  },
  taskName: {

  }

});
