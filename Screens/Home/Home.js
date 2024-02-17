import React, { useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, Easing,TouchableOpacity, ScrollView, ActivityIndicator, Animated } from 'react-native';
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
import { useSpring, animated } from 'react-spring';
import Barometre from '../Barometre/Barometre';
import Depenses from '../Depenses/Depenses';
import Budgets from '../Budgets/Budgets';




function Home({navigation,route }) {



    const [componentWidth, setComponentWidth] = React.useState(0);
    const [alerto, setAlerto] = React.useState(true);
    const [focus, setFocus] = React.useState(0);
    const CARD_HEIGHT = 200;

    const [depenses, setDepenses] = React.useState(
      [
        {type:"Education & Scolarité",montant:2000,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/167/167707.png"},
        {type:"Crédit immobilier",montant:800,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3190/3190635.png"},
        {type:"Crédit consommation",montant:300,depense:[],photo:"https://static.vecteezy.com/ti/vecteur-libre/p1/4666647-credit-renouvelable-color-icon-consumer-lines-of-credit-achetant-marchandises-avec-emprunt-argent-commerce-retail-marketing-industrie-banque-business-budget-economy-isolated-vector-illustration-vectoriel.jpg"},
        {type:"Produits alimentaires",montant:500,depense:[],photo:'https://sms.hypotheses.org/files/2021/10/nourriture-saine4.png'},
        {type:"Restaurants et sorties",montant:300,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1996/1996068.png"},
        {type:"Santé",montant:200,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1040/1040238.png"},
        {type:"Shopping",montant:400,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3225/3225194.png"},
        {type:"Soins et beauté",montant:200,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1005/1005769.png"},
        {type:"Transport et voiture",montant:400,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/5771/5771799.png"},
        {type:"Voyages",montant:200,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3125/3125848.png"},
        {type:"Epargne",montant:300,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/2721/2721091.png'},
      
      ]
      
      );

     
    const [budget, setBudget] = React.useState(0);
         
    const [nom, setNom] = React.useState();
    const [selectenum, setSelectenum] = useState(0);
    const [montant, setmontant] = useState(0);
    const [thisday, setDay] = useState(0);
    const [thisweek, setweek] = useState(0);
    const [yesterday, setYesterday] = useState(0);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [type, setType] = React.useState("");




    const openModal = (x,type,budget,m) => {
     // setModalVisible(true);
      setType(type)
      setSelectenum(x)

      navigation.navigate('AddDepense',{type:type,num:selectenum,budget:budget,max:m})

     
    };


    const openModal2 = () => {
  
      setModalVisible2(x=>true);
 
      
    };



    const toggleModal = (x) => {
      setModalVisible(false);
    
    };

 const toggleModal2 = () => {
      setModalVisible2(false);
    
    };







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
      var day=0;    
      var week=0;  
      var yesterdayy=0;      
        const docRef = await query(collection(db, "users"),where("id","==",values));
        const querySnapshot=await getDocs(docRef)
        let todos=[]
        querySnapshot.forEach((doc) => {
          const itemData = doc.data();
   
         const currentDate = new Date();
         const dayOfMonth = currentDate.getDate();
         setDepenses(itemData.depense)
         const diff = new Date() -  new Date(itemData.dateinscription);
         setNom(itemData.prenom)
     
         const months = Math.floor(diff / (30 * 24 * 60 * 60 * 1000));

  


         setBudget(parseFloat(itemData.budgetinitial))  
        
         
         itemData.budget.map((x)=>{
         
          const diff = new Date() -  new Date(itemData.dateinscription.substring(0,8)+x.date);
          const months = Math.floor(diff / (30 * 24 * 60 * 60 * 1000));
    
             
          for(var i=0;i<months;i++){
            setBudget(budget=>budget+parseFloat(x.revenu))  
          }

          

         })


         var today = new Date();

         var formattedDate = formatDateToString(today);
         var currentWeekDates = getCurrentWeekDates();
         var startDate = currentWeekDates.startDate;
         var endDate = currentWeekDates.endDate;
         var yesterdayyy = getYesterdayDate();
       



         itemData.depense.map((x)=>{
            x.depense.map((y)=>{
              setBudget(budget=>budget-parseFloat(y.montant))  
             // console.log(y.date)
              console.log(formattedDate)
          if(  formattedDate == y.date ){
            day+=parseFloat(y.montant)
           
          }
          var itemDate = new Date(y.date);
          if (itemDate >= startDate && itemDate <= endDate) {
              week += parseFloat(y.montant);
          }
          var itemDatee = new Date(y.date);
        if (itemDatee.toDateString() === yesterdayyy.toDateString()) {
            yesterdayy += parseInt(y.montant);
        }

            })

          
          
         })
        
         setDay(day)
         setYesterday(yesterdayy)
         console.log("week"+week)
            setweek(week)

       
       setload('none')
        });
    
     
    
    
    
      };


/******************************************* */
var      formatDateToString=(date) =>{
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based month index
        var day = ('0' + date.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    }
    
/******************** */
function getCurrentWeekDates() {
  var today = new Date();
  var dayOfWeek = today.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  var startDate = new Date(today); // Clone today's date
  startDate.setDate(startDate.getDate() - dayOfWeek); // Move to Sunday of the current week
  var endDate = new Date(today); // Clone today's date
  endDate.setDate(endDate.getDate() + (6 - dayOfWeek)); // Move to Saturday of the current week
  return { startDate: startDate, endDate: endDate };
}


/**************** */
function getYesterdayDate() {
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return yesterday;
}

    /************************* */
 useFocusEffect(
  React.useCallback(() => {

    fetchItemsFromFirebase()     
    
  }, [])
);


const [loads, setload] = React.useState("block");




const updateData =async () => {
  setload('block')
  setModalVisible(!isModalVisible)
  
      const today = new Date();
      const year = today.getFullYear().toString();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
   
      alert(montant+" "+selectenum+" "+dateString+"..")
      
      const updatedItems = depenses.map((item,key) => {
       
    
      if ((key+1) == (selectenum+1)) {
 
          return { ...item, depense: [...item.depense,{montant:montant,date:dateString}] };
        }
     
        return item;
      });
  
  
  
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
        // Update each document individually
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
           // navigation.navigate('Home')
        setTimeout(()=>{fetchItemsFromFirebase()},1500)   
           
          })
          .catch((error) => {
         
            setload('none')
          });
      });
  
  
  
  
    }
  
  

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
  


    const [focuss, setFocuss] = useState(0);
    const [scaleValues, setScaleValues] = useState([
      new Animated.Value(3), // Larger scale for the first TouchableOpacity
      new Animated.Value(1),
      new Animated.Value(1),
    ]);
  
    const handlePress = (index) => {
      // Set the scale value to 1 for all TouchableOpacity elements
      // and animate the scale to 1.2 for the pressed TouchableOpacity
      const newScaleValues = scaleValues.map((value, i) =>
        i === index ? new Animated.Value(1.2) : new Animated.Value(1)
      );
      setScaleValues(newScaleValues);
  
      Animated.timing(scaleValues[index], {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };
  
    // Reset scale animation when focus changes
    useEffect(() => {
      const newScaleValues = scaleValues.map((value, index) =>
        index === focus ? new Animated.Value(1.3) : new Animated.Value(1)
      );
      setScaleValues(newScaleValues);
    }, [focus]);
   

  return (
   
   <View onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%",paddingVertical:'0%'}}>
     <View style={{display:loads,backgroundColor:'black',opacity:0.65,position:'absolute',zIndex:1111,top:"0%",left:'0%',width:'100%',height:"100%"}}>
<View style={{
display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:"100%"
}}>
  
  <ActivityIndicator size="large" color="#007AFF" />
</View>
</View>








  


















       
     <LinearGradient  style={{backgroundColor:'white',paddingHorizontal:"2%",height:'40%',paddingVertical:"3%",display:'flex',justifyContent:'space-around'}}
      colors={['#528f76', '#5EC309', '#5CCA00']}
    
    >


            
            <View style={{paddingHorizontal:'3%',paddingVertical:"4%",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <TouchableOpacity onPress={async()=>{
            const values = await AsyncStorage.getItem('userid');
            navigation.navigate('Parameter',{id:values})}}>
            <Ionicons name="settings" size={getResponsiveFontSize(26)} color="white" />
           </TouchableOpacity>
      
            <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
            <AntDesign name="logout" size={getResponsiveFontSize(26)} color="white" />      
            </TouchableOpacity>
            <Text style={{fontSize:getResponsiveFontSize(23),width:'60%',fontFamily:'PoppinsSemiBold',color:'#F1EFEB'}}>Hello, {nom}</Text>
            
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
<Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4sHN5zIh7yLE1q1OpIyZ9a0aJiya3cYaiPHufRCmRMA&s'}} 
style={{marginTop:'1.5%',width:getResponsiveFontSize(50),height:getResponsiveFontSize(50),resizeMode:'contain'}} />
</TouchableOpacity>
</View>








            </View>
       
            </View>











        </LinearGradient>

<View style={{borderBottomWidth:getResponsiveFontSize(0.3),marginTop:'-5%',borderColor:'#EAEAEA',height:'8%',display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
<TouchableOpacity onPress={()=>{setFocus(0);fetchItemsFromFirebase()}} style={{ ...Platform.select({
   ios: {
     shadowColor: 'black',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.15,
     shadowRadius: 3,
   },
   android: {
     elevation:3,
   },}),backgroundColor:focus==0?'#F3F3F3':'white',width:'30%',display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',borderWidth:getResponsiveFontSize(0.5),borderColor:'#EAEAEA',paddingHorizontal:"3%",paddingVertical:'1%',borderRadius:getResponsiveFontSize(5)}}>
<Animated.View style={{ transform: [{ scale: scaleValues[0] }] ,display:'flex',justifyContent:'center',alignItems:'center' }}>
<Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtO1e98alT1HOIb5bR9wpRita4JIU4ajabX2Htu3bQeg&s"}} style={{marginRight:'2%',width:getResponsiveFontSize(20),height:getResponsiveFontSize(20),resizeMode:'contain',borderRadius:50}} />  
<Text style={{marginTop:'2.5%',fontSize:getResponsiveFontSize(11),fontFamily:'PoppinsMedium',color:'#909090',textAlign:'center'}}>Operations</Text>
</Animated.View>
</TouchableOpacity>

<TouchableOpacity onPress={()=>{setFocus(1)}} style={{ ...Platform.select({
   ios: {
     shadowColor: 'black',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.15,
     shadowRadius: 3,
   },
   android: {
     elevation:3,
   },}),backgroundColor:focus==1?'#F3F3F3':'white',width:'30%',display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',borderWidth:getResponsiveFontSize(0.5),borderColor:'#EAEAEA',paddingHorizontal:"1.5%",paddingVertical:'1%',borderRadius:getResponsiveFontSize(5)}}>
<Animated.View style={{ transform: [{ scale: scaleValues[1] }],display:'flex',justifyContent:'center',alignItems:'center'  }}>
<Image source={{uri:"https://cdn-icons-png.flaticon.com/512/5501/5501375.png"}} style={{width:getResponsiveFontSize(23),height:getResponsiveFontSize(20),resizeMode:'contain',borderRadius:50}} />  
<Text style={{marginTop:'2.5%',fontSize:getResponsiveFontSize(11),fontFamily:'PoppinsMedium',color:'#909090',textAlign:'center'}}>Depenses</Text>
</Animated.View>
</TouchableOpacity>

<TouchableOpacity onPress={()=>{setFocus(2)}} style={{ ...Platform.select({
   ios: {
     shadowColor: 'black',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.15,
     shadowRadius: 3,
   },
   android: {
     elevation:3,
   },}),backgroundColor:focus==2?'#F3F3F3':'white',width:'30%',height:'80%',display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',borderWidth:getResponsiveFontSize(0.5),borderColor:'#EAEAEA',paddingHorizontal:"1.5%",paddingVertical:'1%',borderRadius:getResponsiveFontSize(5)}}>
<Animated.View style={{ transform: [{ scale: scaleValues[2] }],display:'flex',justifyContent:'center',alignItems:'center' }}>
<Image source={{uri:"https://cdn-icons-png.flaticon.com/512/6553/6553997.png"}} style={{width:getResponsiveFontSize(23),height:getResponsiveFontSize(20),resizeMode:'contain',borderRadius:50}} />  
<Text style={{marginTop:'2.5%',fontSize:getResponsiveFontSize(11),fontFamily:'PoppinsMedium',color:'#909090',textAlign:'center'}}>Revenus</Text>
</Animated.View>
</TouchableOpacity>




</View>

{focus ==0 && (
  <>
 <View style={{height:'10%',borderBottomWidth:1,borderColor:'#F1F1F1',display:'flex',flexDirection:'row',alignItems:"center",justifyContent:'space-around',padding:'0.5%'}}>

  <View onPress={() => handlePress(0)} style={{width:'30%',borderWidth:1,borderColor:'#EAEAEA',borderRadius:getResponsiveFontSize(10),height:'90%',display:'flex',alignItems:'center',justifyContent:'center',padding:"2%"}}>
 
<Text style={{color:'#818181',fontSize:getResponsiveFontSize(14)}}>Ce jour </Text>
<Text style={{color:'#646464',fontSize:getResponsiveFontSize(14)}}>{thisday} DH</Text>

  </View>


  <View style={{width:'30%',borderWidth:1,borderColor:'#EAEAEA',borderRadius:getResponsiveFontSize(10),height:'90%',display:'flex',alignItems:'center',justifyContent:'center',padding:"2%"}}>

<Text style={{color:'#818181',fontSize:getResponsiveFontSize(14)}}>Hier </Text>
<Text style={{color:'#646464',fontSize:getResponsiveFontSize(14)}}>{yesterday} DH</Text>
 
  </View>


  <View style={{width:'30%',borderWidth:1,borderColor:'#EAEAEA',borderRadius:getResponsiveFontSize(10),height:'90%',display:'flex',alignItems:'center',justifyContent:'center',padding:"2%"}}>

<Text style={{color:'#818181',fontSize:getResponsiveFontSize(14)}}>Cette Semaine </Text>
<Text style={{color:'#646464',fontSize:getResponsiveFontSize(14)}}>{thisweek} DH</Text>
  
  </View>





  </View>
<ScrollView  

  contentContainerStyle={{flexGrow:1,paddingVertical:getResponsiveFontSize(20)}} style={{marginTop:'0%'}}>
{ depenses.map((x,index)=>{
 
 var pourcentage=0;
 
 var m=0;
 
 return(
 
  <Animated.View>
 <TouchableOpacity key={index}  style={{backgroundColor:'white',paddingHorizontal:'3%',paddingVertical:'10%',borderRadius:getResponsiveFontSize(5),marginTop:'5.5%',
   display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'93%',marginLeft:'3.8%',
 ...Platform.select({
   ios: {
     shadowColor: 'black',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.20,
     shadowRadius: 4,
   },
   android: {
     elevation:6,
   },})
 ,marginBottom:'2%'
 }}>
 
 
 <Image source={{uri:x.photo}} style={{marginTop:'2.5%',width:"18%",height:'100%',resizeMode:'contain',borderRadius:50}} />
 
   <Text style={{marginTop:'2.5%',fontSize:getResponsiveFontSize(14),fontFamily:'PoppinsMedium',color:'#909090',textAlign:'center'}}>{x.type}</Text>
 
 
 
   <Text style={{marginTop:'2.5%',color:'#343434',fontSize:getResponsiveFontSize(14),fontFamily:'PoppinsMedium',textAlign:'center',
 }}>{parseFloat(x.montant).toFixed(2)} DH
 
 </Text>
 
 
 
 
 <Text style={{position:'absolute',top:'22%',left:'5%',zIndex:414,color:'#3E3E3E',fontSize:getResponsiveFontSize(14),fontFamily:'PoppinsRegular'}}>Tu as dépensé ce mois  : 
  {x.depense.length>0 && x.depense.map((y)=>{
 const date = new Date();
 const monthNumber = date.getMonth() + 1;
 const mounth=parseInt(y.date.substring(5,7))
 
 if(monthNumber==mounth){
 m+=parseFloat(y.montant)
 }
 })
 
 
 
 }
 
 &nbsp; &nbsp;{parseFloat(m).toFixed(2)} Dh </Text>
 <TouchableOpacity onPress={()=>{if(parseFloat(x.montant)>parseFloat(m)){ openModal(index,x.type,x.montant,m)}else{ if(parseFloat(x.montant)>0){alert('vouz avez passe le limite ')}else{alert('vouz devez donnez le budget')} }} } style={{position:'absolute',zIndex:5565,left:'-2.5%'}}>
 <Ionicons name="md-add-circle-sharp"  size={getResponsiveFontSize(31)} color="blue" />
 </TouchableOpacity>
 
 {m/x.montant*100 >80 &&
 
 <View style={{opacity:alerto?1:0,position:'absolute',left:'95%',top:'20%'}}>
 <Feather  name="alert-triangle" size={24} color="red" />
   </View>
 
 }
 
 
 {m>0 &&
 <LinearGradient  style={{height:getResponsiveFontSize(104),opacity:0.2,borderRadius:getResponsiveFontSize(5),width:`${ (((m/x.montant)*100+7)<100 ? ((m/x.montant)*100+7) : 107)}%`,backgroundColor:'white',position:'absolute',top:"0%",left:"0%",paddingHorizontal:"2%",flex:1,paddingVertical:"3%"}}
 colors={['#F3F0F0',m/x.montant*100 <30 ?'gray' :m/x.montant*100 <80 ? 'blue' : 'red']}
 start={{ x: 0, y: 0 }} // Start position (top-left)
 end={{ x: 0.75, y: 1.85 }} 
     
     >
 
 
 
 
 
         </LinearGradient>
 
 }
 
 
 
   </TouchableOpacity>
 </Animated.View>
 
 
 
 
 )

 
 })}
 </ScrollView>
 </>)

}

{focus ==1 && (<Depenses/> )

}

{focus ==2 && (<Budgets/> )

}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Home