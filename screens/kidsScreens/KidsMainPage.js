import React, { useState } from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,Alert,Switch,ProgressBarAndroid,TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Header,Button,ButtonGroup} from 'react-native-elements';
import  Accordion  from '../../src/components/Accordion';


export default class KidsMainPage extends React.Component{

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
    // const { selectedIndex } = this.state

  return (
      <View style={styles.container}>
        <ScrollView>
      
          <View style={styles.container}>
            {/* <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 50,borderRadius:6} }
            /> */}


              {/* <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={tasksDone/allTasks.length}
              />             */}

                {/* { tasks } */}

              <Accordion/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8b96d9',
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

