import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Dropdown from './Dropdown';

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state={
      families:[]
    };
    let items = [
      'Google',
      'TED',
      'GitHub',
      'Big Think',
      'Microsoft',
    ]
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
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

  }
  render() {
    console.log("שדגככככככככככככככככככככככככככככ")
 
    console.log(this.state.families)
    return (
      <View style={styles.container}>
        <Text> Reports </Text>
        <View>
          {this.state.families.map(familiy=>{
            return <View><Text>{familiy.name}</Text></View>
          })}
        <Dropdown/>
          
        </View>
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
  });
  