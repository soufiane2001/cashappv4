import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import {auth,db} from "../../Firebase/FirebaseConfig"
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { collection,addDoc, where, getDocs, query } from 'firebase/firestore';
import { Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ClerkProvider , SignedIn, SignedOut} from "@clerk/clerk-expo";
import SignInWithOAuth from '../../Auth/SignInWithOAuth';
import SignInWithFbOAuth from '../../Auth/SignInWithFbOAuth';

const publishableKey = "pk_test_c3VyZS1yYWJiaXQtNzcuY2xlcmsuYWNjb3VudHMuZGV2JA";






function Signin({navigation,route }) {


    
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
    const [componentWidth, setComponentWidth] = useState(0);
    const [showAlert, setshowalert] = React.useState(false);
    const [Alertmsg, setalertmsg] = React.useState("");
    const [loads, setload] = React.useState("none");
  
    








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






    


    const handleRegister = async () => {
      setload("block")
      try {
       const respone= await createUserWithEmailAndPassword(auth,email, password);
      
       if(respone){
        setload("none")
      
        setalertmsg("utilisateur créé")
        setshowalert(true)
      
      setTimeout(()=>{navigation.navigate('Setup', {id:respone.user.uid})},2000)

       }
      } catch (error) {
        setload("none")
        setshowalert(true)
        if(error.message.length>56){
        setalertmsg(error.message.substring(10,error.message.length-23))}
        else{
           setalertmsg(error.message.substring(22,error.message.length-2))}
       
      }
    };






    const UseAuthExample=()=> {
      const { isLoaded, userId, sessionId, getToken ,signOut} = useAuth();
      const {user} = useUser();
     useEffect(async()=>{

           signOut()
  //         console.log(userId)
//await AsyncStorage.setItem("userid",userId);

        
const docRef = await query(collection(db, "users"),where("id","==",userId));
const querySnapshot=await getDocs(docRef)

//console.log(userId)
var count=0;
querySnapshot.forEach((doc) => {
  const itemData = doc.data();
  count++;
})
if(count>0){ 
   await AsyncStorage.setItem("userid",userId);
  navigation.navigate('Home')

}
else{
  setTimeout(()=>{navigation.navigate('Setup', {id:userId})},200)

}


//navigation.navigate('Home')
         
     },[])
      // In case the user signs out while on the page.
      if (!isLoaded || !userId) {
        return null;
      }
     
     
    }





    const SignOut = () => {
      const { isLoaded,signOut } = useAuth();
      if (!isLoaded) {
        return null;
      }
      return (
        <View>
          <Button
            title="Sign Out"
            onPress={() => {
              signOut();
            }}
          />
        </View>
      );
    };



  return (
    <>
      <SignedIn>
      
        <UseAuthExample/>
       
      </SignedIn>

      <SignedOut>
         <View  onLayout={onLayout} style={{backgroundColor:'white',flex:1,display:'flex',justifyContent:'center',paddingHorizontal:"5%",paddingVertical:'7%'}}>


                 <View style={{display:loads,backgroundColor:'black',opacity:0.65,position:'absolute',zIndex:1111,top:"0%",left:'0%',width:'115%',height:"110%"}}>
                        
                        
                        <View style={{display:'flex',justifyContent:'center',height:'100%'}}>
  
                               <ActivityIndicator size="large" color="#007AFF" />


                        </View>


                  </View>





                <AwesomeAlert
                     show={showAlert}
                     showProgress={false}
                     title="Alert"
                     message={Alertmsg}
                     closeOnTouchOutside={true}
                     closeOnHardwareBackPress={false}
                     showConfirmButton={true}
                     cancelText="No, cancel"
                     confirmText="ok"
                     confirmButtonColor="#DD6B55"
                     onConfirmPressed={() =>{setshowalert(false)}}
                 
                 />







<Image source={require('../../assets/expensia.png')} style={{width:getResponsiveFontSize(100),height:getResponsiveFontSize(30),marginLeft:'65%',resizeMode:'stretch'}} />
                
                <Text style={{fontSize:getResponsiveFontSize(26),fontFamily:'PoppinsSemiBold',marginTop:'5%'}}>Créer un compte</Text>



                <View style={{display:'flex',flexDirection:'row',marginTop:"-2%"}}>

                 <Text style={{marginTop:'1.25%',fontSize:getResponsiveFontSize(13.5),fontFamily:'PoppinsRegular'}}>Déjà, tu as un compte ? </Text>



                <TouchableOpacity style={{marginTop:'1.4%'}} onPress={()=>{navigation.navigate('Login')}} >

                   <Text style={{color:"#0948FC",marginLeft:'1%',fontFamily:'PoppinsRegular'}}>se connecter</Text>

                </TouchableOpacity>




              </View>





            






<SignInWithFbOAuth  size={getResponsiveFontSize(14)} />
<SignInWithOAuth  size={getResponsiveFontSize(14)} />




               <Text style={{fontSize:getResponsiveFontSize(15),textAlign:'center',color:'#B6B3B3',fontFamily:'PoppinsLight',marginTop:'11%'}}>Vous pouvez enregistrer via e-mail</Text>

 


              <TextInput 
                 onChangeText={setEmail}
                 value={email}
                 style={{width:'100%',padding:"0%", borderColor:'#F0F0F0',paddingVertical:'2.75%',paddingLeft:'5%',borderRadius:15,marginTop:'10%',backgroundColor:'#F3F3FC',fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'black',}}
                 placeholder="Email"
                 placeholderTextColor="#BCBCBC" 
              
              
              />



              <TextInput 

                onChangeText={setPassword}
                value={password}
                
                style={{width:'100%',padding:"0%", borderColor:'#F0F0F0',paddingVertical:'2.75%',paddingLeft:'5%',borderRadius:15,marginTop:'3%',backgroundColor:'#F3F3FC',fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'black',}}
                secureTextEntry
                placeholder="Mot de pass"
                placeholderTextColor="#BCBCBC" 
                
                
                />



               <TouchableOpacity onPress={()=>{handleRegister()} } style={{marginTop:'7%',backgroundColor:'#4A83FE',paddingHorizontal:'2%',paddingVertical:'3%',borderRadius:15}}>
                        <Text style={{fontSize:getResponsiveFontSize(17),textAlign:'center',color:'white',fontFamily:'PoppinsRegular'}}>Créer</Text>
               </TouchableOpacity>







              </View></SignedOut>

              </>
)
}

export default Signin