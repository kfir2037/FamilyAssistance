import React,{Component} from 'react';
import {Text,StyleSheet} from 'react-native';
import { View } from 'native-base';
import { TouchableOpacity,TouchableHighlight  } from 'react-native-gesture-handler';

// export default class Task extends Component{

//     render(){
//             return(
//                 <Text></Text>
//         )
//     }
// }

const task = (props)=>{
    const state = {}
    return (
    <TouchableHighlight >
        <View>
            <Text>{props.task}</Text>
        </View>
    </TouchableHighlight >
    )

}

export default task
