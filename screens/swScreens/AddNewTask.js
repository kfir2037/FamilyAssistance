import React, { useEffect, useState } from 'react';
import { Picker, Platform, StyleSheet, View, Text, ActivityIndicator, ScrollView, SafeAreaView, Modal, TouchableHighlight } from 'react-native';
import firebase from '../../config/config';
//import {Picker} from '@react-native-community/picker';
import { CheckBox } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';


const AddNewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState('morning');

  useEffect(() => {
    let currentTasks = firebase.firestore().collection('RoutineTasks').doc(time);
    currentTasks.get().then(function (doc) {
      if (doc.exists) {
        console.log(doc.data().tasks);
        setTasks(doc.data().tasks);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })

    console.log(tasks);
  }, [time]);

  const rowItem = (item) => {
    return <CheckBox
      iconRight
      right
      title={item}
      checked={true}

    />
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>הגדרת משימה חדשה</Text>
        <View style={styles.chooseType}>
          <Text style={styles.title}>בחר אשכול:</Text>
          <Picker
            selectedValue={time}
            style={styles.pickerStyle}
            onValueChange={(itemValue, itemIndex) => setTime(itemValue)}
          >
            <Picker.Item label="בוקר" value="morning" />
            <Picker.Item label="צהריים" value="noon" />
            <Picker.Item label="אחר הצהריים" value="afterNoon" />
            <Picker.Item label="ערב" value="evening" />
          </Picker>
        </View>
        <View style={styles.chooseTasks}>
          <Text style={styles.title}>בחר משימות לאשכול:</Text>
          <FlatList
            horizontal
            data={tasks}
            keyExtractor={item => item}
            renderItem={({item}) => rowItem(item)}
            contentContainerStyle={{margin:5}}
          >

          </FlatList>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b5bef5',
    height:'100%',
    width:'100%'
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'

  },
  chooseType: {
    margin: 5,
    marginBottom:10,
    flexDirection: 'row-reverse',
    borderColor:'black',
    borderWidth:1

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 10
  },
  pickerStyle: {
    height: 50,
    width: 100
  },
  chooseTasks: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    margin: 5,

  }
});

export default AddNewTask;