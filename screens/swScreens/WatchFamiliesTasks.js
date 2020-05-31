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
} from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTime from "react-native-customize-selected-date";
import _ from "lodash";
import firebase from "../../config/config";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { trackEvent } from "appcenter-analytics";
import { Row } from "native-base";
import { color } from "react-native-reanimated";

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
    };

    LocaleConfig.locales['heb'] = {
      monthNames: ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'],
      monthNamesShort: ["'ינו'","פבר","מרץ","אפר'",'מאי',"יונ'","יול'","אוג,","ספט'","אוק'","נוב'","דצמ'"],
      dayNames: ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'],
      dayNamesShort: ['א','ב','ג','ד','ה','ו','ש'],
      today: 'היום\'hui'
    };
    LocaleConfig.defaultLocale = 'heb';
  }

  async componentDidMount() {
    let tasks = await this.getTasks(new Date());
  }

  toTimestamp2(year, month, day) {
    console.log("year: ", year);
    console.log("month: ", month);
    console.log("day: ", day);
    var datum = new Date(Date.UTC("2020", "04", "18"));
    console.log("datum: ", datum);
    return datum.getTime() / 1000;
  }

  getTasks = async (date) => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
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
      });

    this.setState({
      morningTasks: morningTasks,
      noonTasks: noonTasks,
      afternoonTasks: afternoonTasks,
      eveningTasks: eveningTasks,
      customTasks: customTasks,
    });
    return familyId;
  };
  async onChangeDate(date) {
    console.log('dateChanged: ', date);
    this.getTasks(date)

  }

  renderChildDay(day) {
    if (_.includes(["2020-02-12", "2020-02-20", "2018-12-20"], day)) {
      return (
        <Image
          source={require("../../src/images/ic_lock_green.png")}
          style={styles.icLockRed}
        />
      );
    }
    if (
      _.includes(["2020-02-16", "2020-02-26", "2018-12-21", "2018-12-18"], day)
    ) {
      return (
        <Image
          source={require("../../src/images/ic_lock_red.png")}
          style={styles.icLockRed}
        />
      );
    }
  }
  returnMorningTasks() {
    return this.state.morningTasks.map((obj, i) => {
      return (
        <View style={{ flexDirection: 'row-reverse' }} key={i}>

          <Text style={{ fontWeight: 'bold' }}> {obj.time} </Text>
          <Text> {obj.name} </Text>
          <Text> {obj.isDone} </Text>
          <Text> {obj.tasks} </Text>
        </View>
      );
    });
  }
  returnNoonTasks() {
    return this.state.noonTasks.map((obj, i) => {
      return (
        <View key={i}>
          <Text>{obj.name}</Text>
          <Text>{obj.time}</Text>
          <Text>{obj.isDone}</Text>
          <Text>{obj.tasks}</Text>
        </View>
      );
    });
  }
  returnAfternoonTasks() {
    return this.state.afternoonTasks.map((obj, i) => {
      return (
        <View key={i} style={styles.task}>
          <Text>{obj.name}</Text>
          <Text>{obj.tasks}</Text>
          <Text>{obj.time}</Text>
          <Text>{obj.isDone}</Text>
        </View>
      );
    });
  }
  returnEveningTasks() {
    return this.state.eveningTasks.map((obj, i) => {
      return (
        <View key={i}>
          <Text>{obj.name}</Text>
          <Text>{obj.time}</Text>
          <Text>{obj.isDone}</Text>
          <View style={styles.courses}>
            <Text>{obj.tasks}</Text>
          </View>
        </View>
      );
    });
  }
  // returnCustomTasks() {
  //   return this.state.customTasks.map((obj, i) => {
  //     return (
  //       <View key={i}>
  //         {/* <Text>{obj.name}</Text> */}
  //         {/* <Text>{obj.time}</Text> */}
  //         {/* <Text>{obj.isDone}</Text> */}
  //         {/* <View style={styles.courses}> */}
  //           {/* <Text>{obj.tasks}</Text> */}
  //         {/* </View> */}
  //       </View>
  //     );
  //   });
  // }
  returnCustomTasks() {
    console.log('kfir kfir,', this.state.customTasks)
    return this.state.customTasks.map((obj, i) => {
      return (
        <View key={i}>
          <Text>{obj.name}</Text>
          <Text>{obj.time}</Text>
          <Text>{obj.isDone}</Text>
          <View style={styles.courses}>
            <Text>{obj.tasks}</Text>
          </View>
        </View>
      );
    });
  }

  render() {
    console.log("morning tasks: ", this.state.morningTasks);
    console.log("noon tasks: ", this.state.eveningTasks);
    console.log("afternoon tasks: ", this.state.afternoonTasks);
    console.log("evening tasks: ", this.state.eveningTasks);
    console.log("custom tasks: ", this.state.customTasks);
    return (
      <SafeAreaView style={styles.container}>

        <View >
          {/* <Calendar
            onDayPress={(day)=> this.onChangeDate(day)}
            monthFormat={'MMM yyyy'}
            displayLoadingIndicator
            //markedDates={{'2020-05-29':{selected:true}}}
            //style={{borderWidth:1, borderColor:'gray'}}
            theme={{
              backgroundColor:'#5b6de3',
              arrowColor:'#b5bef5',
              calendarBackground:'#767ead',
              todayTextColor:'black',
              selectedDayBackgroundColor: '#00adf5',
              textSectionTitleColor: 'black',
              dayTextColor: 'lightgray',
              textDisabledColor: '#b5bef5',
              monthTextColor:'black'


            }}
          /> */}
          <DateTime
            customWeekdays={['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']}
            warpRowControlMonthYear={{ color: 'white' }}
            date={this.state.time}
            changeDate={(date) => this.onChangeDate(date)}
            format="YYYY-MM-DD"
            renderChildDay={(day) => this.renderChildDay(day)}
          />
        </View>
        <ScrollView>
          <View >
            <View style={styles.tasksGroup}>
              <Text style={styles.tasksTitle}>משימות בוקר</Text>
              <View style={styles.tasksList}>{this.returnMorningTasks()}</View>
            </View>
            <View style={styles.tasksGroup}>
              <Text style={styles.tasksTitle}>משימות צהריים</Text>
              <View style={styles.tasksList}>{this.returnNoonTasks()}</View>
            </View>
            <View style={styles.tasksGroup}>
              <Text style={styles.tasksTitle}>משימות אחר הצהריים</Text>
              <View style={styles.tasksList}>{this.returnAfternoonTasks()}</View>
            </View>
            <View style={styles.tasksGroup}>
              <Text style={styles.tasksTitle}>משימות ערב</Text>
              <View style={styles.tasksList}>{this.returnEveningTasks()}</View>
            </View>
            <View style={styles.tasksGroup}>
              <Text style={styles.tasksTitle}>משימות מותאמות</Text>
              <View style={styles.tasksList}>{this.returnCustomTasks()}</View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#b5bef5',
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
    color: "black",
    fontWeight: "bold",
  },
  tasksList: {
    alignItems: 'flex-end',
    marginRight: 10
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
});
