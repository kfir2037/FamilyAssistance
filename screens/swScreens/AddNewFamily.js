import React, { useState } from 'react';
import { Picker, StyleSheet, Text, View, ScrollView, TextInput, Switch, TouchableOpacity } from 'react-native';
import firebase from '../../config/config';
import { Formik } from 'formik';
import * as yup from 'yup';

const FamilySchema = yup.object({
  lastName: yup.string()
    .required('שדה חובה')
    .min(2,'שם המשפחה חייב להכיל לפחות 2 אותיות'),
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
    .length(10,'מספר טלפון נייד לא תקין')

})

const AddNewFamily = () => {

  return (
    <ScrollView style={{ backgroundColor: '#b5bef5' }}>
      <View style={styles.container}>
        <Formik
          initialValues={{ lastName: '', numOfPersons: 0, email: '', phone: '', isSingleParent: false }}
          validationSchema={FamilySchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            console.log('values', values);
            var createFamily = firebase.functions().httpsCallable('createFamily');
            console.log(141);
            createFamily(values)
              .then(function (resp) {
                //Display success
                console.log(resp.data.result);
              })
              .catch(function (error) {
                var code = error.code;
                var message = error.message;
                //Display error
                console.log(code + ' ' + message);
              });
          }}
        >
          {(props) => (
            <View>
              <Text style={styles.headlines}> פרטי משפחה:</Text>
              <View style={{ backgroundColor: '#8b96d9' }}>
                <View style={styles.names}>
                  <View style={styles.fields}>
                    <Text style={styles.text} >שם משפחה</Text>
                  </View>
                  <View style={styles.fields}>
                    <TextInput
                      onChangeText={props.handleChange('lastName')}
                      value={props.values.lastName}
                      placeholder='שם משפחה'
                      textAlign='right'
                      placeholderTextColor='#b5bef5'
                      onBlur={props.handleBlur('lastName')}
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
                      selectedValue={props.values.numOfPersons}
                      style={{ height: 30, width: 110 }}
                      onValueChange={props.handleChange('numOfPersons')}
                    >
                      <Picker.Item label='בחר/י' value='0' />
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
                    <Text style={styles.text}>חד הורית</Text>
                  </View>
                  <View style={{ alignSelf: 'center' }}>
                    <Switch
                      style={{ alignItems: 'center' }}
                      value={props.values.isSingleParent}
                      onValueChange={value => props.setFieldValue('isSingleParent', value)}
                    />
                  </View>
                </View>
              </View>

              <Text style={styles.headlines}>פרטי קשר:</Text>
              <View style={{ backgroundColor: '#8b96d9' }}>
                <View style={styles.names}>
                  <View style={styles.fields}>
                    <Text style={styles.text}>אימייל</Text>
                  </View>
                  <View style={styles.fields}>
                    <TextInput
                      onChangeText={props.handleChange('email')}
                      value={props.values.email}
                      placeholder='name@domain.com'
                      placeholderTextColor='#b5bef5'
                      onBlur={props.handleBlur('email')}
                    />
                  </View>
                </View>
                {props.errors.email && props.touched.email ? <Text style={styles.errorMsg}>{props.errors.email}</Text> : null}

                <View style={styles.names}>
                  <View style={styles.fields}>
                    <Text style={styles.text}>טלפון </Text>
                  </View>
                  <View style={styles.fields}>
                    <TextInput
                      keyboardType='numeric'
                      onChangeText={props.handleChange('phone')}
                      value={props.values.phone}
                      placeholder='052-1234567'
                      placeholderTextColor='#b5bef5'
                      onBlur={props.handleBlur('phone')}
                    />
                  </View>
                </View>
                {props.errors.phone && props.touched.phone ? <Text style={styles.errorMsg}>{props.errors.phone}</Text> : null}
              </View>


              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}> הוסף </Text>
              </TouchableOpacity>
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
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da',
  },
  headlines: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 7,
    marginRight: 10,
  },
  text: {
    fontSize: 15,
    marginVertical: 7,
    marginHorizontal: 5
  },
  fields: {
    flex: 2,
    textAlign: 'right',
    marginHorizontal: 5
  },
  button: {
    width: 150,
    height: 50,
    borderWidth: 1,
    borderColor: '#d6d7da',
    backgroundColor: '#8b96d9',
    borderRadius: 25,
    marginVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center'
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
    fontWeight:'bold',
    marginBottom: 5
  }

});





