// import React from "react";
// import { StyleSheet, Text, Switch, Image, View } from "react-native";

// import List, { List as ListModel } from "./List";
// import { Suspense } from "react";

// // const list: ListModel = {
// //   name: "Total Points",
// //   items: [
// //     { name: "מקלחת", points: "משימה" },
// //     { name: "11:30", points: "זמן" },
// //     { name: "בית", points: "מקום לביצוע" },
// //     { name: "לקלח עם סבון", points: "פרטים" },
// //     { name: "לא", points: "האם בוצע?" }
// //   ]
// // };

// let allTasks = [
//   {
//     "id": 1,
//     "title": "משימות בוקר",
//     "time": "11:30",
//     "place": "בית",
//     "details": "לקלח עם סבון",
//     "isDone": "false",
//     "picture": 'sun.jpg'
//   },
//   {
//     "id": 2,
//     "title": "משימות צהריים",
//     "time": "17:00",
//     "place": "בית ספר",
//     "details": "לבוא רבע שעה לפני",
//     "isDone": "true",
//     "picture": 'lunch.png'
//   },
//   {
//     "id": 3,
//     "title": "משימות אחר הצהריים",
//     "time": "18:00",
//     "place": "מרכז ילדים-הורים",
//     "details": "אין",
//     "isDone": "true",
//     "picture": 'games.jpg'

//   },
//   {
//     "id": 4,
//     "title": "משימות ערב",
//     "time": "19:00",
//     "place": "בית",
//     "details": "הם אוהבים סטייק אנטריקוט 200 גרם",
//     "isDone": "true",
//     "picture": 'moon.png'

//   }
// ]

// var tasks = [];

// for (let i = 0; i < allTasks.length; i++) {

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

// let date = new Date();
// let currentDate = date.getDate();
// let currentMonth = date.getMonth() + 1; 
// let currentYear = date.getFullYear();
// let fullDate = currentDate + '.' + currentMonth + '.' + currentYear;

// export default () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>משימות לתאריך: </Text>
//         <Text style={styles.title}>{fullDate}</Text>

//       </View>
//       {tasks}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#8b96d9",
//     padding: 16
//   },
//   header: {
//     flexDirection: 'row-reverse',
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: "bold"
//   }
// });

import React from "react";
import { StyleSheet, Text, Switch, Image, View } from "react-native";

import List, { List as ListModel } from "./List";
import { Suspense } from "react";
import { Accordion } from "native-base";
import { images } from "../ImagesClass";

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

const Accordion2 = (props) => {


  var tasks = [];

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
    console.log('counter22 ',props.customTasks)
    for (let i = 0; i < props.customTasks.length; i++) {
      console.log('counter')
      customItems.push({
        name: props.customTasks[i].title.stringValue,
        time: props.customTasks[i].time.stringValue,
      });
    }
  }
  // for (let i = 0; i < counter; i++) {
  var list: ListModel = {
    name: props.morningTasks.name,
    items: morningItems.slice(),
    picture: "sun",
    test: "test",
    markMission:props.markMission,
  };
  tasks.push(<List /* key={allTasks[i]["id"]} */ {...{ list }} />);
  var list: ListModel = {
    name: props.noonTasks.name,
    items: noonItems.slice(),
    picture: "lunch",
    test: "test",
    markMission:props.markMission,
  };
  tasks.push(<List /* key={allTasks[i]["id"]} */ {...{ list }} />);
  var list: ListModel = {
    name: props.afternoonTasks.name,
    items: afternoonItems.slice(),
    picture: "games",
    test: "test",
    markMission:props.markMission,
  };
  tasks.push(<List /* key={allTasks[i]["id"]} */ {...{ list }}  />);
  var list: ListModel = {
    name: props.eveningTasks.name,
    items: eveningItems.slice(),
    picture: "moon",
    test: "test",
    markMission:props.markMission,

  };
  console.log('noonTasks: ',props.noonTasks)
  console.log('customItems: ',props.customItems)
  tasks.push(<List /* key={allTasks[i]["id"]} */ {...{ list }}/>);
  var list: ListModel = {
    name: 'משימות מותאמות',
    items: customItems.slice(),
    picture: "moon",
    test: "test",
    markMission:props.markMission,

  };
  tasks.push(<List /* key={allTasks[i]["id"]} */ {...{ list }}/>);
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
