import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import db from '../config'


export default class ClassDetails extends Component {
  constructor(props){
    super(props)
    this.state={
      details:this.props.navigation.getParam('details'),
      student_name:this.props.navigation.getParam('details')['student_name'],
      class_time:this.props.navigation.getParam('details')['class_time'],
      // date:this.props.navigation.getParam('deatils')['class_date'],
      meet_link:this.props.navigation.getParam('details')['meet_link']
    }
    
  }

  enterMeeting=()=>{
    <WebView
    sourc={this.state.meet_link}
    />
  }
  
  render(){
    console.log(this.state.details)
    return (
      <View>
        <Card>
        <Text>Class Details</Text>

        <Card>
        <Text>Student Name: {this.state.student_name}</Text>
        </Card>

        <Card>
        <Text>Class Time: {this.state.class_time}</Text>
        </Card>

        {/* <Card>
        <Text>Class Date: {this.state.date}</Text>
        </Card> */}

        <TouchableOpacity
        style={styles.button}
        onPress={()=>{this.enterMeeting()}}
        >
          <Text style={styles.buttonText}>Join Class</Text>
        </TouchableOpacity>
        </Card>
      </View>
    )
  }
  
}

const styles=StyleSheet.create({
  button:{
    alignSelf:'center',
    marginTop:15,
    width:150,
    height:40,
    borderRadius:35,
    backgroundColor:'red'
  },
  buttonText:{
    alignSelf:'center',
    fontSize:15,
    color:'white',
    fontWeight:'bold',
    marginTop:5
  }
})

