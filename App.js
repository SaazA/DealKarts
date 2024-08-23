/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */



import React from 'react';
import 'react-native-gesture-handler';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store, { persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import RootNav from './src/navigation/RootNav';





const App = () => {
  return (
   <Provider store = {store}>
    <PersistGate persistor = {persistor}>
      <RootNav/>
    </PersistGate>
   </Provider>
  )
}



const styles = StyleSheet.create({
  
});

export default App;
