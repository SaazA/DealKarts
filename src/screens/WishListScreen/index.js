import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginModal from '../../components/LoginModal';

const WishListScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [token, setToken] = useState("AAA");
  
    const openModal = () => {
      setIsModalVisible(true);
  };
  
  const closeModal = () => {
      setIsModalVisible(false);
  };
  
  useEffect(()=>{
    if(!token){
      openModal()
    }
  },[token])
    return (
      <View>
      {!token ? (
          <LoginModal visible={isModalVisible} closeModal={() => setIsModalVisible(false)} />
      ) : (
          <Text>WishListScreen</Text>
      )}
  </View>
    )
}

export default WishListScreen

const styles = StyleSheet.create({})