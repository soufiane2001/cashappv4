import React, { useEffect,useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator,Animated, Easing } from 'react-native';


import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {db} from "../../Firebase/FirebaseConfig"
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import ModalSelector from 'react-native-modal-selector';
import Modal from 'react-native-modal';
import { collection,addDoc, where, getDocs, query, updateDoc } from 'firebase/firestore';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import { Defs, Stop,LinearGradient } from 'react-native-svg';



function Statistique({navigation,route }) {



    

    const [depenses, setDepenses] = React.useState(
        [{key: 1, type:"Education & scolarité",montant:2000,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/167/167707.png"},
      {key: 2, type:"Crédit immobilier",montant:800,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3190/3190635.png"},
      {key: 3, type:"Crédit consommation",montant:300,depense:[],photo:"https://static.vecteezy.com/ti/vecteur-libre/p1/4666647-credit-renouvelable-color-icon-consumer-lines-of-credit-achetant-marchandises-avec-emprunt-argent-commerce-retail-marketing-industrie-banque-business-budget-economy-isolated-vector-illustration-vectoriel.jpg"},
      {key: 4, type:"Produits alimentaires",montant:500,depense:[],photo:'https://sms.hypotheses.org/files/2021/10/nourriture-saine4.png'},
      {key: 5, type:"Restaurants et sorties",montant:300,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1996/1996068.png"},
      {key: 6, type:"Santé",montant:200,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1040/1040238.png"},
      {key: 7,type:"Telephone",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/13/13936.png'},
      {key: 8, type:"Shopping",montant:400,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3225/3225194.png"},
      {key: 9, type:"Soins et beauté",montant:200,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1005/1005769.png"},
      {key: 10,type:"Transport et voiture",montant:400,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/5771/5771799.png"},
      {key: 11,type:"Voyages",montant:200,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3125/3125848.png"},
      {key: 12,type:"Epargne",montant:300,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/2721/2721091.png'},
      {key: 13,type:"Eau",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/850/850785.png'},
      {key: 14,type:"Electricite",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/2807/2807571.png'},
      {key: 15,type:"vignette",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/744/744465.png'},
      {key: 16,type:"Salle du sport",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/2216/2216769.png'},
    
    
    ]);

     

    const [filtertype, setFiltertype] = React.useState("");  
    const [filterdepensetype, setFilterdepensetype] = React.useState("");  
    const [filterdepensenum, setFilterdepensenum] = React.useState("");  
    const [sommedepense, setSommedepense] = React.useState(0);  
    const [sommedepense2, setSommedepense2] = React.useState(0);  
    const [sommedepense3, setSommedepense3] = React.useState(0);  
    const [statistique, setstatistique] = React.useState([]);  
    const [statistique2, setstatistique2] = React.useState([]);  
    const [statistique3, setstatistique3] = React.useState([]);  
    



    const filterdate = [
   
      { key: 2, label: 'mois' },
      { key: 3, label: 'annees' },

    ];



    const filterdepense = [
      {key: 1, label:"Education & scolarité"},
      {key: 2, label:"Crédit immobilier"},
      {key: 3, label:"Crédit consommation"},
      {key: 4, label:"Produits alimentaires"},
      {key: 5, label:"Restaurants et sorties"},
      {key: 6, label:"Santé"},
      {key: 7, label:"Telephone"},
      {key: 8, label:"Shopping"},
      {key: 9, label:"Soins et beauté"},
      {key: 10,label:"Transport et voiture"},
      {key: 11,label:"Voyages"},
      {key: 12,label:"Epargne"},
      {key: 13,label:"Eau"},
      {key: 14,label:"Electricite"},
      {key: 15,label:"vignette"},
      {key: 16,label:"Salle du sport"},
    

    ];













 


    

  








  const parseStringToDate=(dateString)=> {
    const [year, month, day] = dateString.split("-");

    const date = new Date(
      year < 100 ? year + 2000 : year,
      month - 1,
      day
    );
    
     return (date)
    }


      
    function isDateBetweenTwoDates(givenDate, startDate, endDate) {
      return givenDate.compareTo(startDate) === 1 && givenDate.compareTo(endDate) === -1;
    }
   





      const fetchItemsFromFirebase =async () => {

        
          const values= await AsyncStorage.getItem("userid");
        const docRef = await query(collection(db, "users"),where("id","==",values));
        const querySnapshot=await getDocs(docRef)
        let todos=[]
        querySnapshot.forEach(async(doc) => {
            setload("none")
            const itemData = doc.data();
            todos.push(itemData)
      
        })



     
        setDepenses(todos)
    




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
  





useFocusEffect(
  React.useCallback(() => {

    fetchItemsFromFirebase()     
    
  }, [])
);












var help=[];
var years=[];
const monthFilter=async()=>{




 //setload('block')
  let stock=[]
  const values= await AsyncStorage.getItem("userid");
const docRef = await query(collection(db, "users"),where("id","==",values));
const querySnapshot=await getDocs(docRef)
let todos=[]
var yearssmois=[];
querySnapshot.forEach(async(doc) => {
   
    const itemData = doc.data();
    todos.push(itemData)


  var datemois=[]
  var datm=new Date (itemData.dateinscription)
  var datmm=new Date (itemData.dateinscription)
  datemois.push(new Date (itemData.dateinscription))


  years.push(new Date (itemData.dateinscription))
 
  while(datm.getFullYear()<new Date().getFullYear()){
       years.push(new Date(datm.setDate(datm.getDate()+365)))
    }

console.log("++++++++++++++++++++++++++++++++++++") 
console.log(years) 
//  console.log(years[1].getFullYear())
  datemois=[0,1,2,3,4,5,6,7,8,9,10,11];

var mnt=0;





for(var j=0;j<years.length;j++){
  console.log(years[j].getFullYear())
  stock=[]
for(var i=0;i<datemois.length;i++){
mnt=0;
 

    itemData.depense.map((x)=>{
          if(x.type==filterdepensetype){
                x.depense.map((y)=>{
                  
                if(years[j].getFullYear()==new Date(y.date).getFullYear()){
                  //console.log(new Date(y.date).getFullYear() )  
                  if(new Date(y.date).getMonth() == datemois[i]   ) {

                                          mnt+=parseInt(y.montant)
                                          }
                                   }
                })
          
              //  setSommedepense2(x=>x+mnt)
              }

    })


    if(i<datemois.length){
   
    stock.push({mois:datemois[i],montant:mnt})
  
    }
  }



//yearssmois.push(stock)

yearssmois.push({stock:stock,year:years[j].getFullYear()})
}

//   console.log(stock)


})
console.log(yearssmois)
//console.log(yearssmois)
//setload("none")
setstatistique2(yearssmois)








}







































const weekFilter=async()=>{


setload("block")


  const values= await AsyncStorage.getItem("userid");
const docRef = await query(collection(db, "users"),where("id","==",values));
const querySnapshot=await getDocs(docRef)
let todos=[]
let stock=[]
querySnapshot.forEach(async(doc) => {
    setload("none")
    const itemData = doc.data();
  
    var dated=new Date (itemData.dateinscription)
       
    var   datrarray=[]
    
  
    datrarray.push(new Date (itemData.dateinscription))
   do{
         
  
      datrarray.push(new Date(dated.setDate(dated.getDate()+7)))
      }while(dated<new Date())

         

var mnt=0;

for(var i=0;i<datrarray.length;i++){
mnt=0;


    itemData.depense.map((x)=>{
          if(x.type==filterdepensetype){
                x.depense.map((y)=>{
                    if(new Date(y.date) >= new Date(datrarray[i]) && new Date(y.date)<=new Date(datrarray[i+1])   ) {
                                          mnt+=parseFloat(y.montant)
                                          setSommedepense(x=>x+mnt)
                                                                   }
                })
          }

    })


   // console.log(datrarray[i]+" "+datrarray[i+1]+"  : "+mnt)



    
       
     stock.push({date:datrarray[i],datef:datrarray[i+1],montant:mnt})
     
    


  }







 



})

setload("none")
setstatistique(stock)










  
}
































const yearFilter=async()=>{

  setload("block")
  
  const values= await AsyncStorage.getItem("userid");
const docRef = await query(collection(db, "users"),where("id","==",values));
const querySnapshot=await getDocs(docRef)
let todos=[]
querySnapshot.forEach(async(doc) => {
    setload("none")
    const itemData = doc.data();
    todos.push(itemData)
  

   
   var dateyeer=[]
  var daty=new Date (itemData.dateinscription)
  dateyeer.push(new Date (itemData.dateinscription))
  
  while(daty.getFullYear()<new Date().getFullYear()){
         

    dateyeer.push(new Date(daty.setDate(daty.getDate()+365)))
    }
  

console.log(".......................")

console.log(dateyeer)

  
var mnt=0;
var yearo=[];
for(var i=0;i<dateyeer.length;i++){
mnt=0;


    itemData.depense.map((x)=>{
          if(x.type==filterdepensetype){
            
                x.depense.map((y)=>{
                    if(new Date(y.date).getFullYear() == new Date(dateyeer[i]).getFullYear()  ) {
                                   // console.log(new Date(dateyeer[i]).getFullYear()) 
                                            mnt+=parseInt(y.montant)
                                          
                                                                   }
                })
          }

    })

   // setSommedepense3(x=>x+mnt)
   yearo.push({date:new Date(dateyeer[i]).getFullYear(),montant:mnt})
  // console.log(mnt)
  // console.log(new Date(dateyeer[i]).getFullYear()) 

  }
  console.log(yearo) 
 setstatistique3(yearo)

})






  
//console.log(setstatistique3(x=>{console.log(x); return x;}))











setload("none")










}




























  

  
  
  
  
  
  
const handleOptionChange = (option) => {
if(filterdepensetype.length>1){

  setFiltertype(option.label);
  
  if(option.key==1){
    setstatistique2([])
    setstatistique3([])
    weekFilter()
  }
  if(option.key==2){
    setstatistique([])
    setstatistique3([])
  monthFilter()
   
     }

     if(option.key==3){
      setstatistique([])
      setstatistique2([])
    yearFilter()
     
       }
      }
else{
  alert("Choisi un categorie")
}






    };




    const handleOptionChange2 = (option) => {
      setFilterdepensetype(option.label);
      
      setFilterdepensenum(option.key)
    
    
        };








































        const mois_courts = ["jan", "fév", "mar", "avr", "mai", "jun", "jul", "aoû", "sep", "oct", "nov", "déc"];
  
  
const formatDate=(inputDate)=> {
  const parts = inputDate.split('/'); // Split the date string by '/'
  
  // Ensure there are three parts (day, month, and year)
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0'); // Ensure two digits for day
    const month = parts[1].padStart(2, '0'); // Ensure two digits for month
    const year = parts[2];
    
    return `${day}-${month}-${year}`;
  } else {
    return 'Invalid date format';
  }
}



const data = [
  { month: 'Jan', values: 20 },
  { month: 'Feb', values: 45 },
  
  
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


  const [loads, setload] = React.useState("none");
  const [componentWidth, setComponentWidth] = React.useState(0);
      





  return (






   <View onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%",paddingVertical:'0%'}}>
     <View style={{display:loads,backgroundColor:'black',opacity:0.65,position:'absolute',zIndex:1111,top:"0%",left:'0%',width:'100%',height:"100%"}}>
<View style={{
display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:"100%"
}}>
  
  <ActivityIndicator size="large" color="#007AFF" />
</View>
</View>

<View style={{display:'flex',justifyContent:'space-between',backgroundColor: '#5CCA00',paddingHorizontal:"5%",paddingVertical:'2%',height:'26%'}}
    >



<View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>

   <TouchableOpacity style={{marginTop:"10%"}} onPress={()=>{navigation.navigate("Home")}}>
    <Icon name="home" size={getResponsiveFontSize(29)} color="white" style={{marginLeft:'0%'}}/>
  </TouchableOpacity>
  
 
</View>




<View style={{display:'flex',justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>




<Text style={{fontSize:getResponsiveFontSize(12),fontFamily:'PoppinsSemiBold',color:'#F1EFEB'}}>Selectionner categories </Text>




                <ModalSelector
                    data={filterdepense}
                    initValue="Select Type"
                    onChange={handleOptionChange2}
                    style={{backgroundColor:'black',marginLeft:'2.5%',borderRadius:5,
                    width:'42%',paddingVertical:'1.15%',
                    display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'
                  }}
                 >
        
        
         
         
                   <TouchableOpacity>
                        <Text style={{fontSize:getResponsiveFontSize(11.5),fontFamily:"PoppinsRegular",color:'#BCBCBC'}} >  {filterdepensetype || 'choisi'} </Text>
                   </TouchableOpacity>
      
                
                
                </ModalSelector>



</View>













<View style={{marginTop:'3%',display:'flex',justifyContent:'center',flexDirection:'row',alignItems:'center'}}>



<Text style={{fontSize:getResponsiveFontSize(12),fontFamily:'PoppinsSemiBold',color:'#F1EFEB',marginLeft:'10%',textAlign:'center'}}>Filtrer par </Text>


<ModalSelector
                    data={filterdate}
                    initValue="Select Type"
                    onChange={handleOptionChange}
                    style={{backgroundColor:'black',borderRadius:5,marginLeft:'30%',
                    width:'25%',paddingVertical:'1.15%',
                    display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'
                  }}
                 >
        
        
         
         
                   <TouchableOpacity>
                        <Text style={{fontSize:getResponsiveFontSize(11.5),fontFamily:"PoppinsRegular",color:'#BCBCBC'}} >  {filtertype || 'choisi'} </Text>
                   </TouchableOpacity>
      
                
                
                </ModalSelector>



</View>




























</View>






<ScrollView   contentContainerStyle={{flexGrow:1,paddingVertical:getResponsiveFontSize(25)}} style={{marginTop:'0%',padding:'2%'}}>


{(statistique.length<1 && statistique2.length<1 && statistique3.length<1) &&(<Text style={{fontSize:getResponsiveFontSize(14),textAlign:'center',fontFamily:'PoppinsSemiBold',color:'#9D9D9D'}}>Choisir un type de filtre</Text>)}



{





statistique.length > 0 && statistique.map((x,key)=>{
if(key<(statistique.length-1))

  return(

  <View  key={key}  style={{backgroundColor:'white',paddingHorizontal:'7%',paddingVertical:'4.5%',borderRadius:getResponsiveFontSize(5),marginTop:'1.5%',
  display:'flex',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#EBEAEA'
,marginBottom:'1%'
}}>
      

      

  
      <Text style={{color:'#545456',fontSize:getResponsiveFontSize(14),marginTop:'1%',fontFamily:'PoppinsRegular'}}> La Semaine   {formatDate(x.date.toLocaleString().substring(0,9).replace(/,/g, ""))}   *    {statistique[key+1].date != undefined && formatDate(statistique[key+1].date.toLocaleString().substring(0,9).replace(/,/g, ""))} </Text>

  <Text style={{color:'black',fontSize:getResponsiveFontSize(17),fontFamily:'PoppinsSemiBold',marginTop:'2.5%',textAlign:'center'}}>{parseFloat(x.montant).toFixed(2)} DH</Text>





  </View>




)})



}






















{
statistique2.length > 0 && (

    
    <View style={{display:'block'}}>
      
    {  statistique2.reverse().map((x,key)=>{
  return(
    <>
    <Text style={{fontSize:getResponsiveFontSize(18.5),textAlign:'center',fontFamily:"PoppinsRegular",color:'#DA4521',marginTop:'8%'}}>{x.year}</Text>
<Animated.View style={{display:'block',opacity: fadeAnim,flexDirection: 'row',height:getResponsiveFontSize(400),width:"98%",marginTop:'5%'}} >
<YAxis
  data={x.stock.map(item => item.montant)}
  contentInset={{ top: 10, bottom: 20 }}
  svg={{ fill: 'grey', fontSize: getResponsiveFontSize(12) }}
  numberOfTicks={5}
/>
<View style={{ flex: 1, marginLeft: 15 }}>
  <BarChart
    style={{ flex: 1 }}
    data={x.stock.map(item => item.montant)}
    svg={{ fill: 'url(#gradient)' }}
    contentInset={{ top: 20, bottom: 10 }}
  >
    <Gradient />
  </BarChart>
  <XAxis
            style={{ marginHorizontal: 2,marginVertical:5 }}
            data={x.stock.map((_, index) => index)}
            formatLabel={(value, index) => mois_courts[x.stock[index].mois]}
            contentInset={{ left:getResponsiveFontSize(9), right: getResponsiveFontSize(9) }}
            svg={{ fontSize: getResponsiveFontSize(), fill: 'black' }}
          />
</View>
</Animated.View>
 </> )
})
}
</View>
)
}




























</ScrollView>


















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
export default Statistique