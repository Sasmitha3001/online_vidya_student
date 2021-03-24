import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import MyHeader from '../Components/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native';

export default class ScheduledClasses extends Component {
  constructor(){
    super()
    this.state={
      allClasses:[],
      email:firebase.auth().currentUser.email,
      firstName:''
    }
  }

  getFirstName=()=>{
    db.collection('users').where('email','==',this.state.email)
    .get((snapshot)=>{snapshot.forEach(doc=>{var document=doc.data
      this.setState({firstName:document.firstName})})})
  }

  getAllClasses=()=>{
    var allClasses=[]
    db.collection('classes').where('student_name','==',this.state.firstName).onSnapshot(snapshot=>{
      snapshot.docs.map(doc=>{var document=doc.data();
        console.log(document)
      allClasses.push(document)
      this.setState({
        allClasses:allClasses
      })})
    })
    
  }

  keyExtractor=(index,item)=>{index.toString()}

  renderItem=({item,i})=>{
    return(
      <View>
      <ListItem
      key={i}
      title={item.student_name}
      subtitle={item.class_date}
      titleStyle={{fontWeight:'bold',color:'black'}}
      rightElement={
        <TouchableOpacity
        style={{width:150,height:40,color:'orange'}}
        onPress={()=>{this.props.navigation.navigate('ClassDetails')}}
        >
          <Text>View</Text>
        </TouchableOpacity>
      }
      />
        <Text style={{fontWeight:'bold',color:'black'}}>{item.student_name}</Text>
        <Text>{item.class_date}</Text>

        <View style={{flexDirection:"row"}}>
        <TouchableOpacity
        style={{width:90,height:20,backgroundColor:'orange',alignSelf:'flex-end'}}
        onPress={()=>{this.props.navigation.navigate('ClassDetails',{details:item})}}
        >
          <Text style={{alignSelf:'center',color:'white',fontWeight:'bold'}}>View</Text>
        </TouchableOpacity>
        </View>
        <View style={{borderBottomColor:'black',borderBottomWidth:1}}></View>
       
      </View>
     
    )
  }

  componentDidMount(){
    this.getFirstName()
    this.getAllClasses()
    console.log(this.state.allClasses)
  }

  render(){
    return (
    this.state.allClasses.length===0?(
      <SafeAreaProvider>
    <View>
      <MyHeader title={"Scheduled Classes"}/>
      <Text style={styles.text}>List of all scheduled classes</Text>

      
    </View>
    </SafeAreaProvider>
    )
    :(
      <SafeAreaProvider>
    <View>
      <ScrollView>
      <MyHeader title={"Scheduled Classes"}/>
      <FlatList
      keyExtractor={this.keyExtractor}
      data={this.state.allClasses}
      renderItem={this.renderItem}
      /> 
      {console.log(this.state.allClasses)}
      
      
      </ScrollView>
    </View>
    </SafeAreaProvider>
    )
    
      )
  }
 
  
  

  
}

const styles=StyleSheet.create({
  container:{
    flex:1,
   justifyContent:'center'
  },
  button:{
    backgroundColor:'#3c1361',
    borderRadius:100,
    width:50,
    height:50,
    alignSelf:'flex-end',
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:8
    },
    shadowOpacity:0.30,
    shadowRadius:10.32,
    elevation:16,
    padding:10
  },
  buttonText:{
    color:'white',
    alignSelf:'center',
    fontSize:25,
    textAlign:'center',
    paddingBottom:30
  },
  text:{
    alignSelf:'center',
    fontSize:25,
    fontWeight:'bold',
    marginTop:150,
    color:'grey'
  }
})

