import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View, Text, ActivityIndicator, ScrollView, SafeAreaView, Modal, TouchableHighlight } from 'react-native';
import firebase from '../../config/config';
import { Button, Input } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AddParentModal from '../../src/components/AddParentModal';

const WatchFamilies = ({ navigation }) => {

  const [familyObj, setFamilyObj] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [show, setShow] = useState(false);


  const AddParentPress = () => {
    setIsModalVisible(!isModalVisible);
  }

  const getFamily = async () => {
    const familyId = navigation.getParam('familyId');
    console.log(familyId);
    await firebase.firestore().collection('families').doc(familyId).get()
      .then(doc => {
        setFamilyObj(doc.data());
        setIsLoading(false);
        console.log(familyObj);
      })
  }

  const showDatePicker = () => {
    setShow(!show);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShow(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };


  useEffect(() => {
    getFamily();
    console.log("getFamily()");
    //console.log(familyObj);
  }, []);

  useEffect(() => {
    console.log(isModalVisible);
  }, [isModalVisible]);

  return isLoading
    ? <View style={styles.container}>
      <ActivityIndicator size={50} color='#767ead' />
    </View>
    : (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <ScrollView contentContainerStyle={{ alignItems: 'flex-end' }} style={styles.modalView}>
              <TouchableHighlight style={styles.closeIcon} onPress={() => {
                setIsModalVisible(!isModalVisible);
              }}>
                <AntDesign name="close" size={25} />
              </TouchableHighlight>
              <Text style={{ ...styles.headlineText, alignSelf: 'center' }}>הוספת הורה חדש</Text>
              <Input containerStyle={styles.modalInput} placeholderTextColor='black' autoCorrect={false} textAlign='right' placeholder='שם פרטי' />
              <Input containerStyle={styles.modalInput} placeholderTextColor='black' autoCorrect={false} textAlign='right' placeholder='שם משפחה ' />
              <Input containerStyle={styles.modalInput} placeholderTextColor='black' autoCorrect={false} textAlign='right' keyboardType='phone-pad' placeholder='תעודת זהות' />

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ alignSelf: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{birthDate.toLocaleDateString()}</Text>
                </View>

                <View style={styles.birtDateBox}>
                  <Button containerStyle={{ margin: 5, alignItems: 'flex-start' }} buttonStyle={styles.button} titleStyle={{ color: 'black' }} title="בחר תאריך "
                    onPress={showDatePicker}
                  />
                  <Text style={{ fontSize: 18 }}>תאריך לידה: </Text>
                  <View>
                    {show && <DateTimePicker
                      display='spinner'
                      style={{ position: 'absolute' }}
                      value={birthDate}
                      onChange={onChange}
                    />
                    }
                  </View>
                </View>
              </View>
              <Input containerStyle={styles.modalInput} textAlign='right' placeholderTextColor='black' keyboardType='phone-pad' textContentType='telephoneNumber' placeholder='טלפון' />
              <Input containerStyle={styles.modalInput} placeholder='דוא"ל' placeholderTextColor='black' keyboardType='email-address' textContentType='emailAddress' />

              <View style={{ alignSelf: 'center', margin: 5 }}>
                <Button containerStyle={styles.containerButton} buttonStyle={styles.button} titleStyle={{ color: 'black' }} title="הוסף "
                  onPress={() => {
                    setIsModalVisible(!isModalVisible);
                  }}
                />
              </View>

            </ScrollView>
          </View>
        </Modal>
        <Text style={styles.familyName}>משפחת {familyObj.lastName}</Text>
        <ScrollView style={styles.scrollView} >
          <View style={styles.detailsContainer}>
            <Text style={styles.headlineText}>פרטי משפחה: </Text>
            <Text style={styles.detailsText}>מצב משפחתי: </Text>
            <Text style={styles.detailsText}>מספר נפשות: {familyObj.numOfPersons}</Text>
            <Text style={styles.detailsText}>סטטוס פעילות: {familyObj.status ? <Text style={{ color: 'green' }}>פעילה</Text> : <Text style={{ color: 'crimson' }}>לא פעילה</Text>}</Text>
            <View style={styles.parentsDetails}>
              <Text style={styles.headlineText}>הורים:</Text>
              <View>
                {/* TODO: here should be a flatlist */}
                <Button containerStyle={styles.containerButton} buttonStyle={styles.button} titleStyle={{ color: 'black' }} title="הוסף " icon={
                  <AntDesign name='adduser' size={25} />
                }
                  onPress={() => { AddParentPress() }}
                />
              </View>
            </View>
            <View style={styles.childsDetails}>
              <Text style={styles.headlineText}>ילדים:</Text>
              <View>
                {/* TODO: here should be a flatlist */}
                <Button containerStyle={styles.containerButton} buttonStyle={styles.button} titleStyle={{ color: 'black' }} title="הוסף " icon={
                  <AntDesign name='adduser' size={25} />
                }
                />
              </View>
            </View>
            <Text style={styles.headlineText}>הערות:</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );

}

export default WatchFamilies;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#b5bef5',
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 1,
    //borderColor: 'black',
    //borderRadius: 10
  },
  familyName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
    // borderWidth: 1,
    // borderColor: 'black'
  },
  detailsContainer: {
    //backgroundColor: 'black',
    flex: 1,
    borderWidth: 0,
    borderColor: 'black',
    marginTop: 5

  },
  scrollView: {
    width: '100%',
    backgroundColor: '#8b96d9',
    borderRadius: 10
  },
  detailsText: {
    fontSize: 20,
    margin: 5,
    marginRight: 20
  },
  headlineText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 15

  },
  parentsDetails: {

  },
  button: {
    backgroundColor: '#767ead',
    width: 100,
    height: 40,
    borderRadius: 15
  },
  containerButton: {
    alignItems: 'center',
    margin: 5
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    height: "85%"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  closeIcon: {
    alignSelf: 'flex-end'
  },
  modalInput: {
    marginVertical: 10
  },

  birtDateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  }



});
