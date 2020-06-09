import React, { Component } from 'react';
import { View, Text, StyleSheet, YellowBox, FlatList, ActivityIndicator } from 'react-native';
import SelectableFlatlist, { STATE } from 'react-native-selectable-flatlist';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
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
        this.setState({ loading: false });
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
          backgroundColor: '#b5bef5',
          //borderWidth: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderColor: '#767ead',
          borderBottomWidth:0.5,
          borderBottomColor:'#767ead',
          borderBottomRightRadius:35

        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 20,color:'#656d9c' }}>{item.data().lastName}</Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator style={{ backgroundColor: '#b5bef5' }} >
        <>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.titleText}>משפחות</Text>
            </View>
            {this.state.loading
              ? <ActivityIndicator size={50} color='#767ead' />
              : <View style={styles.familiesList}>
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
              </View>}
            <View style={{ flexDirection: 'column', alignItems: 'center',marginTop:10 }}>
              <View style={styles.twoFirstButtons}>
                {/* <View style={styles.buttons}>
                  <Button
                    title="הסרת משפחה"
                    color='#767ead'
                  />
                </View> */}
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
                    color='#767ead'
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
              {/* <View style={styles.twoFirstButtons}>
                
              </View> */}
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
    paddingTop: 20,
    backgroundColor: '#b5bef5',
    height: '100%',
    width: '100%'
    // alignItems:'center'

  },
  familiesList: {
    borderRadius: 2,
    //borderWidth: 1,
    borderColor: '#767ead',
    //height: 400
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    color:'#656d9c'
  },
  header: {
    alignItems: 'center'
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
    backgroundColor: '#767ead'
    // alignContent:'center'
  }

});

