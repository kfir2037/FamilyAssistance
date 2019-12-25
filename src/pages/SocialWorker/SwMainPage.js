import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  StyleSheetw,
  Text,
} from 'react-native';
import MenuButton from '../../../components/MenuButton';

export default class SwMainPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>asdfasdf</Text>
          <MenuButton navigation={this.props.navigation}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',  }
});
