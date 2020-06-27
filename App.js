import React, { useState, useReducer } from 'react';
import { 
  StyleSheet, 
  View, 
  Button, 
  FlatList 
} from 'react-native';

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'
import Login from './components/Login'
import { fs } from "./components/firebase.js";

export default function App() {

  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setIsAddMode] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const addGoalHandler = (input) => {
    setCourseGoals(currentGoals => [...currentGoals, {id: Math.random().toString(), value: input}])
    setIsAddMode(false)
  }

  const addLoadedUsers = (input) => {
    setCourseGoals(currentGoals => [...currentGoals, {id: Math.random().toString(), value: input}])
    // setIsAddMode(false)
  }

  const deleteItem = (input) => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== input)
    })
  }

  const cancelHandler = () => {
    setIsAddMode(false)

  }

  const changeLogin = () => {
    setIsLogin(false)
    console.log("in isLogin")

  }

  const userDataRef = fs.collection("user_data");

  const loadUsers = () => {

    let tempArr = [];
    let thisUser = userDataRef
      .where("chequePickupStatus", ">=", -1)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let tempData = doc.data();
          addLoadedUsers(doc.data().firstName);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };


  return (
    <View style ={styles.screen} >
        <Button title="Add New User" onPress={() => setIsAddMode(true)}/>      
        <Button title="Load Existing Users" onPress={loadUsers}/>      
        <GoalInput  
        addGoalHandler={addGoalHandler}
        addMode = {isAddMode}
        cancelMode={cancelHandler}
        />
        <FlatList 
        keyExtractor={(item, index) => item.id}
        data={courseGoals} 
        renderItem={itemData => (<GoalItem onDelete = {() => deleteItem(itemData.item.id)} title={itemData.item.value}/>)}
        />
        <Login
          Login = {isLogin}
          changeLogin = {changeLogin}
          />      
    </View>
  );
}

const styles = StyleSheet.create({

  screen: {
    padding: 80
  }

});
