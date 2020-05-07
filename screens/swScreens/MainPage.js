import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, YellowBox, FlatList } from 'react-native';
import SelectableFlatlist, { STATE } from 'react-native-selectable-flatlist';
import { ScrollView } from 'react-native-gesture-handler';
// import { Button } from 'native-base';
import firebase from '../../config/config';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      familySelectedUid: ''
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

  getFamilies = async () => {
    let allFamilies = []
    let familyObj = {}
    const socialWorkerUid = firebase.auth().currentUser['uid'];
    console.log('socialWorkerId ' + socialWorkerUid);

    const swFamilies = await firebase
      .firestore()
      .collection('families')
      .where('swInCharge', '==', socialWorkerUid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          allFamilies.push(doc);
          familyObj[doc.id] = Object.assign({}, doc.data());
        });
        this.setState({ data: allFamilies });
        // console.log('data: ', this.state.data);
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });

    return allFamilies;
  }


  async componentDidMount() {
    YellowBox.ignoreWarnings(['Setting a timer']);

    const arr = [];
    // this.setState({ data: arr })
    let families = await this.getFamilies();
    // console.log('families: ', families);
    for (let key in families) {
      arr.push({
        uid: key, details: families[key]
      })
    }
    // console.log('arr: ', arr);

    //this.setState({ data: arr })
  }

  rowItem = (item) => {
    //console.log('item :', item);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#b5bef5',
          //borderWidth: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderColor: '#767ead'
        }}
      >
        <Text>{item.data().lastName}</Text>

      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#b5bef5' }} >
        <>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.titleText}>משפחות שרשומות לתוכנית</Text>
            </View>
            <View style={styles.familiesList}>
              <SafeAreaView style={{ flex: 1 }}>
                <SelectableFlatlist
                  data={this.state.data}
                  state={STATE.EDIT}
                  multiSelect={false}
                  itemsSelected={(selectedItem) => this.itemsSelected(selectedItem)}
                  initialSelectedIndex={[0]}
                  cellItemComponent={(item) => this.rowItem(item)}
                  checkIcon={() => <FontAwesome name='circle' size={25} color='#767ead' />}
                  uncheckIcon={() => <FontAwesome name='circle-o' size={25} color='#767ead' />}
                  touchStyles={{ backgroundColor: '#b5bef5' }}
                />
              </SafeAreaView>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.twoFirstButtons}>
                <View style={styles.buttons}>
                  <Button
                    title="הסרת משפחה"
                    color='#767ead'
                  />
                </View>
                <View style={styles.buttons}>
                  <Button
                    onPress={() => this.props.navigation.navigate('Tasks2', {
                      familyId: this.state.familySelectedUid
                    })}
                    title="משימות"
                    color='#767ead'
                  />
                </View>
              </View>
              <View style={styles.twoFirstButtons}>
                <View style={styles.buttons}>
                  <Button
                    title="צפייה בפרטי המשפחה"
                    onPress={() => this.props.navigation.navigate('WatchFamilies', {
                      familyId: this.state.familySelectedUid
                    })}
                    color='#767ead'
                  />
                </View>
                <View style={styles.buttons}>
                  <Button
                    onPress={() => this.props.navigation.navigate('AddNewFamily')}
                    title="הוספת משפחה חדשה"
                    color='#767ead'
                  />
                </View>
              </View>
              <View style={styles.twoFirstButtons}>
                <View style={styles.buttons}>
                  <Button
                    title="הוספת משימה חדשה"
                    onPress={() => this.props.navigation.navigate('AddNewTask', {
                      familyId: this.state.familySelectedUid
                    })}
                    color='#767ead'
                  />
                </View>
              </View>
            </View>
          </View>
        </>
      </ScrollView>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#b5bef5',
    height: '100%',
    width: '100%'
    // alignItems:'center'

  },
  familiesList: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#767ead',
    height: 400
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  header: {
    alignItems: 'center'
  },
  twoFirstButtons: {
    flexDirection: 'row-reverse',
    //flex: 1
  },
  buttons: {
    width: 150,
    margin: 25
  },
  button: {
    width: 350,
    margin: 20,
    alignItems: 'center'
    // alignContent:'center'
  }

});

