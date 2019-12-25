import React, { useState } from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,Alert,Switch,ProgressBarAndroid,TouchableOpacity } from 'react-native';
// import MenuButton from '../components/MenuButton';
import { FormLabel, FormInput, FormValidationMessage, Header,Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Constants } from 'expo';
 
export default function App(props) {
const [MotherName,setMotherName]=useState("");
const [FatherName,setFatherName]=useState("");
const [LastName,setLastName]=useState("");
const [ID,setID]=useState("");
const [Email,setEmail]=useState("");
const [Phone,setPhone]=useState("");
const [Password,setPassword]=useState("");
const [RePassword,setRePassword]=useState("");
const [switchValue,setSwitchValue]=useState(false);
 
onPress = () => {
  console.log({FatherName})
  Alert.alert(JSON.stringify(FatherName['FatherName']));
  };
 
Add = () =>{
    alert("kfir")
}

  return (
    <ScrollView>
    {/* <MenuButton navigation={props.navigation}/> */}
    <View style={styles.container}>
      {/* <ProgressBarAndroid/>
      <ProgressBarAndroid styleAttr="Horizontal" />
        <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        /> */}
 

          {/* <Text style={ styles.heading }> הוספת משפחה חדשה </Text> */}
          <Text style={styles.headlines}>פרטים אישיים:</Text>
          {/* <FormValidationMessage>{'This field is required'}</FormValidationMessage> */}

          <View style={{backgroundColor:'#f0efed'}}>
              <View style={styles.names}>
                <View style={styles.fields}>
                  <Text style={styles.text} >שם האם</Text>
                </View>
                <View style={styles.fields}>
                  <TextInput  onChangeText={MotherName=>setMotherName(MotherName)} placeholder='שם האם'></TextInput>
                </View>
              </View>
              <View style={styles.names}>
              <View style={styles.fields}>
                <Text style={styles.text} >שם האב</Text>
              </View>
              <View style={styles.fields}>
                <TextInput onChangeText={(FatherName)=>setFatherName({FatherName})} placeholder='שם האב'></TextInput>
              </View>
            </View>
              <View style={styles.names}>
                <View style={styles.fields}>
                  <Text style={styles.text} >שם משפחה</Text>
                </View>
                <View style={styles.fields}>
                  <TextInput onChangeText={(LastName)=>setLastName({LastName})} placeholder='שם משפחה'></TextInput>
                </View>
              </View>    
              <View style={styles.names}>
                <View style={styles.fields}>
                  <Text style={styles.text} >תעודת זהות</Text>
                </View>
                <View style={styles.fields}>
                  <TextInput onChangeText={(ID)=>setID({ID})} placeholder='123456789'></TextInput>
                </View>
              </View>
          </View>
            <Text style={styles.headlines}>פרטי קשר:</Text>
          <View style={{backgroundColor:'#f0efed'}}>
            <View style={styles.names}>
              <View style={styles.fields}>
                <Text style={styles.text}>אימייל</Text>
              </View>
              <View style={styles.fields}>
                <TextInput onChangeText={(Email)=>setEmail({Email})} placeholder='name@domain.com'></TextInput>
              </View>
            </View>
            <View style={styles.names}>
              <View style={styles.fields}>
                <Text style={styles.text}>טלפון </Text>
              </View>
              <View style={styles.fields}>
                <TextInput onChangeText={(Phone)=>setPhone({Phone})} placeholder='052-1234567'></TextInput>
              </View>
            </View>
          </View>
            <Text style={styles.headlines}>פרטי התחברות: </Text>
          <View style={{backgroundColor:'#f0efed'}}>
            <View style={styles.names}>
              <View style={styles.fields}>
                <Text style={styles.text} >סיסמה</Text>
              </View>
              <View style={styles.fields}>
                <TextInput onChangeText={(Password)=>setPassword({Password})} placeholder='הקלד סיסמה כאן'></TextInput>
              </View>
            </View>
            <View style={styles.names}>
              <View style={styles.fields}>
                <Text style={styles.text} >אימות סיסמה </Text>
              </View>
              <View style={styles.fields}>
                <TextInput onChangeText={(RePassword)=>setRePassword({RePassword})} placeholder='הקלד שוב את הסיסמה'></TextInput>
              </View>
            </View>
          </View>
            <Text style={styles.text}>הורים גרושים</Text>
            <Switch  value={switchValue} onChangeText={(switchValue)=>setSwitchValue({switchValue})}/>
            <TouchableOpacity
                style={styles.button}
                onPress={Add}
            >
          <Text style={styles.buttonText}> שמור </Text>
          </TouchableOpacity>     
    </View>
    </ScrollView>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop:30,
  },
  names:{
    flexDirection:'row-reverse',
    margin:7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da',
  },
  headlines:{
    fontSize:15,
    fontWeight: 'bold',
    paddingTop:20,
    paddingBottom:7,
    marginRight:10,
  },
  text:{
    fontSize:15,
    margin:7,
  },
  fields:{
    flex:3,
    textAlign:'left',
  },
  button: {

    width:300,
    backgroundColor:'steelblue',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    justifyContent: 'center',

  },
  buttonText:{
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  heading: {
    fontSize: 35,    
    fontWeight: 'bold',
    color: 'blue',
    paddingBottom: 5,
    paddingTop:25,
    
  },

});





