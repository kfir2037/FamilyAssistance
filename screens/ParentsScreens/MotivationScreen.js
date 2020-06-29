import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import firebase from '../../config/config';

const MotivationScreen = () => {

  const [sentences, setSentences] = useState([]);

  const getMotivation = async () => {
    await firebase.firestore().collection('motivation').get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          console.log('doc.data() ', doc.data());
          let data = doc.data();
          setSentences((sentences) => [...sentences, data]);

        })
      })
      .catch((err) => {
        console.log('getMotivation() Error: ', err);
      })
  }

  useEffect(() => {
    sentences.length = 0;
    async function fetchData() {
      await getMotivation();
    }
    fetchData();
  }, [])


  return (
    <ImageBackground style={{ height: '100%' }} source={require('../../assets/new_background08.png')}>
      <SafeAreaView style={{ height: '100%' }} >
        <ScrollView >
          <Card title='משפטי מוטיבציה' wrapperStyle={{}} containerStyle={{ marginBottom: 20, borderRadius: 20 }}>
            <ImageBackground style={{}} imageStyle={{ opacity: 0.08 }} source={require('../../assets/family.png')}>
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
            </ImageBackground>
          </Card>
        </ScrollView>
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

  }
});

export default MotivationScreen;