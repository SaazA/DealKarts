import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ElectronicsScreen = () => {
  return (
    <View style={styles.maincontainer}>
      <Text>ElectronicsScreen</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  maincontainer:{
    flex:1,
    backgroundColor:'#C5DAE8'
  }
})
export default ElectronicsScreen