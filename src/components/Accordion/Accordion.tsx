import React from "react";
import { StyleSheet, Text, View } from "react-native";

import List, { List as ListModel } from "./List";


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


let allTasks=[
  {
    "id":1,
    "title":"מקלחת",
    "time":"11:30",
    "place":"בית",
    "details":"לקלח עם סבון",
    "isDone":"false"  
  },
  {
    "id":2,
    "title":"אסיפת הורים",
    "time":"17:00",
    "place":"בית ספר",
    "details":"לבוא רבע שעה לפני",
    "isDone":"true"            
  },
  {
    "id":3,
    "title":"לבוא לפגישה עם עו''ס",
    "time":"18:00",
    "place":"מרכז ילדים-הורים",
    "details":"אין",
    "isDone":"true"        
  },
  {
    "id":4,
    "title":"להאכיל את הילדים",
    "time":"19:00",
    "place":"בית",
    "details":"הם אוהבים סטייק אנטריקוט 200 גרם",
    "isDone":"true"        
  }
]

var tasks=[];

for(let i = 0; i < allTasks.length; i++){

  const list: ListModel = {
    name: allTasks[i]['title'], 
    items: [ 
      { name: "משימה" , points: allTasks[i]['title']},
      { name: "זמן", points: allTasks[i]['time'] },
      { name: "מקום לביצוע", points: allTasks[i]['place'] },
      { name: "פרטים", points: allTasks[i]['details'] },
      { name: "האם בוצע?", points: allTasks[i]['isDone'] },
    ],
    test:'test',
  };

  tasks.push(
    <List key={allTasks[i]['id']} {...{ list }} />
  )
}

export default () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>משימות</Text>

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
  title: {
    fontSize: 32,
    fontWeight: "bold"
  }
});