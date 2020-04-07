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


export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'second',
            tasks: []
        };
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
        if (el.props.name == 'tasks1') {
            this.setState({ tasks: this.tasks1 })
        }
        else if (el.props.name == 'tasks2') {
            this.setState({ tasks: this.tasks2 })
        }
        else if (el.props.name == 'tasks3') {
            this.setState({ tasks: this.tasks3 })
        }
        else if (el.props.name == 'tasks4') {
            this.setState({ tasks: this.tasks4 })
        }
        console.log(this.state.tasks)
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
                            <Text name="tasks1">בוקר</Text>
                            <Text name="tasks2" selectedIconStyle={{ borderTopWidth: 2, borderTopColor: 'red' }}>צהריים</Text>
                            {/* <Text name="tasks2" >צהריים</Text> */}
                            <Text name="tasks3">אחר הצהריים</Text>
                            <Text name="tasks4" selectedStyle={{ color: 'green' }}>ערב</Text>
                            {/* <Text name="tasks4" >ערב</Text> */}

                        </Tabs>
                        <Text style={styles.welcome}>הוספה והסרה של משימות</Text>

                    </View>
                    <View>
                        <View style={{ height: 200, backgroundColor: 'blue' }}>
                            <Text style={styles.instructions}>
                                Selected page: {this.state.page}
                            </Text>
                            <View>
                                {this.state.tasks.map(task => {
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
                    </View>
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
