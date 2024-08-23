import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HandicraftScreen from '../screens/HandicraftsScreen';
import FashionScreen from '../screens/FashionScreen';
import ElectronicsScreen from '../screens/ElectronicsScreen';
import CartScreen from '../screens/CartScreen';
import WishListScreen from '../screens/WishListScreen';
import OrderScreen from '../screens/OrdersScreen';
import AccountScreen from '../screens/AccountScreen';
import WalletScreen from '../screens/WalletScreen';

import LoginWithEmail from '../auth/LoginScreen/LoginWithEmail';
import LoginWithNumber from '../auth/LoginScreen/LoginWithNumber';
import HomeScreen from '../screens/HomeScreen';
import ProductDisplayScreen from '../screens/ProductDisplayScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FashionScreen"
        component={FashionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HandicraftScreen"
        component={HandicraftScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ElectronicsScreen"
        component={ElectronicsScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name='CartScreen' component={CartScreen} options={{headerShown:false}}/> */}
      <Stack.Screen
        name="WishListScreen"
        component={WishListScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name='OrdersScreen' component={OrderScreen} options={{headerShown:false}}/> */}
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name='WalletScreen' component={WalletScreen} options={{headerShown:false}}/> */}
      <Stack.Screen
        name="LoginWithEmail"
        component={LoginWithEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginWithNumber"
        component={LoginWithNumber}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDisplayScreen"
        component={ProductDisplayScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
