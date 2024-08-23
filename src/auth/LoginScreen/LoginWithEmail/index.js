import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../constants/colors';
import { LoginApi } from '../../../apis/apicalls';
import { useDispatch } from 'react-redux';
import { LoginAction, UserInfoSaveAction } from '../../../redux/actions';

const LoginWithEmail = () => {
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  
  const dispatch = useDispatch()

  const Login = () => {
      LoginApi(email,password)
        .then(response => {
          console.log('Login Data' + JSON.stringify(response.data));
          console.log(response.headers['authorization'])
          const token = response.headers['authorization'];
          dispatch(LoginAction(token));
          dispatch(UserInfoSaveAction(response.data.data))
        })
        .catch(error => {
          console.log(error);
        });
    } 


  return (
    <ScrollView style={styles.maincontainer}>

    <View style={styles.imagecontainer}>
     
    </View>
    <View style={styles.contentcontainer}>
      <Text style={styles.centerheadtext}>Sign In</Text>
      <TextInput
        style={styles.inputbox}
        placeholder="Enter your email"
        onChangeText={(text) => setEmail(text)}/>
      <TextInput
        style={styles.inputbox}
        placeholder="Enter your Password"
        onChangeText={(text) => setPassword(text)} 
        />
      <TouchableOpacity style={styles.buttonbox} onPress={Login}>
        <Text style={styles.buttontext}>Login With Password</Text>
      </TouchableOpacity>
      <Text style={styles.midtext}>OR</Text>
      <TouchableOpacity style={styles.buttonbox}>
        <Text style={styles.buttontext}>Login With OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.lefttextbox}>
        <Text style={styles.text}>New User? SignUp</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  )
}

export default LoginWithEmail

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.Yellow,
  },
  imagecontainer: {
    flex: 0.5,
  },
  contentcontainer: {
    flex: 0.5,
    margin:10,
    borderRadius:20,
    
  },
  
  centerheadtext: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.Black,
  },
  inputbox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:colors.Black,
  },
  buttonbox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Green,
  },
  buttontext: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  lefttextbox: {
    height: 40,
    marginLeft: 15
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  midtext: {
    textAlign: 'center'
  }
  ,
  signuptext: {
    marginLeft: 40,
  }

});