import React from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, Text, StyleSheet, View, ImageBackground, ScrollView, SafeAreaView, TextInput, Keyboard } from 'react-native';
import { Button, Input as InputElement } from 'react-native-elements';
import { Input, Item, Label } from 'native-base';


const ForgotPasswordScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <ImageBackground style={{ height: '100%' }} source={require('../assets/new_background08.png')}>
          <View style={styles.formContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText} >שיחזור סיסמה:</Text>
            </View>
            <View style={styles.inputsContainer}>
              <InputElement
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                placeholder='********'
                inputStyle={{ color: 'gray', borderWidth: 1, borderRadius: 20, borderColor: 'lightgray', paddingHorizontal: 10 }}
                containerStyle={styles.textInputContainer}
                label='סיסמה ישנה'
                labelStyle={{ color: 'gray', marginRight: 5 }}
                textAlign='right'
                selectionColor='gray'
              />
              <InputElement
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                placeholder='********'
                inputStyle={{ color: 'gray', borderWidth: 1, borderRadius: 20, borderColor: 'lightgray', paddingHorizontal: 10 }}
                containerStyle={styles.textInputContainer}
                label='סיסמה חדשה'
                labelStyle={{ color: 'gray', marginRight: 5 }}
                textAlign='right'
                selectionColor='gray'
              />
              <InputElement
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                placeholder='********'
                inputStyle={{ color: 'gray', borderWidth: 1, borderRadius: 20, borderColor: 'lightgray', paddingHorizontal: 10 }}
                containerStyle={styles.textInputContainer}
                label='אימות סיסמה חדשה'
                labelStyle={{ color: 'gray', marginRight: 5 }}
                textAlign='right'
                selectionColor='gray'
              />

            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}



const styles = StyleSheet.create({
  headerText: {
    textAlign: 'right',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'gray'
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

  }
});

export default ForgotPasswordScreen;