import React, { Component, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const WatchFamilies = ({ navigation }) => {


  const getFamily = () => {
    const familyId = navigation.getParam('familyId');
    console.log(familyId);
  }

  useEffect(() => {
    getFamily();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Watch Families</Text>
    </View>
  );

}

export default WatchFamilies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
