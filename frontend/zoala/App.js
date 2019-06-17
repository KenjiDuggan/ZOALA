/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Todoapp from '../zoala/android/app/src/Todoapp'; 
import store from './android/app/src/store';
import {Provider} from 'react-redux'; 

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'What tap R on your keyboard to reload,\n' +
    'ANDROID!!!',
});


export default class App extends Component {
  render() {
    return (
    <Provider store={store}>
     {this.instructions} 
     <Todoapp />
    </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
