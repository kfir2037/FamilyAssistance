import React, { useState, useEffect } from 'react';
import { ActivityIndicator, RefreshControl, Modal, Text, View, StyleSheet, ImageBackground, ScrollView, SafeAreaView, TouchableHighlight } from 'react-native';
import { Card, Divider, Input, Button } from 'react-native-elements';
import firebase from '../../config/config';
import Spinner from '../../src/components/Spinner';
import { AntDesign as Icon } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { add } from 'react-native-reanimated';

const SwMotivationScreen = () => {

  const [sentences, setSentences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addSentenceLoading, setAddSentenceLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [sentence, setSentence] = useState('');
  const [refreshing, setRefreshing] = useState(false);

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

  const renderPlusButton = () => {
    //setModalVisible(true);
    return (
      <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(true)}>
        <Icon name='pluscircleo' size={30} />
      </TouchableOpacity>
    );
  }

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setSentences([]);
    await getMotivation();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleAddSentence = async () => {
    setAddSentenceLoading(true);
    if (sentence) {
      await firebase.firestore().collection('motivation').add({
        content: sentence,
        wroteBy: firebase.auth().currentUser.displayName
      })
        .then(() => {
          console.log('sentence added!');
          setAddSentenceLoading(false);
          setFeedbackMsg('המשפט נוסף בהצלחה');

        })
        .catch(() => {
          console.log('error adding sentence!');
          setAddSentenceLoading(false);
          setFeedbackMsg('אירעה שגיאה');

        })
    }
    else {
      console.log('error adding sentence!');
      setAddSentenceLoading(false);
      setFeedbackMsg('לא ניתן להוסיף משפט ריק');
    }
  }

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
            : <Card title='משפטי מוטיבציה' wrapperStyle={{}} containerStyle={{ backgroundColor: 'rgba(255,255,255,1)', height: '90%', borderRadius: 20, paddingHorizontal: 5 }}>
              <ImageBackground style={{}} imageStyle={{ opacity: 0.08 }} source={require('../../assets/family2.png')}>
                <ScrollView
                  style={{ height: '90%', paddingHorizontal: 10 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                >
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
                  {renderPlusButton()}
                  <Modal
                    animationType='slide'
                    visible={modalVisible}
                    transparent={true}

                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView} >
                        <TouchableHighlight style={styles.closeIcon} onPress={() => {
                          setModalVisible(!modalVisible);
                          setFeedbackMsg('');
                          setSentence('');
                        }}>
                          <Icon name="close" size={25} />
                        </TouchableHighlight>
                        <View>
                          <Input
                            //keyboardType='phone-pad'
                            onChangeText={(sent) => { setSentence(sent) }}
                            value={sentence}
                            //onBlur={props.handleBlur('desc')}
                            placeholder='הוסף משפט'
                            label='משפט חדש'
                            multiline
                            maxLength={100}
                            placeholderTextColor='gray'
                            labelStyle={{ color: 'black', marginRight: 5 }}
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            textAlign='right'
                            inputStyle={{ height: '100%', backgroundColor: 'lightgray', color: 'gray', borderWidth: 1, borderRadius: 7, borderColor: 'lightgray', paddingHorizontal: 10 }}
                            containerStyle={{ marginVertical: 5 }}
                          />
                          {addSentenceLoading
                            ? <ActivityIndicator size='large' color='#0ca5e5' />
                            : <Button
                              buttonStyle={styles.button}
                              containerStyle={{ width: '50%', alignSelf: 'center' }}
                              title='הוסף'
                              titleStyle={{ fontWeight: 'bold' }}

                              onPress={handleAddSentence}

                            />}
                          {feedbackMsg
                            ? <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>{feedbackMsg}</Text>
                            : null
                          }

                        </View>

                      </View>

                    </View>
                  </Modal>
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
  button: {
    borderRadius: 20,
    backgroundColor: '#0ca5e5',
    marginVertical: 10
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
  },
  closeIcon: {
    alignSelf: 'flex-end'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    alignContent: 'center',
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    padding: 15,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    height: "50%"
  },
});

export default SwMotivationScreen;