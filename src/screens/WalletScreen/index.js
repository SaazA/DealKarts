import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginModal from '../../components/LoginModal';

const WalletScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [token, setToken] = useState(null);
  
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
         <Text>FashionScreen</Text>
      {!token ? (
          <LoginModal visible={isModalVisible} closeModal={() => setIsModalVisible(false)} />
      ) : (
          <Text>FashionScreen</Text>
      )}
  </View>
    )
}

export default WalletScreen

const styles = StyleSheet.create({})