import React, {useState} from 'react';
import { Picker, StyleSheet, Text, View, ScrollView, TextInput, Switch, TouchableOpacity, ActivityIndicator } from 'react-native';
//import {Picker as Select} from '@react-native-community/picker';
import { Input } from 'react-native-elements';
import firebase from '../../config/config';
import { Formik } from 'formik';
import * as yup from 'yup';


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
    <ScrollView style={{ backgroundColor: '#b5bef5' }}>
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
            <View>
              <Text style={styles.headlines}> פרטי משפחה:</Text>
              <View style={styles.inputsContainer}>
                <View style={styles.names}>
                  {/* <View style={styles.fields}>
                    <Text style={styles.text} >שם משפחה</Text>
                  </View> */}
                  <View style={styles.fields}>
                    <Input
                      //label='שם משפחה'
                      //labelStyle={{color:'#767ead'}}
                      maxLength={15}
                      inputStyle={{ color: 'white' }}
                      selectionColor={'white'}
                      onChangeText={props.handleChange('lastName')}
                      value={props.values.lastName}
                      placeholder='שם משפחה'
                      textAlign='right'
                      placeholderTextColor='white'
                      onBlur={props.handleBlur('lastName')}
                      inputContainerStyle={{ borderBottomColor: 'white' }}
                    />
                  </View>
                </View>
                {props.errors.lastName && props.touched.lastName ? <Text style={styles.errorMsg}>{props.errors.lastName}</Text> : null}
                <View style={styles.names}>
                  <View style={styles.fields}>
                    <Text style={styles.text}>מספר נפשות</Text>
                  </View>
                  <View style={styles.fields}>
                    <Picker

                      mode='dropdown'
                      accessibilityLabel='numOfPersons'
                      selectedValue={props.values.numOfPersons}
                      style={{ justifyContent: 'flex-end' }}
                      onValueChange={props.handleChange('numOfPersons')}
                    >
                      <Picker.Item color='white' label='בחר/י' value='0' />
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
                  </View>
                </View>
                {props.errors.numOfPersons && props.touched.numOfPersons ? <Text style={styles.errorMsg}>{props.errors.numOfPersons}</Text> : null}
                <View style={styles.names}>
                  <View style={styles.fields}>
                    <Text style={styles.text}>גרושים</Text>
                  </View>
                  <View style={{ justifyContent: 'space-evenly', flex: 1 }}>
                    <Switch
                      trackColor='black'
                      thumbColor='#b5bef5'
                      style={{}}
                      value={props.values.isSingleParent}
                      onValueChange={value => props.setFieldValue('isSingleParent', value)}
                    />
                  </View>
                </View>
              </View>

              <Text style={styles.headlines}>פרטי קשר:</Text>
              <View style={styles.inputsContainer}>
                <View style={styles.names}>
                  <View style={styles.fields}>
                    <Input
                      keyboardType='email-address'
                      maxLength={40}
                      inputStyle={{ color: 'white' }}
                      selectionColor={'white'}
                      onChangeText={props.handleChange('email')}
                      value={props.values.email}
                      placeholder='דוא"ל'
                      placeholderTextColor='white'
                      onBlur={props.handleBlur('email')}
                      inputContainerStyle={{ borderBottomColor: 'white' }}
                    />
                  </View>
                </View>
                {props.errors.email && props.touched.email ? <Text style={styles.errorMsg}>{props.errors.email}</Text> : null}

                <View style={styles.names}>
                  <View style={styles.fields}>
                    <Input
                      //keyboardType='phone-pad'
                      onChangeText={props.handleChange('phone')}
                      value={props.values.phone}
                      placeholder='טלפון'
                      placeholderTextColor='white'
                      onBlur={props.handleBlur('phone')}
                      inputContainerStyle={{ borderBottomColor: 'white' }}
                      textAlign='right'
                      inputStyle={{ color: 'white' }}

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
                      placeholder='הערות'
                      placeholderTextColor='white'
                      onBlur={props.handleBlur('desc')}
                      multiline
                      inputContainerStyle={{ borderBottomColor: 'white' }}
                      textAlign='right'
                      inputStyle={{ color: 'white' }}
                    />
                  </View>
                </View>


              </View>


              {addFamilyLoading
                ? <ActivityIndicator />
                : <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    
                    props.handleSubmit();
                  }}
                >
                  <Text style={styles.buttonText}> הוסף </Text>
                </TouchableOpacity>
              }
              {feedbackMsg
                ? feedbackMsg === 'המשפחה נוספה בהצלחה למערכת'
                  ? <Text style={{ color: 'green' }} >{feedbackMsg}</Text>
                  : feedbackMsg === 'אירעה שגיאה בעת הוספת המשפחה'
                    ? <Text style={{ color: 'crimson' }}>{feedbackMsg}</Text>
                    : null
                : null
              }
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>

  );
}

export default AddNewFamily;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#b5bef5',
    marginBottom: 100
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
    color: '#767ead',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 7,
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginVertical: 7,
    marginHorizontal: 5
  },
  fields: {
    flex: 1,
    textAlign: 'right',
    marginHorizontal: 5,
    justifyContent: 'space-evenly'
  },
  button: {
    width: 150,
    height: 50,
    // borderWidth: 1,
    // borderColor: '#d6d7da',
    backgroundColor: '#767ead',
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
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
    backgroundColor: '#767ead',
    marginHorizontal: 10,
    borderRadius: 20
  }

});





