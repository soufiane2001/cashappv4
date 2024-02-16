import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Alert} from 'react-native';

import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';



import uuid from "uuid";
import { ActivityIndicator } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as firebase from "firebase/app";
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../Firebase/FirebaseConfig';
import { ScrollView } from 'react-native';






export default function Scan({navigation ,route}) {

    const [imageUri, setImageUri] = useState(null);
    const [imageurl, setImageUrl] = useState(null);
    const [images, setImages] = useState([]);
    const [componentWidth, setComponentWidth] = React.useState(0);
    const [recognizedText, setRecognizedText] = useState('');




    

    


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
      
useEffect(()=>{
  setload('block')
},[])




      const [loads, setload] = React.useState("none");


/**********************************888888 */
  



  
    const fetchItemsFromFirebase =async () => {
  
      const values = await AsyncStorage.getItem('userid');
        
        const docRef = await query(collection(db, "users"),where("id","==",values));
        const querySnapshot=await getDocs(docRef)
        let todos=[]
        querySnapshot.forEach((doc) => {
           
              const itemData = doc.data();
              console.log(itemData.factures)
              setImages(itemData.factures)
              setload('none')
         //     console.log(itemData)
                })
      
      
      
      
      }


    useFocusEffect(
      React.useCallback(() => {
    
        fetchItemsFromFirebase()     
        
      }, [])
    );

    







/******************************** */





const remove=async()=>{

  setload('block')

  var facturess=[];
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
     factures:itemData.factures
  };
   todos.push(item)
  
    facturess=item.factures;
  facturess.splice(route.params.scanid, 1);
 
  console.log(facturess)
  });
  
  
  //var facturess=item;

//  facturess.splice(route.params.scanid, 1);
  
  //setload('none')
  

  const q = query(collection(db, "users"), where("id", '==',values));
  const querySnapshots=await getDocs(q);

      querySnapshots.forEach((doc) => {
        // Update each document individually
        const docRef = doc.ref;
        updateDoc(docRef, { 
          id: values,
          nom: todos[0].nom,
          prenom: todos[0].prenom, 
          secteur: todos[0].secteur, 
          ville: todos[0].ville,
          budget: todos[0].budget,  
          depense:todos[0].depense , 
          fonction:  todos[0].fonction, 
          Datenaissance: todos[0].Datenaissance,
          dateinscription:todos[0].dateinscription,
          budgetinitial: todos[0].budgetinitial,
          factures: facturess
        }
          
          )
          .then(() => {
           
            setload('none')
           navigation.navigate('Scans')
      
           
          })
          .catch((error) => {
         
            setload('none')
          });
      });
  
  
  



}






/***********************************88 */

    return (
     
        <View onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%",paddingVertical:'0%'}}>
     

     <View style={{display:loads,backgroundColor:'black',opacity:0.65,position:'absolute',zIndex:1111,top:"0%",left:'0%',width:'100%',height:"100%"}}>
<View style={{
display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:"100%"
}}>
  
  <ActivityIndicator size="large" color="#007AFF" />
</View>
</View>




       
        <LinearGradient  style={{backgroundColor:'white',paddingHorizontal:"2%",height:'100%',paddingVertical:"3%"}}
         colors={['#528f76', '#5EC309', '#5CCA00']}
       
       >

<View  style={{paddingHorizontal:"1%",paddingVertical:"0%",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>     
  <TouchableOpacity style={{marginTop:"5%"}} onPress={()=>{navigation.navigate("Home")}}>
   <Icon name="home" size={getResponsiveFontSize(35)} color="white" style={{marginLeft:'2.5%'}}/>
  </TouchableOpacity>

 <TouchableOpacity style={{marginTop:"5%"}} onPress={()=>{remove()}}>
  <Icon name="trash" size={getResponsiveFontSize(30)} color="white" />
 </TouchableOpacity>

</View>  



<ScrollView contentContainerStyle={{flexGrow:1,paddingVertical:getResponsiveFontSize(15)}}>

  <View style={{ display:'flex',flexDirection:'row',justifyContent:'space-around',flexWrap:'wrap'}}>
  {images.length>0 && (
    
            <Image source={{ uri: images[route.params.scanid]}} style={{ width: "100%", height: getResponsiveFontSize(550) ,resizeMode:'contain'}} />
        
            )
    } 
  </View>
</ScrollView>

        </LinearGradient>
        </View>
      
      )

}













