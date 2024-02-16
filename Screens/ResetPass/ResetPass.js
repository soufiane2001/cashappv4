import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity} from 'react-native';
import {auth,db} from "../../Firebase/FirebaseConfig"
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { collection,addDoc, where, getDocs, query } from 'firebase/firestore';
import * as WebBrowser from "expo-web-browser";
import AwesomeAlert from 'react-native-awesome-alerts';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../Style/globalStyles'
import { ClerkProvider, SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import SignInWithFbOAuth from '../../Auth/SignInWithFbOAuth';
import SignInWithOAuth from '../../Auth/SignInWithOAuth';
import { Alert } from 'react-native';











WebBrowser.maybeCompleteAuthSession();

function ResetPass({navigation }) {


  





const [email, setEmail] = React.useState('');
const [componentWidth, setComponentWidth] = useState(0);



const getResponsiveFontSize = (size) => {
  const standardScreenWidth = 375; 
  const scaleFactor = componentWidth / standardScreenWidth;
  const newSize = size * scaleFactor;
  return newSize;
};







const onLayout = event => {
    const { width } = event.nativeEvent.layout;
    setComponentWidth(width);
  };






  const resetpass = async () => {
    try {
      const response=await sendPasswordResetEmail(auth,"sboutatss@gmail.com");
   Alert.alert("Vous avez recu un email")
   navigation.navigate('Login')
    }
    catch (error) {
      setalertmsg(error.message.substring(2,error.message.length-2))
      setshowalert(true)
     ;setload("none")
    }
  }




  
  























return (


<>
 
 


 <View style={{flex:1}}>
   <View  onLayout={onLayout} style={{backgroundColor:'white',flex:1,display:'flex',justifyContent:'center',paddingHorizontal:"5%",paddingVertical:'7%'}}>
     
 

  
  <TextInput 
     onChangeText={setEmail}
     value={email}
     style={{width:'100%',padding:"0%", borderColor:'#F0F0F0',paddingVertical:'2.95%',paddingLeft:'5%',borderRadius:15,marginTop:'10%',backgroundColor:'#F3F3FC',fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'black',}}
     placeholder="Email"
     placeholderTextColor="#BCBCBC"
/>







 
 <TouchableOpacity onPress={()=>{resetpass()} } style={{marginTop:'4%',backgroundColor:'#4A83FE',paddingHorizontal:'2.5%',paddingVertical:'2%',borderRadius:15}}>
      <Text style={{fontSize:getResponsiveFontSize(16),textAlign:'center',color:'white',fontFamily:'PoppinsRegular'}}>Envoyer</Text>
 </TouchableOpacity>




</View>
</View>

</>

)
}

export default ResetPass