// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     TextInput,
//     TouchableOpacity,
//     TouchableHighlightBase
//   } from 'react-native';
// //   import {InputNumber} from 'rc-input-number';
// import NumericInput from 'react-native-numeric-input'

// export default class Settings extends Component {
//   render() {
//     return (
//         <View style={styles.container}>
//             <View >
//                 <Text>הגדרות</Text> 
//             </View>
//             <View>
//                 <Text>כמה זמן לפני יקבלו התרעה</Text> 
//             </View>
//             <View>
//                 <View style={styles.fields}>
//                     <Text style={styles.text}>בוקר</Text>
//                     <View style={styles.numbers}>
//                         <NumericInput 
//                             // value={this.state.value}  
//                             // onChange={value => this.setState({value})} 
//                             // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
//                             totalWidth={170} 
//                             totalHeight={50} 
//                             iconSize={25}
//                             step={1}
//                             valueType='real'
//                             rounded 
//                             textColor='#B0228C' 
//                             iconStyle={{ color: 'white' }} 
//                             rightButtonBackgroundColor='#EA3788' 
//                             leftButtonBackgroundColor='#E56B70'/>
//                     </View>
//                 </View>
//                 <View style={styles.fields}>
//                     <Text style={styles.text}>צהריים</Text>
//                     <View style={styles.numbers}>
//                         <NumericInput 
//                             // value={this.state.value}  
//                             // onChange={value => this.setState({value})} 
//                             // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
//                             totalWidth={170} 
//                             totalHeight={50} 
//                             iconSize={25}
//                             step={1}
//                             valueType='real'
//                             rounded 
//                             textColor='#B0228C' 
//                             iconStyle={{ color: 'white' }} 
//                             rightButtonBackgroundColor='#EA3788' 
//                             leftButtonBackgroundColor='#E56B70'/>
//                     </View>
//                 </View>
//                 <View style={styles.fields}>
//                     <Text style={styles.text}>אחר הצהריים</Text>
//                     <View style={styles.numbers}>
//                         <NumericInput 
//                             // value={this.state.value}  
//                             // onChange={value => this.setState({value})} 
//                             // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
//                             totalWidth={170} 
//                             totalHeight={50} 
//                             iconSize={25}
//                             step={1}
//                             valueType='real'
//                             rounded 
//                             textColor='#B0228C' 
//                             iconStyle={{ color: 'white' }} 
//                             rightButtonBackgroundColor='#EA3788' 
//                             leftButtonBackgroundColor='#E56B70'/>
//                     </View>
//                 </View>
//                 <View style={styles.fields}>
//                     <Text style={styles.text}>ערב</Text>
//                     <View style={styles.numbers}>
//                         <NumericInput 
//                             // value={this.state.value}  
//                             // onChange={value => this.setState({value})} 
//                             // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
//                             totalWidth={170} 
//                             totalHeight={50} 
//                             iconSize={25}
//                             step={1}
//                             valueType='real'
//                             rounded 
//                             textColor='#B0228C' 
//                             iconStyle={{ color: 'white' }} 
//                             rightButtonBackgroundColor='#EA3788' 
//                             leftButtonBackgroundColor='#E56B70'/>
//                     </View>
//                 </View>                   
//             </View>
//         </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//     container: {
//     flex:2,
//     flexGrow: 1,
//     // justifyContent: 'center',
//        alignItems: 'stretch',
//     },
//     fields:{
//         // flexDirection:'row-reverse',
//         // // margin:10,
//         // fontSize:20,
//         // alignItems:'stretch'
//         flexDirection: 'row-reverse',
//         // margin: 7,
//         alignItems: 'stretch',
//         marginTop:10,


//     },
//     text:{
//         // fontSize:25, 
//         // marginRight:30,
//         flex: 3,
//         textAlign: 'right',
//         marginRight:50,
//         fontSize:20,
//     },
//     numbers:{
//         // marginLeft:20,
//         // alignItems: 'flex-end',
//         flex: 3,
//         textAlign: 'left',
//         marginLeft:50,
//     }
// }
// );
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from '@expo/vector-icons/Ionicons';
// import DashboardTabNavigator from './DashboardTabNavigator';
import WatchFamilies from '../../screens/swScreens/WatchFamilies';
import Settings from '../../screens/swScreens/Settings'

const SettingsStackNavigator = createStackNavigator({
    Settings:Settings,
  },
  {
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:(
        <Icon style={{padding:10}}
        onPress={()=>navigation.openDrawer()}
        name="md-menu"
        size={30}/>
      ),
      headerRight:(
        <Icon style={{padding:10}}
        name="md-exit"
        onPress={()=>navigation.navigate('Welcome')}
        size={30}/>   
      )
    }
  }
  }
  ) 

  export default SettingsStackNavigator;