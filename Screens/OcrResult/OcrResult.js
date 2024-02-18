import React, { useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView ,ActivityIndicator, Animated} from 'react-native';
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
import { AntDesign, Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Easing } from 'react-native';








function OcrResult({navigation ,route}) {
    var    [btvis, setBtvis] = useState(false);
    const [componentWidth, setComponentWidth] = React.useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectenum, setSelectenum] = useState(null);
    
   

    const fonctions =  [
    
    
    {key:1,label:"Education & scolarité",}, 
    {key:2,label:"Crédit immobilier",},
    {key:3,label:"Crédit consommation",},
    {key:4,label:"Produits alimentaires",},
    {key:5,label:"Restaurants et sorties",},
    {key:6,label:"Santé",},
    {key:7,label:"Shopping",},
    {key:8,label:"Soins et beauté",},
    {key:9,label:"Transport et voiture"},
    {key:10,label:"Voyages",},
    {key:11,label:"Epargne",},
    
  ]
      


  
  const [budgets, setBudget] = useState([{type:"Salaire",revenu:0,date:31},
  {type:"Pension retraite",revenu:0,date:31},
  {type:"Pension locatif",revenu:0,date:31},
  {type:"Revenu de placement",revenu:0,date:31},
  {type:"Dividendes",revenu:0,date:31},
  {type:"Freelance",revenu:0,date:31},
  {type:"Autres",revenu:0,date:31}

  ]);

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

  const [budget, setBudgets] = React.useState(0);







 
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


     const prix= route.params.prix








 

     
     const fetchItemsFromFirebase =async () => {
      const values= await AsyncStorage.getItem("userid");
      const docRef = await query(collection(db, "users"),where("id","==",values));
     const querySnapshot=await getDocs(docRef)
     let todos=[]
  
     querySnapshot.forEach(async(doc) => {
       const itemData = doc.data();
       setBudgets(parseFloat(itemData.budgetinitial))  
       itemData.budget.map((x)=>{
             
        const diff = new Date() -  new Date(itemData.dateinscription.substring(0,8)+x.date);
        const months = Math.floor(diff / (30 * 24 * 60 * 60 * 1000));
  
           
        for(var i=0;i<months;i++){
          setBudgets(budget=>budget+parseFloat(x.revenu))  
        }

        

       })


       itemData.depense.map((x)=>{
          x.depense.map((y)=>{
            setBudgets(budget=>budget-parseFloat(y.montant))  
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

if(selectenum!=null){
  setload('block')
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    
    // Format the result as 'hh:mm'
    var formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    let stringWithPeriod = prix.toString().replace(',', '.');

    let convertedNumber = parseFloat(stringWithPeriod);    
    
    const updatedItems = depense.map((item,key) => {
      

    if ((key+1) == selectenum) {
     
        return { ...item, depense: [...item.depense,{id:Math.floor(Math.random()*1000000000),montant:convertedNumber,date:dateString,time:formattedTime,type:'scan'}] };
      }
    
      return item;
    });




    
setDepense(updatedItems)




const values= await AsyncStorage.getItem("userid");
const docRef = await query(collection(db, "users"),where("id","==",values));
const querySnapshot=await getDocs(docRef)
let todos=[]
querySnapshot.forEach(async(doc) => {
 const itemData = doc.data();
 setBudget(itemData.budget)
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
          
          setload('none')
         setBtvis(true)
          fetchItemsFromFirebase()
         
        })
        .catch((error) => {
          console.error(`Error updating document with ID ${doc.id}:`, error);
        });
    });




























  }

else{
  setload('none')
  alert("Categorie?")
}





  }


















React.useEffect(()=>{
 
 fetchItemsFromFirebase()

},[])












const handleOptionChange2 = (option) => {
  setSelectedDate(option.label);
  setSelectenum(option.key)
};



const [loads, setload] = React.useState("none");
const position = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(position, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(position, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);



const translateY = position.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 2],
});

const scrollY = useRef(new Animated.Value(0)).current;

const translateYy = scrollY.interpolate({
  inputRange: [0, 50], // Adjust these values as needed
  outputRange: [0, 50], // Adjust these values as needed
  extrapolate: 'clamp'
});



  return (
    <View onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%",paddingVertical:'0%'}}>
<View style={{display:loads,backgroundColor:'black',opacity:0.65,position:'absolute',zIndex:1111,top:"0%",left:'0%',width:'109%',height:"113%"}}>
<View style={{
display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:"100%"
}}>
  
  <ActivityIndicator size="large" color="#007AFF" />
</View>
</View>
<LinearGradient  style={{backgroundColor:'white',paddingHorizontal:"2%",height:'35%',paddingVertical:"3%",display:'flex',justifyContent:"flex-end"}}
      colors={['#528f76', '#5EC309', '#5CCA00']} >







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
<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems: 'center',backgroundColor:'white'}}>

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




<View style={{display:"flex",justifyContent:"space-around",width:"100%",height:"58%",paddingHorizontal:"5%",paddingVertical:"10%"}}>



      <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:getResponsiveFontSize(21),fontFamily:"PoppinsMedium",color:'black'}}>{prix.toFixed(2)}Dh  Validee ? </Text>        
         <TouchableOpacity onPress={()=>{navigation.navigate("Camera")}}>
            <Ionicons name="md-reload-circle" size={32} color="red" />
         </TouchableOpacity>
      </View>
   

       <View>
       <Text style={{fontSize:17,fontFamily:"PoppinsRegular",color:'black'}}>Categories :</Text>
       <ModalSelector
                 data={fonctions}
                 initValue="Select Genre"
                 onChange={handleOptionChange2}
                 style={{marginTop:'7%',backgroundColor:'#F3F3FC',width:'100%',paddingVertical:'2.4%',paddingLeft:'5%',marginTop:"5%",borderWidth:1,borderColor:'#F7F7F7',borderRadius:5}}
                >
       
                  <TouchableOpacity>
                    <Text style={{fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'#BCBCBC'}} >{selectedDate|| 'Fonction' }</Text>
                  </TouchableOpacity>
     
               </ModalSelector>
