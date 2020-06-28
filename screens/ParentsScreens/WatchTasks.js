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
import { SafeAreaView, Platform, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import DateTime from 'react-native-customize-selected-date'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import _ from 'lodash'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '',
      test: [],
      selected: ''
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

  onChangeDate(date) {
    let arr = []
    this.setState({ selected: date });
    for (let i = 0; i < 10; i++) {
      arr.push(date)
    }
    this.setState({ test: arr })

    //alert(date)

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
      <SafeAreaView style={styles.container}>

        <ImageBackground style={{ height: '100%' }} source={require('../../assets/new_background08.png')}>
          <Text style={{ marginVertical: 10, alignSelf: 'center', fontWeight: 'bold', color: 'white', fontSize: 22 }}>משימות חודשיות</Text>
          <View style={{ marginVertical: 5 }}>
            <Calendar
              markedDates={{
                '2020-06-12': { selected: true, marked: true, selectedColor: 'blue' }
              }}
              //markingType={'custom'}
              onDayPress={(day) => this.onChangeDate(day.dateString)}
              monthFormat={'MMM yyyy'}
              displayLoadingIndicator
              markedDates={{
                [this.state.selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: '#0ca5e5',
                  selectedTextColor: 'white'
                }
              }}
              style={{ borderRadius: 20, marginVertical: 10, marginHorizontal: 10, paddingBottom: 10 }}
              //markedDates={{'2020-05-29':{selected:true}}}
              //style={{borderWidth:1, borderColor:'gray'}}
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

            {/* <DateTime
              date={this.state.time}
              changeDate={(date) => this.onChangeDate(date)}
              format='YYYY-MM-DD'
              renderChildDay={(day) => this.renderChildDay(day)}
            /> */}
            <View style={styles.tasks}>
              <Text>{this.state.test}</Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: 'lightgray',
    height: '100%',
    width: '100%',
  },
  tasks: {
    alignItems: "center",
    color: 'green',
    width: '90%',
    //height: 250,
    alignSelf: 'center',
    borderWidth: 3,


  },
  icLockRed: {
    width: 13 / 2,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 1
  }
});

