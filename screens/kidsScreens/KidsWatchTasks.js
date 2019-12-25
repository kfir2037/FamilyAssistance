import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class KidsWatchTasks extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text> Kids Watch Tasks </Text>
      </View>
    );
  }
}

// export default KidsWatchTasks;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  