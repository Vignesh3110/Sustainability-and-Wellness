import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Add_Data from "./Add_Data";
import Saved_Data from "./Saved_Data";
import Health from "./Health";
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator

screenOptions={({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Health') {
      iconName = focused
        ? 'heart-sharp'
        : 'heart-sharp';
    } 
    
    else if (route.name === 'Add Data') {
      iconName = focused ? 'ios-bookmarks-sharp' : 'ios-bookmarks-sharp';
    }

    else if (route.name === 'Saved Data') {
      iconName = focused ? 'clipboard-sharp' : 'clipboard-sharp';
    }
    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
})}      
      tabBarOptions={{        
        activeTintColor: '#02a3d4',
        inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name="Health" component={Health} />
        <Tab.Screen name="Add Data" component={Add_Data} />
        <Tab.Screen name="Saved Data" component={Saved_Data} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}