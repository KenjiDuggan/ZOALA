import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddTodo from './containers/AddTodo';
import VisibleTodos from './containers/VisibleTodos'
import * as Font from 'expo-font';

class Todoapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  state = {
      todos: [], 
      visibilityFilter: 'SHOW_ALL_TODOS', 
  }

  render() {
    return (
      <View customStyles={styles.container}>
        <AddTodo/>
        <View>
          <VisibleTodos/> 
        </View>

      </View>

    );
  }
}

export default Todoapp;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
});
