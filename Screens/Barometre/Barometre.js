import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
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




function Barometre({navigation,route }) {



    const [componentWidth, setComponentWidth] = React.useState(0);
    const [alerto, setAlerto] = React.useState(true);
    const [focus, setFocus] = React.useState(0);

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
     
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [type, setType] = React.useState("");




    const openModal = (x,type,budget,m) => {
     // setModalVisible(true);
      setType(type)
      setSelectenum(x)
alert("fffffffff")
    //  navigation.navigate('AddDepense',{type:type,num:selectenum,budget:budget,max:m})

     
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


         itemData.depense.map((x)=>{
            x.depense.map((y)=>{
              setBudget(budget=>budget-parseFloat(y.montant))  
            })
          
         })



       
       setload('none')
        });
    
     
    
    
    
      };





  

    
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
  
  





  return (
   <View onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%",paddingVertical:'0%'}}>
    








  











<ScrollView  contentContainerStyle={{flexGrow:1,paddingVertical:getResponsiveFontSize(20)}} style={{marginTop:'0%'}}>



{
 
depenses.map((x,index)=>{

var pourcentage=0;

var m=0;

return(


<TouchableOpacity key={index}  style={{backgroundColor:'white',paddingHorizontal:'3%',paddingVertical:'10%',borderRadius:getResponsiveFontSize(15),marginTop:'5.5%',
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
<LinearGradient  style={{height:getResponsiveFontSize(10),opacity:0.2,borderRadius:getResponsiveFontSize(15),width:`${ (((m/x.montant)*100+7)<100 ? ((m/x.montant)*100+7) : 107)}%`,backgroundColor:'white',position:'absolute',top:"0%",left:"0%",paddingHorizontal:"2%",flex:1,paddingVertical:"3%"}}
colors={['#F3F0F0',m/x.montant*100 <30 ?'gray' :m/x.montant*100 <80 ? 'blue' : 'red']}
start={{ x: 0, y: 0 }} // Start position (top-left)
end={{ x: 0.75, y: 1.85 }} 
    
    >





        </LinearGradient>

}



  </TouchableOpacity>





)


})}









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
export default Barometre;