import React from "react";
import { StyleSheet, Text, Switch, Image, View } from "react-native";

import List, { List as ListModel } from "./List";
import { Suspense } from "react";
import { Accordion } from "native-base";
import { images } from "../ImagesClass";
import moment from "moment";

const Accordion2 = (props) => {
  var tasks = [];
  let counter = 0;
  for (let i in props) {
    counter++;
  }
  let morningItems = [];
  let noonItems = [];
  let afternoonItems = [];
  let eveningItems = [];
  let customItems = [];

  if (props.morningTasks.tasks != undefined) {
    for (let i = 0; i < props.morningTasks.tasks.length; i++) {
      morningItems.push({
        name: props.morningTasks.tasks[i],
        time: props.morningTasks.time.stringValue,
      });
    }
  }
  if (props.noonTasks.tasks != undefined) {
    for (let i = 0; i < props.noonTasks.tasks.length; i++) {
      noonItems.push({
        name: props.noonTasks.tasks[i],
        time: props.noonTasks.time.stringValue,
      });
    }
  }
  if (props.afternoonTasks.tasks != undefined) {
    for (let i = 0; i < props.afternoonTasks.tasks.length; i++) {
      afternoonItems.push({
        name: props.afternoonTasks.tasks[i],
        time: props.afternoonTasks.time.stringValue,
      });
    }
  }
  if (props.eveningTasks.tasks != undefined) {
    for (let i = 0; i < props.eveningTasks.tasks.length; i++) {
      eveningItems.push({
        name: props.eveningTasks.tasks[i],
        time: props.eveningTasks.time.stringValue,
      });
    }
  }
  var list: ListModel = {
    name: "משימות בוקר",
    items: props.morningTasks[0] ? props.morningTasks[0].tasks.slice() : [],
    // items: morningItems.slice(),
    picture: "sun",
    test: "test",
    markMission: props.markMission,
    taskId: props.morningTasks[0] ? props.morningTasks[0].taskId : "",
    //isDone: props.morningTasks[0].isDone
    isDone: props.morningTasks[0] ? props.morningTasks[0].isDone : false,
  };
  tasks.push(<List key={1} {...{ list }} />);
  var list: ListModel = {
    name: "משימות צהריים",
    items: props.noonTasks[0] ? props.noonTasks[0].tasks.slice() : [],
    // items: noonItems.slice(),
    picture: "lunch",
    test: "test",
    markMission: props.markMission,
    taskId: props.noonTasks[0] ? props.noonTasks[0].taskId : "",
    isDone: props.noonTasks[0] ? props.noonTasks[0].isDone : false,
  };
  tasks.push(<List key={2} {...{ list }} />);
  var list: ListModel = {
    name: "משימות אחר הצהריים",
    items: props.afternoonTasks[0] ? props.afternoonTasks[0].tasks.slice() : [],
    // items: afternoonItems.slice(),
    picture: "games",
    test: "test",
    markMission: props.markMission,
    taskId: props.afternoonTasks[0] ? props.afternoonTasks[0].taskId : "",
    isDone: props.afternoonTasks[0] ? props.afternoonTasks[0].isDone : false,
  };
  tasks.push(<List key={3} {...{ list }} />);
  var list: ListModel = {
    name: "משימות ערב",
    items: props.eveningTasks[0] ? props.eveningTasks[0].tasks.slice() : [],
    // items: eveningItems.slice(),
    picture: "moon",
    test: "test",
    markMission: props.markMission,
    taskId: props.eveningTasks[0] ? props.eveningTasks[0].taskId : "",
    isDone: props.eveningTasks[0] ? props.eveningTasks[0].isDone : false,
  };
  tasks.push(<List key={4} {...{ list }} />);
  var list: ListModel = {
    name: "משימות מותאמות",
    items: props.customTasks[0] ? props.customTasks[0].tasks.slice() : [],
    picture: "custom",
    test: "test",
    markMission: props.markMission,
    taskId: props.customTasks[0] ? props.customTasks[0].taskId : "",
    isDone: props.customTasks[0] ? props.customTasks[0].isDone : false,

  };
  tasks.push(<List key={5} {...{ list }} />);

  let fullDate = moment(new Date()).format('DD/MM/YYYY');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>משימות לתאריך: </Text>
        <Text style={styles.title}>{fullDate}</Text>
      </View>
      {tasks}
    </View>
  );
};

export default Accordion2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8b96d9",
    padding: 16,
  },
  header: {
    flexDirection: "row-reverse",

    justifyContent: 'center'
  },
  headerTitle: {

  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
 
  },
});
