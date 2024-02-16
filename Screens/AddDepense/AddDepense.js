import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView ,ActivityIndicator} from 'react-native';
import {auth,db} from "../../Firebase/FirebaseConfig"
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import { collection,addDoc, where, getDocs, query, updateDoc } from 'firebase/firestore';
import ModalSelector from 'react-native-modal-selector';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


function AddDepense({navigation,route }) {
  
    const [componentWidth, setComponentWidth] = React.useState(0);
    const [budget, setBudget] = React.useState(0);
    const [prix, setPrix] = useState("0");
    
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [nom, setNom] = React.useState('');
  const [prenom, setPrenom] = React.useState('');
  const [ville, setVille] = React.useState('');
  const [fonction, setFonction] = React.useState('');
  const [depense, setDepense] = React.useState([]);
  const [secteur, setSecteur] = React.useState('');
  const [budgetinitial, setbudgetinitial] = useState(0);
  const [dateinscription, setdateinscription] = useState("");


   

    


  
  









 
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



 

     
      const fetchItemsFromFirebase =async () => {
        const values= await AsyncStorage.getItem("userid");
        const docRef = await query(collection(db, "users"),where("id","==",values));
       const querySnapshot=await getDocs(docRef)
       let todos=[]
    
       querySnapshot.forEach(async(doc) => {
         const itemData = doc.data();
         setBudget(parseFloat(itemData.budgetinitial))  
         itemData.budget.map((x)=>{
               
          const diff = new Date() -  new Date(itemData.dateinscription.substring(0,8)+x.date);
          const months = Math.floor(diff / (30 * 24 * 60 * 60 * 1000));
    
             
          for(var i=0;i<months;i++){
            setBudget(budget=>budget+parseFloat(x.revenu))  
          }

          

         })


         itemData.depense.map((x)=>{
            x.depense.map((y)=>{
              setBudget(budget=>budget-parseFloat(y.montant))  
            })
          
         })

         const item = {
           id: itemData.id,
           nom: itemData.nom,
           prenom: itemData.prenom, 
           secteur: itemData.secteur, 
           ville: itemData.ville,
           budget: itemData.budget,  
           depense: itemData.depense, 
           fonction: itemData.fonction, 
           Datenaissance:itemData.Datenaissance,
           dateinscription:itemData.dateinscription
       
       };
         todos.push(item)
     
       });
   
      
   
   
       setDepense(todos[0].depense)
   
     
   
     depense.map((x)=>{
       console.log(x)
   
      })
   
   
   
   
     };
   
   





   

      const updateData =async () => {
        if(/\d/.test(prix)){
        
        
        

        setload('block')
        
            const today = new Date();
            const year = today.getFullYear().toString();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;
            var currentDate = new Date();

            // Get the current hours and minutes
            var hours = currentDate.getHours();
            var minutes = currentDate.getMinutes();
            
            // Format the result as 'hh:mm'
            var formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
            
          
            let stringWithPeriod = prix.replace(',', '.');

let convertedNumber = parseFloat(stringWithPeriod);
            const updatedItems = depense.map((item,key) => {
              // Check if the current item's id matches the id to update
      
            if (key == route.params.num) {
              //  alert(key)
               // Update the name property of the matched item
                return { ...item, depense: [...item.depense,{id:Math.floor(Math.random()*1000000000),montant:convertedNumber,date:dateString,time:formattedTime,type:'manuelle'}] };
              }
              // If the id doesn't match, return the original item
              return item;
            });
        
        
        
        
            
        setDepense(updatedItems)
        
        
        
        
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
           dateinscription:itemData.dateinscription
        
        };
         todos.push(item)
        
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
                depense: updatedItems, 
                fonction:  todos[0].fonction, 
                Datenaissance: todos[0].Datenaissance,
                dateinscription:todos[0].dateinscription,
                budgetinitial: todos[0].budgetinitial
              }
                
                )
                .then(() => {
             setPrix('')
                  setload('none')
                  fetchItemsFromFirebase()
                 
                })
                .catch((error) => {
                  setload("none")
                  
                });
            });
        
        
          }

          else {
            alert("Entrez un vrai montant")
          }
        













          }
        









       


           useFocusEffect(
            React.useCallback(() => {
          
              fetchItemsFromFirebase()     
              
            }, [])
          );
          
           



           const [loads, setload] = React.useState("none");





  return (
    <View onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%",paddingVertical:'0%'}}>




<View style={{display:loads,backgroundColor:'black',opacity:0.65,position:'absolute',zIndex:1111,top:"0%",left:'0%',width:'100%',height:"100%"}}>
<View style={{
display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:"100%"
}}>
  
  <ActivityIndicator size="large" color="#007AFF" />
</View>
</View>



<LinearGradient  style={{backgroundColor:'white',paddingHorizontal:"2.5%",display:'flex',height:'40%',justifyContent:'space-around',paddingVertical:"1.5%"}}
          colors={['#528f76', '#5EC309', '#5CCA00']}>



<View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>

   <TouchableOpacity style={{marginTop:"4%"}} onPress={()=>{navigation.navigate("Home")}}>
    <Icon name="home" size={getResponsiveFontSize(29)} color="white" style={{marginLeft:'0%'}}/>
  </TouchableOpacity>
  <Text style={{fontSize:getResponsiveFontSize(17),marginTop:'4.5%',fontFamily:'PoppinsSemiBold',color:'#E1DFDC'}}>{route.params.type}</Text>

</View>


<View style={{   ...Platform.select({
                                           ios: {
                                                  shadowColor: 'black',
                                                  shadowOffset: { width: 0, height: 2 },
                                                  shadowOpacity: 0.3,
                                                  shadowRadius: 8,
                                                   },
                                             android: {
                                                          elevation:10,
                                             },}),backgroundColor:'white',paddingHorizontal:'7%',paddingVertical:'7%',borderRadius:5}}>
            
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems: 'center',}}>

