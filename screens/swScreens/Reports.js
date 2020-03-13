import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Dropdown from './Dropdown';
import DatePicker from 'react-native-datepicker'
// import DatePicker from '@react-native-community/dateptimepicker'

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state={
      families:[]
    };
  }

  componentDidMount(){

    const families2=[
    {name:"משפחת כהן"},
    {name:"משפחת לוי"},
    {name:"משפחת נחמני"},
    {name:"משפחת אמונה"},
    {name:"משפחת אנג'ל"},
    {name:"משפחת שליט"}
    ]

    this.setState({families:families2})

  }
  render() {
 
    console.log(this.state.families)
    return (
      <View style={styles.container}>
        {/* <Text style={{fontSize:30,marginBottom:15}}> Reports </Text>
        <View>
          {this.state.families.map(familiy=>{
            return <View><Text>{familiy.name}</Text></View>
          })}
         
        </View> */}
        <View style = {styles.headLines}>
          <Text style={styles.titleText}>הפקת דוחות קבועים</Text>
        </View>
        <Dropdown/>
          <View style={{marginBottom:10}}>
          <Button
            title="הפקת דו''ח שבועי"
          />
        </View>
        <View>
          <Button
            title="הפקת דו''ח חודשי"
          />
        </View>
      <View style = {styles.lineStyle} />
      <View style = {styles.headLines}>
        <Text style={styles.titleText}>דו''ח לפי תאריכים נבחרים</Text>
      </View>
      <View style={styles.datesPickers}>
        <Text>מתאריך:</Text>
        <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        // onDateChange={(date) => {this.setState({date: date})}}
      />
      </View>
      <View style={styles.datesPickers}>
          <Text>עד תאריך:</Text>
          <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2020-02-01" 
        maxDate="2020-02-29"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        // onDateChange={(date) => {this.setState({date: date})}}
      />
      </View>
      <Button
            title="הפקת דו''ח"
          />
      </View>
    );
  }
}

export default Reports;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    lineStyle:{
      borderWidth: 0.5,
      borderColor:'black',
      margin:20,
 },
 datesPickers:{
   flexDirection:'row-reverse',
   margin:20,
  //  flex:1,

 },
 headLines:{
   alignItems:'center',
  //  margin:'20',
  //  fontSize:50,
  //  fontWeight:'bold',
 },
 titleText: {
  fontSize: 20,
  fontWeight: 'bold',
},
  });
  



// import React, { Component } from 'react'
// import DatePicker from 'react-native-datepicker'
 
// export default class MyDatePicker extends Component {
//   constructor(props){
//     super(props)
//     this.state = {date:"2016-05-15"}
//   }
 
//   render(){
//     return (
//       <DatePicker
//         style={{width: 200}}
//         date={this.state.date}
//         mode="date"
//         placeholder="select date"
//         format="YYYY-MM-DD"
//         minDate="2016-05-01"
//         maxDate="2016-06-01"
//         confirmBtnText="Confirm"
//         cancelBtnText="Cancel"
//         customStyles={{
//           dateIcon: {
//             position: 'absolute',
//             left: 0,
//             top: 4,
//             marginLeft: 0
//           },
//           dateInput: {
//             marginLeft: 36
//           }
//           // ... You can check the source to find the other keys.
//         }}
//         onDateChange={(date) => {this.setState({date: date})}}
//       />
//     )
//   }
// }