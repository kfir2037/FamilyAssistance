// import React, { useState } from 'react';
// import { StyleSheet, Text, View,ScrollView,TextInput,Alert,Switch,ProgressBarAndroid,TouchableOpacity } from 'react-native';
// // import MenuButton from '../components/MenuButton';
// import { FormLabel, FormInput, FormValidationMessage, Header,Button,ButtonGroup,Divider,Overlay   } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Constants } from 'expo';


// export default class SettingsScreen extends React.Component{

//   constructor () {
//     super()
//     this.state = {
//       selectedIndex: 2
//     }
//     // this.updateIndex = this.updateIndex.bind(this)
//   }

//   // updateIndex (selectedIndex) {
//   //   this.setState({selectedIndex})
//   // }

//   render () {
//     const buttons = ['שבת', 'שישי', 'חמישי','רביעי','שלישי','שני','ראשון',]
//     // const { selectedIndex } = this.state

//     // var tasks=[];

//     // let allTasks=[
//     //   {
//     //     "title":"מקלחת",
//     //     "time":"11:30",
//     //     "place":"בית",
//     //     "details":"לקלח עם סבון",
//     //     "isDone":"false"  
//     //   },
//     //   {
//     //     "title":"אסיפת הורים",
//     //     "time":"17:00",
//     //     "place":"בית ספר",
//     //     "details":"לבוא רבע שעה לפני",
//     //     "isDone":"true"            
//     //   },
//     //   {
//     //     "title":"לבוא לפגישה עם עו''ס",
//     //     "time":"18:00",
//     //     "place":"מרכז ילדים-הורים",
//     //     "details":"אין",
//     //     "isDone":"true"        
//     //   }
//     // ]
//     // let tasksDone=0;
//     // for(let i = 0; i < 3; i++){
//     //   if(allTasks[i]['isDone']=='true'){
//     //     tasksDone++;
//     //   }
//     //   tasks.push(
//     //     <View key = {i}>
//     //         <View style={styles.task}>
//     //           <View style={styles.field}>
//     //             <View style={styles.temp}>
//     //               <Text>משימה</Text>
//     //             </View>
//     //             <View style={styles.temp}>
//     //               <Text>{allTasks[i]['title']}</Text>
//     //             </View>
//     //           </View>
//     //           <View style={styles.field}>
//     //           <View style={styles.temp}>
//     //             <Text>זמן</Text>
//     //             </View>
//     //             <View style={styles.temp}>
//     //             <Text>{allTasks[i]['time']}</Text>
//     //             </View>
//     //           </View>
//     //           <View style={styles.field}>
//     //             <View style={styles.temp}>
//     //               <Text>מקום</Text>
//     //             </View>
//     //             <View style={styles.temp}>
//     //               <Text>{allTasks[i]['place']}</Text>
//     //             </View>
//     //           </View>
//     //           <View style={styles.field}>
//     //           <View style={styles.temp}>
//     //             <Text>פרטים</Text>
//     //             </View>
//     //             <View style={styles.temp}>
//     //             <Text>{allTasks[i]['details']}</Text>
//     //             </View>
//     //           </View>
//     //           <View style={styles.field}>
//     //           <View style={styles.temp}>
//     //             <Text>המשימה בוצעה</Text>
//     //             </View>
//     //             <View style={styles.temp}>
//     //             <Switch/>
//     //             </View>
//     //           </View>
//     //           </View>


//     //     </View>

//     //   )
//     // }

//   return (

//           <View style={styles.container}>
//             <Text style={styles.titleText}>משפחות שרשומות לתוכנית</Text>
//           </View>





//   // <ScrollView>
//   //   <View style={styles.container}>
//   //     <ButtonGroup
//   //       onPress={this.updateIndex}
//   //       selectedIndex={selectedIndex}
//   //       buttons={buttons}
//   //       containerStyle={{height: 50}}
//   //     />

//   //       <ProgressBarAndroid
//   //         styleAttr="Horizontal"
//   //         indeterminate={false}
//   //         progress={tasksDone/allTasks.length}
//   //       />            
//   //         { tasks }
//   //       </View>
//   //     </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop:15,
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   // days:{
//   //   flex:1,
//   //   flexDirection:'row-reverse',

//   // },
//   // button:{
//   //   alignItems: 'center',
//   //   backgroundColor: '#DDDDDD',
//   //   padding: 10,
//   //   width:45,
//   //   marginLeft:6
//   // },
//   // text:{
//   //   fontSize:30,
//   // },
//   // task:{
//   //   flex:1,
//   //   borderStyle:'solid',
//   //   borderWidth:0.5, 
//   //   backgroundColor:'#9ec3ff',
//   //   marginBottom:10,

//   // },
//   // field:{
//   //   flex:1,
//   //   borderStyle:'solid',
//   //   borderWidth:0.5,
//   //   flexDirection:'row-reverse',
//   //   margin:7,
//   //   borderRadius: 4,
//   // },
//   // temp:{
//   //   flex:1,
//   //   textAlign:'left'
//   // }
// });

// import React, { Component } from "react";
// import { View, Text, FlatList } from "react-native";

// class FlatListDemo extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loading: false,
//       data: [],
//     };
//   }

//   componentDidMount() {
//     // this.getDataFromServer();
//     const arr = [
//       {name:'kfir',email:'asdfasdf'},
//       {name:'kfir',email:'asdfasdf'},
//       {name:'kfir',email:'asdfasdf'},
//       {name:'kfir',email:'asdfasdf'},
//       {name:'kfir',email:'asdfasdf'},
//       {name:'kfir',email:'asdfasdf'},
//       {name:'kfir',email:'asdfasdf'},
//     ]
//     this.setState({data:arr})
//   }

//   getDataFromServer = () => {
//    const url = 'https://jsonplaceholder.typicode.com/users'
//     this.setState({ loading: true });
//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         this.setState({
//           data,
//           loading: false,
//         });
//       })
//       .catch(error => {
//         console.log('error: ', error);
//         this.setState({ loading: false });
//       });
//   };

//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
//         <FlatList
//           data={this.state.data}
//           renderItem={({ item }) => (
//             <View>
//               <Text>Name:{item.name}</Text>
//               <Text>email:{item.email}</Text>
//             </View>
//           )}
//         />
//       </View>
//     );
//   }
// }

// export default FlatListDemo;


import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, YellowBox, FlatList } from 'react-native';
import SelectableFlatlist, { STATE } from 'react-native-selectable-flatlist';
import { ScrollView } from 'react-native-gesture-handler';
// import { Button } from 'native-base';
import firebase from '../../config/config';
import { FontAwesome } from '@expo/vector-icons';

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
        <Text>HI</Text>
        <Text>{item.data().lastName}</Text>

      </View>
    );
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.titleText}>משפחות שרשומות לתוכנית</Text>
          </View>
          <View style={styles.familiesList}>
            <SelectableFlatlist
              data={this.state.data}
              state={STATE.EDIT}
              multiSelect={false}
              itemsSelected={(selectedItem) => this.itemsSelected(selectedItem)}
              initialSelectedIndex={[0]}
              cellItemComponent={(item) => this.rowItem(item)}
              checkIcon={()=> <FontAwesome name='circle' size={25} color='#767ead' />}
              uncheckIcon= {()=> <FontAwesome name='circle-o' size={25} color='#767ead' />}
              touchStyles={{backgroundColor:'#b5bef5'}}
            />
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
          </View>
        </View>
      </>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#b5bef5'
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

