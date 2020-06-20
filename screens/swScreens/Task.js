import React,{Component} from 'react';
import {Text,StyleSheet} from 'react-native';
import { View } from 'native-base';
import { TouchableOpacity,TouchableHighlight  } from 'react-native-gesture-handler';

const task = (props)=>{
    const state = {}
    return (
    <TouchableHighlight >
        <View>
            <Text>{props.task.name}</Text>
        </View>
    </TouchableHighlight >
    )

}

export default task
