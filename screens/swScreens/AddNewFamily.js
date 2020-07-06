import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ImageBackground, StyleSheet, Text, View, Platform, ScrollView, SafeAreaView, Switch, TouchableOpacity, ActivityIndicator } from 'react-native';
//import {Picker as Select} from '@react-native-community/picker';
import { Input, Button } from 'react-native-elements';
import { Item, Picker } from 'native-base';
import firebase from '../../config/config';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const FamilySchema = yup.object({
  lastName: yup.string()
    .required('שדה חובה')
    .min(2, 'שם המשפחה חייב להכיל לפחות 2 אותיות'),
  numOfPersons: yup.string()
    .required('שדה חובה')
    .test('is-between-2-10', 'מספר הנפשות חייב להיות לפחות 2 ולכל היותר 10', (val) => {
      return parseInt(val) < 11 && parseInt(val) > 1;
    }),
  email: yup.string()
    .required('שדה חובה')
    .email('כתובת הדוא"ל אינה תקינה'),
  phone: yup.string()
    .required('שדה חובה')
    .length(10, 'מספר טלפון נייד לא תקין')

})

const AddNewFamily = () => {

  const [addFamilyLoading, setAddFamilyLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  return (
    <SafeAreaView>
      <ImageBackground style={{ height: '100%' }} source={require('../../assets/new_background09.png')}>
        <View style={styles.container}>
          <Formik
            initialValues={{ lastName: '', numOfPersons: 0, email: '', phone: '', isSingleParent: false, desc: '' }}
            validationSchema={FamilySchema}
            onSubmit={(values, actions) => {
              setAddFamilyLoading(true);
              actions.resetForm();
              console.log('values', values);
              var createFamily = firebase.functions().httpsCallable('createFamily');
              console.log(141);
              createFamily(values)
                .then(function (resp) {
                  //Display success
                  setAddFamilyLoading(false);
                  setFeedbackMsg('המשפחה נוספה בהצלחה למערכת');
                  console.log(resp.data.result);
                })
                .catch(function (error) {
                  var code = error.code;
                  var message = error.message;
                  //Display error
                  setAddFamilyLoading(false);
                  setFeedbackMsg('אירעה שגיאה בעת הוספת המשפחה');
                  console.log(code + ' ' + message);
                });
            }}
          >
            {(props) => (

              <View style={styles.inputsContainer}>
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                <Text style={[{ ...styles.headlines }, { fontSize: 22, alignSelf: 'center' }]}>הוספת משפחה</Text>
                <Text style={styles.headlines}> פרטי משפחה:</Text>
                <View style={styles.names}>
                  {/* <View style={styles.fields}>
                        <Text style={styles.text} >שם משפחה</Text>
                      </View> */}
                  <View style={styles.fields}>
                    <Input
                      maxLength={15}
                      selectionColor={'black'}
                      onChangeText={props.handleChange('lastName')}
                      value={props.values.lastName}
                      onBlur={props.handleBlur('lastName')}
                      label='שם משפחה'
                      placeholder='שם משפחה'
                      placeholderTextColor='gray'
                      labelStyle={{ color: 'black', marginRight: 5 }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      textAlign='right'
                      inputStyle={{ backgroundColor: 'lightgray', color: 'gray', borderWidth: 1, borderRadius: 7, borderColor: 'lightgray', paddingHorizontal: 10 }}
                    />
                  </View>
                </View>
                {props.errors.lastName && props.touched.lastName ? <Text style={styles.errorMsg}>{props.errors.lastName}</Text> : null}


                {/* <View style={styles.inputsContainer}> */}
                <View style={styles.names}>
                  <View style={styles.fields}>
                    <Input
                      keyboardType='email-address'
                      maxLength={40}
                      onBlur={props.handleBlur('email')}
                      selectionColor={'black'}
                      onChangeText={props.handleChange('email')}
                      value={props.values.email}
                      placeholder='abc@gmail.com'
                      placeholderTextColor='lightgray'
                      label='דוא"ל'
                      placeholderTextColor='gray'
                      labelStyle={{ color: 'black', marginRight: 5 }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      textAlign='right'
                      inputStyle={{ backgroundColor: 'lightgray', color: 'gray', borderWidth: 1, borderRadius: 7, borderColor: 'lightgray', paddingHorizontal: 10 }}
                    />
                  </View>
                </View>
                {props.errors.email && props.touched.email ? <Text style={styles.errorMsg}>{props.errors.email}</Text> : null}

                <View style={styles.names}>
                  <View style={styles.fields}>
                    <Input
                      //keyboardType='phone-pad'
                      onChangeText={props.handleChange('phone')}
                      onBlur={props.handleBlur('phone')}
                      value={props.values.phone}
                      placeholder='050-123-4567'
                      label='טלפון'
                      placeholderTextColor='gray'
                      labelStyle={{ color: 'black', marginRight: 5 }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      textAlign='right'
                      inputStyle={{ backgroundColor: 'lightgray', color: 'gray', borderWidth: 1, borderRadius: 7, borderColor: 'lightgray', paddingHorizontal: 10 }}

                    />
                  </View>
                </View>
                {props.errors.phone && props.touched.phone ? <Text style={styles.errorMsg}>{props.errors.phone}</Text> : null}


                <View style={styles.names}>
                  <View style={styles.fields}>
                    <Input
                      //keyboardType='phone-pad'
                      onChangeText={props.handleChange('desc')}
                      value={props.values.desc}
                      onBlur={props.handleBlur('desc')}
                      placeholder='הערות'
                      label='הערות'
                      multiline
                      placeholderTextColor='gray'
                      labelStyle={{ color: 'black', marginRight: 5 }}
                      inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      textAlign='right'
                      inputStyle={{ backgroundColor: 'lightgray', color: 'gray', borderWidth: 1, borderRadius: 7, borderColor: 'lightgray', paddingHorizontal: 10 }}
                    />
                  </View>
                </View>

                <View style={{flexDirection:'row-reverse'}} >
                  <View style={styles.names}>
                    <View style={[{ ...styles.fields }, { flex: 0 }]}>
                      <Text style={styles.text}>מס' נפשות</Text>
                    </View>
                    <View style={[{ ...styles.fields }, { flex: 0 }]}>
                      <Item style={{ width: 120, alignSelf: 'flex-end' }} picker>
                        <Picker
                          mode='dropdown'
                          placeholder="sdfsdfsdf"
                          placeholderStyle={{ color: 'black' }}
                          placeholderIconColor="#007aff"
                          selectedValue={props.values.numOfPersons}
                          onValueChange={props.handleChange('numOfPersons')}
                        >
                          <Picker.Item color='black' label='בחר/י' value='0' />
                          <Picker.Item label='2' value='2' />
                          <Picker.Item label='3' value='3' />
                          <Picker.Item label='4' value='4' />
                          <Picker.Item label='5' value='5' />
                          <Picker.Item label='6' value='6' />
                          <Picker.Item label='7' value='7' />
                          <Picker.Item label='8' value='8' />
                          <Picker.Item label='9' value='9' />
                          <Picker.Item label='10' value='10' />
                        </Picker>
                      </Item>
                    </View>
                  </View>

                  {props.errors.numOfPersons && props.touched.numOfPersons ? <Text style={styles.errorMsg}>{props.errors.numOfPersons}</Text> : null}
                  <View style={styles.names}>
                    <View style={[{ ...styles.fields }, { flex: 0 }]}>
                      <Text style={styles.text}>גרושים   </Text>
                    </View>
                    <View style={{ justifyContent: 'space-evenly' }}>
                      <Switch
                        thumbColor={props.values.isSingleParent ? '#0ca5e5' : 'gray'}
                        value={props.values.isSingleParent}
                        onValueChange={value => props.setFieldValue('isSingleParent', value)}
                      />
                    </View>
                  </View>
                </View>
                {addFamilyLoading
                  ? <ActivityIndicator />
                  : <Button
                    buttonStyle={styles.button}
                    containerStyle={{ width: '50%', alignSelf: 'center' }}
                    title='הוסף'
                    titleStyle={{fontWeight:'bold'}}
                    onPress={() => {

                      props.handleSubmit();
                    }}

                  />
                }
                {feedbackMsg
                  ? feedbackMsg === 'המשפחה נוספה בהצלחה למערכת'
                    ? <Text style={{ fontWeight: 'bold', marginBottom: 10, color: 'green', fontSize: 18, alignSelf: 'center' }} >{feedbackMsg}</Text>
                    : feedbackMsg === 'אירעה שגיאה בעת הוספת המשפחה'
                      ? <Text style={{ fontWeight: 'bold', marginBottom: 10, color: 'crimson', fontSize: 18, alignSelf: 'center' }}>{feedbackMsg}</Text>
                      : null
                  : null
                }
                {/* </TouchableWithoutFeedback> */}
              </View>

            )}
          </Formik>
        </View>
      </ImageBackground>
    </SafeAreaView>


  );
}

export default AddNewFamily;

const styles = StyleSheet.create({
  container: {
    //height:'100%'
    //flex: 1,
    //backgroundColor: '#b5bef5',
    //marginBottom: 100
  },
  names: {
    flexDirection: 'row-reverse',
    marginVertical: 10,
    marginHorizontal: 10,
    // borderRadius: 4,
    // borderWidth: 1,
    // borderColor: '#d6d7da',
  },
  headlines: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 7,
    marginRight: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 7,
    marginRight: 15
  },
  fields: {
    flex: 1,
    textAlign: 'right',
    //marginHorizontal: 5,
    // borderWidth: 0.5,
    // borderColor: 'black',
    justifyContent: 'space-evenly',
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#0ca5e5',
    marginVertical: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center'
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'blue',
    paddingBottom: 5,
    paddingTop: 25,

  },
  errorMsg: {
    marginHorizontal: 7,
    color: 'crimson',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 20
  },
  inputsContainer: {
    backgroundColor: 'rgba(255,255,255,0.87)',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20
  }

});