<View>
   <Text style={{fontSize:getResponsiveFontSize(21),fontFamily:'PoppinsRegular',color:'#A1A09F'}}>Epargne Actuelle</Text>
   <Text style={{marginTop:'7%',fontSize:getResponsiveFontSize(24),fontFamily:'PoppinsSemiBold',color:'#1C1C1C'}}>{parseFloat(budget).toFixed(2)} DH </Text>
</View>







<View>
<TouchableOpacity style={{marginTop:'40%'}} onPress={()=>{navigation.navigate('Statistique')}}>
<Image source={{uri:'https://static.vecteezy.com/ti/vecteur-libre/p3/5022078-simple-barometre-vector-icon-modifiable-48-pixel-vectoriel.jpg'}} 
style={{marginTop:'1.5%',width:getResponsiveFontSize(40),height:getResponsiveFontSize(40),resizeMode:'contain'}} />
</TouchableOpacity>
</View>








            </View>
       
            </View>









</LinearGradient>




<ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:"70%"}}>

<Text style={{fontSize:getResponsiveFontSize(18),marginTop:'15.5%',marginLeft:'5%',fontFamily:'PoppinsMedium',color:'black'}} >Entrez Le montant</Text>
  



<TextInput 
     onChangeText={setPrix}
     value={prix}
     style={{marginLeft:'7.5%',width:'85%',padding:"0%", borderColor:'#F0F0F0',paddingVertical:'2.95%',paddingLeft:'5%',borderRadius:10,marginTop:'5%',backgroundColor:'#F3F3FC',fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'black',}}
     placeholder="montant"
     keyboardType="numeric"
     placeholderTextColor="#BCBCBC"
/>







          <TouchableOpacity onPress={()=>{ updateData() }} style={{backgroundColor:'red',
 
          paddingVertical:getResponsiveFontSize(5)
          ,borderRadius:5,
    marginTop:'6%',width:'22%',marginLeft:'68%'
        }}>
            <Text style={{color:'white',fontSize:getResponsiveFontSize(14),textAlign:'center',fontFamily:"PoppinsRegular",marginTop:'4%'}}>Valider</Text>
          </TouchableOpacity>


</ScrollView>





    
</View>



  )
}

export default AddDepense