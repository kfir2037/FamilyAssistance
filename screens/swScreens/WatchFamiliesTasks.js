

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, YellowBox, Image } from 'react-native';
import DateTime from 'react-native-customize-selected-date'
import _ from 'lodash'
import firebase from '../../config/config';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      test: '',
      morningTasks: [],
      noonTasks: [],
      afternoonTasks: [],
      eveningTasks: [],
      customTasks: [],
    }
  }

  async componentDidMount() {
    let tasks = await this.getTasks();

  }

  getTasks = async () => {
    YellowBox.ignoreWarnings(['Setting a timer']);

    // let allFamilies = []
    // let familyObj = {}
    const familyId = this.props.navigation.state.params.familyId;
    // console.log("familyuId: ",familyId);


    let morningTasks = firebase.firestore().collection('RoutineTasks').doc('morning');

    let getDoc = morningTasks.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          let allData = doc.data();
          this.setState({ morningTasks: allData.tasks })
          // console.log('Document data:', this.state.morningTasks);
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

    let noonTasks = firebase.firestore().collection('RoutineTasks').doc('noon');
    getDoc = noonTasks.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          let allData = doc.data();
          this.setState({ noonTasks: allData.tasks })
          // console.log('Document data:', this.state.noonTasks);
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

    let afternoonTasks = firebase.firestore().collection('RoutineTasks').doc('afterNoon');
    getDoc = afternoonTasks.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          let allData = doc.data();
          this.setState({ afternoonTasks: allData.tasks })
          // console.log('Document data:', this.state.afternoonTasks);
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

    let eveningTasks = firebase.firestore().collection('RoutineTasks').doc('evening');
    getDoc = eveningTasks.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          let allData = doc.data();
          this.setState({ eveningTasks: allData.tasks })
          // console.log('Document data:', this.state.eveningTasks);
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

    const swFamilies = await firebase
      .firestore()
      .collection('tasks')
      .where('family_id', '==', familyId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log('doc: ',doc._document.key.path.segments[6]);
          let state = this.state.customTasks;
          state.push(doc._document)
          this.setState({ customTasks: state })
          // console.log('custom tasks arr: ',this.state.customTasks);

        });
        // this.setState({ data: allFamilies });
        // console.log('data: ', this.state.data);
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });




    // let customTasks =await firebase
    // .firestore()
    // .collection('tasks')
    // .where('title', '==', 'test')
    // // .where('family_id', '==', familyId)
    // .get()
    // .then(doc => {
    //   if (!doc.exists) {
    //     console.log('familyId: ',familyId);
    //     console.log('No such document!');
    //   } else {
    //     let allData = doc.data();
    //     console.log('customTasks:', allData);
    //   }
    // })


    return familyId;
  }
  onChangeDate(date) {
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(date)
    }
    this.setState({ test: arr })

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

    let items = this.state.customTasks.map((item, key) =>
      JSON.stringify(item.proto.fields.test)
    );
    items = items.map((item, key) =>
      console.log(item)
    );
    // let items = this.state.customTasks.map((item,key)=>
    // <Text key='1'>{item.proto.fields.test}</Text>
    // )
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
          <Text>משימות בוקר</Text>
          <Text>{this.state.morningTasks}</Text>
          <Text>משימות צהריים</Text>
          <Text>{this.state.noonTasks}</Text>
          <Text>משימות אחר הצהריים</Text>
          <Text>{this.state.afternoonTasks}</Text>
          <Text>משימות ערב</Text>
          <Text>{this.state.eveningTasks}</Text>
          <Text>משימות מותאמות</Text>
          {/* <Text>{items}</Text> */}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tasks: {
    alignItems: "center",
    color: 'green',
    width: 400,
    height: 250,
    alignSelf: 'center',
    borderWidth: 3,
    bottom: -400,
    flex: 3,


  },
  icLockRed: {
    width: 13 / 2,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 1
  }
});

