import React, { useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ToastProvider } from 'react-native-toast-message';
import { FontAwesome5 } from '@expo/vector-icons';
import {auth,db} from "../../Firebase/FirebaseConfig"
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import { collection,addDoc, where, getDocs, query, updateDoc } from 'firebase/firestore';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import ModalSelector from 'react-native-modal-selector';
import Modal from 'react-native-modal';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Barometre from '../Barometre/Barometre';
import Depenses from '../Depenses/Depenses';
import Budgets from '../Budgets/Budgets';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";


function Wallet({navigation,route }) {


    const [componentWidth, setComponentWidth] = React.useState(0);
    const [payments, setPay] = React.useState([]);
    const [user, setuser] = React.useState({nom:'',prenom:''});
    const onLayout = event => {
        const { width } = event.nativeEvent.layout;
        setComponentWidth(width);
      };
     
      const getResponsiveFontSize = (size) => {
        const standardScreenWidth = 375; 
        const scaleFactor = componentWidth / standardScreenWidth;
        const newSize = size * scaleFactor;
        return newSize;
      };
      



      const fetchItemsFromFirebase =async () => {
       
                setload('block')
        const values = await AsyncStorage.getItem('userid');
          
          const docRef = await query(collection(db, "users"),where("id","==",values));
          const querySnapshot=await getDocs(docRef)
          let todos=[]
          querySnapshot.forEach((doc) => {
             
                const itemData = doc.data();
               setPay(itemData.payments)
                setuser({nom:itemData.nom,prenom:itemData.prenom})
              
              
               setload('none')
              })

        }
  
  
      useFocusEffect(
        React.useCallback(() => {
      
          fetchItemsFromFirebase()     
        
        }, [])
      );

      const [loads, setload] = React.useState("none");


return(
    <View onLayout={onLayout} style={{flex:1}}>
    <View style={{display:loads,backgroundColor:'black',opacity:0.65,position:'absolute',zIndex:1111,top:"0%",left:'0%',width:'100%',height:"100%"}}>
<View style={{
display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:"100%"
}}>
  
  <ActivityIndicator size="large" color="#007AFF" />

</View>
</View>     


 <LinearGradient  style={{backgroundColor:'white',paddingHorizontal:"2%",height:'100%',paddingVertical:"1%",display:'flex'}}
      colors={['#528f76', '#5EC309', '#5CCA00']}
    
    >


       <View style={{paddingHorizontal:'3%',paddingVertical:"4%",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <TouchableOpacity onPress={async()=>{
            navigation.navigate('Parameter')}}>
            <Ionicons name="settings" size={getResponsiveFontSize(26)} color="white" />
           </TouchableOpacity>
        <Text  style={{fontSize:getResponsiveFontSize(20),fontFamily:'PoppinsMedium',color:'#F1EFEB'}}>Payment/wallet</Text>

        <TouchableOpacity onPress={async()=>{
            navigation.navigate('Addcard')}}>
            <Ionicons name="add" size={getResponsiveFontSize(26)} color="white" />
           </TouchableOpacity>
            </View>

 
<ScrollView contentContainerStyle={{flexGrow:1,paddingVertical:getResponsiveFontSize(20)}} >
         
         {payments.map((x)=>{return(
      <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{uri:'https://www.paymentscardsandmobile.com/wp-content/uploads/2021/11/visa-mastercard-logos.jpg'}}
          style={styles.logo}
        />
        <Text style={styles.cardNumber}>{x.number}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Cardholder Name</Text>
          <Text style={styles.cardHolder}>{user.nom+" "+user.prenom}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Expiry Date</Text>
          <Text style={styles.expiryDate}>{x.expiry}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>CVC</Text>
          <Text style={styles.cvc}>{x.cvc}</Text>
        </View>
      </View>
    </View>


)})}
   




</ScrollView>


</LinearGradient>


    </View>
)



}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    width: 300,
    maxWidth: '80%',
    elevation: 5,
  },
  logo: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  cardNumber: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  label: {
    color: 'gray',
    fontSize: 12,
  },
  cardHolder: {
    color: 'white',
    fontSize: 16,
  },
  expiryDate: {
    color: 'white',
    fontSize: 16,
  },
  cvc: {
    color: 'white',
    fontSize: 16,
  },
});

export default Wallet;