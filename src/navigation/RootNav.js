import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './DrawerNavigator'

const RootNav = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  )
}

export default RootNav

const styles = StyleSheet.create({})