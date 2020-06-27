import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Dropdown from './Dropdown';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from "@react-native-community/datetimepicker";
// import DatePicker from '@react-native-community/dateptimepicker'
import firebase from '../../config/config';
import { color } from 'react-native-reanimated';
import moment from 'moment';
// var Mailer = require('NativeModules').RNMail;

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      families: [],
      data: {},
      familiesNames: [],
      selectedFamily: '',
      startDate: '',
      endDate: '',
    };
  }

  async componentDidMount() {
    let familiesNames = []
    let families = await this.getFamilies();
    // for (family in families) {
    //   familiesNames.push({
    //     label: 'משפחת' + family.familyDetails.lastName,
    //     value: familyId
    //   })
    // }

  }

  getFamilies = async () => {

    let allFamilies = []
    let familiesNames = []
    let familyObj = {}
    const socialWorkerUid = firebase.auth().currentUser['uid'];
    console.log('socialWorkerId ' + socialWorkerUid);

    const swFamilies = await firebase
      .firestore()
      .collection('families')
      .where('swInCharge', '==', socialWorkerUid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // allFamilies.push(doc);
          familyObj[doc.id] = Object.assign({}, doc.data());
          // console.log('doc.data(): ',doc.data())
          // console.log('doc.id: ',doc.id)
          allFamilies.push({
            familyDetails: doc.data(),
            familyId: doc.id
          })
          familiesNames.push({
            label: ' משפחת ' + doc.data().lastName,
            value: doc.id
          })
        });
        // this.setState({ data: allFamilies });
        // this.setState({ loading: false, refreshing: false });
        // console.log('data: ', this.state.data);
        this.setState({ data: allFamilies, familiesNames: familiesNames })
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });

    return allFamilies;
  }

  tempServerGenerateReports = async () => {
    var family = this.state.selectedFamily
    var startDate = this.state.startDate
    var endDate = this.state.endDate;
    var tempDate = startDate
    console.log('tempDate222: ', tempDate)
    var data = this.state.data
    // console.log('startDate: ', startDate)
    // console.log('endDate: ', endDate)
    var familyDetails = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].familyId == family) {
        familyDetails = data[i]
      }
    }
    var familyMembers = []
    if (familyDetails.familyDetails && familyDetails.familyDetails.parents.length > 0) {
      console.log('Parents was found')
      familyMembers = familyMembers.concat(familyDetails.familyDetails.parents)

    }
    if (familyDetails.familyDetails && familyDetails.familyDetails.kids.length > 0) {
      console.log('Kids was found')
      familyMembers = familyMembers.concat(familyDetails.familyDetails.kids)

    }
    var diff = moment([endDate]).diff(moment([startDate]), 'years')
    // console.log('diff: ', diff)
    diff = parseInt(diff)
    let reportContent = []
    console.log('familyMembers.length: ', familyMembers.length);
    for (let i = 0; i < diff; i++) {
      // familyMembers.forEach(async (x) => {
      for (let j = 0; j < familyMembers.length; j++) {
        x = familyMembers[j]
        var person

        var y = await firebase.firestore().collection('users').doc(x).get()
          .then(async (doc) => {
            person = doc.data()
          })
          .catch((err) => console.log('doc(x) Error: ', err));
        // console.log('person: ',person)
        const swFamilies = await firebase
          .firestore()
          .collection("tasks")
          .where("userId", "==", x)
          .get()
          .then(async (querySnapshot) => {
            // console.log('querySnapshot: ',querySnapshot)
            // for(let doc in querySnapshot){
            querySnapshot.forEach(async (doc) => {
              let data = doc.data();
              // let data = querySnapshot[i].data();
              var taskId = doc.id;
              // var taskId = querySnapshot[i].id;
              var timeFromTheTask = moment(
                new Date(data.date.seconds * 1000)
              ).format("DD/MM/YYYY");

              // console.log('tempDate: ', tempDate)

              var temp = tempDate
              console.log('temp2: ', temp)
              temp = temp.replace(/-/g, '/')
              console.log('timeFromTheTask: ', timeFromTheTask)
              console.log('temp: ', temp)
              // console.log('data: ',data)
              if (timeFromTheTask == temp) {
                console.log("same");
                // console.log("first name: ",person.firstName);

                reportContent.push({
                  date: tempDate,
                  name: person.firstName + ' ' + person.lastName,
                  isDone: data.isDone,
                  categoty: data.category,
                  taskName: data.tasks
                })
                console.log('x: ', x)
                console.log('reportContent2222: ', reportContent)

              } else {
                console.log("not same");
              }
            }
            );

            // tempDate = new Date(moment(tempDate, "DD/MM/YYYY HH:MM A").add(1, "days"));
            // tempDate = moment(tempDate).format('DD/MM/YYYY')
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
      // )
      console.log('*******************************************')
      tempDate = new Date(moment(tempDate, "DD/MM/YYYY HH:MM A").add(1, "days"));
      tempDate = moment(tempDate).format('DD/MM/YYYY')
      console.log('*******************************************')


    }

    const userId = firebase.auth().currentUser.uid;

    // console.log('userId ', userId);
    var swMail = ''
    await firebase.firestore().collection('users').doc(userId).get()
      .then((doc) => {
        var data = doc.data()
        swMail = data.email
      })
      .catch((err) => console.log('get user email error: ', err));

    // console.log('swMail: ', swMail)
    var headlines = 'תאריך, שם, האם בוצעה המשימה?, קטגוריה, שם המשימה\n'
    reportConterntToSend = '';
    reportConterntToSend += headlines;
    // console.log('reportContent194 : ', reportContent)
    for (let k = 0; k < reportContent.length; k++) {
      //console.log('r: ', r);
      var values = Object.values(reportContent[k]);
      console.log('values', values);
      values.forEach((field) => {
        console.log('field: ', field);
        if(field == 'morning'){
          field = 'בוקר'
        }
        else if(field == 'noon'){
          field = 'צהריים'
        }
        else if(field == 'afternoon'){
          field = 'אחר הצהריים'
        }
        else if(field == 'evening'){
          field = 'ערב'
        }
        else if(field == 'custom tasks'){
          field = 'משימה מותאמת'
        }
        else if(field == 'true'){
          field = 'כן'
        }
        else if(field == 'false'){
          field = 'לא'
        }
        reportConterntToSend += field + ','
      })

      reportConterntToSend += '\n'
    }


    // console.log('reportContent123:', reportContent)
    // reportContent='hello, world!\nkfir,nahmani\nshimon,emuna\n'
    setTimeout(() => {
      // console.log('reporConterntToSend: ', reportConterntToSend)
      let genReport = firebase.functions().httpsCallable("sendMail");
      genReport({ reportContent: reportConterntToSend, swMailAddress: swMail })
        .then(result => {
          console.log('result: ', result);
        })
        .catch((err) => console.log('genReport Error: ', err));
    }, 3000)


  }

  generateReports = () => {
    var family = this.state.selectedFamily
    var startDate = this.state.startDate
    var endDate = this.state.endDate;
    var data = this.state.data
    // let genReport = firebase.functions().httpsCallable("generateReports");
    // genReport({ family: family, startDate: startDate, endDate: endDate, data: data })
    //   .then(result => {
    //     console.log('result: ', result);
    //   });
    this.tempServerGenerateReports()
  }

  selectedFamily = async (family) => {
    this.setState({ selectedFamily: family })
    console.log('selectedFamily: ', family)
    console.log('this.state.selectedFamily: ', this.state.selectedFamily)
  }

  render() {

    // console.log(this.state.families)
    return (
      <View style={styles.container}>
        {/* <Text style={{fontSize:30,marginBottom:15}}> Reports </Text>
        <View>
          {this.state.families.map(familiy=>{
            return <View><Text>{familiy.name}</Text></View>
          })}
         
        </View> */}
        <View style={styles.headLines}>
          <Text style={styles.titleText}>הפקת דוחות קבועים</Text>
        </View>
        <Dropdown families={this.state.familiesNames} familySelected={this.selectedFamily.bind(this)} />
        <View style={{ marginBottom: 10 }}>
          <Button
            title="הפקת דו''ח שבועי"
          />
        </View>
        <View>
          <Button
            title="הפקת דו''ח חודשי"
          />
        </View>
        <View style={styles.lineStyle} />
        <View style={styles.headLines}>
          <Text style={styles.titleText}>דו''ח לפי תאריכים נבחרים</Text>
        </View>
        <View style={styles.datesPickers}>
          <Text>מתאריך:</Text>
          <DatePicker

            style={{ width: 200 }}
            date={this.state.startDate}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2020"
            maxDate="30-12-2030"
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
            onDateChange={(date) => { this.setState({ startDate: date }) }}
          />
        </View>
        <View style={styles.datesPickers}>
          <Text>עד תאריך:</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.endDate}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2020"
            maxDate="30-12-2030"
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
            onDateChange={(date) => { this.setState({ endDate: date }) }}
          />
        </View>
        <Button
          // onPress={this.generateReports(this.state.selectedFamily, this.state.startDate, this.state.endDate,this.state.data)}
          onPress={this.generateReports}
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
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 20,
  },
  datesPickers: {
    flexDirection: 'row-reverse',
    margin: 20,
    //  flex:1,

  },
  headLines: {
    alignItems: 'center',
    //  margin:'20',
    //  fontSize:50,
    //  fontWeight:'bold',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});


