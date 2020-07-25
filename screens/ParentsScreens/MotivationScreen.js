import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import firebase from '../../config/config';
import Spinner from '../../src/components/Spinner';
import { AntDesign as Icon } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MotivationScreen = () => {

  const [sentences, setSentences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const getMotivation = async () => {
    await firebase.firestore().collection('motivation').get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          console.log('doc.data() ', doc.data());
          let data = doc.data();
          setSentences((sentences) => [...sentences, data]);
          setLoading(false);
        })
      })
      .catch((err) => {
        console.log('getMotivation() Error: ', err);
        setErrorMsg('אירעה שגיאה');
        setLoading(false);
      })
  }

  // const renderPlusButton = () => {
  //   //if (firebase.auth().currentUser.)

  //   return (
  //     <TouchableOpacity style={styles.iconContainer}>
  //       <Icon name='pluscircleo' size={30} />
  //     </TouchableOpacity>
  //   );
  // }

  useEffect(() => {
    setLoading(true);
    sentences.length = 0;
    async function fetchData() {
      await getMotivation();
    }
    fetchData();
  }, [])


  return (
    <ImageBackground style={{ height: '100%' }} source={require('../../assets/new_background08.png')}>
      <SafeAreaView style={{ height: '100%' }} >
        {loading
          ? <Spinner style={{ marginTop: 20 }} />
          : errorMsg
            ? <Text style={styles.errorMsg}>{errorMsg}</Text>
            : <Card title='משפטי מוטיבציה' wrapperStyle={{}} containerStyle={{ height: '90%', borderRadius: 20, paddingHorizontal: 5 }}>
              <ImageBackground style={{}} imageStyle={{ opacity: 0.08 }} source={require('../../assets/family2.png')}>
                <ScrollView style={{ height: '90%', paddingHorizontal: 10 }}>
                  {
                    sentences.map((s, i) => {
                      return (
                        <View key={i} style={styles.sentContainer}>
                          <Text style={styles.sentence}>{s.content}</Text>
                          <Text>{`נוסף על ידי: ${s.wroteBy}`}</Text>
                          <Divider style={styles.divider} />
                        </View>
                      );
                    })
                  }
                </ScrollView>

              </ImageBackground>
            </Card>}

      </SafeAreaView >
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  sentContainer: {

  },
  sentence: {
    fontSize: 18
  },
  divider: {
    marginVertical: 5,

  },
  errorMsg: {
    color: 'crimson',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginVertical: 10,
    //flexDirection:'row-reverse',
    //borderWidth:0.5
  }
});

export default MotivationScreen;