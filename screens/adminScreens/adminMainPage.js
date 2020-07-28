import React, { Component } from 'react';
import { StyleSheet, YellowBox, ImageBackground, Text } from 'react-native';
import firebase from '../../config/config';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import { View } from 'native-base';
import { Card } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { FontAwesome, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default class adminMainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: '',
      socialWorkers: [],
      loading: true,
      data: [],
      familySelectedUid: '',
      refreshing: false
    };
  }

  itemsSelected = (selectedItem) => {
    // this.setState({familySelectedUid: selectedItem["uid"] })
    if (typeof selectedItem[0] === "undefined") {
      console.log('selected still undefined');
    }
    else {
      console.log('selected: ', (selectedItem[0]).id);
      this.setState({ familySelectedUid: (selectedItem[0]).id })

    }

  };

  familiesListener = async () => {
    firebase.firestore().collection('families').onSnapshot(this.getFamilies());
  }

  getFamilies = async (socialWorkerId) => {

    let allFamilies = []
    let familyObj = {}


    const swFamilies = await firebase
      .firestore()
      .collection('families')
      .where('swInCharge', '==', socialWorkerId)
      .where('status', '==', true)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // allFamilies.push(doc.data());
          var family = doc.data()
          // allFamilies.push(
          //   <View style={styles.family}>
          //     <Text>{family.email}</Text>
          //     {/* <Text>{family.parent}</Text> */}
          //     {/* <Text>{family.kids}</Text> */}
          //     <Text>{family.lastName}</Text>
          //     <Text>{family.phone}</Text>
          //     <Text>{family.status}</Text>
          //   </View>
          // );
          allFamilies.push(
            <Card key={family.email} containerStyle={{ width: '90%', borderRadius: 20 }} title={family.lastName}>
              {
                <View style={{ flexDirection: 'column' }} >
                  <View style={{ paddingTop: 3 }}></View>
                  <Text>דוא"ל: {family.email}</Text>
                  <Text>ת"ז הורים: {family.parents.join(', ')}</Text>
                  <Text>ת"ז ילדים: {family.kids.join(', ')}</Text>
                  <Text>טלפון: {family.phone}</Text>
                  {family.status? <Text>פעילה</Text> : <Text>לא פעילה</Text>}
                  <View style={{ paddingBottom: 3 }}></View>
                  <Button
                    buttonStyle={styles.button}
                    title="עריכה"
                    onPress={() => this.props.navigation.navigate('editFamilies', {
                      familyId: doc.id
                    })}
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
                </View>
              }
            </Card>
          );
          familyObj[doc.id] = Object.assign({}, doc.data());
        });
        this.setState({ data: allFamilies });
        this.setState({ loading: false, refreshing: false });
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });
    return allFamilies;
  }

  getSocialWorkers = async () => {

    let allFamilies = []
    let familyObj = {}

    const swFamilies = await firebase
      .firestore()
      .collection('users')
      .where('role', '==', 'sw')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data();
          allFamilies.push({
            label: data.firstName + ' ' + data.lastName,
            value: doc.id,
            //icon: () => <Icon name="flag" size={18} color="#900" />
          });
        });

        this.setState({ socialWorkers: allFamilies })
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });

    return allFamilies;
  }


  async componentDidMount() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    YellowBox.ignoreWarnings(['VirtualizedLists']);
    this.getSocialWorkers()
  }




  render() {
    if (this.state.socialWorkers.length == 0) {
      console.log('social workers array is empty')
      return null;
    }
    return (
      <SafeAreaView>
        <ImageBackground style={{ height: '100%' }} source={require('../../assets/new_background09.png')}>
          <View >
            <DropDownPicker
              items={this.state.socialWorkers}
              //defaultValue={this.state.country}
              containerStyle={{ margin: 10, height: 40 }}
              placeholder='בחר עובד סוציאלי'
              style={{ backgroundColor: '#fafafa' }}
              searchable={true}
              searchablePlaceholder="חיפוש"
              searchablePlaceholderTextColor="gray"
              //searchableStyle={{}}
              searchableError={() => <Text>לא נמצאו תוצאות</Text>}
              itemStyle={{
                justifyContent: 'flex-end',
                paddingHorizontal:10
                
              }}
              dropDownStyle={{ backgroundColor: '#fafafa', height: 300 }}
              // onChangeItem={item => this.setState({
              //   country: item.value
              // })}
              onChangeItem={item => this.getFamilies(item.value)}
            />
          </View>
          <ScrollView style={{margin:10 }}>
            {this.state.data}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fbc213',
    height: '100%',
    width: '100%'
    // alignItems:'center'

  },
  family: {
    backgroundColor: '#6ED4C8',
    borderRadius: 5,
  },
  buttons: {
    flex: 1,
    margin: 10
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: "center",
    opacity: 1

  },
  familiesList: {
    borderRadius: 2,
    //borderWidth: 1,
    borderColor: '#767ead',
    height: '100%'
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'black'
  },
  header: {
    alignItems: 'center',
    paddingTop: 10
  },
  twoFirstButtons: {
    flexDirection: 'row-reverse',
    //flex: 1
  },
  buttons: {
    flex: 1,
    margin: 10
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#0ca5e5'
    // alignContent:'center'
  }

});

