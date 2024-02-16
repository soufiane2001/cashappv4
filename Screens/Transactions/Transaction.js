import React, { useEffect } from 'react'
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
import { FontAwesome6 } from '@expo/vector-icons';


function Transactions({navigation,route }) {


    const [componentWidth, setComponentWidth] = React.useState(0);
    const [transaction, setTran] = React.useState([]);
    const [depense, setDepense] = React.useState([]);
    
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
  
        const values = await AsyncStorage.getItem('userid');
          
          const docRef = await query(collection(db, "users"),where("id","==",values));
          const querySnapshot=await getDocs(docRef)
          let todos=[]
          console.log("-----------------")
          querySnapshot.forEach((doc) => {
             
                const itemData = doc.data();
               /* const item = {
                  depense: itemData.depense, 
                }*/
                itemData.depense.map((x)=>{
                       x.depense.map((y)=>{
                        
                       todos.push({donne:y,type:x.type,photo:x.photo})
                       }) 
                    
                })
                
               // todos.push(item)
               setDepense(itemData.depense)            
              
                  })
            //console.log(todos[0].depense)
             setTran(todos)

   
             /*********************************************************** */
       
       
       
       
       
       
       
       
       
       
            }
  
  
      useFocusEffect(
        React.useCallback(() => {
      
          fetchItemsFromFirebase()     
          
        }, [])
      );






const anuller=async(id,type)=>{
//alert(id+type)
console.log("+++++++++++++++++++++++++++++++")
var updateitems=depense.map((x)=>{
  if(x.type==type){
var uu= x.depense.filter(y=>y.id!==id);
return {depense:uu,montant:x.montant,photo:x.photo,type:x.type};

}
return x;


})


console.log(updateitems)

const values = await AsyncStorage.getItem('userid');

const q = query(collection(db, "users"), where("id", '==',values));
const querySnapshots=await getDocs(q);

    querySnapshots.forEach((doc) => {
    
      const docRef = doc.ref;
      updateDoc(docRef, { 
       
        depense: updateitems, 
  
      
      }
        
        )
        .then(() => {
          fetchItemsFromFirebase()
         
        })
        .catch((error) => {
          setload("none")
          
        });
      })







}





return(
    <View onLayout={onLayout} style={{flex:1}}>
        <LinearGradient  style={{backgroundColor:'white',paddingHorizontal:"2%",height:'12%',paddingVertical:"1%",display:'flex',justifyContent:'flex-end'}}
      colors={['#528f76', '#5EC309', '#5CCA00']}
    
    >
    <View style={{paddingHorizontal:'3%',paddingVertical:"4%",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <TouchableOpacity onPress={async()=>{
            navigation.navigate('Parameter')}}>
            <Ionicons name="settings" size={getResponsiveFontSize(26)} color="white" />
           </TouchableOpacity>
        <Text  style={{fontSize:getResponsiveFontSize(20),fontFamily:'PoppinsMedium',color:'#F1EFEB'}}>Transactions</Text>

            </View>

</LinearGradient>



<ScrollView contentContainerStyle={{flexGrow:1,paddingVertical:getResponsiveFontSize(20),paddingHorizontal:getResponsiveFontSize(15)}} style={{marginTop:'0%'}}>

{transaction.map((x)=>{return(

<View style={{marginTop:'4%',backgroundColor:'white',width:'100%',paddingHorizontal:'2.5%',paddingVertical:'2.25%',borderRadius:getResponsiveFontSize(5),...Platform.select({
   ios: {
     shadowColor: 'black',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.20,
     shadowRadius: 4,
   },
   android: {
     elevation:6,
   },})}}>
 <TouchableOpacity style={{display:'flex',flexDirection:'row',alignItems:'center'}} onPress={()=>{anuller(x.donne.id,x.type)}}>
<Image source={{uri:"https://cdn-icons-png.freepik.com/512/3807/3807871.png"}} style={{marginTop:'0.5%',width:getResponsiveFontSize(20),height:getResponsiveFontSize(20),resizeMode:'contain',borderRadius:50}} />
<Text  style={{fontSize:getResponsiveFontSize(11.5),fontFamily:'PoppinsMedium',color:'red',marginLeft:'2%'}}>Annuller</Text>
</TouchableOpacity>

<View style={{marginTop:'0%',display:'flex',flexDirection:'row',alignItems:'center'}}>
 


<View style={{width:'80%'}}>
<Text  style={{fontSize:getResponsiveFontSize(13),fontFamily:'PoppinsMedium',color:'#A49F9E',marginLeft:'5%'}}> {x.donne.date} {x.donne.time} </Text>
<Text  style={{fontSize:getResponsiveFontSize(22),fontFamily:'PoppinsMedium',color:'#525252',marginLeft:'5%',marginTop:'1%'}}> {x.donne.montant} dh </Text>
</View>

{x.donne.type!="manuelle" ? (<View >
<Image source={{uri:"https://cdn.iconscout.com/icon/free/png-256/free-qr-scan-3582609-3012544.png?f=webp"}} style={{marginTop:'0.5%',width:getResponsiveFontSize(50),height:getResponsiveFontSize(70),resizeMode:'contain',borderRadius:50}} />
</View>) :(<View>
<Image source={{uri:"https://cdn-icons-png.flaticon.com/512/8038/8038612.png"}} style={{marginTop:'0.5%',width:getResponsiveFontSize(50),height:getResponsiveFontSize(70),resizeMode:'contain',borderRadius:50}} />
</View>)}


</View>
<View style={{marginTop:'0%',display:'flex',flexDirection:'row',alignItems:'flex-end',marginTop:'-1.85%'}}>
<Image source={{uri:x.photo}} style={{marginLeft:'2.5%',width:getResponsiveFontSize(40),height:getResponsiveFontSize(25),resizeMode:'contain',borderRadius:50}} />
  <Text  style={{fontSize:getResponsiveFontSize(12),fontFamily:'PoppinsMedium',color:'#525252',marginLeft:'0.55%',marginTop:'1%'}}>{x.type}</Text>
</View>


</View>


)})}















</ScrollView>









    </View>
)



}

export default Transactions;