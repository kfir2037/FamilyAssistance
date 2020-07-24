import React from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { createStackNavigator } from "react-navigation-stack";
import addSocialWorker from "../../screens/adminScreens/addSocialWorker";
import firebase from '../../config/config';
import editFamilies from '../../screens/adminScreens/editFamilies';
import adminReports from "../../screens/adminScreens/adminReports";

const adminStackNavigator = createStackNavigator(
  {
    Reports:adminReports
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
