import React from 'react';
import { StyleSheet, View, Text,ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';


export default class editFamilies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            familyId: this.props.familyId

        }
    }
    componentWillMount(){
        console.log('1231231231233333: ',this.props)
    }
    render() {

        return (
            <SafeAreaView>

                <ImageBackground style={{ height: '100%' }} source={require('../../assets/new_background09.png')}>

                    <ScrollView>

                    </ScrollView>

                </ImageBackground>

            </SafeAreaView>

        )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8b96d9',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 15,
    },

});

