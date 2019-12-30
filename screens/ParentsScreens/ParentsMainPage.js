import React, { useState } from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,Alert,Switch,ProgressBarAndroid,TouchableOpacity } from 'react-native';
// import MenuButton from '../components/MenuButton';
import { FormLabel, FormInput, FormValidationMessage, Header,Button,ButtonGroup,Divider,Overlay   } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Constants } from 'expo';


export default class SettingsScreen extends React.Component{

  constructor () {
    super()
    this.state = {
      selectedIndex: 2
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  
  render () {
    // const buttons = ['שבת', 'שישי', 'חמישי','רביעי','שלישי','שני','ראשון',]
    const { selectedIndex } = this.state

    var tasks=[];

    let allTasks=[
      {
        "title":"מקלחת",
        "time":"11:30",
        "place":"בית",
        "details":"לקלח עם סבון",
        "isDone":"false"  
      },
      {
        "title":"אסיפת הורים",
        "time":"17:00",
        "place":"בית ספר",
        "details":"לבוא רבע שעה לפני",
        "isDone":"true"            
      },
      {
        "title":"לבוא לפגישה עם עו''ס",
        "time":"18:00",
        "place":"מרכז ילדים-הורים",
        "details":"אין",
        "isDone":"true"        
      }
    ]
    let tasksDone=0;
    for(let i = 0; i < 3; i++){
      if(allTasks[i]['isDone']=='true'){
        tasksDone++;
      }
      tasks.push(
        <View key = {i}>
            <View style={styles.task}>
              <View style={styles.field}>
                <View style={styles.temp}>
                  <Text>משימה</Text>
                </View>
                <View style={styles.temp}>
                  <Text>{allTasks[i]['title']}</Text>
                </View>
              </View>
              <View style={styles.field}>
              <View style={styles.temp}>
                <Text>זמן</Text>
                </View>
                <View style={styles.temp}>
                <Text>{allTasks[i]['time']}</Text>
                </View>
              </View>
              <View style={styles.field}>
                <View style={styles.temp}>
                  <Text>מקום</Text>
                </View>
                <View style={styles.temp}>
                  <Text>{allTasks[i]['place']}</Text>
                </View>
              </View>
              <View style={styles.field}>
              <View style={styles.temp}>
                <Text>פרטים</Text>
                </View>
                <View style={styles.temp}>
                <Text>{allTasks[i]['details']}</Text>
                </View>
              </View>
              <View style={styles.field}>
              <View style={styles.temp}>
                <Text>המשימה בוצעה</Text>
                </View>
                <View style={styles.temp}>
                <Switch/>
                </View>
              </View>
              </View>


        </View>
        
      )
    }

  return (
      
  <ScrollView>
 
    <View style={styles.container}>
      {/* <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 50}}
      /> */}

        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={tasksDone/allTasks.length}
        />            
          { tasks }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingTop:15,
  },
  days:{
    flex:1,
    flexDirection:'row-reverse',
  
  },
  button:{
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width:45,
    marginLeft:6
  },
  text:{
    fontSize:30,
  },
  task:{
    flex:1,
    borderStyle:'solid',
    borderWidth:0.5, 
    backgroundColor:'#9ec3ff',
    marginBottom:10,

  },
  field:{
    flex:1,
    borderStyle:'solid',
    borderWidth:0.5,
    flexDirection:'row-reverse',
    margin:7,
    borderRadius: 4,
  },
  temp:{
    flex:1,
    textAlign:'left'
  }
});
