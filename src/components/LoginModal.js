import { Dimensions, Modal, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../constants/colors'
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import routes from '../constants/routes';

export default function LoginModal({ visible, closeModal}) {
    const navigation = useNavigation();
    // useEffect(() => {
    //     if (navigation.isFocused() && navigation.isFocused(routes.LOGINEMAIL)) {
    //       closeModal();
    //     }
    //     if (navigation.isFocused() && navigation.isFocused(routes.LOGINPHONE)) {
    //       closeModal();
    //     }
    //   }, [navigation]);


    const handleLoginEmail = () => {
        navigation.navigate(routes.LOGINEMAIL);
        closeModal();
    };
    const handleLoginNumber = () => {
        navigation.navigate(routes.LOGINPHONE);
        closeModal();
    };
  return (
   <Modal visible={visible} transparent  animationType="slide">
    <View style={styles.modalView}>
        <View style={styles.mainView}>
           
            <View style={styles.buttoncontainer}>

            <TouchableOpacity style={styles.logincontainer} onPress={handleLoginEmail}><Text style={styles.logincontainertext}>Login</Text></TouchableOpacity>
            <TouchableOpacity style={styles.logincontainer} onPress={handleLoginNumber}><Text style={styles.logincontainertext}>Login With Phone</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.crosscontainer}  onPress={closeModal}>
            <Octicons 
             name='x-circle-fill'
             size={35}
             color={colors.graylight}
            />
            </TouchableOpacity>
        </View>

    </View>
   </Modal>
  )
}

const styles = StyleSheet.create({
    modalView:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
      
    },

    crosscontainer:{
        position: 'absolute',
        bottom: -40, // Adjust as needed to position the icon correctly
        left: 130, 
    },
    mainView:{
        backgroundColor:colors.grayshade,
        height:145,
        width:300,
        position: 'relative',
        borderRadius:10
    },
   
    buttoncontainer:{
        top:6,
        margin:10,
        gap:15,
    },
    logincontainer:{
        height:50,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.Yellow
    },
    logincontainertext:{
        fontSize:16,
        fontWeight:'bold',
        color:colors.Black
    }

})