</View>

               <TouchableOpacity disabled={btvis} onPress={()=>{updateData()}} style={{marginLeft:"65%",backgroundColor:"red",paddingHorizontal:"3%",paddingVertical:"2%",width:"35%",borderRadius:getResponsiveFontSize(5)}}>
                    <Text style={{fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'white',textAlign:"center"}} >Enregistrer</Text>
                  </TouchableOpacity>
     





</View>




<LinearGradient  style={{backgroundColor:'white',paddingHorizontal:"2%",height:'7%',display:'flex',justifyContent:'center'}}
      colors={['#528f76', '#5EC309', '#5CCA00']}
    
    >
       <View style={{paddingHorizontal:'2%',paddingVertical:"0%",paddingLeft:'45%',display:'flex',flexDirection:'row',alignItems:'center',marginTop:'1.5%',justifyContent:'space-between'}}>
          
           <Animated.View style={[ {

  }, { transform: [ { translateY }] }]}>
            <TouchableOpacity onPress={()=>{navigation.navigate("Camera")}}>
            <Ionicons name="scan"     size={getResponsiveFontSize(32)} color="white" />
            </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity onPress={()=>{navigation.navigate("Statistique")}}>
            <AntDesign name="areachart" size={getResponsiveFontSize(26)} color="white" />
            </TouchableOpacity>
            
            
            <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
            <Icon name="home" size={getResponsiveFontSize(35)} color="white" style={{marginLeft:'2.5%'}}/>      
            </TouchableOpacity>
            </View>





</LinearGradient>



    
</View>



)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      marginTop:'10%',
      borderStyle:'solid',
    },
    inputAndroid: {
        marginTop:'5%',
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1.5,
      borderStyle:'solid',
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
    },
  });

export default OcrResult
