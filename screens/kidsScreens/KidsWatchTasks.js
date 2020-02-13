// import React, { Component } from 'react';
// import { StyleSheet, View, Text, Button } from 'react-native';

// export default class KidsWatchTasks extends Component {

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text> Kids Watch Tasks </Text>
//       </View>
//     );
//   }
// }

// // export default KidsWatchTasks;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });
  



// import React from 'react';
// import { Dimensions, View } from 'react-native';

// import EventCalendar from '../../src/components/Calendar/EventCalendar';


// let { width } = Dimensions.get('window');

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       events: [
//         {
//           start: '2017-09-06 01:30:00',
//           end: '2017-09-06 02:30:00',
//           title: 'kfir 1',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//           color: 'green',
//         },
//         {
//           start: '2017-09-07 00:30:00',
//           end: '2017-09-07 01:30:00',
//           title: 'kfir 2',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-07 01:30:00',
//           end: '2017-09-07 02:20:00',
//           title: 'kfir 3',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-07 04:10:00',
//           end: '2017-09-07 04:40:00',
//           title: 'kfir 4',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-07 01:05:00',
//           end: '2017-09-07 01:45:00',
//           title: 'kfir 5',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-07 14:30:00',
//           end: '2017-09-07 16:30:00',
//           title: 'kfir 6',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-08 01:20:00',
//           end: '2017-09-08 02:20:00',
//           title: 'Dr. Mariana Joseph',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-08 04:10:00',
//           end: '2017-09-08 04:40:00',
//           title: 'Dr. Mariana Joseph',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-08 00:45:00',
//           end: '2017-09-08 01:45:00',
//           title: 'Dr. Mariana Joseph',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-08 11:30:00',
//           end: '2017-09-08 12:30:00',
//           title: 'Dr. Mariana Joseph',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-09 01:30:00',
//           end: '2017-09-09 02:00:00',
//           title: 'Dr. Mariana Joseph',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-09 03:10:00',
//           end: '2017-09-09 03:40:00',
//           title: 'Dr. Mariana Joseph',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-09 00:10:00',
//           end: '2017-09-09 01:45:00',
//           title: 'Dr. Mariana Joseph',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2017-09-10 12:10:00',
//           end: '2017-09-10 13:45:00',
//           title: 'Dr. Mariana Joseph',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//         {
//           start: '2020-02-12 01:10:00',
//           end: '2020-02-12 03:45:00',
//           title: 'Dr. Mariana Joseph',
//           summary: '3412 Piedmont Rd NE, GA 3032',
//         },
//       ],
//     };
//   }

//   _eventTapped(event) {
//     alert(JSON.stringify(event));
//   }



//   render() {
//     let day = new Date().getDate(); //Current day
//     var month = new Date().getMonth() + 1; //Current Month
//     var year = new Date().getFullYear(); //Current Year
 

//     if(day<10){
//       day="0"+day
//     }
//     if(month<10){
//       month="0"+month
//     }

//     var stringDate = year+"-"+month+"-"+day
//     console.log(stringDate)

//     return (
//       <View style={{ flex: 1, marginTop: 20 }}>
//         <EventCalendar
//           eventTapped={this._eventTapped.bind(this)}
//           events={this.state.events}
//           width={width}
//           // initDate = {'2017-09-07'}
//           initDate={stringDate}
//           scrollToFirst
//           upperCaseHeader
//           uppercase
//           scrollToFirst={false}
//         />
//       </View>
//     );
//   }
// }

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import DateTime from 'react-native-customize-selected-date'
import _ from 'lodash'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '',
      test:[]
    }
  }

  onChangeDate(date) {
    let arr=[]
    for(let i=0;i<10;i++){
      arr.push(date)
    }
    this.setState({test:arr})
    
    alert(date)

  }

  renderChildDay(day) {
    if (_.includes(['2020-02-12', '2020-02-20', '2018-12-20'], day)) {
      return <Image source={require('../../src/images/ic_lock_green.png')} style={styles.icLockRed} />
    }
    if (_.includes(['2020-02-16', '2020-02-26', '2018-12-21', '2018-12-18'], day)) {
      return <Image source={require('../../src/images/ic_lock_red.png')} style={styles.icLockRed} />
    }
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <DateTime
            date={this.state.time}
            changeDate={(date) => this.onChangeDate(date)}
            format='YYYY-MM-DD'
            renderChildDay={(day) => this.renderChildDay(day)}
          />
        </View>
        <View style={styles.tasks}>          
         <Text>{this.state.test}</Text>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tasks:{
    alignItems:"center",
    color:'green',
    width: 400,
    height:250,
    alignSelf:'center',
    borderWidth: 3,
    bottom:-400,
    flex:3,

    
  },
  icLockRed: {
    width: 13 / 2,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 1
  }
});

