import React, { useEffect, useState } from 'react';
import { FlatList, Picker, Platform, StyleSheet, View, Text, ActivityIndicator, ScrollView, SafeAreaView, Modal, TouchableHighlight } from 'react-native';
import firebase from '../../config/config';
import { Button, Input, ListItem } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as yup from 'yup';

const WatchFamilies = ({ navigation }) => {

  const [modalLoading, setModalLoading] = useState(false);
  const [familyObj, setFamilyObj] = useState({});
  const [parentDetails, setParentDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isParentModalVisible, setIsParentModalVisible] = useState(false);
  const [isKidModalVisible, setIsKidModalVisible] = useState(false);
  const [birthDate, setBirthDate] = useState(moment(new Date()));
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);


  const AddParentPress = () => {
    setIsParentModalVisible(!isParentModalVisible);
  }

  const AddKidPress = () => {
    setIsKidModalVisible(!isKidModalVisible);
  }

  const parentListItem = async (item) => {
    //let parentDetails = {};
    await firebase.firestore().collection('users').doc(item).get()

      .then(doc => {
        //console.log(doc.data().firstName);
        setParentDetails = ({
          firstName: doc.data().firstName,
          birthDate: doc.data().birthDate,
          gender: doc.data().gender
        })
        console.log(parentDetails['firstName']);
      })
      .catch(error => {

      });


    return <Text>{parentDetails['firstName']}</Text>

  }

  const getFamily = async () => {
    const familyId = navigation.getParam('familyId');
    console.log(familyId);
    await firebase.firestore().collection('families').doc(familyId).get()
      .then(doc => {
        setFamilyObj(doc.data());
        setIsLoading(false);
        doc.data().parents.forEach(parentID => {
          firebase.firestore().collection('users').doc(parentID).get()
            .then(doc => {
              parentDetails.push({
                firstName: doc.data().firstName,
                birthDate: doc.data().birthDate,
                gender: doc.data().gender
              })
            }

            )
        })
        console.log('familyObj', familyObj);
        //firebase.firestore().collection('users').doc()
      })


    //firebase.firestore().collection('users').doc(familyObj['parents'][0])

  }

  const showDatePicker = () => {
    setShow(!show);
  };

  const onChange = (event, selectedDate) => {
    console.log("event ", event);
    
    const currentDate = moment(selectedDate) || birthDate;
    setShow(Platform.OS === 'ios');
    setBirthDate(currentDate);
    
  };


  useEffect(() => {
    getFamily();
    console.log("getFamily()");
  }, []);


  useEffect(() => {
    console.log(birthDate);
  }, [birthDate]);
  

  useEffect(() => {
    console.log('effect familyObj', familyObj['parents']);
  }, [familyObj]);

  useEffect(() => {
    console.log(isParentModalVisible);
  }, [isParentModalVisible]);

  return isLoading
    ? <View style={styles.container}>
      <ActivityIndicator size={50} color='#767ead' />
    </View>
    : (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isParentModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <ScrollView contentContainerStyle={{ alignItems: 'flex-end' }} style={styles.modalView}>
              <TouchableHighlight style={styles.closeIcon} onPress={() => {
                setIsParentModalVisible(!isParentModalVisible);
                setMessage('');
              }}>
                <AntDesign name="close" size={25} />
              </TouchableHighlight>
              <Formik
                
                initialValues={{ firstName: '', lastName: '', id: '', gender: '', birthDate: birthDate.toDate(), phone: '', email: '', familyId: navigation.getParam('familyId'), role: 'parent' }}
                //validationSchema={}
                onSubmit={(values, actions) => {
                  //actions.resetForm();
                  
                  actions.setValues({...values,birthDate:birthDate.toDate() })

                  console.log('values', values);
                  var createUser = firebase.functions().httpsCallable('createUser');
                  createUser(values)
                    .then(function (resp) {
                      //Display success
                      console.log(resp.data.result);
                      setModalLoading(false);
                      setMessage('הוספת הורה הצליחה');
                    })
                    .catch(function (error) {
                      var code = error.code;
                      var message = error.message;
                      //Display error
                      console.log(code + ' ' + message);
                      setModalLoading(false);
                      setMessage('הוספת הורה נכשלה');
                    });


                }}
              >{(props) => (
                <>
                  <Text style={{ ...styles.headlineText, alignSelf: 'center' }}>הוספת הורה חדש</Text>
                  <Input
                    value={props.values.firstName}
                    onChangeText={props.handleChange('firstName')}
                    onBlur={props.handleBlur('firstName')}
                    containerStyle={styles.modalInput}
                    placeholderTextColor='black'
                    autoCorrect={false}
                    textAlign='right'
                    placeholder='שם פרטי'
                  />
                  <Input
                    value={props.values.lastName}
                    onChangeText={props.handleChange('lastName')}
                    onBlur={props.handleBlur('lastName')}
                    containerStyle={styles.modalInput}
                    placeholderTextColor='black'
                    autoCorrect={false}
                    textAlign='right'
                    placeholder='שם משפחה '
                  />
                  <Input
                    value={props.values.id}
                    onChangeText={props.handleChange('id')}
                    onBlur={props.handleBlur('id')}
                    containerStyle={styles.modalInput}
                    placeholderTextColor='black'
                    autoCorrect={false}
                    textAlign='right'
                    keyboardType='phone-pad'
                    placeholder='תעודת זהות'
                  />

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ alignSelf: 'center' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{birthDate.format('DD/MM/YYYY').toString()}</Text>
                    </View>

                    <View style={styles.birtDateBox}>
                      <Button containerStyle={{ margin: 5, alignItems: 'flex-start' }} buttonStyle={styles.button} titleStyle={{ color: 'black' }} title="בחר תאריך "
                        onPress={showDatePicker}
                      />
                      <Text style={{ fontSize: 18 }}>תאריך לידה: </Text>
                      <View>
                        {show && <DateTimePicker
                          display='spinner'
                          style={{ position: 'absolute' }}
                          value={birthDate.toDate()}
                          onChange={(event, selectedDate) => {
                            onChange(event, selectedDate);
                            //props.setFieldValue('birthDate', birthDate.toDate());
                            props.handleChange('birthDate')
                            console.log('formik birthDate ', props.values.birthDate);
                            
                          }}
                        />
                        }
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row-reverse', margin: 10 }}>
                    <Text style={{ fontSize: 18 }}>מין</Text>
                    <Picker
                      mode='dropdown'
                      selectedValue={props.values.gender}
                      style={{ height: 30, width: 110 }}
                      onValueChange={props.handleChange('gender')}
                    >
                      <Picker.Item label='בחר/י' value='' />
                      <Picker.Item label='זכר' value='male' />
                      <Picker.Item label='נקבה' value='female' />
                    </Picker>
                  </View>
                  <Input
                    value={props.values.phone}
                    onChangeText={props.handleChange('phone')}
                    onBlur={props.handleBlur('phone')}
                    containerStyle={styles.modalInput}
                    textAlign='right'
                    placeholderTextColor='black'
                    keyboardType='phone-pad'
                    textContentType='telephoneNumber'
                    placeholder='טלפון'
                  />
                  <Input
                    value={props.values.email}
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    containerStyle={styles.modalInput}
                    placeholder='דוא"ל'
                    placeholderTextColor='black'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                  />

                  <View style={{ alignSelf: 'center', margin: 5 }}>
                    {modalLoading
                      ? <ActivityIndicator size={50} color='#767ead' />
                      : <Button containerStyle={styles.containerButton} buttonStyle={styles.button} titleStyle={{ color: 'black' }} title="הוסף "
                        onPress={() => {
                          setModalLoading(true);
                          props.handleSubmit();
                          //setIsParentModalVisible(!isParentModalVisible);
                        }}
                      />
                    }


                    {message ? <Text style={{ fontSize: 18, color: 'crimson' }}>{message}</Text> : null}

                  </View>
                </>
              )}
              </Formik>

            </ScrollView>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isKidModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <ScrollView contentContainerStyle={{ alignItems: 'flex-end' }} style={styles.modalView}>
              <TouchableHighlight style={styles.closeIcon} onPress={() => {
                setIsKidModalVisible(!isKidModalVisible);
                setMessage('');
              }}>
                <AntDesign name="close" size={25} />
              </TouchableHighlight>
              <Formik
                initialValues={{ firstName: '', lastName: '', id: '', birthDate: birthDate, phone: '', email: '', familyId: navigation.getParam('familyId'), role: 'kid' }}
                //validationSchema={}
                onSubmit={(values, actions) => {
                  actions.resetForm();
                  console.log('values', values);
                  var createUser = firebase.functions().httpsCallable('createUser');
                  createUser(values)
                    .then(function (resp) {
                      //Display success
                      console.log(resp.data.result);
                      setModalLoading(false);
                      setMessage('הוספת ילד הצליחה');
                    })
                    .catch(function (error) {
                      var code = error.code;
                      var message = error.message;
                      //Display error
                      console.log(code + ' ' + message);
                      setModalLoading(false);
                      setMessage('הוספת ילד נכשלה');
                    });


                }}
              >{(props) => (
                <>
                  <Text style={{ ...styles.headlineText, alignSelf: 'center' }}>הוספת ילד חדש</Text>
                  <Input
                    value={props.values.firstName}
                    onChangeText={props.handleChange('firstName')}
                    onBlur={props.handleBlur('firstName')}
                    containerStyle={styles.modalInput}
                    placeholderTextColor='black'
                    autoCorrect={false}
                    textAlign='right'
                    placeholder='שם פרטי'
                  />
                  <Input
                    value={props.values.lastName}
                    onChangeText={props.handleChange('lastName')}
                    onBlur={props.handleBlur('lastName')}
                    containerStyle={styles.modalInput}
                    placeholderTextColor='black'
                    autoCorrect={false}
                    textAlign='right'
                    placeholder='שם משפחה '
                  />
                  <Input
                    value={props.values.id}
                    onChangeText={props.handleChange('id')}
                    onBlur={props.handleBlur('id')}
                    containerStyle={styles.modalInput}
                    placeholderTextColor='black'
                    autoCorrect={false}
                    textAlign='right'
                    keyboardType='phone-pad'
                    placeholder='תעודת זהות'
                  />

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ alignSelf: 'center' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{props.values.birthDate.toLocaleDateString()}</Text>
                    </View>

                    <View style={styles.birtDateBox}>
                      <Button containerStyle={{ margin: 5, alignItems: 'flex-start' }} buttonStyle={styles.button} titleStyle={{ color: 'black' }} title="בחר תאריך "
                        onPress={showDatePicker}
                      />
                      <Text style={{ fontSize: 18 }}>תאריך לידה: </Text>
                      <View>
                        {show && <DateTimePicker
                          display='spinner'
                          style={{ position: 'absolute' }}
                          value={props.values.birthDate}
                          onChange={onChange}
                        />
                        }
                      </View>
                    </View>
                  </View>
                  <Input
                    value={props.values.phone}
                    onChangeText={props.handleChange('phone')}
                    onBlur={props.handleBlur('phone')}
                    containerStyle={styles.modalInput}
                    textAlign='right'
                    placeholderTextColor='black'
                    keyboardType='phone-pad'
                    textContentType='telephoneNumber'
                    placeholder='טלפון'
                  />
                  <Input
                    value={props.values.email}
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    containerStyle={styles.modalInput}
                    placeholder='דוא"ל'
                    placeholderTextColor='black'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                  />

                  <View style={{ alignSelf: 'center', margin: 5 }}>
                    {modalLoading
                      ? <ActivityIndicator size={50} color='#767ead' />
                      : <Button containerStyle={styles.containerButton} buttonStyle={styles.button} titleStyle={{ color: 'black' }} title="הוסף "
                        onPress={() => {
                          setModalLoading(true);
                          props.handleSubmit();
                          //setIsKidModalVisible(!isKidModalVisible);
                        }}
                      />
                    }

                    {message ? <Text style={{ fontSize: 18, color: 'crimson' }}>{message}</Text> : null}

                  </View>
                </>
              )}
              </Formik>

            </ScrollView>
          </View>
        </Modal>

        <Text style={styles.familyName}>משפחת {familyObj.lastName}</Text>
        <ScrollView style={styles.scrollView} >
          <View style={styles.detailsContainer}>
            <Text style={styles.headlineText}>פרטי משפחה: </Text>
            <Text style={styles.detailsText}>מצב משפחתי: </Text>
            <Text style={styles.detailsText}>מספר נפשות: {familyObj.numOfPersons}</Text>
            <Text style={styles.detailsText}>סטטוס פעילות: {familyObj.status ? <Text style={{ color: 'green' }}>פעילה</Text> : <Text style={{ color: 'crimson' }}>לא פעילה</Text>}</Text>
            <View style={styles.parentsDetails}>
              <Text style={styles.headlineText}>הורים:</Text>
              <View>
                <FlatList
                  //style={{ backgroundColor: 'white' }}
                  data={familyObj['parents']}
                  renderItem={({ item }) => { }}
                  keyExtractor={item => item}
                />
                <Button containerStyle={styles.containerButton} buttonStyle={styles.button} titleStyle={{ color: 'black' }} title="הוסף " icon={
                  <AntDesign name='adduser' size={25} />
                }
                  onPress={() => { AddParentPress() }}
                />
              </View>
            </View>
            <View style={styles.childsDetails}>
              <Text style={styles.headlineText}>ילדים:</Text>
              <View>
                {/* TODO: here should be a flatlist */}
                <Button containerStyle={styles.containerButton} buttonStyle={styles.button} titleStyle={{ color: 'black' }} title="הוסף " icon={
                  <AntDesign name='adduser' size={25} />
                }
                  onPress={() => { AddKidPress() }}
                />
              </View>
            </View>
            <Text style={styles.headlineText}>הערות:</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );

}

export default WatchFamilies;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#b5bef5',
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 1,
    //borderColor: 'black',
    //borderRadius: 10
  },
  familyName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
    // borderWidth: 1,
    // borderColor: 'black'
  },
  detailsContainer: {
    //backgroundColor: 'black',
    flex: 1,
    borderWidth: 0,
    borderColor: 'black',
    marginTop: 5

  },
  scrollView: {
    width: '100%',
    backgroundColor: '#8b96d9',
    borderRadius: 10
  },
  detailsText: {
    fontSize: 20,
    margin: 5,
    marginRight: 20
  },
  headlineText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 15

  },
  parentsDetails: {

  },
  button: {
    backgroundColor: '#767ead',
    width: 100,
    height: 40,
    borderRadius: 15
  },
  containerButton: {
    alignItems: 'center',
    margin: 5
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    height: "85%"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  closeIcon: {
    alignSelf: 'flex-end'
  },
  modalInput: {
    marginVertical: 10
  },

  birtDateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  }



});
