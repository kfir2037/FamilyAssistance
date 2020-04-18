import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import firebase from '../../config/config';
import { Button } from 'react-native-elements';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const WatchFamilies = ({ navigation }) => {

  const [familyObj, setFamilyObj] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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



  useEffect(() => {
    getFamily();
    console.log("getFamily()");
    //console.log(familyObj);
  }, []);

  useEffect(() => {

  }, []);

  return isLoading
    ? <View style={styles.container}>
      <ActivityIndicator size={50} color='#767ead' />
    </View>
    : (
      <SafeAreaView style={styles.container}>
        <Text style={styles.familyName}>משפחת {familyObj.lastName}</Text>
        <ScrollView style={styles.scrollView} >
          <View style={styles.detailsContainer}>
            <Text style={styles.headlineText}>פרטי משפחה:</Text>
            <Text style={styles.detailsText}>מצב משפחתי:</Text>
            <Text style={styles.detailsText}>מספר נפשות:</Text>
            <Text style={styles.detailsText}>סטטוס פעילות:</Text>
            <View style={styles.parentsDetails}>
              <Text style={styles.headlineText}>הורים:</Text>
              <View>
                {/* TODO: here should be a flatlist */}
                <Button containerStyle={styles.containerButton} buttonStyle={styles.button} titleStyle={{ color: 'black' }} title="הוסף " icon={
                  <AntDesign name='adduser' size={25} />
                }
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
    height: 40
  },
  containerButton: {
    alignItems: 'center'
  }


});
