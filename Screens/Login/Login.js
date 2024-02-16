import React, { useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity,Animated, Easing} from 'react-native';
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


import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';







WebBrowser.maybeCompleteAuthSession();

function Login({navigation }) {


  





const [componentWidth, setComponentWidth] = useState(0);
const [showAlert, setshowalert] = React.useState(false);
const [Alertmsg, setalertmsg] = React.useState("");
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [loads, setload] = React.useState("none");



const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);




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
      console.log(response)
    }
    catch (error) {
      setalertmsg(error.message.substring(2,error.message.length-2))
      setshowalert(true)
     ;setload("none")
    }
  }




const handleLogin = async () => {
  setload("block")
 
  try {
    const response=await signInWithEmailAndPassword(auth,email, password);

    setalertmsg("user loged")
    setload("none")
   
    await AsyncStorage.setItem("userid",response.user.uid);
    navigation.navigate('Home')

  } 
  
  


  catch (error) {
    setalertmsg(error.message.substring(2,error.message.length-2))
    setshowalert(true)
   ;setload("none")
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


const data = [
  { month: 'Jan', value: 20 },
  { month: 'Feb', value: 45 },
  { month: 'Mar', value: 28 },
  { month: 'Apr', value: 80 },
  { month: 'May', value: 99 },
  { month: 'Jun', value: 43 },
];

const Gradient = () => (
  <Defs key={'gradient'}>
    <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
      <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
      <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
    </LinearGradient>
  </Defs>
);


const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);







return (


<>
 
 <SignedIn>
      
        <UseAuthExample/>
       
      </SignedIn>

      <SignedOut>

 <View style={{flex:1}}>
   <View  onLayout={onLayout} style={{position:'relative',zIndex:854544,backgroundColor:'white',flex:1,display:'flex',justifyContent:'center',paddingHorizontal:"5%",paddingVertical:'2%'}}>
     
   

















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
     
      onConfirmPressed={() => {
        setshowalert(false)
      }}
    />




   <Image source={require('../../assets/expensia.png')} style={{width:getResponsiveFontSize(100),height:getResponsiveFontSize(30),marginLeft:'65%',resizeMode:'stretch'}} />
   <Text style={{fontSize:getResponsiveFontSize(20),fontFamily:globalStyles.b.fontFamily,marginTop:'5%'}}>Connectez-vous à votre compte</Text>
  
   
   <View style={{display:'flex',flexDirection:'row',marginTop:"-1.5%",alignItems:'center'}}>
    
    <Text style={{marginTop:'1.25%',fontSize:getResponsiveFontSize(13.5),fontFamily:globalStyles.r.fontFamily}}>Tu n'en as pas ? 
  
  </Text>




  <TouchableOpacity style={{marginTop:'1.8%'}} onPress={()=>{navigation.navigate('Registre')}}>
    <Text style={{color:"#0948FC",marginLeft:'5%',fontFamily:globalStyles.r.fontFamily}}>
    Créer un
  </Text>
  </TouchableOpacity>
 
 
 
  </View>








  <SignInWithFbOAuth  size={getResponsiveFontSize(14)} />
<SignInWithOAuth  size={getResponsiveFontSize(14)} />












  
  <Text style={{fontSize:getResponsiveFontSize(15),textAlign:'center',color:'#B6B3B3',fontFamily:globalStyles.r.fontFamily,marginTop:'11%'}}>Ou Connectez-vous avec email</Text>


  
  <TextInput 
     onChangeText={setEmail}
     value={email}
     style={{width:'100%',padding:"0%", borderColor:'#F0F0F0',paddingVertical:'2.95%',paddingLeft:'5%',borderRadius:15,marginTop:'10%',backgroundColor:'#F3F3FC',fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'black',}}
     placeholder="Email"
     placeholderTextColor="#BCBCBC"
/>




  <TextInput 
   onChangeText={setPassword}
   value={password}
   style={{width:'100%',padding:"0%", borderColor:'#F0F0F0',paddingVertical:'2.95%',paddingLeft:'5%',borderRadius:15,marginTop:'3%',backgroundColor:'#F3F3FC',fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'black',}}
   secureTextEntry      
  placeholder="Mot de pass"
  placeholderTextColor="#BCBCBC" 
   />




<TouchableOpacity style={{marginTop:'2%'}} onPress={()=>{navigation.navigate("ResetPass")}}>
  <Text style={{fontSize:getResponsiveFontSize(13),textAlign:'right',color:'gray',fontFamily:'PoppinsRegular'}}>mot de passe oublié ?</Text>
</TouchableOpacity>

 
 <TouchableOpacity onPress={()=>{handleLogin()} } style={{marginTop:'4%',backgroundColor:'#4A83FE',paddingHorizontal:'2.5%',paddingVertical:'2%',borderRadius:15}}>
      <Text style={{fontSize:getResponsiveFontSize(16),textAlign:'center',color:'white',fontFamily:'PoppinsRegular'}}>Connectez</Text>
 </TouchableOpacity>




</View>
</View>
</SignedOut>
</>

)
}

export default Login