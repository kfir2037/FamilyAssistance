import React, { useState } from 'react';
import { StyleSheet, Picker, View } from 'react-native';
import firebase from '../../config/config';
import { Text } from 'native-base';


export default class KidsMainPage extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
      swList: [],
      selectedValue: '',
      familiesList:[],
    }
  }
  getSw = async () => {
    var arr = []
    await firebase.firestore().collection('users').get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          let data = doc.data();
          if (data.role == 'sw') {
            var name = data.firstName + ' ' + data.lastName;
            arr.push(<Picker.Item key={doc.id} label={name} value={doc.id} />)
          }
        })
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
    this.setState({ swList: arr })
  }

  async componentDidMount() {
    var x = await this.getSw()
  }

  select(item){
    console.log('item: ',item)
    var familiesID=[];
    var families=[]
    var x = firebase.firestore().collection('users').doc(item).get()
    .than(function (doc) {
      if (doc.exists) {
        familiesID = doc.data().families;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
    for(let i=0;i<families.length;i++){
      var y = firebase.firestore.collection('families').doc(families[i]).get()
      .than(function (doc) {
        if (doc.exists) {
          families.push(doc.data().lastName)
        } else {
          console.log("No such document!");
        }
      });
    }
    this.setState({familiesList:families})
  }
  render() {

    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.selectedValue}
          style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => this.select(itemValue)}
        >

          {this.state.swList}
          {/* <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" /> */}
        </Picker>
      </View>)
      {this.state.familiesList}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8b96d9',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 15,
  },
  days: {
    flex: 1,
    flexDirection: 'row-reverse',

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 45,
    marginLeft: 6
  },
  text: {
    fontSize: 30,
  },
  task: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 0.5,
    backgroundColor: '#9ec3ff',
    marginBottom: 10,

  },
  field: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 0.5,
    flexDirection: 'row-reverse',
    margin: 7,
    borderRadius: 4,
  },
  temp: {
    flex: 1,
    textAlign: 'left'
  }
});

