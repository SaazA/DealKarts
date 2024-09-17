import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/CartScreen';
import WalletScreen from '../screens/WalletScreen';
import OrderScreen from '../screens/OrdersScreen';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AppStack from './AppStack';
import colors from '../constants/colors';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarOptions,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={AppStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome6
              name="house"
              size={size}
              color={colors.Yellow}
              style={{marginTop: 4}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="person"
              size={32}
              color={colors.Blue}
              style={{marginTop: 3}}
            />
          ),
          tabBarLabel: 'You',
        }}
      />
      <Tab.Screen
        name="WalletSceen"
        component={WalletScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: '#E9B9B4',
                height: 60,
                width: 60,
                alignItems: 'center',
                borderRadius: 30,
                marginBottom: 20,
                justifyContent: 'center',
              }}>
              <FontAwesome5
                name="search"
                size={30}
                color={colors.Green}
                style={{marginTop: 1}} // Add margin to icon
              />
            </View>
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome6
              name="cart-shopping"
              size={size}
              color={colors.Red}
              style={{marginTop: 4}} // Add margin to icon
            />
          ),
          tabBarLabel: 'Cart',
        }}
      />
      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5
              name="box"
              size={size}
              color={colors.Green}
              style={{marginTop: 4}} // Add margin to icon
            />
          ),
          tabBarLabel: 'Orders',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    marginBottom: 5,
    color: colors.Black,
    fontSize: 11,
  },
  tabBarOptions: {
    // position:'absolute',
    // width:'90%',
    // bottom:5,
    // left:'5%',
    // borderRadius:20,
    height: 50,
    backgroundColor: colors.White,
  },
});
export default BottomTabNavigator;
