import React, { useState } from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, Text, StyleSheet, View, ImageBackground, ScrollView, SafeAreaView, TextInput, Keyboard } from 'react-native';
import { Button, Input as InputElement } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import Spinner from '../src/components/Spinner';
import firebase from '../config/config'
import { auth } from 'firebase';

const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$+=!*()@%&]).{8,10}$/g

const changePassSchema = yup.object().shape({
  oldPass: yup.string().required('שדה חובה'),
  newPass: yup.string().required('שדה חובה').matches(passRegEx, 'סיסמה חייבת להכיל בין 8 ל-10 תווים, אות אנגלית גדולה, אות אנגלית קטנה, ספרה ותו מיוחד (@/$/%/!/*)'),
  confirmNewPass: yup.string().required('שדה חובה')
    .when("newPass", {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf(
        [yup.ref("newPass")],
        "הסיסמה צריכה להיות זהה בשתי השדות"
      )
    })
})


const ChangePasswordScreen = () => {

  const [loadingChangePass, setLoadingChangePass] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');


  const reauthenticate = (currentPassword) => {
    try {
      var user = firebase.auth().currentUser;
      var cred = auth.EmailAuthProvider.credential(
        user.email, currentPassword);
      return user.reauthenticateWithCredential(cred);
    } catch (err) {
      setLoadingChangePass(false);
      setFeedbackMsg('אירעה שגיאה');
      console.log('reauthenticate error1: ', err);
    }

  }

  const changePassword = (currentPassword, newPassword) => {
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        console.log("Password updated!");
        setFeedbackMsg('שינוי הסיסמה בוצע בהצלחה');
      }).catch((error) => {
        console.log('updatePassword error: ', error);
        setFeedbackMsg('אירעה שגיאה');
      });
    }).catch((error) => {
      console.log('reauthenticate error: ', error);
      setFeedbackMsg('אירעה שגיאה');

    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <ImageBackground style={{ height: '100%' }} source={require('../assets/new_background08.png')}>
          <View style={styles.formContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText} >שינוי סיסמה:</Text>
            </View>
            <Formik
              initialValues={{
                oldPass: '',
                newPass: '',
                confirmNewPass: ''
              }}
              validationSchema={changePassSchema}
              onSubmit={(values, actions) => {
                actions.resetForm();

                try {
                  changePassword(values.oldPass, values.newPass);
                  setLoadingChangePass(false);
                }
                catch (err) {
                  console.log('changePassword form error: ', err);
                  setLoadingChangePass(false);
                  setFeedbackMsg('אירעה שגיאה');
                }
              }}
            >
              {(props) => (
                <View style={styles.inputsContainer}>

                  <InputElement
                    onChangeText={props.handleChange('oldPass')}
                    onBlur={props.handleBlur('oldPass')}
                    value={props.values.oldPass}
                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                    placeholder='********'
                    secureTextEntry
                    inputStyle={{ color: 'gray', borderWidth: 1, borderRadius: 7, borderColor: 'lightgray', paddingHorizontal: 10 }}
                    containerStyle={styles.textInputContainer}
                    label='סיסמה ישנה'
                    labelStyle={{ color: 'black', marginRight: 5 }}
                    textAlign='right'
                    selectionColor='gray'
                  />
                  {props.errors.oldPass && props.touched.oldPass ? <Text style={styles.errorMsg}>{props.errors.oldPass}</Text> : null}

                  <InputElement
                    onChangeText={props.handleChange('newPass')}
                    onBlur={props.handleBlur('newPass')}
                    value={props.values.newPass}
                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                    placeholder='********'
                    secureTextEntry
                    inputStyle={{ color: 'gray', borderWidth: 1, borderRadius: 7, borderColor: 'lightgray', paddingHorizontal: 10 }}
                    containerStyle={styles.textInputContainer}
                    label='סיסמה חדשה'
                    labelStyle={{ color: 'black', marginRight: 5 }}
                    textAlign='right'
                    selectionColor='gray'

                  />
                  {props.errors.newPass && props.touched.newPass ? <Text style={styles.errorMsg}>{props.errors.newPass}</Text> : null}

                  <InputElement
                    onChangeText={props.handleChange('confirmNewPass')}
                    onBlur={props.handleBlur('confirmNewPass')}
                    value={props.values.confirmNewPass}
                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                    placeholder='********'
                    secureTextEntry
                    inputStyle={{ color: 'gray', borderWidth: 1, borderRadius: 7, borderColor: 'lightgray', paddingHorizontal: 10 }}
                    containerStyle={styles.textInputContainer}
                    label='אימות סיסמה חדשה'
                    labelStyle={{ color: 'black', marginRight: 5 }}
                    textAlign='right'
                    selectionColor='gray'
                  />
                  {props.errors.confirmNewPass && props.touched.confirmNewPass ? <Text style={styles.errorMsg}>{props.errors.confirmNewPass}</Text> : null}

                  {loadingChangePass
                    ? <Spinner />
                    : <Button
                      buttonStyle={styles.button}
                      containerStyle={{ width: '50%', alignSelf: 'center', marginBottom: 10 }}
                      title='אישור'
                      titleStyle={{ fontWeight: 'bold' }}
                      onPress={() => {
                        setLoadingChangePass(true);
                        props.handleSubmit();
                      }}
                    />
                  }
                  {feedbackMsg === 'שינוי הסיסמה בוצע בהצלחה'
                    ? <Text style={styles.successMsg}>{feedbackMsg}</Text>
                    : feedbackMsg === 'אירעה שגיאה'
                      ? <Text style={styles.errorMsg}>{feedbackMsg}</Text>
                      : null

                  }

                </View>
              )}
            </Formik>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback >
  );
}



const styles = StyleSheet.create({
  headerText: {
    textAlign: 'right',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },
  headerContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 5
  },
  formContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 20
  },
  inputsContainer: {
    alignItems: 'flex-end',
    marginVertical: 5,
    marginRight: 15,
  },
  textInputContainer: {
    width: '70%',
    marginVertical: 10

  },
  errorMsg: {
    alignSelf: 'center',
    color: 'crimson',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  successMsg: {
    alignSelf: 'center',
    color: 'green',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#0ca5e5'
  },
});

export default ChangePasswordScreen;