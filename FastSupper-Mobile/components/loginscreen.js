// loginscreen.js
import React, { Component, useCallback, useState, useEffect, useDebugValue } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';



export default function LoginScreen({ navigation }) 
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[isPasswordVisible, setIsPasswordVisible] = useState(false);
  const[error, setError] = useState("");
  const[refresh,setRefresh] = useState(false);


  const handleLogin = () => {
      axios.post('https://fastsupper.herokuapp.com/api/login', {
      email: email,
      password: password,
    })
    .then(function (response) {
      let email = response.data.email;
      let token = response.data.token;
      //console.log(email + token);
      navigation.navigate("Home",{email:email,token:token,});      
    })
    .catch(function (error) {
      console.log(error);
      setError(error.response.data);
    });

  };
  const togglePasswordVisibility = () =>{
    setIsPasswordVisible(!isPasswordVisible);
    };

  // const fresh = React.useCallback(() =>{
  //   setRefresh(true);
  //   setError("");
  //   setEmail("");
  //   setPassword("");

  //   setTimeout(()=>{
  //     setRefresh(false);
  //   }, 2000);
  // },[]);
    

  return (

    
    <View style={styles.container}>

      {/* <ScrollView contentContainerStyle={styles.scrollView}
       refreshControl={
        <RefreshControl>
          refreshing={false}
          onRefresh={() => fresh()}
        </RefreshControl>
      }>   </ScrollView>*/}

      <Image style={styles.image} source={require('../assets/fastSupperLogo.png')}/>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email:"
          placeholderTextColor="#000000"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password:"
          placeholderTextColor="#000000"
          secureTextEntry={!isPasswordVisible}
          onChangeText={(password) => setPassword(password)}
        /> 
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text  style={styles.toggleButton}> {isPasswordVisible ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View> 

      <Text style={styles.error}>{error}</Text>
      
      
      <TouchableOpacity>
        <Text style={styles.footerText}>Don't have an account? <Text onPress={() => navigation.navigate("SignUp")} style={styles.footerLink}>Sign up</Text></Text>
      </TouchableOpacity> 
      <TouchableOpacity>
        <Text onPress={() => navigation.navigate("Forgot")}>Forgot Password?</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 
     
    </View> 
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    height: 170,
    width: 170,
  },
  inputView: {
    backgroundColor: "#F0EEED",
    borderRadius: 45,
    width: "70%",
    height: 60,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#408E91",
  },
  error :{
    color: '#FF0000',
  },
  toggleButton:{
    color: '#007AFF',
    marginLeft: 10,
  }
});