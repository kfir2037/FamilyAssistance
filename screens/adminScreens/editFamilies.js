import React from 'react';
import {
    StyleSheet, View, TextInput, ImageBackground, Text, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../../config/config';
import { Button } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

export default class editFamilies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            familyId: this.props.navigation.state.params.familyId,
            familyData: {},
            socialWorkers: [],
            country: '',


        }
    }
    async componentDidMount() {
        var data
        await firebase.firestore().collection('families').doc(this.state.familyId).get()
            .then((doc) => {
                data = doc.data()
            })
            .catch((err) => console.log('ERROR: ', err));
        console.log('data: ', data)
        await this.getSocialWorkers()
        this.setState({ familyData: data })
    }
    getSocialWorkers = async () => {

        let allFamilies = []
        let familyObj = {}

        const swFamilies = await firebase
            .firestore()
            .collection('users')
            .where('role', '==', 'sw')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    var data = doc.data();
                    allFamilies.push({
                        label: data.firstName + ' ' + data.lastName,
                        value: doc.id,
                        icon: () => <Icon name="flag" size={18} color="#900" />
                    });
                });
                console.log('allFamilies: ', allFamilies)
                this.setState({ socialWorkers: allFamilies })
            })
            .catch(error => {
                console.log("Error getting documents: ", error);
            });

        return allFamilies;
    }
    onChangeLastName = (value) => {
        var tempData = this.state.familyData;
        tempData.lastName = value;
        this.setState({ familyData: tempData })
    }
    onChangeEmail = (value) => {
        var tempData = this.state.familyData;
        tempData.email = value;
        this.setState({ familyData: tempData })
    }
    onChangePhone = (value) => {
        var tempData = this.state.familyData;
        tempData.phone = value;
        this.setState({ familyData: tempData })
    }
    onChangeSocialWorker = (value) => {
        var tempData = this.state.familyData;
        tempData.swInCharge = value;
        this.setState({ familyData: tempData })
    }
    save= ()=>{
        firebase.firestore().collection('families').doc(this.state.familyId).update({
            lastName:this.state.familyData.lastName,
            phone:this.state.familyData.phone,
            swInCharge:this.state.familyData.swInCharge,
            email:this.state.familyData.email,
        })
        console.log('changes was saved')
        alert('השינויים בוצעו בהצלחה')
    }

    render() {
        if (this.state.socialWorkers.length <= 0) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbc213', height: '100%' }}>
                    <ActivityIndicator color='#e0aa00' size={60} />
                </View>
            );
        }
        return (

            <SafeAreaView>
                <ImageBackground style={{ height: '100%' }} source={require('../../assets/new_background09.png')}>
                {/* <ScrollView> */}

                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.onChangeLastName(text)}
                        value={this.state.familyData.lastName}
                    />
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.onChangeEmail(text)}
                        value={this.state.familyData.email}
                    />
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.onChangePhone(text)}
                        value={this.state.familyData.phone}
                    />
                    <DropDownPicker
                        // items={[
                        //     {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
                        //     {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
                        // ]}
                        items={this.state.socialWorkers}
            
                        defaultValue={this.state.country}
                        containerStyle={{ height: 40 }}
                        placeholder='בחר עובד סוציאלי'
                        style={{ backgroundColor: '#fafafa' }}
                        searchable={true}
                        searchablePlaceholder="חיפוש"
                        searchablePlaceholderTextColor="gray"
                        seachableStyle={{}}
                        searchableError={() => <Text>לא נמצאו תוצאות</Text>}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                 
                        onChangeItem={item => this.onChangeSocialWorker(item.value)}
                    />
                    <Button
                        buttonStyle={styles.button}
                        title="עריכה"
                        onPress={item=>this.save(item)}
                        color='#767ead'
                        icon={<MaterialCommunityIcons
                            name="account-details"
                            size={26}
                            color="white"
                        />
                        }
                        titleStyle={{ marginRight: 5 }}
                        iconRight
                    />
                        {/* {this.state.data} */}
                    {/* </ScrollView> */}
                </ImageBackground>
            </SafeAreaView>

        )
    }
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

