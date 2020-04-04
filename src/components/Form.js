import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlightBase
} from 'react-native';
import firebase from '../../config/config';
import Spinner from '../components/Spinner';

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
        user = firebase.auth().currentUser.uid;
        console.log(user);
        if (user) {
          that.props.navigation.navigate('SwDashboard');
        } else {
        }
      }catch {
        console.log('error get current user');
      }
    });
  }

  onButtonPress() {
    //this.props.navigation.navigate('SwDashboard');

    // const { id, password } = this.state;
    // this.setState({ errorMessage: '', loading: true });

    const { id, password } = this.state;
    this.setState({ errorMessage: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(id, password)
      .catch(this.onLoginFail.bind(this));

    // var users = firebase.firestore().collection('users').doc('LruTTvuWdqWd6RqUs9JN1tPjAcJ2');
    // users.get().then(function (doc) {
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch(function (error) {
    //   console.log("Error getting document:", error);
    // });

    //this.props.navigation.navigate('SwDashboard');
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
        <TextInput onChangeText={(id) => this.setState({ id })} value={this.state.id} style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="תעודת זהות"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="numeric"
          onSubmitEditing={() => this.password.focus()}
        />

        <TextInput onChangeText={(password) => this.setState({ password })} value={this.state.password} style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='סיסמה'
          selectionColor="#fff"
          secureTextEntry
          placeholderTextColor="#ffffff"
          ref={(input) => this.password = input}
        />

        {this.state.errorMessage ? <Text style={styles.errorMessage}> {this.state.errorMessage} </Text> : null}


        <View>
          {this.renderButton()}
        </View>

        {/* <TouchableOpacity onPress={() => this.onButtonPress()} style={styles.button}>
          <Text style={styles.buttonText}>התחברות</Text>
        </TouchableOpacity> */}
      </View>
    )
  }

  // loginUser = async (id, password) => {

  //   if (id != '' && password != '') {
  //     try {
  //       let user = await firebase.auth().signInWithEmailAndPassword(id, password);
  //       this.props.navigation.navigate('ParentsDashboard');
  //     } catch (error) {
  //       this.addError();
  //       console.log(error);
  //     }
  //   }
  //   else {
  //     this.addError();
  //   }
  // }

  // addError = () => {
  //   this.setState({ errorMessage: 'שם משתמש או סיסמה שגויים' });
  // }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'right',
    marginVertical: 10
  },
  button: {
    width: 200,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
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