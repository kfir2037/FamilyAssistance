// import React, { useState } from 'react';
// import { StyleSheet, Text, View,ScrollView,TextInput,Alert,Switch,ProgressBarAndroid,TouchableOpacity } from 'react-native';
// // import MenuButton from '../components/MenuButton';
// import { FormLabel, FormInput, FormValidationMessage, Header,Button,ButtonGroup,Divider,Overlay   } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Constants } from 'expo';
// import  Accordion  from '../../src/components/Accordion';


// export default class SettingsScreen extends React.Component{

//   constructor () {
//     super()
//     this.state = {
//       selectedIndex: 2
//     }
//     this.updateIndex = this.updateIndex.bind(this)
//   }
  
//   updateIndex (selectedIndex) {
//     this.setState({selectedIndex})
//   }
  
//   render () {
//     const buttons = ['שבת', 'שישי', 'חמישי','רביעי','שלישי','שני','ראשון',]
//     const { selectedIndex } = this.state

//     var tasks=[];

//     let allTasks=[
//       {
//         "title":"מקלחת",
//         "time":"11:30",
//         "place":"בית",
//         "details":"לקלח עם סבון",
//         "isDone":"false"  
//       },
//       {
//         "title":"אסיפת הורים",
//         "time":"17:00",
//         "place":"בית ספר",
//         "details":"לבוא רבע שעה לפני",
//         "isDone":"true"            
//       },
//       {
//         "title":"לבוא לפגישה עם עו''ס",
//         "time":"18:00",
//         "place":"מרכז ילדים-הורים",
//         "details":"אין",
//         "isDone":"true"        
//       },
//       {
//         "title":"לבוא לפגישה עם עו''ס",
//         "time":"18:00",
//         "place":"מרכז ילדים-הורים",
//         "details":"אין",
//         "isDone":"true"        
//       }

//     ]
//     // let tasksDone=0;
//     //for(let i = 0; i < 3; i++){
//       // if(allTasks[i]['isDone']=='true'){
//       //   tasksDone++;
//       // }
//       // tasks.push(
//       //   <View key = {i}>
//       //       <View style={styles.task}>
//       //         <View style={styles.field}>
//       //           <View style={styles.temp}>
//       //             <Text>משימה</Text>
//       //           </View>
//       //           <View style={styles.temp}>
//       //             <Text>{allTasks[i]['title']}</Text>
//       //           </View>
//       //         </View>
//       //         <View style={styles.field}>
//       //         <View style={styles.temp}>
//       //           <Text>זמן</Text>
//       //           </View>
//       //           <View style={styles.temp}>
//       //           <Text>{allTasks[i]['time']}</Text>
//       //           </View>
//       //         </View>
//       //         <View style={styles.field}>
//       //           <View style={styles.temp}>
//       //             <Text>מקום</Text>
//       //           </View>
//       //           <View style={styles.temp}>
//       //             <Text>{allTasks[i]['place']}</Text>
//       //           </View>
//       //         </View>
//       //         <View style={styles.field}>
//       //         <View style={styles.temp}>
//       //           <Text>פרטים</Text>
//       //           </View>
//       //           <View style={styles.temp}>
//       //           <Text>{allTasks[i]['details']}</Text>
//       //           </View>
//       //         </View>
//       //         <View style={styles.field}>
//       //         <View style={styles.temp}>
//       //           <Text>המשימה בוצעה</Text>
//       //           </View>
//       //           <View style={styles.temp}>
//       //           <Switch/>
//       //           </View>
//       //         </View>
//       //         </View>
//       //   </View>      
//       // )
//     //}

//   return (
//       <View style={styles.container}>
//         <ScrollView>
      
//           <View style={styles.container}>
//             <ButtonGroup
//               onPress={this.updateIndex}
//               selectedIndex={selectedIndex}
//               buttons={buttons}
//               containerStyle={{height: 50,borderRadius:6} }
//             />

//               {/* <ProgressBarAndroid
//                 styleAttr="Horizontal"
//                 indeterminate={false}
//                 progress={tasksDone/allTasks.length}
//               />             */}



//                 {/* { tasks } */}

//               <Accordion/>

//           </View>

//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#8b96d9',
//     // alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop:15,
//   },
//   days:{
//     flex:1,
//     flexDirection:'row-reverse',
  
//   },
//   button:{
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     width:45,
//     marginLeft:6
//   },
//   text:{
//     fontSize:30,
//   },
//   task:{
//     flex:1,
//     borderStyle:'solid',
//     borderWidth:0.5, 
//     backgroundColor:'#9ec3ff',
//     marginBottom:10,

//   },
//   field:{
//     flex:1,
//     borderStyle:'solid',
//     borderWidth:0.5,
//     flexDirection:'row-reverse',
//     margin:7,
//     borderRadius: 4,
//   },
//   temp:{
//     flex:1,
//     textAlign:'left'
//   }
// });



import React from 'react';
import { Dimensions, View } from 'react-native';

import EventCalendar from '../../src/components/Calendar/EventCalendar';


let { width } = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          start: '2017-09-06 01:30:00',
          end: '2017-09-06 02:30:00',
          title: 'kfir 1',
          summary: '3412 Piedmont Rd NE, GA 3032',
          color: 'green',
        },
        {
          start: '2017-09-07 00:30:00',
          end: '2017-09-07 01:30:00',
          title: 'kfir 2',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 01:30:00',
          end: '2017-09-07 02:20:00',
          title: 'kfir 3',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 04:10:00',
          end: '2017-09-07 04:40:00',
          title: 'kfir 4',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 01:05:00',
          end: '2017-09-07 01:45:00',
          title: 'kfir 5',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-07 14:30:00',
          end: '2017-09-07 16:30:00',
          title: 'kfir 6',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-08 01:20:00',
          end: '2017-09-08 02:20:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-08 04:10:00',
          end: '2017-09-08 04:40:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-08 00:45:00',
          end: '2017-09-08 01:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-08 11:30:00',
          end: '2017-09-08 12:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-09 01:30:00',
          end: '2017-09-09 02:00:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-09 03:10:00',
          end: '2017-09-09 03:40:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-09 00:10:00',
          end: '2017-09-09 01:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
        {
          start: '2017-09-10 12:10:00',
          end: '2017-09-10 13:45:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
        },
      ],
    };
  }

  _eventTapped(event) {
    alert(JSON.stringify(event));
  }



  render() {
    let date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    console.log(new Date().getTime());
    console.log(date)
    console.log(month)
    console.log(year)
    console.log(hours)
    console.log(min)
    console.log(sec)

    var stringDate = year+"-"+"0"+month+"-"+"0"+date
    console.log(stringDate)

    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <EventCalendar
          eventTapped={this._eventTapped.bind(this)}
          events={this.state.events}
          width={width}
          initDate = {'2017-09-07'}
          // initDate={stringDate}
          scrollToFirst
          upperCaseHeader
          uppercase
          scrollToFirst={false}
        />
      </View>
    );
  }
}