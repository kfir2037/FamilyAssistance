import React, { useEffect, useState, useCallback } from 'react';
import { Picker, Platform, StyleSheet, View, Text, ActivityIndicator, ScrollView, SafeAreaView, Modal, TouchableHighlight } from 'react-native';
import firebase from '../../config/config';
//import {Picker} from '@react-native-community/picker';
import { CheckBox } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';

function Item({ id, title, selected, onSelect }) {
  return (

    <CheckBox
      checkedColor={'black'}
      uncheckedColor={'black'}
      containerStyle={styles.checkBoxStyle}
      textStyle={styles.textCheckBoxStyle}
      iconRight
      right
      title={title}
      checked={selected ? true : false}
      onPress={() => onSelect(id)}
    />
    // <TouchableOpacity
    //   onPress={() => onSelect(id)}
    //   style={[
    //     styles.item,
    //     { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
    //   ]}
    // >
    //   <Text style={styles.title}>{title}</Text>
    // </TouchableOpacity>
  );
}

const AddNewTask = () => {
  const [selected, setSelected] = useState(new Map());
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState('morning');
  const [kidOrParent,setKidOrParent] = useState()

  const onSelect = useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
      console.log(selected);
    },
    [selected],
  );

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

  return (
    <SafeAreaView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator>
        <Text style={styles.headerTitle}>הגדרת משימה חדשה</Text>
        <View style={styles.chooseType}>
          <Text style={styles.title}>בחר אשכול:</Text>
          <Picker
            mode={'dropdown'}
            itemStyle={{ fontWeight: 'bold' }}
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
          {tasks.length <= 0
            ? <ActivityIndicator size={50} color='#767ead' />
            : <FlatList
              inverted
              refreshing
              horizontal
              data={tasks}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <Item
                  id={item}
                  title={item}
                  selected={!!selected.get(item)}
                  onSelect={onSelect}
                />
              )}
              extraData={selected}
              contentContainerStyle={{ margin: 5 }}
            >

            </FlatList>
          }

        </View>
        <View style={styles.kidOrParent}>
          <Text style={styles.title}>המשימה עבור:</Text>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              iconRight
              right
              textStyle={styles.textCheckBoxStyle}
              title='הורה'
              containerStyle={{...styles.checkBoxStyle,height:40}}
              checkedColor={'black'}
              uncheckedColor={'black'}
            />
            <CheckBox
              iconRight
              right
              textStyle={styles.textCheckBoxStyle}
              title='ילד'
              containerStyle={{...styles.checkBoxStyle,height:40}}
              checkedColor={'black'}
              uncheckedColor={'black'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b5bef5',
    height: '100%',
    width: '100%'
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 5

  },
  chooseType: {
    margin: 5,
    marginBottom: 10,
    flexDirection: 'row-reverse',
    // borderColor:'black',
    // borderWidth:1

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    //alignSelf: 'center',
    marginLeft: 10,
    margin: 5
  },
  pickerStyle: {
    height: 50,
    width: 170,

  },

  chooseTasks: {
    //flexDirection: 'column',
    //alignSelf: 'flex-end',
    margin: 5,
  },

  checkBoxStyle: {
    height: 50,
    backgroundColor: '#767ead',
    borderColor: 'black',
    borderRadius: 10,

  },

  textCheckBoxStyle: {
    color: 'black',
  },
  kidOrParent: {
    margin: 5,
    flexDirection: 'row-reverse',


  }
});

export default AddNewTask;