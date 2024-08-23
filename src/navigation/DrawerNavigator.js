import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomDrawer from '../components/CustomDrawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octions from 'react-native-vector-icons/Octicons';

import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();




const DrawerNavigator = () => {
  const navigation = useNavigation()
  return (
  <Drawer.Navigator drawerContent={props=><CustomDrawer {...props}/> } 
  
  screenOptions={{
    drawerActiveBackgroundColor:colors.White,
  // Align header title to center
    headerTitleStyle: {
      fontWeight: 'bold', // Customize header title style
    },
    headerRight: () => (
      <View style={{ flexDirection: 'row', marginRight:10, width:180, justifyContent:'space-between' }}>
      <View >
        <Image source={require('../assests/Logo.png')} style={{ width: 40, height: 40 }} // Adjust the width and height of the logo as needed
          resizeMode="contain" />
      </View>
      <View style={{ flexDirection: 'row' , alignItems:'center',gap:30}}>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('WishListScreen')
        }}>
        <Octions name="heart-fill" color={colors.Black} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('CartScreen')
        }}>
        <FontAwesome5
          name="shopping-bag" 
          size={24} 
          color={colors.Red} 
          style={{ marginRight: 10 }} 
        />
         </TouchableOpacity>
         </View>
      </View>
    ),
    
  }}
   
  >
       <Drawer.Screen
        name="HomeDrawer"
        component={BottomTabNavigator}
        options={{
          title:"DealKarts",
          headerShown: true,
        }}
      />
  </Drawer.Navigator>



  )
}



export default DrawerNavigator

const styles = StyleSheet.create({})


