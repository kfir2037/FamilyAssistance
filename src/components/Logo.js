import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';

export default class Logo extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image style={{ width: 150, height: 185 }}
					source={require('../../assets/family2.png')} />
				<Text style={styles.logoText}>מרכז ילדים - הורים{'\n'}עיריית באר-שבע</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		//flexGrow: 1,
		//justifyContent: 'flex-end',
		alignItems: 'center'
	},
	logoText: {
		marginVertical: 5,
		fontSize: 18,
		color: 'white',
		fontWeight:'bold',
		textAlign:'center',
		fontFamily:'Heebo'
	}
});