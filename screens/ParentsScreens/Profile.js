import React, { Component } from 'react';
import { StyleSheet,View, Text,Button } from 'react-native';

class Profile extends React.Component {

    render() {
      return (
        <View style={styles.container}>
          <Text> Profile </Text>
        </View>
      );
    }
  }

export default Profile;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  