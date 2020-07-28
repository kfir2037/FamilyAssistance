import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, Switch, FlatList, Image, Picker, Platform, StyleSheet, View, Text, ActivityIndicator, ScrollView, SafeAreaView, Modal, TouchableOpacity, TouchableHighlight, ImageBackground } from 'react-native';
import firebase from '../../config/config';
import { Card, Button, Input, ListItem, Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as yup from 'yup';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const phoneRegEx = /^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/g

const UserSchema = yup.object({
  firstName: yup.string()
    .required('שדה חובה')
    .min(2, 'שם פרטי חייב להכיל לפחות 2 אותיות'),
  lastName: yup.string()
    .required('שדה חובה')
    .min(2, 'שם המשפחה חייב להכיל לפחות 2 אותיות'),
  id: yup.string()
    .required('שדה חובה')
    .matches(/^[0-9]{9}$/, 'מספר ת"ז לא תקין'),
  phone: yup.string()
    .required('שדה חובה')
    .matches(phoneRegEx, 'מספר טלפון לא תקין'),
})

const WatchFamilies = ({ navigation }) => {

  const [modalLoading, setModalLoading] = useState(false);
  const [familyObj, setFamilyObj] = useState({});
  const [parentDetails, setParentDetails] = useState([]);
  const [kidsDetails, setKidsDetails] = useState([]);
  const [parentDetailsLoading, setParentDetailsLoading] = useState(true);
  const [kidsDetailsLoading, setKidsDetailsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isParentModalVisible, setIsParentModalVisible] = useState(false);
  const [isKidModalVisible, setIsKidModalVisible] = useState(false);
  const [birthDate, setBirthDate] = useState(moment(new Date()));
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [familyId, setfamilyId] = useState(navigation.getParam('familyId'));
  const [editFamilyModal, seteditFamilyModal] = useState(false);
  const [isActive, setisActive] = useState();


  const AddParentPress = () => {
    setIsParentModalVisible(!isParentModalVisible);
  }

  const AddKidPress = () => {
    setIsKidModalVisible(!isKidModalVisible);
  }

  const toggleSwitch = async () => {
    setisActive(previousState => !previousState);
    // var obj = familyObj
    // obj.status = isActive
    familyObj.status = !familyObj.status;
    //setFamilyObj(obj);
    console.log('familyId: ', familyId)
    console.log('isActive: ', isActive)
    await firebase.firestore().collection('families').doc(familyId).update({
      status: familyObj.status
    })

    console.log('changes was saved')
  };

  const changeFamilyStatus = (status) => {
    console.log('status: ', status)
    var obj = familyObj
    obj.status = status
    setFamilyObj(obj)

  };

  const getFamily = async () => {
    const familyId = navigation.getParam('familyId');
    setfamilyId(familyId);

    await firebase.firestore().collection('families').doc(familyId).get()
      .then(async (doc) => {
        setFamilyObj(doc.data());
        setIsLoading(false);
        if (parentDetails.length == 0) {
          await doc.data().parents.forEach(async (parentID) => {
            await firebase.firestore().collection('users').doc(parentID).get()
              .then((doc) => {
                //setisActive(familyObj.status);
                parentDetails.push({
                  key: doc.id,
                  firstName: doc.data().firstName,
                  birthDate: doc.data().birthDate,
                  gender: doc.data().gender
                })


                setParentDetailsLoading(false);
                console.log('parentDetails ', parentDetails);
                //setRefreshing(false);
              })
          })
          if (doc.data().parents.length == 0) {
            setParentDetailsLoading(false);
            //setRefreshing(false);
          }
          if (kidsDetails.length == 0) {
            await doc.data().kids.forEach(async (kidID) => {
              await firebase.firestore().collection('users').doc(kidID).get()
                .then((doc) => {

                  kidsDetails.push({
                    key: doc.id,
                    firstName: doc.data().firstName,
                    birthDate: doc.data().birthDate,
                    gender: doc.data().gender
                  })

                  setKidsDetailsLoading(false);
                  //setRefreshing(false);
                  console.log('100 refreshing ', refreshing);

                })
                .catch((err) => { console.log(err) })
            })
            if (doc.data().kids.length == 0) {
              setKidsDetailsLoading(false);
              //setRefreshing(false);
              console.log('108 refreshing ', refreshing);

            }
          }
        }
        console.log('familyObj', familyObj);
      })
      .catch((error) => console.log(error))

    //setRefreshing(false);
    //firebase.firestore().collection('users').doc(familyObj['parents'][0])
    //console.log('124 refreshing ', refreshing);

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

  // const _onRefresh = async () => {
  //   setRefreshing(true);
  //   console.log('137 refreshing ', refreshing);
  //   return (
  //     getFamily()
  //   );
  // }

  const onRefresh = useCallback(async () => {
    console.log('OnRefresh!!!!');
    setRefreshing(true);
    setModalLoading(false);
    //  setKidsDetails([]);
    //  setParentDetails([]);
    await getFamily();
    //setRefreshing(false);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);



  useEffect(() => {
    getFamily();
    console.log("getFamily()");
  }, []);


  useEffect(() => {
    console.log('effect birthDate', birthDate);
  }, [birthDate]);


  useEffect(() => {
    console.log('effect familyObj', familyObj['parents']);
    console.log('isActive effect 1: ', isActive);
    //setisActive(familyObj.status);

    console.log('isActive effect 2: ', isActive);

    //setParentDetailsLoading(false);
  }, [familyObj]);



  useEffect(() => {
    console.log('effect parentDetails ', parentDetails);
  }, [parentDetails]);

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
                setModalLoading(false);
              }}>
                <AntDesign name="close" size={25} />
              </TouchableHighlight>
              <Formik

                initialValues={{ firstName: '', lastName: '', id: '', gender: '', phone: '', familyId: navigation.getParam('familyId'), role: 'parent' }}
                validationSchema={UserSchema}
                onSubmit={async (values, actions) => {
                  //actions.resetForm();

                  //actions.setValues({ ...values, birthDate: birthDate.format('DD/MM/YYYY') })
                  //console.log('values', values);
                  values = { ...values, birthDate: birthDate.format('DD/MM/YYYY').toString() }
                  var createUser = firebase.functions().httpsCallable('createUser');
                  await createUser(values)
                    .then((resp) => {
                      //Display success
                      console.log('values', values);
                      console.log(resp.data.result);
                      setModalLoading(false);
                      setMessage('הוספת הורה בוצעה בהצלחה');
                    })
                    .catch((error) => {
                      console.log('values', values);
                      var code = error.code;
                      var message = error.message;
                      //Display error
                      console.log(code + ' ' + message);
                      setModalLoading(false);
                      setMessage(error.message);
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
                  {props.errors.firstName && props.touched.firstName ? <Text style={styles.errorMsg}>{props.errors.firstName}</Text> : null}

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
                  {props.errors.lastName && props.touched.lastName ? <Text style={styles.errorMsg}>{props.errors.lastName}</Text> : null}

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
                  {props.errors.id && props.touched.id ? <Text style={styles.errorMsg}>{props.errors.id}</Text> : null}


                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ alignSelf: 'center' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{birthDate.format('DD/MM/YYYY').toString()}</Text>
                    </View>

                    <View style={styles.birtDateBox}>
                      <Button containerStyle={{ margin: 5, alignItems: 'flex-start' }} buttonStyle={styles.button} titleStyle={{ color: 'white' }} title="בחר תאריך "
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
                            //props.handleChange('birthDate')
                            //console.log('formik birthDate ', props.values.birthDate);
                            console.log('state birthDate ', birthDate);
                          }}
                        />
                        }
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row-reverse', margin: 10 }}>
                    <Text style={{ fontSize: 18 }}>מין</Text>
                    <Picker
                      accessibilityLabel={'gender'}
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
                  {props.errors.phone && props.touched.phone ? <Text style={styles.errorMsg}>{props.errors.phone}</Text> : null}

                  <View style={{ alignSelf: 'center', margin: 5 }}>
                    {modalLoading
                      ? <ActivityIndicator size={50} color='#767ead' />
                      : <Button containerStyle={styles.containerButton} buttonStyle={styles.button} titleStyle={{ color: 'white' }} title="הוסף "
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
                setModalLoading(false);
              }}>
                <AntDesign name="close" size={25} />
              </TouchableHighlight>
              <Formik
                initialValues={{ firstName: '', lastName: '', id: '', phone: '', familyId: navigation.getParam('familyId'), role: 'kid' }}
                validationSchema={UserSchema}
                onSubmit={async (values, actions) => {
                  //actions.resetForm();
                  console.log('values', values);
                  values = { ...values, birthDate: birthDate.format('DD/MM/YYYY').toString() }
                  var createUser = firebase.functions().httpsCallable('createUser');
                  //console.log('createUser ref: ', createUser);
                  await createUser(values)
                    .then((resp) => {
                      //Display success
                      console.log('values', values);
                      console.log(resp.data.result);
                      setModalLoading(false);
                      setMessage('הוספת ילד בוצעה בהצלחה');
                    })
                    .catch((error) => {
                      console.log('values', values);
                      var code = error.code;
                      var message = error.message;
                      //Display error
                      console.log(code + ' ' + message);
                      setModalLoading(false);
                      setMessage(error.message);
                    });


                }}
              >
                {(props) => (
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
                    {props.errors.firstName && props.touched.firstName ? <Text style={styles.errorMsg}>{props.errors.firstName}</Text> : null}

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
                    {props.errors.lastName && props.touched.lastName ? <Text style={styles.errorMsg}>{props.errors.lastName}</Text> : null}

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
                    {props.errors.id && props.touched.id ? <Text style={styles.errorMsg}>{props.errors.id}</Text> : null}

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
                              //props.handleChange('birthDate')
                              //console.log('formik birthDate ', props.values.birthDate);
                              console.log('state birthDate ', birthDate);
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
                    {props.errors.phone && props.touched.phone ? <Text style={styles.errorMsg}>{props.errors.phone}</Text> : null}


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

        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            enabled
          />
        }
          style={styles.scrollView} >
          <ImageBackground style={{ height: '100%', justifyContent: 'center', width: '100%', flex: 1 }} imageStyle={{ opacity: 0.1 }} source={require('../../assets/family.png')}>

            <View style={styles.detailsContainer}>
              <Card containerStyle={{ borderRadius: 20 }} titleStyle={{ fontSize: 22, textAlign: 'right' }} title='פרטי משפחה:'>
                <ImageBackground style={{}} imageStyle={{ height: '100%', opacity: 0.08 }} source={require('../../assets/family.png')}>
                  <Text style={styles.detailsText}>מצב משפחתי: {familyObj.isSingleParent ? 'גרושים' : 'נשואים'} </Text>
                  <Text style={styles.detailsText}>מספר נפשות: {familyObj.numOfPersons}</Text>
                  <Text style={styles.detailsText}>סטטוס פעילות: {familyObj.status ? <Text style={{ color: 'green' }}>פעילה</Text> : <Text style={{ color: 'crimson' }}>לא פעילה</Text>}</Text>
                  <Text style={styles.detailsText}>פעיל/לא פעיל:</Text>

                  {/* <Switch
                        value={familyObj.status}
                        onValueChange={value => changeFamilyStatus(!familyObj.status)}
                      /> */}
                  <Switch
                    style={{ alignItems: "center" }}
                    value={familyObj.status}
                    onValueChange={() => {
                      toggleSwitch();
                    }}
                  />
                </ImageBackground>
              </Card>
              <View style={styles.parentsDetails}>
                <Card containerStyle={{ borderRadius: 20 }} titleStyle={{ fontSize: 22, textAlign: 'right' }} title='הורים:'>
                  <ImageBackground style={{}} imageStyle={{ opacity: 0.08 }} source={require('../../assets/family.png')} >
                    <View>
                      {parentDetailsLoading
                        ? <ActivityIndicator size={40} color='#767ead' />
                        : <FlatList
                          //style={{ backgroundColor: 'white' }}
                          ListEmptyComponent={() => {
                            return (
                              <View>
                                <Text></Text>
                              </View>
                            );
                          }}
                          ListHeaderComponent={() => {
                            return (
                              <View style={styles.listHeaderStyle}>
                                <Text style={{ textAlign: 'center', fontSize: 18, flex: 1, fontWeight: 'bold' }}>שם</Text>
                                <Text style={{ textAlign: 'center', fontSize: 18, flex: 1, fontWeight: 'bold' }}>תאריך לידה</Text>
                                <Text style={{ textAlign: 'center', fontSize: 18, flex: 1, fontWeight: 'bold' }}>מין</Text>
                              </View>
                            );
                          }}
                          ItemSeparatorComponent={(props) => {
                            //console.log('props', props);
                            return (<View style={{ height: 5, margin: 10, backgroundColor: '#0ca5e5' }} />);
                          }}
                          data={parentDetails}
                          renderItem={({ item, separators }) => {
                            return (
                              <TouchableHighlight onShowUnderlay={separators.highlight} onHideUnderlay={separators.unhighlight} >
                                <View style={{ flexDirection: 'row-reverse' }}>
                                  <Text style={{ textAlign: 'center', fontSize: 15, flex: 1 }}> {item['firstName']}</Text>
                                  <Text style={{ textAlign: 'center', fontSize: 15, flex: 1 }}> {item['birthDate']} </Text>
                                  <Text style={{ textAlign: 'center', fontSize: 15, flex: 1 }}> {item['gender'] === 'male' ? 'זכר' : 'נקבה'}</Text>
                                </View>
                              </TouchableHighlight>
                            );
                          }}
                          keyExtractor={item => item['key']}
                        />

                      }
                      <Button containerStyle={styles.containerButton} buttonStyle={styles.button} titleStyle={{ color: 'white' }} title="הוסף " icon={
                        <AntDesign color='white' name='adduser' size={25} />
                      }
                        onPress={() => { AddParentPress() }}
                      />
                    </View>
                  </ImageBackground>
                </Card>
              </View>
              <View style={styles.childsDetails}>
                <Card containerStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 20 }} titleStyle={{ fontSize: 22, textAlign: 'right' }} title='ילדים:'>
                  <ImageBackground style={{}} imageStyle={{ opacity: 0.08 }} source={require('../../assets/family.png')} >
                    <View>
                      {kidsDetailsLoading
                        ? <ActivityIndicator size={40} color='#767ead' />
                        : <FlatList
                          //style={{ backgroundColor: 'white' }}
                          ListEmptyComponent={() => {
                            return (
                              <View>
                                <Text></Text>
                              </View>
                            );
                          }}
                          ListHeaderComponent={() => {
                            return (
                              <View style={styles.listHeaderStyle}>
                                <Text style={{ textAlign: 'center', fontSize: 18, flex: 1, fontWeight: 'bold' }}>שם</Text>
                                <Text style={{ textAlign: 'center', fontSize: 18, flex: 1, fontWeight: 'bold' }}>תאריך לידה</Text>
                                <Text style={{ textAlign: 'center', fontSize: 18, flex: 1, fontWeight: 'bold' }}>מין</Text>
                              </View>
                            );
                          }}
                          ItemSeparatorComponent={(props) => {
                            console.log('props', props);
                            return (<View style={{ height: 5, margin: 10, backgroundColor: '#0ca5e5' }} />);
                          }}
                          data={kidsDetails}
                          renderItem={({ item, separators }) => {
                            return (
                              <TouchableHighlight onShowUnderlay={separators.highlight} onHideUnderlay={separators.unhighlight} >
                                <View style={{ flexDirection: 'row-reverse' }}>
                                  <Text style={{ textAlign: 'center', fontSize: 15, flex: 1 }}> {item['firstName']}</Text>
                                  <Text style={{ textAlign: 'center', fontSize: 15, flex: 1 }}> {item['birthDate']}</Text>
                                  <Text style={{ textAlign: 'center', fontSize: 15, flex: 1 }}> {item['gender'] === 'male' ? 'זכר' : 'נקבה'}</Text>
                                </View>
                              </TouchableHighlight>
                            );
                          }}
                          keyExtractor={item => item['key']}
                        />

                      }
                      <Button containerStyle={styles.containerButton} buttonStyle={styles.button} titleStyle={{ color: 'white' }} title="הוסף " icon={
                        <AntDesign color='white' name='adduser' size={25} />
                      }
                        onPress={() => { AddKidPress() }}
                      />
                    </View>
                  </ImageBackground>

                </Card>
              </View>
              <Card containerStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 20, marginBottom: 10 }} titleStyle={{ fontSize: 22, textAlign: 'right' }} title='הערות:' >
                <Text style={{ fontSize: 18, marginRight: 10 }}>{familyObj.desc}</Text>
              </Card>
              <Modal animationType={"slide"} transparent={false}

                visible={editFamilyModal}
                onRequestClose={() => { console.log("Modal has been closed.") }}>
                {/*All views of Modal*/}
                {/*Animation can be slide, slide, none*/}
                <View style={styles.modal}>


                  <Text style={styles.text}>Modal is open!</Text>
                  <Button title="Click To Close Modal" onPress={() => {
                    seteditFamilyModal(!editFamilyModal)
                  }} />

                </View>
              </Modal>
            </View>
          </ImageBackground>
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.7}
          // onPress={() => navigation.navigate('EditFamilies',{
          //   familyId:familyId
          // })}
          onPress={() => seteditFamilyModal(true)}

          style={styles.TouchableOpacityStyle}>

          <Icon
            style={styles.editIcon}
            reverse
            name='ios-american-football'
            type='ionicon'
            color='#517fa4'
          />
        </TouchableOpacity>
      </SafeAreaView>
    );

}

export default WatchFamilies;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    //backgroundColor: '#b5bef5',
    alignItems: 'center',
    justifyContent: 'center',

  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  editIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  familyName: {
    fontSize: 25,
    fontWeight: 'bold',
    //marginTop: 10,
    textAlign: 'center',
    color: 'black',


    //marginBottom: 5
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
  modal: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#00ff00',
    padding: 100
  },
  text: {
    color: '#3f2949',
    marginTop: 10
  },
  scrollView: {
    width: '100%',
    //backgroundColor: '#8b96d9',
    borderRadius: 10,
    marginBottom: 10

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
    backgroundColor: '#0ca5e5',
    width: 100,
    height: 40,
    borderRadius: 15
  },
  containerButton: {
    alignItems: 'center',
    margin: 5,
    marginTop: 15
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
  },
  errorMsg: {
    marginHorizontal: 7,
    color: 'crimson',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 20
  },
  listHeaderStyle: {
    flexDirection: 'row-reverse',
    //alignItems:'center',
    margin: 10,
    // borderWidth: 1,
    // borderColor: 'black'

  }



});
