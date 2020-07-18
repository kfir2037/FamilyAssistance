import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableHighlightBase
} from 'react-native';
import firebase from '../../config/config';
import Spinner from '../components/Spinner';
import { auth } from 'firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

export default class Form extends Component {

  constructor(props) {
    super(props);
    this.ref = null;
    this.state = {
      id: '',
      password: '',
      errorMessage: '',
      loading: false,
      recaptchaVerifier: null,
      verificationId: '',
      confirm: null,
      verificationCode: ''
    };


    // var that = this;
    // firebase.auth().onAuthStateChanged(function (user) {
    //   try {
    //     let sessionTimeout;
    //     user = firebase.auth().currentUser;
    //     if (user) {
    //       user.getIdTokenResult().then((idTokenResult) => {
    //         const authTime = idTokenResult.claims.auth_time * 1000;
    //         console.log('authTime: ', authTime);
    //         const sessionDuration = 1000 * 60 * 100;
    //         const millisecondsUntilExpiration = sessionDuration - (Date.now() - authTime);
    //         sessionTimeout = setTimeout(() => firebase.auth().signOut(), millisecondsUntilExpiration)
    //       })
    //       userUid = user.uid
    //       firebase.firestore().collection('users').doc(userUid).get()
    //         .then(doc => {
    //           // console.log("doc: ", doc)
    //           console.log("doc role: ", doc._document.proto.fields.role.stringValue)
    //           let role = doc._document.proto.fields.role.stringValue;
    //           console.log('role: ', role)
    //           if (role == 'sw') {
    //             that.props.navigation.navigate('SwDashboard');
    //           }
    //           else if (role == 'parent') {
    //             that.props.navigation.navigate('ParentsDashboard');
    //           }
    //           else if (role == 'kid') {
    //             that.props.navigation.navigate('KidsDashboard');
    //           } else {
    //             that.setState({ errorMessage: 'אירעה שגיאה', loading: false })
    //             that.props.navigation.navigate('Welcome');
    //           }
    //         })
    //         .catch((err) => {
    //           console.log('Form ', err);
    //           that.setState({ errorMessage: 'אירעה שגיאה', loading: false })
    //         })
    //     } else {
    //       sessionTimeout && clearTimeout(sessionTimeout);
    //       sessionTimeout = null;
    //       that.props.navigation.navigate('Welcome');
    //     }
    //   } catch {
    //     console.log('error get current user');
    //   }
    // });
  }

  firebaseConfig = firebase.options;

  async signInWithPhoneNumber(phoneNumber) {
    try {
      const phoneProvider = new auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        this.ref
      );
      this.setState({ verificationId: verificationId });
      console.log('verificationId: ',this.state.verificationId)
      //const confirmation = await firebase.auth().sign.signInWithPhoneNumber(phoneNumber);
      //this.setState({ confirm: confirmation });
    } catch (err) {
      console.log('error signInWithPhoneNumber: ', err);
      this.setState({ errorMessage: 'אירעה שגיאה' });
    }
  }

  async confirmCode() {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        this.state.verificationId,
        this.state.verificationCode
      );
      await firebase.auth().signInWithCredential(credential);
    } catch (err) {
      console.log('code verification error: ', err);
    }
  }


  onButtonPress() {

    const { id, password } = this.state;
    this.setState({ errorMessage: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(`${id}@gmail.com`, password)
      .then(() => {
        console.log('phoneNumber: ', firebase.auth().currentUser.phoneNumber);
        //this.signInWithPhoneNumber(firebase.auth().currentUser.phoneNumber);

      })
      .catch((err) => {
        this.onLoginFail();
      });

    const userEmail = firebase.functions().httpsCallable('signinUserEmail');

    // userEmail(id)
    //   .then((resp) => {
    //     console.log(resp);
    //     firebase.auth().signInWithEmailAndPassword(resp.data, password)
    //       .catch((err) => {
    //         console.log('86');
    //         this.onLoginFail();
    //       });
    //   })
    //   .catch((err) => {
    //     console.log('userEmail Error ', err);
    //     this.onLoginFail();
    //   })
  }

  onLoginFail() {
    this.setState({ errorMessage: 'שם משתמש או סיסמה שגויים', loading: false })
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner />
    }

    return (
      <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>התחברות</Text>
      </TouchableOpacity>
    );
  }



  render() {
    return (
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={ref => this.ref = ref}
          firebaseConfig={this.firebaseConfig}
        />
        <TextInput
          onChangeText={(id) => this.setState({ id })}
          value={this.state.id}
          style={styles.inputBox}
          underlineColorAndroid='transparent'
          placeholder="תעודת זהות"
          placeholderTextColor="#ffffff"
          selectionColor="gray"
          keyboardType='numeric'
          onSubmitEditing={() => this.password.focus()}

        />

        <TextInput
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          style={styles.inputBox}
          underlineColorAndroid='transparent'
          placeholder='סיסמה'
          selectionColor="gray"
          secureTextEntry
          placeholderTextColor="white"
          ref={(input) => this.password = input}
        />

        {this.state.errorMessage ? <Text style={styles.errorMessage}> {this.state.errorMessage} </Text> : null}

        {this.state.verificationId
          ?
          <View>

            <TextInput
              onChangeText={(verificationCode) => this.setState({ verificationCode })}
              value={this.state.verificationCode}
              style={styles.inputBox}
              underlineColorAndroid='transparent'
              placeholder='קוד אימות'
              selectionColor="gray"
              secureTextEntry
              placeholderTextColor="white"
            />
            <Button title="Confirm Code" onPress={() => this.confirmCode()} />
          </View>
          : null
        }

        <View>
          {this.renderButton()}
        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'right',
    marginVertical: 10
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#0ca5e5',
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 13,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  errorMessage: {
    fontSize: 18,
    fontWeight: '700',
    color: 'red'
  }
});