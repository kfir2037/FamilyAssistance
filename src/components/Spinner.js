import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = (props) => {

    return (
        <View style={{...styles.spinnerStyle}, props.style}>
            <ActivityIndicator color='#e0aa00' size='large' />
        </View>
    );

};

const styles = StyleSheet.create({
    spinnerStyle: {
        //flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    }
});

export default Spinner;