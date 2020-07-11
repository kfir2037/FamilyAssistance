import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import addSocialWorker from "../../screens/adminScreens/addSocialWorker";
import firebase from '../../config/config';
import editFamilies from '../../screens/adminScreens/editFamilies';

const adminStackNavigator = createStackNavigator(
  {
    Tasks: addSocialWorker,
    editFamilies:editFamilies,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: (
          <Icon style={{ padding: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
            color='white' />
        ),
        headerTintColor:'white',
        headerStyle: {
          backgroundColor: '#e0aa00'
        }
      };
    },
  }
);

export default adminStackNavigator;
