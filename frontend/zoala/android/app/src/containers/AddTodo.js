import React, { Component } from 'react';
import {  
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';  
import * as Font from 'expo-font';



class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        text: ''
    };
  }
  addTodo = (text) => {
    //redux store
    this.props.dispatch({type: 'ADD_TODO', text})
    this.setState({text: ''}); 
  }

  render() {
    return (
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <TextInput 
        onChangeText={(text)=>this.setState({text})}
        value={this.state.text}
        placeholder="eg. clean up your room"
        style={{ borderWidth: 1, borderColor: '#f2f2e1', 
    backgroundColor: '#eaeaea', height: 50, flex: 1, padding: 5}}
        > textInComponent </TextInput>
        <TouchableOpacity onPress={()=>this.addTodo(this.state.text)}>
            <View style={{height: 50, backgroundColor: '#eaeaea', alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons name="md-add" size={30} style={{color: '#de9595', padding: 10}}/>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}


export default connect()(AddTodo);

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
});
