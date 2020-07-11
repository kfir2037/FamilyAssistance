import React, { Component } from 'react';
import { Platform, StyleSheet, Text,TextInput, View, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../../config/config';

export default class addSocialWorker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      socialWorker: {}
    }
  }

  onChangeLastName = (value) => {
    var tempData = this.state.socialWorker;
    tempData.lastName = value;
    this.setState({ socialWorker: tempData })
  }
  onChangeEmail = (value) => {
    var tempData = this.state.socialWorker;
    tempData.email = value;
    // this.setState({ socialWorker: tempData })
  }
  onChangeFirstName = (value) => {
    var tempData = this.state.socialWorker;
    tempData.firstName = value;
    this.setState({ socialWorker: tempData })
  }
  onChangePassword = (value) => {
    var tempData = this.state.socialWorker;
    tempData.password = value;
    this.setState({ socialWorker: tempData })
  }
  onChangeId = (value) => {
    var tempData = this.state.socialWorker;
    tempData.id = value;
    this.setState({ socialWorker: tempData })
  }

  save =async () => {
    var tempSocialWorker = this.state.socialWorker
    tempSocialWorker.role='sw'
    tempSocialWorker.parent=[]
    tempSocialWorker.kids=[]
    var createUser = firebase.functions().httpsCallable('createUser');
    //console.log('createUser ref: ', createUser);
    await createUser(tempSocialWorker)
      .then((resp) => {
        //Display success
        console.log('succes create social worker');
        // console.log(resp.data.result);
        // setModalLoading(false);
        // setMessage('הוספת ילד בוצעה בהצלחה');
      })
      .catch((error) => {
        // console.log('values', values);
        var code = error.code;
        var message = error.message;
        //Display error
        console.log(code + ' ' + message);
        // setModalLoading(false);
        // setMessage(error.message);
      });

  }


  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>

          <ImageBackground style={{ height: '100%' }} source={require('../../assets/new_background09.png')}>

            <ScrollView>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.onChangeLastName(text)}
                value={this.state.socialWorker.lastName}
              />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.onChangeEmail(text)}
                value={this.state.socialWorker.email}
              />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.onChangeFirstName(text)}
                value={this.state.socialWorker.firstName}
              />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.onChangePassword(text)}
                value={this.state.socialWorker.passowrd}
              />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.onChangeId(text)}
                value={this.state.socialWorker.id}
              />
                   <Button
                        buttonStyle={styles.button}
                        title="שמור"
                        onPress={()=>this.save()}
                        color='#767ead'
                        icon={<MaterialCommunityIcons
                            name="account-details"
                            size={26}
                            color="white"
                        />
                        }
                        titleStyle={{ marginRight: 5 }}
                        iconRight
                    />
     
            </ScrollView>

          </ImageBackground>

        </SafeAreaView>


      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

