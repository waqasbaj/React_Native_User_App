import React, { useState, useReducer } from 'react'
import {View, Text, StyleSheet, TextInput, Button, Modal, ImageBackground, Image} from 'react-native'
import logo from './NewUser.png'; 


const GoalInput = props => {

    const [enteredGoal, setEnteredGoal] = useState('');

    function goalInputHandler(enteredText){
        setEnteredGoal(enteredText)
    }

    const addHandler = () => {
        props.addGoalHandler(enteredGoal)
        setEnteredGoal('')
    }

    return (
        <Modal visible={props.addMode} animationType="slide">
            <View style={styles.inputContainer}>
                <Image source={logo} style={{width: 400,height:300, resizeMode: "contain"}}/> 
                <TextInput 
                placeholder= "Add New User" 
                style={styles.textInput}
                onChangeText={goalInputHandler}
                value = {enteredGoal}/>
                <View style={styles.inputButtons}>
                    <Button title="ADD" onPress = {addHandler}/>
                    <Button title="Cancel" color="red" onPress = {() => props.cancelMode()}/>
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

export default GoalInput