import React, { Component } from 'react';
import { View, Text, StyleSheet, RefreshControl, YellowBox, FlatList, ActivityIndicator, ImageBackground, UIManager } from 'react-native';
import SelectableFlatlist, { STATE } from 'react-native-selectable-flatlist';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card } from 'react-native-elements';
// import { Button } from 'native-base';
import firebase from '../../config/config';
import { FontAwesome, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        this.setState({ loading: false, refreshing: false });
        // console.log('data: ', this.state.data);
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });

    return allFamilies;
  }



  async componentDidMount() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    YellowBox.ignoreWarnings(['VirtualizedLists']);

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
          //backgroundColor: '#b5bef5',
          //borderWidth: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderColor: 'black',
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          borderBottomRightRadius: 35,
          marginRight: 20,

        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>{item.data().lastName}</Text>
      </View>
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getFamilies();
  }

  render() {
    return (
      <SafeAreaView>
        <ImageBackground style={{ height: '100%' }} source={require('../../assets/new_background09.png')}>
          <ScrollView showsVerticalScrollIndicator contentContainerStyle={{ height: '100%' }} 
           refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              enabled
              colors={['#e0aa00']}
            />
          }
             >
  
            <ScrollView  style={{ height: '50%', backgroundColor: 'white', marginHorizontal: 10, borderRadius: 20, marginTop: 10 }}>
              <View style={styles.header}>
                <Text style={styles.titleText}>משפחות</Text>
              </View>
              {this.state.loading
                ? <ActivityIndicator size={50} color='#e0aa00' style={{ marginBottom: 10 }} />
                : <View style={styles.familiesList}>
                  <SelectableFlatlist
                    data={this.state.data}
                    state={STATE.EDIT}
                    multiSelect={false}
                    itemsSelected={(selectedItem) => this.itemsSelected(selectedItem)}
                    initialSelectedIndex={[0]}
                    cellItemComponent={(item) => this.rowItem(item)}
                    checkIcon={() => <FontAwesome name='circle' size={25} color='#0ca5e5' />}
                    uncheckIcon={() => <FontAwesome name='circle-o' size={25} color='#0ca5e5' />}
                    touchStyles={{ backgroundColor: 'transparent', opacity: 1 }}
                  />
                </View>}
            </ScrollView>
  
            <View style={{ height: '30%', flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
              <View style={styles.twoFirstButtons}>
  
                <View style={styles.buttons}>
                  <Button
                    buttonStyle={styles.button}
                    title="פרטי המשפחה"
                    onPress={() => this.props.navigation.navigate('WatchFamilies', {
                      familyId: this.state.familySelectedUid
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
                <View style={styles.buttons}>
                  <Button
                    buttonStyle={styles.button}
                    onPress={() => this.props.navigation.navigate('Tasks2', {
                      familyId: this.state.familySelectedUid
                    })}
                    title="משימות"
                    color='#767ead'
                    icon={<FontAwesome
                      name="calendar"
                      size={24}
                      color="white"
                    />
                    }
                    titleStyle={{ marginRight: 10 }}
                    iconRight
                  />
                </View>
              </View>
              <View style={styles.twoFirstButtons}>
                <View style={styles.buttons}>
                  <Button
                    buttonStyle={styles.button}
                    onPress={() => this.props.navigation.navigate('AddNewFamily')}
                    title="הוספת משפחה"
                    color='#767ead'
                    icon={<AntDesign
                      name="addusergroup"
                      size={24}
                      color="white"
                    />
                    }
                    titleStyle={{ marginRight: 5 }}
                    iconRight
                  />
                </View>
                <View style={styles.buttons}>
                  <Button
                    buttonStyle={styles.button}
                    title="משימה חדשה"
                    onPress={() => this.props.navigation.navigate('AddNewTask', {
                      familyId: this.state.familySelectedUid
                    })}
                    icon={<FontAwesome5
                      name="plus"
                      size={24}
                      color="white"
                    />
                    }
                    titleStyle={{ marginRight: 10 }}
                    iconRight
                  />
                </View>
              </View>
            </View>
            {/* </View> */}
  
          </ScrollView >
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
    //paddingBottom: 10,
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

