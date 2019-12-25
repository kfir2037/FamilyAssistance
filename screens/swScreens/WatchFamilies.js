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
        <Text> Watch Families </Text>
        <Button
        title="go back"
        onPress={()=>this.props.navigation.goBack()}
        />
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
  