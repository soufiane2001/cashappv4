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


function  Addcard({navigation,route }) {


    const [componentWidth, setComponentWidth] = React.useState(0);
    const [transaction, setTran] = React.useState([]);
    
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
          querySnapshot.forEach((doc) => {
             
                const itemData = doc.data();
                itemData.depense.map((x)=>{
                       x.depense.map((y)=>{
                          todos.push({donne:y,type:x.type,photo:x.photo})
                       })

                })
                
         
            
            
                  })
console.log(todos)
             setTran(todos)
        }
  
  
      useFocusEffect(
        React.useCallback(() => {
      
          fetchItemsFromFirebase()     
        
        }, [])
      );

   var   _onChange = (form) =>  {
    
    console.log(form)
setFormData({...formData,number:form.values.number,cvc:form.values.cvc,expiry:form.values.expiry,type:form.values.type,valid:form.valid})


};















const updateData =async () => {
    var py=[];
    setload('block')
if(formData.valid==true){
  
  
    
    
    
    const values= await AsyncStorage.getItem("userid");
    const docRef = await query(collection(db, "users"),where("id","==",values));
    const querySnapshot=await getDocs(docRef)
    let todos=[]
    querySnapshot.forEach(async(doc) => {
     const itemData = doc.data();

     const item = {
       id: itemData.id,
       nom: itemData.nom,
       prenom: itemData.prenom, 
       secteur: itemData.secteur, 
       ville: itemData.ville,
       budget: itemData.budget,  
       budgetinitial: itemData.budgetinitial,  
       depense: itemData.depense, 
       fonction: itemData.fonction, 
       Datenaissance:itemData.Datenaissance,
       dateinscription:itemData.dateinscription,
       factures:itemData.factures,
       payments:itemData.payments,
    
    };
     todos.push(item)
    py=itemData.payments; 
       py.push(formData)
    });
  
  
    
    
    
    
    
    const q = query(collection(db, "users"), where("id", '==',values));
    const querySnapshots=await getDocs(q);
   
        querySnapshots.forEach((doc) => {
        
          const docRef = doc.ref;
          updateDoc(docRef, { 
            id: values,
            nom: todos[0].nom,
            prenom: todos[0].prenom, 
            secteur: todos[0].secteur, 
            ville: todos[0].ville,
            budget: todos[0].budget,  
            depense: todos[0].depense, 
            fonction:  todos[0].fonction, 
            Datenaissance: todos[0].Datenaissance,
            dateinscription:todos[0].dateinscription,
            budgetinitial: todos[0].budgetinitial,
            factures:todos[0].factures,
            payments:py
          }
            
            )
            .then(() => {
        
           navigation.navigate("Wallet")
              fetchItemsFromFirebase()
              setload('none')
             
            })
            .catch((error) => {
                setload('none')
              
            });
        });
    
    
      













      }
    




    }


















   const inputElement = useRef();
   const [formData, setFormData] = useState({});

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

            </View>



   <CreditCardInput  onChange={_onChange}  />
   <TouchableOpacity  onPress={()=>{updateData()}}  style={{width:"25%",marginBottom:'2%',marginTop:'5%',marginLeft:'70%',backgroundColor:'#4A83FE',paddingHorizontal:'2%',paddingVertical:'2%',borderRadius:5}}>
         <Text style={{fontSize:getResponsiveFontSize(15),textAlign:'center',color:'white',fontFamily:'PoppinsRegular'}}>valider</Text>
</TouchableOpacity>
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

export default Addcard;