import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default class Spinner extends Component {
    render() {
        return (
            <View style={styles.spinnerStyle}>
                <ActivityIndicator color='#767ead' size='large' />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    spinnerStyle: {
        //flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
