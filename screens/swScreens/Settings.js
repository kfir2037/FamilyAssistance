import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Button,
} from 'react-native';
// import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'
import Tabs from 'react-native-tabs';
import Task from './Task';
import firebase from '../../config/config';
import { Select, Option } from 'react-native-select-lists';
import SelectableFlatlist, { STATE } from 'react-native-selectable-flatlist';
import { FontAwesome } from '@expo/vector-icons';
//const FieldValue = require('firebase-admin').firestore.FieldValue;


export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: '',
            tasks: [],
            morningTasks:[],
            noonTasks:[],
            afternoonTasks:[],
            eveningTasks:[],
            data:[],
            taskDeleteSelected:'',
        };
    }

    async  UNSAFE_componentWillMount(){
        console.log('1')
        let tasks = await this.getTasks();

        // const socialWorkerUid = firebase.auth().currentUser['uid'];
        // console.log('socialWorkerId ' + socialWorkerUid);
        // let familyObj = {}

        // const swFamilies = await firebase
        // .firestore()
        // .collection('families')
        // .where('swInCharge', '==', socialWorkerUid)
        // .get()
        // .then(querySnapshot => {
        //   querySnapshot.forEach(doc => {
        //     allFamilies.push(doc);
        //     familyObj[doc.id] = Object.assign({}, doc.data());
        //   });
        //   this.setState({ data: allFamilies });
        //   // console.log('data: ', this.state.data);
        // })
        // .catch(error => {
        //   console.log("Error getting documents: ", error);
        // });
    }

    getTasks = async () => {
        // YellowBox.ignoreWarnings(['Setting a timer']);
        // const familyId = this.props.navigation.state.params.familyId;
    
        let morningTasks = firebase.firestore().collection('RoutineTasks').doc('morning');
    
        let getDoc = morningTasks.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              let allData = doc.data();
              this.setState({morningTasks:allData.tasks})
              // console.log('Document data:', this.state.morningTasks);
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
          
          let noonTasks = firebase.firestore().collection('RoutineTasks').doc('noon');
          getDoc = noonTasks.get()
            .then(doc => {
              if (!doc.exists) {
                console.log('No such document!');
              } else {
                let allData = doc.data();
                this.setState({noonTasks:allData.tasks})
                // console.log('Document data:', this.state.noonTasks);
              }
            })
            .catch(err => {
              console.log('Error getting document', err);
            });
    
            let afternoonTasks = firebase.firestore().collection('RoutineTasks').doc('afterNoon');
            getDoc = afternoonTasks.get()
              .then(doc => {
                if (!doc.exists) {
                  console.log('No such document!');
                } else {
                  let allData = doc.data();
                  this.setState({afternoonTasks:allData.tasks})
                  // console.log('Document data:', this.state.afternoonTasks);
                }
              })
              .catch(err => {
                console.log('Error getting document', err);
              });
    
              let eveningTasks = firebase.firestore().collection('RoutineTasks').doc('evening');
              getDoc = eveningTasks.get()
                .then(doc => {
                  if (!doc.exists) {
                    console.log('No such document!');
                  } else {
                    let allData = doc.data();
                    this.setState({eveningTasks:allData.tasks})
                    // console.log('Document data:', this.state.eveningTasks);
                  }
                })
                .catch(err => {
                  console.log('Error getting document', err);
                });

        return null;
      }

    tasks1 = [
        { name: "kfir", age: 16 },
        { name: "kfir", age: 16 },
        { name: "kfir", age: 16 },
        { name: "kfir", age: 16 },
        { name: "kfir", age: 16 },
        { name: "kfir", age: 16 },
    ];
    tasks2 = [
        { name: "shimon", age: 16 },
        { name: "shimon", age: 16 },
        { name: "shimon", age: 16 },
        { name: "shimon", age: 16 },
        { name: "shimon", age: 16 },
        { name: "shimon", age: 16 },
    ];
    tasks3 = [
        { name: "noa", age: 16 },
        { name: "noa", age: 16 },
        { name: "noa", age: 16 },
        { name: "noa", age: 16 },
        { name: "noa", age: 16 },
        { name: "noa", age: 16 },
    ];

    tasks4 = [
        { name: "moti", age: 16 },
        { name: "moti", age: 16 },
        { name: "moti", age: 16 },
        { name: "moti", age: 16 },
        { name: "moti", age: 16 },
        { name: "moti", age: 16 },
    ];
    changeTasksToCategory = (el) => {
        // console.log(el.props.name)
        if (el.props.name == 'בוקר') {
            this.setState({ tasks: this.state.morningTasks })
        }
        else if (el.props.name == 'צהריים') {
            // this.setState({ tasks: this.tasks2 })
            this.setState({ tasks: this.state.noonTasks })

        }
        else if (el.props.name == 'אחר הצהריים') {
            // this.setState({ tasks: this.tasks3 })
            this.setState({ tasks: this.state.afternoonTasks })


        }
        else if (el.props.name == 'ערב') {
            // this.setState({ tasks: this.tasks4 })
            this.setState({ tasks: this.state.eveningTasks })


        }
        
        this.setState({ page: el.props.name })
        console.log("tasks: ",this.state.tasks)
    }

    itemsSelected = (selectedItem) => {
        console.log('select: ',selectedItem)
        if (typeof selectedItem[0] === "undefined") {
            console.log('selected still undefined');
          }
          else {
            console.log('selected: ', selectedItem[0]);
            this.setState({ taskDeleteSelected: selectedItem[0] })
      
          }
    }

    deleteTask=()=>{
        console.log('task to delete: ', this.state.taskDeleteSelected)
        if(this.state.page=='בוקר'){
            let doc=firebase.firestore().collection('RoutineTasks').doc('morning');
            doc.update({"tasks":FieldValue.arrayRemove(this.state.taskDeleteSelected)}); 
            console.log('2222')
        }
        else if(this.state.page=='צהריים'){
            
        }
        else if(this.state.page=='אחר הצהריים'){
            
        }
        else if(this.state.page=='ערב'){
            
        }
    }

    rowItem = (item) => {
        console.log('item :', item);
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: '#b5bef5',
              //borderWidth: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingVertical: 20,
              paddingHorizontal: 10,
              borderColor: '#767ead'
            }}
          >
            {/* <Text>HI</Text> */}
            <Text>{item}</Text>
    
          </View>
        );
      }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View >
                        <Text>הגדרות</Text>
                    </View>
                    <View>
                        <Text>כמה דקות אחרי יקבלו התרעה</Text>
                    </View>
                    <View>
                        <View style={styles.fields}>
                            <Text style={styles.text}>בוקר</Text>
                            <View style={styles.numbers}>
                                <NumericInput
                                    // value={this.state.value}  
                                    onChange={value => this.setState()}
                                    // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                    totalWidth={170}
                                    totalHeight={50}
                                    iconSize={25}
                                    step={1}
                                    valueType='real'
                                    rounded
                                    textColor='#B0228C'
                                    iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor='#EA3788'
                                    leftButtonBackgroundColor='#E56B70' />
                            </View>
                        </View>
                        <View style={styles.fields}>
                            <Text style={styles.text}>צהריים</Text>
                            <View style={styles.numbers}>
                                <NumericInput
                                    // value={this.state.value}  
                                    onChange={value => this.setState()}
                                    // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                    totalWidth={170}
                                    totalHeight={50}
                                    iconSize={25}
                                    step={1}
                                    valueType='real'
                                    rounded
                                    textColor='#B0228C'
                                    iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor='#EA3788'
                                    leftButtonBackgroundColor='#E56B70' />
                            </View>
                        </View>
                        <View style={styles.fields}>
                            <Text style={styles.text}>אחר הצהריים</Text>
                            <View style={styles.numbers}>
                                <NumericInput
                                    // value={this.state.value}  
                                    onChange={value => this.setState()}
                                    // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                    totalWidth={170}
                                    totalHeight={50}
                                    iconSize={25}
                                    step={1}
                                    valueType='real'
                                    rounded
                                    textColor='#B0228C'
                                    iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor='#EA3788'
                                    leftButtonBackgroundColor='#E56B70' />
                            </View>
                        </View>
                        <View style={styles.fields}>
                            <Text style={styles.text}>ערב</Text>
                            <View style={styles.numbers}>
                                <NumericInput
                                    // value={this.state.value}  
                                    onChange={value => this.setState()}
                                    // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                    totalWidth={170}
                                    totalHeight={50}
                                    iconSize={25}
                                    step={1}
                                    valueType='real'
                                    rounded
                                    textColor='#B0228C'
                                    iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor='#EA3788'
                                    leftButtonBackgroundColor='#E56B70' />
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text>כמה דקות אחרי יקבלו הודעת תזכורת</Text>
                    </View>
                    <View>
                        <View style={styles.fields}>
                            <Text style={styles.text}>בוקר</Text>
                            <View style={styles.numbers}>
                                <NumericInput
                                    // value={this.state.value}  
                                    onChange={value => this.setState()}
                                    // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                    totalWidth={170}
                                    totalHeight={50}
                                    iconSize={25}
                                    step={1}
                                    valueType='real'
                                    rounded
                                    textColor='#B0228C'
                                    iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor='#EA3788'
                                    leftButtonBackgroundColor='#E56B70' />
                            </View>
                        </View>
                        <View style={styles.fields}>
                            <Text style={styles.text}>צהריים</Text>
                            <View style={styles.numbers}>
                                <NumericInput
                                    // value={this.state.value}  
                                    onChange={value => this.setState()}
                                    // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                    totalWidth={170}
                                    totalHeight={50}
                                    iconSize={25}
                                    step={1}
                                    valueType='real'
                                    rounded
                                    textColor='#B0228C'
                                    iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor='#EA3788'
                                    leftButtonBackgroundColor='#E56B70' />
                            </View>
                        </View>
                        <View style={styles.fields}>
                            <Text style={styles.text}>אחר הצהריים</Text>
                            <View style={styles.numbers}>
                                <NumericInput
                                    // value={this.state.value}  
                                    onChange={value => this.setState()}
                                    // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                    totalWidth={170}
                                    totalHeight={50}
                                    iconSize={25}
                                    step={1}
                                    valueType='real'
                                    rounded
                                    textColor='#B0228C'
                                    iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor='#EA3788'
                                    leftButtonBackgroundColor='#E56B70' />
                            </View>
                        </View>
                        <View style={styles.fields}>
                            <Text style={styles.text}>ערב</Text>
                            <View style={styles.numbers}>
                                <NumericInput
                                    // value={this.state.value}  
                                    onChange={value => this.setState()}
                                    // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                    totalWidth={170}
                                    totalHeight={50}
                                    iconSize={25}
                                    step={1}
                                    valueType='real'
                                    rounded
                                    textColor='#B0228C'
                                    iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor='#EA3788'
                                    leftButtonBackgroundColor='#E56B70' />
                            </View>
                        </View>
                    </View>
                    <View style={styles.lineStyle} />
                    <View style={styles.container2}>
                        <Tabs selected={this.state.page} style={{ backgroundColor: 'white' }}
                            // selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name,tasks:el.props.name})}>
                            selectedStyle={{ color: 'red' }} onSelect={el => this.changeTasksToCategory(el)}>
                            <Text name="בוקר">בוקר</Text>
                            <Text name="צהריים" selectedIconStyle={{ borderTopWidth: 2, borderTopColor: 'red' }}>צהריים</Text>
                            {/* <Text name="tasks2" >צהריים</Text> */}
                            <Text name="אחר הצהריים">אחר הצהריים</Text>
                            <Text name="ערב" selectedStyle={{ color: 'green' }}>ערב</Text>
                            {/* <Text name="tasks4" >ערב</Text> */}

                        </Tabs>
                        <Text style={styles.welcome}>הוספה והסרה של משימות</Text>

                    </View>
                    {/* <Select onSelect={(selectedItem) => this.itemsSelected(selectedItem)}>
                        <Option value={1} 
                        >List item 55551</Option>
                        <Option value={2}>List item 2</Option>
                        <Option value={3}>List item 3</Option>
                    </Select> */}
                              <View style={styles.familiesList}>
            <SelectableFlatlist
              data={this.state.tasks}
              state={STATE.EDIT}
              multiSelect={false}
              itemsSelected={(selectedItem) => this.itemsSelected(selectedItem)}
              initialSelectedIndex={[0]}
              cellItemComponent={(item) => this.rowItem(item)}
              checkIcon={()=> <FontAwesome name='circle' size={25} color='#767ead' />}
              uncheckIcon= {()=> <FontAwesome name='circle-o' size={25} color='#767ead' />}
              touchStyles={{backgroundColor:'#b5bef5'}}
            />
          </View>
          <View style={{ margin: 20 }}>
                <Button
                onPress={this.deleteTask}
                    icon={
                        <Icon
                            name="trash"
                            size={20}
                            color="white"
                        />
                    }
                    title="  הסרת משימה  "
                />
            </View>
                    {/* <View>
                        <View style={{ height: 200, backgroundColor: 'lightblue' }}>
                            <Text style={styles.instructions}>
                                משימות שנבחרו: {this.state.page}
                            </Text>
                            <View>
                                {this.state.tasks.map(task => {
                                    console.log("map task: ",{task})
                                    return <Task task={task}></Task>
                                })}
                            </View>
                        </View>
                        <View style={{ margin: 20 }}>
                            <Button
                                icon={
                                    <Icon
                                        name="trash"
                                        size={20}
                                        color="white"
                                    />
                                }
                                title="  הסרת משימה  "
                            />
                        </View>
                    </View> */}
                    <View style={styles.lineStyle} />
                    <View>
                        <View style={styles.addTask}>
                            <Text>בוקר</Text>
                            <View style={styles.addTaskInputContainer}>
                                <TextInput
                                    style={styles.addTaskInput}
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={(text) => this.setState()}
                                // value={this.state.text}
                                />
                            </View>
                        </View>
                        {/* <Button style={styles.addButton}
                    // icon={
                    //     <Icon
                    //     name="trash"
                    //     size={20}
                    //     color="white"
                    //     />
                    // }
                    title="הוספת משימה  "
                ></Button> */}
                        <View style={{ marginTop: 30, alignContent: 'center' }}>
                            <Button
                                title="הוספת משימה"

                            // color="#0000ff"
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.addTask}>
                            <Text>צהריים</Text>
                            <View style={styles.addTaskInputContainer}>
                                <TextInput
                                    style={styles.addTaskInput}
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={(text) => this.setState()}
                                // value={this.state.text}
                                />
                            </View>
                        </View>
                        {/* <Button style={styles.addButton}
                    // icon={
                    //     <Icon
                    //     name="trash"
                    //     size={20}
                    //     color="white"
                    //     />
                    // }
                    title="הוספת משימה  "
                ></Button> */}
                        <View style={{ marginTop: 30, alignContent: 'center' }}>
                            <Button
                                title="הוספת משימה"
                            // color="#0000ff"
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.addTask}>
                            <Text>אחר הצהריים</Text>
                            <View style={styles.addTaskInputContainer}>
                                <TextInput
                                    style={styles.addTaskInput}
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={(text) => this.setState()}
                                // value={this.state.text}
                                />
                            </View>
                        </View>
                        {/* <Button style={styles.addButton}
                    // icon={
                    //     <Icon
                    //     name="trash"
                    //     size={20}
                    //     color="white"
                    //     />
                    // }
                    title="הוספת משימה  "
                ></Button> */}
                        <View style={{ marginTop: 30, alignContent: 'center' }}>
                            <Button
                                title="הוספת משימה"
                            // color="#0000ff"
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.addTask}>
                            <Text>ערב</Text>
                            <View style={styles.addTaskInputContainer}>
                                <TextInput
                                    style={styles.addTaskInput}
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={(text) => this.setState()}
                                // value={this.state.text}
                                />
                            </View>
                        </View>
                        {/* <Button style={styles.addButton}
                    // icon={
                    //     <Icon
                    //     name="trash"
                    //     size={20}
                    //     color="white"
                    //     />
                    // }
                    title="הוספה  "
                ></Button> */}
                        <View style={{ marginTop: 30, alignContent: 'center' }}>
                            <Button
                                title="הוספת משימה"
                            // color="#0000ff"
                            />
                        </View>
                    </View>

                </View>

                <View style={{ height: 60 }}></View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex:2,
        // flexGrow: 1,
        // alignItems: 'stretch',
    },
    fields: {
        flexDirection: 'row-reverse',
        // alignItems: 'stretch',
        marginTop: 10,
    },
    text: {
        flex: 3,
        textAlign: 'right',
        marginRight: 50,
        fontSize: 20,
    },
    numbers: {
        flex: 3,
        textAlign: 'left',
        marginLeft: 50,
    },

    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 50,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginTop: 20,
    },
    familiesList: {
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#767ead',
        height: 400
      },

    addTask: {
        flexDirection: 'row-reverse',
        marginTop: 10,
        // textAlign: 'center',
    },
    addTaskInput: {
        // flex:3,
        // backgroundColor:'red',
        // width:200,
        textAlign: 'right',
        marginRight: 20,
    },
    addTaskInputContainer: {
        // flex:1,
        width: 300,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6d7da',
        textAlign: 'left'
    },
    addButton: {
        margin: 20,
        backgroundColor: "black"
    }
}
);

AppRegistry.registerComponent('Settings', () => Settings);
