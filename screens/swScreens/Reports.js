import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, ImageBackground, ScrollView, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import Dropdown from './Dropdown';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from "@react-native-community/datetimepicker";
// import DatePicker from '@react-native-community/dateptimepicker'
import firebase from '../../config/config';
import { color } from 'react-native-reanimated';
import moment from 'moment';
import { Foundation, AntDesign } from '@expo/vector-icons';
import { date } from 'yup';
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
      fromDateShow: false,
      toDateShow: false,
      sdate: new Date(),
      edate: new Date(),
      loadingWeek: false,
      loadingMonth: false,
      loadingCustom: false

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

  tempServerGenerateReports = async (family, startDate, endDate, data) => {
    try {
      // var family = this.state.selectedFamily
      // var startDate = this.state.startDate
      // var endDate = this.state.endDate;
      var tempDate = startDate
      // var data = this.state.data

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

      var firstDate = moment(startDate,'DD/MM/YYYY');
      var secDate = moment(endDate,'DD/MM/YYYY');

      var diff = secDate.diff(firstDate,'days');
      console.log('diff: ', diff)
      diff = parseInt(diff)
      let reportContent = []
      console.log('familyMembers.length: ', familyMembers.length);
      for (let i = 0; i < diff; i++) {
        // familyMembers.forEach(async (x) => {
        for (let j = 0; j < familyMembers.length; j++) {
          let x = familyMembers[j]
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
      let reportConterntToSend = '';
      reportConterntToSend += headlines;
      // console.log('reportContent194 : ', reportContent)
      for (let k = 0; k < reportContent.length; k++) {
        //console.log('r: ', r);
        var values = Object.values(reportContent[k]);
        console.log('values', values);
        values.forEach((field) => {
          console.log('field: ', field);
          if (field == 'morning') {
            field = 'בוקר'
          }
          else if (field == 'noon') {
            field = 'צהריים'
          }
          else if (field == 'afternoon') {
            field = 'אחר הצהריים'
          }
          else if (field == 'evening') {
            field = 'ערב'
          }
          else if (field == 'custom tasks') {
            field = 'משימה מותאמת'
          }
          else if (field == true) {
            field = 'כן'
          }
          else if (field == false) {
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
            this.setState({ loadingCustom: false, loadingWeek: false, loadingMonth: false })
            this.setState({ feedbackMsg: 'הדו"ח נשלח בהצלחה' })
          })
          .catch((err) => {
            console.log('genReport Error: ', err);
            this.setState({ loadingCustom: false, loadingWeek: false, loadingMonth: false })
            this.setState({ feedbackMsg: 'אירעה שגיאה' })
          });
      }, 3000)
    } catch (err) {
      this.setState({ feedbackMsg: 'אירעה שגיאה', loadingWeek: false, loadingMonth: false, loadingCustom: false });
      console.log('Unknown Error: ', err);
    }


  }
  generateWeeklyReports = () => {
    this.setState({ loadingWeek: true })
    var family = this.state.selectedFamily
    var data = this.state.data
    var endDate = moment(new Date()).format('DD/MM/YYYY')
    var startDate = new Date(moment(endDate, "DD/MM/YYYY HH:MM A").subtract(7, "days"));
    startDate = moment(startDate).format('DD/MM/YYYY')
    // tempDate = new Date(moment(tempDate, "DD/MM/YYYY HH:MM A").add(1, "days"));
    // tempDate = moment(tempDate).format('DD/MM/YYYY')
    console.log('endDate ', endDate)
    console.log('startDate', startDate)
    console.log('family', family)
    console.log('',)
    this.tempServerGenerateReports(family, startDate, endDate, data)

  }

  generateMonthlyReports = () => {
    this.setState({ loadingMonth: true })
    var family = this.state.selectedFamily
    var data = this.state.data
    var endDate = moment(new Date()).format('DD/MM/YYYY')
    var startDate = new Date(moment(endDate, "DD/MM/YYYY HH:MM A").subtract(30, "days"));
    startDate = moment(startDate).format('DD/MM/YYYY')
    // tempDate = new Date(moment(tempDate, "DD/MM/YYYY HH:MM A").add(1, "days"));
    // tempDate = moment(tempDate).format('DD/MM/YYYY')
    console.log('endDate ', endDate)
    console.log('startDate', startDate)
    console.log('family', family)
    console.log('',)
    this.tempServerGenerateReports(family, startDate, endDate, data)

  }

  generateReports = () => {
    this.setState({ loadingCustom: true })
    var family = this.state.selectedFamily
    var startDate = moment(this.state.sdate).format('DD/MM/YYYY');
    var endDate = moment(this.state.edate).format('DD/MM/YYYY');
    var data = this.state.data
    // let genReport = firebase.functions().httpsCallable("generateReports");
    // genReport({ family: family, startDate: startDate, endDate: endDate, data: data })
    //   .then(result => {
    //     console.log('result: ', result);
    //   });
    this.tempServerGenerateReports(family, startDate, endDate, data)
  }

  selectedFamily = async (family) => {
    this.setState({ selectedFamily: family })
    console.log('selectedFamily: ', family)
    console.log('this.state.selectedFamily: ', this.state.selectedFamily)
  }

  onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.sdate;
    this.setState({ fromDateShow: Platform.OS === 'ios', sdate: currentDate });
    console.log('sdate: ', moment(this.state.sdate).format('DD-MM-YYYY'))
  }

  onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.edate;
    this.setState({ toDateShow: Platform.OS === 'ios', edate: currentDate });
    console.log('edate: ', moment(this.state.edate).format('DD-MM-YYYY'))
  }

  render() {

    return (

      <ImageBackground style={styles.IBstyle} source={require('../../assets/new_background09.png')}>
        <ScrollView style={styles.container}>
          <View style={styles.headLines}>
            <Text style={styles.titleText}>הפקת דוחות</Text>
          </View>
          <Dropdown
            families={this.state.familiesNames}
            familySelected={this.selectedFamily.bind(this)}
          />
          <View style={styles.lineStyle} />

          <View style={{ width: '50%', alignSelf: 'center', marginBottom: 10 }}>
            {this.state.loadingWeek
              ? <View>
                <ActivityIndicator size='large' color='#0ca5e5' />
                <Text style={styles.waitingMsg}>נא המתן...</Text>
              </View>
              : <Button
                disabled={this.state.loadingWeek || this.state.loadingMonth || this.state.loadingCustom ? true : false}
                titleStyle={{ marginRight: 10 }}
                icon={<Foundation
                  name="page-export-csv"
                  size={24}
                  color="white" />
                }
                iconRight
                buttonStyle={styles.button}
                onPress={this.generateWeeklyReports}
                title="הפקת דו''ח שבועי"
              />}
            {this.state.feedbackMsg == 'הדו"ח נשלח בהצלחה'
              ? <Text style={styles.waitingMsg}>{this.state.feedbackMsg}</Text>
              : this.state.feedbackMsg == 'אירעה שגיאה'
                ? <Text style={styles.waitingMsg, { color: 'crimson' }}>{this.state.feedbackMsg}</Text>
                : null
            }
          </View>
          <View style={{ width: '50%', alignSelf: 'center' }}>
            {this.state.loadingMonth
              ? <View>
                <ActivityIndicator size='large' color='#0ca5e5' />
                <Text style={styles.waitingMsg}>נא המתן...</Text>
              </View>
              : <Button
                disabled={this.state.loadingWeek || this.state.loadingMonth || this.state.loadingCustom ? true : false}
                buttonStyle={styles.button}
                icon={<Foundation
                  name="page-export-csv"
                  size={24}
                  color="white" />
                }
                iconRight
                titleStyle={{ marginRight: 10 }}
                onPress={this.generateMonthlyReports}
                title="הפקת דו''ח חודשי"
              />}
          </View>
          <View style={styles.lineStyle} />
          <View style={styles.headLines}>
            <Text style={styles.titleText}>דו''ח לפי תאריכים נבחרים</Text>
          </View>
          <View style={styles.datesPickers}>
            <View style={{ flexDirection: 'row-reverse', marginBottom: 10 }}>
              <Text style={styles.dateTitles}>מתאריך:</Text>
              <Text style={styles.date}> {moment(this.state.sdate).format('DD/MM/YYYY')}</Text>
            </View>
            {/* <DatePicker

              style={{ width: '50%' }}
              date={this.state.startDate}
              mode="date"
              placeholder="בחר תאריך"
              format="DD-MM-YYYY"
              minDate="01-01-2020"
              maxDate="30-12-2030"
              confirmBtnText="בחר"
              cancelBtnText="בטל"
              customStyles={{
                placeholderText: {
                  color: 'white'
                },
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  borderColor: 'white',
                  borderRadius: 20,
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.setState({ startDate: date })
                console.log('startDate: ', this.state.startDate)
              }}
            /> */}
            <Button
              disabled={this.state.loadingWeek || this.state.loadingMonth || this.state.loadingCustom ? true : false}
              buttonStyle={styles.button}
              containerStyle={{ width: '40%', alignSelf: 'center' }}
              title=' בחר תאריך'
              onPress={() => this.setState({ fromDateShow: true })}
              icon={<AntDesign name="calendar" size={24} color="white" />
              }
              iconRight
            />
            {this.state.fromDateShow &&
              <DateTimePicker
                testID='dateTimePicker'
                value={this.state.sdate}
                mode='date'
                onChange={this.onChangeFrom}

              />}
          </View>
          <View style={styles.datesPickers}>
            <View style={{ flexDirection: 'row-reverse', marginBottom: 10 }}>
              <Text style={styles.dateTitles}>עד תאריך: </Text>
              <Text style={styles.date}> {moment(this.state.edate).format('DD/MM/YYYY')}</Text>
            </View>
            {/* <DatePicker
              style={{ width: '50%' }}
              date={this.state.endDate}
              mode="date"
              androidMode='spinner'
              placeholder="בחר תאריך"
              format="DD-MM-YYYY"
              minDate="01-01-2020"
              maxDate="30-12-2030"
              confirmBtnText="Confirm"
              cancelBtnText="בטל"
              customStyles={{
                placeholderText: {
                  color: 'white'
                },
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  borderColor: 'white',
                  borderRadius: 20,
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ endDate: date }) }}
            /> */}
            <Button
              disabled={this.state.loadingWeek || this.state.loadingMonth || this.state.loadingCustom ? true : false}
              buttonStyle={styles.button}
              containerStyle={{ width: '40%', alignSelf: 'center', marginBottom: 10 }}
              title=' בחר תאריך'
              onPress={() => this.setState({ toDateShow: true })}
              icon={<AntDesign name="calendar" size={24} color="white" />
              }
              iconRight
            />
            {this.state.toDateShow &&
              <DateTimePicker
                testID='dateTimePicker'
                value={this.state.edate}
                mode='date'
                maximumDate={new Date()}
                onChange={this.onChangeTo}

              />}
          </View>
          {this.state.loadingCustom
            ? <View>
              <ActivityIndicator size='large' color='#0ca5e5' />
              <Text style={styles.waitingMsg}>נא המתן...</Text>
            </View>
            : <Button
              disabled={this.state.loadingWeek || this.state.loadingMonth || this.state.loadingCustom ? true : false}
              buttonStyle={styles.button}
              containerStyle={{ width: '50%', alignSelf: 'center', marginBottom: 10 }}
              onPress={this.generateReports}
              title="הפקת דו''ח"
              icon={<Foundation
                name="page-export-csv"
                size={24}
                color="white" />
              }
              iconRight
              titleStyle={{ marginRight: 10 }}
            />}
        </ScrollView>
      </ImageBackground>

    );
  }
}

export default Reports;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginTop: 10,
    height: '100%',
    //backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'white',
    marginHorizontal: 20,
    marginVertical: 15
  },
  datesPickers: {
    flexDirection: 'column',
    margin: 10,
    //justifyContent: 'flex-start'
    //  flex:1,

  },
  headLines: {
    alignItems: 'center',
    //marginTop:10
    //  margin:'20',
    //  fontSize:50,
    //  fontWeight:'bold',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  IBstyle: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between'
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#0ca5e5'
  },
  dateTitles: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    marginLeft: 5,
    //borderWidth:0.5
  },
  date: {
    color: 'white',
    fontWeight: 'bold',
    //borderWidth:0.5,
    alignSelf: 'center',
    fontSize: 18
  },
  waitingMsg: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});


