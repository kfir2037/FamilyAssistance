

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,YellowBox, Image,ActivityIndicator } from 'react-native';
import DateTime from 'react-native-customize-selected-date'
import _ from 'lodash'
import firebase from '../../config/config';
import { ScrollView } from 'react-native-gesture-handler';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      test:'',
      morningTasks:[],
      noonTasks:[],
      afternoonTasks:[],
      eveningTasks:[],
      customTasks:[],
    }
  }

  async componentDidMount() {
    let tasks = await this.getTasks();

  }
  toTimestamp2(year,month,day){
    // var datum = new Date(Date.UTC(year.toString(),(month-1).toString(),day.toString()));
    console.log('year: ',year)
    console.log('month: ',month)
    console.log('day: ',day)
        var datum = new Date(Date.UTC('2020','04','18'));
    console.log('datum: ',datum)
    return datum.getTime()/1000;
   }

  getTasks = async () => {
    YellowBox.ignoreWarnings(['Setting a timer']);
    const familyId = this.props.navigation.state.params.familyId;

    let morningTasks = firebase.firestore().collection('RoutineTasks').doc('morning');

    let getDoc = morningTasks.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          let allData = doc.data();
          this.setState({morningTasks:allData.tasks})
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
            this.setState({noonTasks:allData.tasks})
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
              this.setState({afternoonTasks:allData.tasks})
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
                this.setState({eveningTasks:allData.tasks})
                // console.log('Document data:', this.state.eveningTasks);
              }
            })
            .catch(err => {
              console.log('Error getting document', err);
            });

            // const swFamilies = await firebase
            // .firestore()
            // .collection('tasks')
            // .where('family_id', '==', familyId) 
            // .get()
            // .then(querySnapshot => {
            //   querySnapshot.forEach(doc => {
            //     // console.log('doc: ',doc._document.key.path.segments[6]);
            //     let state = this.state.customTasks;
            //     state.push(doc._document)
            //     this.setState({customTasks:state})
            //     // console.log('custom tasks arr: ',this.state.customTasks);

            //   });
            //   // this.setState({ data: allFamilies });
            //   // console.log('data: ', this.state.data);
            // })
            // .catch(error => {
            //   console.log("Error getting documents: ", error);
            // });




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
  async onChangeDate(date) {
    let chosenDayTasks=[];

    this.setState({customTasks:chosenDayTasks})
    console.log('date: ',typeof date);
    let chooseDay = date[8]+date[9];
    let chooseMonth = date[5]+date[6];
    let chooseYear = date[0]+date[1]+date[2]+date[3];
    // let chooseDateTimestamp = this.toTimestamp2(chooseYear,chooseMonth,chooseDay);
    let taskDay = '';
    let taskMonth = '';
    let taskYear = '';

    const familyId = this.props.navigation.state.params.familyId;

    const swFamilies = await firebase
    .firestore()
    .collection('tasks')
    .where('family_id', '==', familyId)  
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // let date = this.state.customTasks;
        // let state = this.state.customTasks;
        let date = doc._document.proto.fields.date.timestampValue;
        console.log('doc._document: ',doc._document.proto.fields.date.timestampValue)
        taskDay = date[8]+date[9];
        taskMonth = date[5]+date[6];
        taskYear = date[0]+date[1]+date[2]+date[3];
        if(taskDay==chooseDay&&taskMonth==chooseMonth&&taskYear==chooseYear){
          // chosenDayTasks.push(doc._document.proto)
          let state = this.state.customTasks;
          state.push(doc._document.proto)
          this.setState({customTasks:state})
        }
        // state.push(doc._document)
        // this.setState({customTasks:state})

      });
      console.log('chosenDayTasks: ',chosenDayTasks)
      console.log(taskDay+taskMonth+taskYear)
      // let taskTimeStamp = this.toTimestamp2(taskYear,taskMonth,taskDay);
      // console.log('timestamp2: ',taskTimeStamp);
    })
    .catch(error => {
      console.log("Error getting documents: ", error);
    });

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
   let cusTasks=[];
  //  if (cusTasks.length<1) {
  //   return <ActivityIndicator  />;
  // }
    let items = this.state.customTasks.map(function(item){
    cusTasks.push(item.fields.title.stringValue),
    console.log('timestamp: ',item.fields.date.timestampValue)

    });
    // let arr = items.map(function(item){
    //   console.log('3: ',item.proto.fields.test)
    // });
    console.log('cusTasks2: ', cusTasks)
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
        {/* <ScrollView> */}
        <View style={styles.tasks}>    
        {/* <Text style={styles.tasksTitle}>משימות בוקר</Text>      
         <Text style={styles.tasksList}>{this.state.morningTasks}</Text>
         <Text style={styles.tasksTitle}>משימות צהריים</Text>      
         <Text style={styles.tasksList}>{this.state.noonTasks}</Text>
         <Text style={styles.tasksTitle}>משימות אחר הצהריים</Text>      
         <Text style={styles.tasksList}>{this.state.afternoonTasks}</Text>
         <Text style={styles.tasksTitle}>משימות ערב</Text>      
         <Text style={styles.tasksList}>{this.state.eveningTasks}</Text> */}
         <Text style={styles.tasksTitle}>משימות מותאמות</Text>      
        <Text style={styles.tasksList}>{cusTasks}</Text>
        </View>
        {/* </ScrollView> */}
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
  tasksTitle:{
    fontSize:20,
    color:'red',
    fontWeight:'bold'
  },
  icLockRed: {
    width: 13 / 2,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 1
  }
});

