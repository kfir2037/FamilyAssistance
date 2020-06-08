import React, { useEffect, useState } from 'react';
import { FlatList, Picker, Platform, StyleSheet, View, Text, ActivityIndicator, ScrollView, SafeAreaView, Modal, TouchableHighlight } from 'react-native';
import firebase from '../../config/config';

const ParentDetails = (parentId) => {

	let details={};
	firebase.firestore().collection('users').doc(parentId).get()
		.then(doc => {
			console.log(doc.data().firstName);
			details = ({
				firstName: doc.data().firstName,
				birthDate: doc.data().birthDate,
				gender: doc.data().gender
			})
			console.log(details['firstName']);
		})

	return (
		<View>
			<Text>{details['firstName']}</Text>
		</View>
	);
}

const styles = StyleSheet.create({})

export default ParentDetails;