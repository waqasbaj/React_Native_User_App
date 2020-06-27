import React, { useState, useReducer } from 'react'
import {View, Text, StyleSheet, TextInput, Button, Modal, ImageBackground, Image} from 'react-native'
import logo from './ToDo.png'; 
import { db } from "./firebase.js";
import { auth } from "./firebase.js";
import firebase from "firebase/app";


const Login = props => {

    const [enteredUser, setEnteredUser] = useState('');
    const [enteredPass, setEnteredPass] = useState('');
    const [modalLogin, setModalLogin] = useState('true');

    function userHandler(enteredText){
        setEnteredUser(enteredText)
    }

    function passHandler(enteredText){
      setEnteredPass(enteredText)
    }

    const loginHandler = () => { 
      buttonClick(enteredUser, enteredPass) 
      setEnteredUser("")
      setEnteredPass("")
    }

    const buttonClick = (enteredUser, enteredPass) => {
      auth.signInWithEmailAndPassword(enteredUser, enteredPass)
      .then(input => {
        auth.onAuthStateChanged(user => {    
          if (user) {
              console.log("Login Successful")
              props.changeLogin()
          }
        });
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;     
        console.log(errorCode, errorMessage)
      });   
     
    }

  return (
      <Modal visible={props.Login} animationType="slide">
          <View style={styles.inputContainer}>
              <Image source={logo} style={{width: 400,height:300, resizeMode: "contain"}}/> 
              <TextInput 
              placeholder= "UserName" 
              style={styles.textInput}
              onChangeText={userHandler}
              value = {enteredUser}
              />
              <TextInput 
              placeholder= "Password" 
              secureTextEntry = {true}
              style={styles.textInput}
              onChangeText={passHandler}
              value = {enteredPass}
              />
              <View style={styles.inputButtons}>
                  <Button title="Login" onPress = {loginHandler}/>
              </View>
          </View>
      </Modal>
      )

}

const styles = StyleSheet.create({
  textInput: {
    width: '80%', 
    borderBottomColor: 'black', 
    borderWidth: 1, 
    padding: 10, 
    margin: 10

  },
  inputContainer:{ 
    flex:1,
    justifyContent: "flex-start", 
    alignItems: "center",
    marginTop: 100

  },
  inputButtons:{ 
    flexDirection: "row",
    width : "60%",
    justifyContent: "space-evenly", 
  }
})

export default Login