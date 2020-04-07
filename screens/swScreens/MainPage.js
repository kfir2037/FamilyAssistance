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
import { View, Text, StyleSheet, Button } from 'react-native';
import SelectableFlatlist, { STATE } from 'react-native-selectable-flatlist';
import { ScrollView } from 'react-native-gesture-handler';
// import { Button } from 'native-base';
import firebase from '../../config/config';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
    };
  }

  itemsSelected = (selectedItem) => {
    console.log(selectedItem);
  }

  async componentDidMount() {
    const arr = [
      // { name: '1', email: 'asdfasdf' },
      // { name: '2', email: 'asdfasdf' },
      // { name: '3', email: 'asdfasdf' },
      // { name: '4', email: 'asdfasdf' },
      // { name: '5', email: 'asdfasdf' },
      // { name: '6', email: 'asdfasdf' },
      // { name: '7', email: 'asdfasdf' },
    ]
    // this.setState({ data: arr })
    let families = await getFamilies();
    console.log('families: ', families);
    for(let key in families){
      arr.push({
        uid:key , details:families[key]
      })
    }
    console.log('arr: ', arr);

    this.setState({data:arr})
  }

  test(num) {
    console.log(num)
  }

  rowItem = (item) => {
    <View
      style={{
        flex: 1,
        borderBottomWidth: 0.5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 20,
        borderBottomColor: '##dfdfdf'
      }}
    >
      <Text>{item.uid}</Text>
      <Text>{item.details}</Text>

    </View>
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
              itemsSelected={(selectedItem) => { this.itemsSelected(selectedItem); }}
              initialSelectedIndex={[0]}
              cellItemComponent={(item, otherProps) => this.rowItem(item)}
            />
          </View>
          <View>
            <View style={styles.twoFirstButtons}>
              <View style={styles.buttons}>
                <Button
                  title="הסרת משפחה"
                />
              </View>
              <View style={styles.buttons}>
                <Button
                  onPress={() => this.props.navigation.navigate('Tasks2')}
                  title="משימות"
                />
              </View>
            </View>
            <View style={styles.button}>
              <Button
                title="צפייה בפרטי המשפחה"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={() => this.props.navigation.navigate('AddNewFamily')}
                title="הוספת משפחה חדשה"
              />
            </View>
          </View>
        </View>
      </>
    )
  }
}

 async function getFamilies ()  {
  allFamilies = []
  familyObj = {}
  const socialWorkerUid = firebase.auth().currentUser['uid'];
  console.log('socialWorkerId ' + socialWorkerUid);

  const swFamilies = await firebase.firestore().collection('families').where('swInCharge', '==', socialWorkerUid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(doc.id, " => ", doc.data());
        familyObj[doc.id] = Object.assign({},doc.data());
        console.log('familyObj[doc.id]: ',familyObj[doc.id]);
      });
    })
    .catch(error => {
      console.log("Error getting documents: ", error);
    });

  // console.log('Query: ' , swFamilies);
  // console.log('familyObj: ' , JSON.stringify(familyObj));

  // var families = firebase.firestore().collection('users').doc(socialWorkerUid);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',families);
  // let SocialWorker = firebase.firestore().collection('users').doc(socialWorkerUid);
  // let getDoc = await SocialWorker.get()
  //   .then(doc => {
  //     if (!doc.exists) {
  //       console.log('No such document! ');
  //     } else {
  //       allFamilies = doc.data().families;
  //       console.log('allfamilies1 ' + self.allFamilies);
  //       console.log('Document data: ', doc.data().families);
  //     }
  //   })
  //   .catch(err => {
  //     console.log('Error getting document ', err);
  //   });
  // console.log('allfamilies2 ' + self.allFamilies);

  // familiesFromDB = firebase.firestore().collection('families');

  // allFamilies.forEach((family) => {
  //   var swFamilies = familiesFromDB.doc(family);
  //   console.log('family ' + family);
  //   swFamilies.get()
  //     .then(doc2 => {
  //       if (!doc2.exists) {
  //         console.log('No such document!');
  //       } else {
  //         console.log('family Data ' + doc2.data())
  //       }
  //     })
  //     .catch(err2 => {
  //       console.log('Error getting document', err);
  //     })

  // })

  // families.get().then(function (doc) {
  //     if (doc.exists) {
  //       doc.data()['families'].forEach((family)=>{
  //           var swFamilies = firebase.firestore().collection('families').doc(family).data();
  //           console.log("1^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",swFamilies);
  //           swFamilies.get().then(function(doc){
  //             // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',doc['proto']['fields']['childs']['mapValue']['fields']);
  //             if(doc.exists){
  //               familyObj.lastName = doc['lastName'];
  //               console.log("*********************",doc.lastName)
  //               // doc.data()['childs'].forEach
  //             }
  //           })
  //       })
  //       // console.log("Document data:", doc.data()['families']);
  //     } else {
  //       // doc.data() will be undefined in this case
  //       // console.log("No such document!");
  //     }
  //   }).catch(function (error) {
  //     // console.log("Error getting document:", error);
  //   });
  return familyObj;

  // var families = firebase.firestore().collection('users').doc(socialWorker.id).families;

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
    // alignItems:'center'

  },
  familiesList: {
    borderRadius: 2,
    borderWidth: 2,
    borderColor: 'black',
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

