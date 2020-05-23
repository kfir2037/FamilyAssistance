import React from "react";
import { StyleSheet, Text, Switch, Image, View } from "react-native";

import List, { List as ListModel } from "./List";
import { Suspense } from "react";
import { Accordion } from "native-base";
import { images } from "../ImagesClass";

const Accordion2 = (props) => {
  var tasks = [];
  console.log("propssss: ", props);

  // for (let i = 0; i < allTasks.length; i++) {
  // // console.log('test');
  //   const list: ListModel = {
  //     name: allTasks[i]['title'],
  //     items: [
  //       { name: "משימה", points: allTasks[i]['title'] },
  //       { name: "זמן", points: allTasks[i]['time'] },
  //       { name: "מקום לביצוע", points: allTasks[i]['place'] },
  //       { name: "פרטים", points: allTasks[i]['details'] },
  //       { name: "האם בוצע?", points: allTasks[i]['isDone'] },
  //     ],
  //     picture: "sun",
  //     test: 'test',
  //   };

  //   tasks.push(
  //     <List key={allTasks[i]['id']} {...{ list }} />
  //   )
  //   // tasks.push(
  //   //   <Switch key={allTasks[i]['id']+5} {...{ list }}/>
  //   // )
  //   let picPath = '../icons/' + 'sun.jpg'
  //   // let picName = allTasks[i]['picture']
  //   // let fullPath = picPath+picName
  //   // alert(picPath)
  //   // tasks.push(
  //   //   <Image source={require(picPath)} />
  //   // )
  // }
  let counter = 0;
  for (let i in props) {
    counter++;
  }
  let morningItems = [];
  let noonItems = [];
  let afternoonItems = [];
  let eveningItems = [];
  let customItems = [];
  // console.log("props.morningTasks.tasks: ", props.morningTasks.tasks);
  if (props.morningTasks.tasks != undefined) {
    // console.log("props.morningTasks.tasks22222: ", props.morningTasks.tasks);
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
  if (props.customTasks != undefined) {
    console.log("counter22 ", props.customTasks);
    for (let i = 0; i < props.customTasks.length; i++) {
      console.log("counter");
      customItems.push({
        name: props.customTasks[i].title.stringValue,
        time: props.customTasks[i].time.stringValue,
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
  };
  tasks.push(<List /* key={allTasks[i]["id"]} */ {...{ list }} />);
  var list: ListModel = {
    name: "משימות צהריים",
    items: props.noonTasks[0] ? props.noonTasks[0].tasks.slice() : [],
    // items: noonItems.slice(),
    picture: "lunch",
    test: "test",
    markMission: props.markMission,
    taskId: props.noonTasks[0] ? props.noonTasks[0].taskId : "",
  };
  tasks.push(<List /* key={allTasks[i]["id"]} */ {...{ list }} />);
  var list: ListModel = {
    name: "משימות אחר הצהריים",
    items: props.afternoonTasks[0] ? props.afternoonTasks[0].tasks.slice() : [],
    // items: afternoonItems.slice(),
    picture: "games",
    test: "test",
    markMission: props.markMission,
    taskId: props.afternoonTasks[0] ? props.afternoonTasks[0].taskId : "",
  };
  tasks.push(<List /* key={allTasks[i]["id"]} */ {...{ list }} />);
  var list: ListModel = {
    name: "משימות ערב",
    items: props.eveningTasks[0] ? props.eveningTasks[0].tasks.slice() : [],
    // items: eveningItems.slice(),
    picture: "moon",
    test: "test",
    markMission: props.markMission,
    taskId: props.eveningTasks[0] ? props.eveningTasks[0].taskId : "",
  };
  console.log("noonTasks: ", props.noonTasks);
  console.log("customItems: ", props.customItems);
  tasks.push(<List /* key={allTasks[i]["id"]} */ {...{ list }} />);
  var list: ListModel = {
    name: "משימות מותאמות",
    items: customItems.slice(),
    picture: "moon",
    test: "test",
    markMission: props.markMission,
    taskId: "123123",
  };
  tasks.push(<List /* key={allTasks[i]["id"]} */ {...{ list }} />);
  // for (let i = 0; i < allTasks.length; i++) {
  //   // console.log('test');
  //   const list: ListModel = {
  //     name: allTasks[i]["title"],
  //     items: morningItems.slice(),
  //     picture: "sun",
  //     test: "test",
  //   };

  //   tasks.push(<List key={allTasks[i]["id"]} {...{ list }} />);
  //   let picPath = "../icons/" + "sun.jpg";
  // }

  let date = new Date();
  let currentDate = date.getDate();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();
  let fullDate = currentDate + "." + currentMonth + "." + currentYear;
  // console.log("props: ", props);

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
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
