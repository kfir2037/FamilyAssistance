import React, { Component } from 'react';
import { StyleSheet,View, Text,Button } from 'react-native';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Feed </Text>
      </View>
    );
  }
}

export default Feed;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  