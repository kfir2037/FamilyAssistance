import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

class WatchFamilies extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Reports </Text>

      </View>
    );
  }
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
  