import React from "react";
import { StyleSheet, Text, Switch, Image, View } from "react-native";

import List, { List as ListModel } from "./List";
import { Suspense } from "react";

// const list: ListModel = {
//   name: "Total Points",
//   items: [
//     { name: "מקלחת", points: "משימה" },
//     { name: "11:30", points: "זמן" },
//     { name: "בית", points: "מקום לביצוע" },
//     { name: "לקלח עם סבון", points: "פרטים" },
//     { name: "לא", points: "האם בוצע?" }
//   ]
// };


let allTasks = [
  {
    "id": 1,
    "title": "משימות בוקר",
    "time": "11:30",
    "place": "בית",
    "details": "לקלח עם סבון",
    "isDone": "false",
    "picture": 'sun.jpg'
  },
  {
    "id": 2,
    "title": "משימות צהריים",
    "time": "17:00",
    "place": "בית ספר",
    "details": "לבוא רבע שעה לפני",
    "isDone": "true",
    "picture": 'lunch.png'
  },
  {
    "id": 3,
    "title": "משימות אחר הצהריים",
    "time": "18:00",
    "place": "מרכז ילדים-הורים",
    "details": "אין",
    "isDone": "true",
    "picture": 'games.jpg'

  },
  {
    "id": 4,
    "title": "משימות ערב",
    "time": "19:00",
    "place": "בית",
    "details": "הם אוהבים סטייק אנטריקוט 200 גרם",
    "isDone": "true",
    "picture": 'moon.png'

  }
]

var tasks = [];

for (let i = 0; i < allTasks.length; i++) {

  const list: ListModel = {
    name: allTasks[i]['title'],
    items: [
      { name: "משימה", points: allTasks[i]['title'] },
      { name: "זמן", points: allTasks[i]['time'] },
      { name: "מקום לביצוע", points: allTasks[i]['place'] },
      { name: "פרטים", points: allTasks[i]['details'] },
      { name: "האם בוצע?", points: allTasks[i]['isDone'] },
    ],
    picture: "sun",
    test: 'test',
  };

  tasks.push(
    <List key={allTasks[i]['id']} {...{ list }} />
  )
  // tasks.push( 
  //   <Switch key={allTasks[i]['id']+5} {...{ list }}/>
  // )
  let picPath = '../icons/' + 'sun.jpg'
  // let picName = allTasks[i]['picture']
  // let fullPath = picPath+picName
  // alert(picPath)
  // tasks.push(
  //   <Image source={require(picPath)} />
  // )  
}

let date = new Date();
let currentDate = date.getDate();
let currentMonth = date.getMonth() + 1;
let currentYear = date.getFullYear();
let fullDate = currentDate + '.' + currentMonth + '.' + currentYear;

export default () => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8b96d9",
    padding: 16
  },
  header: {
    flexDirection: 'row-reverse',
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  }
});