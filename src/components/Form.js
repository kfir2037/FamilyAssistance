import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableHighlightBase
} from 'react-native';
import firebase from '../../config/config';
import Spinner from '../components/Spinner';
import { auth } from 'firebase';

export default class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      errorMessage: '',
      loading: false
    };


    var that = this;
    firebase.auth().onAuthStateChanged(function (user) {
      try {
        let sessionTimeout;
        user = firebase.auth().currentUser;
        if (user) {
          user.getIdTokenResult().then((idTokenResult) => {
            const authTime = idTokenResult.claims.auth_time * 1000;
            console.log('authTime: ', authTime);
            const sessionDuration = 1000 * 60 * 10;
            const millisecondsUntilExpiration = sessionDuration - (Date.now() - authTime);
            sessionTimeout = setTimeout(() => firebase.auth().signOut(), millisecondsUntilExpiration)
          })
          userUid = user.uid
          firebase.firestore().collection('users').doc(userUid).get()
            .then(doc => {
              // console.log("doc: ", doc)
              console.log("doc role: ", doc._document.proto.fields.role.stringValue)
              let role = doc._document.proto.fields.role.stringValue;
              console.log('role: ', role)
              if (role == 'sw') {
                that.props.navigation.navigate('SwDashboard');
              }
              else if (role == 'parent') {
                that.props.navigation.navigate('ParentsDashboard');
              }
              else if (role == 'kid') {
                that.props.navigation.navigate('KidsDashboard');
              } else {
                that.setState({ errorMessage: 'אירעה שגיאה', loading: false })
                that.props.navigation.navigate('Welcome');
              }
            })
            .catch((err) => {
              console.log('Form ', err);
              that.setState({ errorMessage: 'אירעה שגיאה', loading: false })
            })
        } else {
          sessionTimeout && clearTimeout(sessionTimeout);
          sessionTimeout = null;
          that.props.navigation.navigate('Welcome');
        }
        // if (userUid) {
        //   that.props.navigation.navigate('SwDashboard');
        // } else {
        // }
      } catch {
        console.log('error get current user');
      }
    });
  }

  onButtonPress() {

    const { id, password } = this.state;
    this.setState({ errorMessage: '', loading: true });

    const userEmail = firebase.functions().httpsCallable('signinUserEmail');

    userEmail(id)
      .then((resp) => {
        console.log(resp);
        firebase.auth().signInWithEmailAndPassword(resp.data, password)
          .catch((err) => {
            console.log('86');
            this.onLoginFail();
          });
      })
      .catch((err) => {
        console.log('userEmail Error ', err);
        this.onLoginFail();
      })
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
        <TextInput
          onChangeText={(id) => this.setState({ id })}
          value={this.state.id}
          style={styles.inputBox}
          underlineColorAndroid='transparent'
          placeholder="תעודת זהות"
          placeholderTextColor="#ffffff"
          selectionColor="gray"
          keyboardType='phone-pad'
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