import React, { useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import {auth,db} from "../../Firebase/FirebaseConfig"
import { useState } from 'react';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import ModalSelector from 'react-native-modal-selector';

import { collection,addDoc, where, getDocs, query } from 'firebase/firestore';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';





import { Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';

import { ScrollView } from 'react-native';
import { FirebaseError } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Setupdepense=({navigation,route }) =>{


  const [isModalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [montant, setmontant] = useState(0);
  const [date, setdate] = useState(0);



  const [depenses, setDepenses] = useState(
    [{type:"Education & scolarité",montant:0,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/167/167707.png"},
  {type:"Crédit immobilier",montant:0,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3190/3190635.png"},
  {type:"Crédit consommation",montant:0,depense:[],photo:"https://static.vecteezy.com/ti/vecteur-libre/p1/4666647-credit-renouvelable-color-icon-consumer-lines-of-credit-achetant-marchandises-avec-emprunt-argent-commerce-retail-marketing-industrie-banque-business-budget-economy-isolated-vector-illustration-vectoriel.jpg"},
  {type:"Produits alimentaires",montant:0,depense:[],photo:'https://sms.hypotheses.org/files/2021/10/nourriture-saine4.png'},
  {type:"Restaurants et sorties",montant:0,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1996/1996068.png"},
  {type:"Santé",montant:0,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1040/1040238.png"},
  {type:"Téléphone",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/13/13936.png'},
  {type:"Shopping",montant:0,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3225/3225194.png"},
  {type:"Soins et beauté",montant:0,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1005/1005769.png"},
  {type:"Transport et voiture",montant:0,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/5771/5771799.png"},
  {type:"Voyages",montant:0,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3125/3125848.png"},
  {type:"Epargne",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/2721/2721091.png'},
  {type:"Eau/Electricité",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/4405/4405283.png'},
 // {type:"Electricité",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/2807/2807571.png'},
  {type:"Autres",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/744/744465.png'},
  {type:"Activités sportives",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/2216/2216769.png'},
]);

  const toggleModal = (x) => {
    setModalVisible(!isModalVisible);
    setmontant(x)
  };

  const handleSave = (x) => {
    setModalVisible(false);
    if(/\d/.test(textInputValue)){
    const updatedOptions = depenses.map((option, index) => {
      if ((index) == montant) {
        return {
          ...option,
          montant: textInputValue,
        };
      }
      return option;
    });

    setDepenses(updatedOptions);
  }
  else {
    alert("Entrez un vrai montant")
  }




  setTextInputValue('')
  };





  const [isModalVisible2, setModalVisible2] = useState(false);
  const [textInputValue2, setTextInputValue2] = useState('');
  const [buttonenable, setbuttonenable] = useState(false);


  const myRef = useRef(null);

















  










   
    

    const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
    const [componentWidth, setComponentWidth] = useState(0);
    const [showAlert, setshowalert] = React.useState(false);
    const [Alertmsg, setalertmsg] = React.useState("");
  
  
    
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






    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [nom, setNom] = React.useState('');
    const [prenom, setPrenom] = React.useState('');
    const [ville, setVille] = React.useState('');
    const [fonction, setFonction] = React.useState('');
    const [secteur, setSecteur] = React.useState('');




    const year = new Date().getFullYear().toString();
    const month = new Date().getMonth() + 1 ;
    const day = new Date().getDate();
    const  datein=`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;



    const newUser = {
        id: route.params.id,
        nom:route.params.nom,
        prenom:route.params.prenom,
        Datenaissance: route.params.daten,
        ville: route.params.ville,
        secteur: route.params.secteur,
        fonction: route.params.fonction,
        telephone:route.params.telephone,
          depense:depenses,
        budget:route.params.budget,
        dateinscription:datein,
        budgetinitial:0 ,
        factures:[],
        payments:[]
      };

      const handleOptions = async() => {
    
  setbuttonenable(true)
       // 
        try {
          const docRef = await addDoc(collection(db, "users"),newUser);
         await AsyncStorage.setItem("userid",route.params.id);
         navigation.navigate('Profile')
          } catch (error) {
           return false;
          }
      };

    






  return (
<LinearGradient ref={myRef}  onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%"}}
      colors={['#528f76', '#5EC309', '#5CCA00']}
    
    >





<View style={{height:'20%',display:'flex',justifyContent:'space-around',alignItems: 'center'}}>

<Text style={{fontSize:getResponsiveFontSize(21),fontFamily:'PoppinsBold',color:'white'}}>Compléter vos données</Text>

</View>



<View style={{backgroundColor:'white',height:'80%',paddingTop:'7%',borderTopLeftRadius: getResponsiveFontSize(55),borderTopRightRadius:getResponsiveFontSize(55)}}>



<Text style={{fontSize:getResponsiveFontSize(12),fontFamily:'PoppinsMedium',color:'black',textAlign:'center'}}>Etablir votre budget de dépenses prévisionnelles </Text>


<ScrollView contentContainerStyle={{flexGrow:1,paddingVertical:getResponsiveFontSize(25)}} style={{flex:1,marginTop:'7%',padding:'0%',paddingLeft:'1%',paddingRight:'1%',paddingVertical:'0%'}}>








<View style={styles.container}>
   
      <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Entrez le montant </Text>
          <TextInput
            style={styles.textInput}
            placeholder="1000"
            value={textInputValue}
            keyboardType="numeric"
            onChangeText={setTextInputValue}
          />
          <View style={styles.buttonContainer}>
            <Button title="enregistrer" onPress={handleSave} color="#007BFF" />
            <Button title="fermer" onPress={toggleModal} color="#FF6347" />
          </View>
        </View>
      </Modal>
  </View>





























  {depenses.map((x,index)=>


<View key={index}  style={{backgroundColor:'white',paddingHorizontal:'0%',paddingVertical:'5.5%',borderRadius:5,borderWidth:1,borderColor:'#E5E5E7',marginTop:'4%',
  display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'93%',marginLeft:'3.8%',
...Platform.select({
  ios: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  android: {
    elevation:3,
  },})
,marginBottom:'2%'
}}>


<Image source={{uri:x.photo}} style={{width:"18%",height:'85%',marginBottom:'2%',resizeMode:'contain',borderRadius:50}} />

  <Text style={{width:'35%',fontSize:getResponsiveFontSize(12),fontFamily:'PoppinsMedium',color:'black',textAlign:'center',marginLeft:'-5%'}}>{x.type}</Text>


<View style={{
backgroundColor:'#4816FF',width:'24%',color:'white',paddingHorizontal:'3%',paddingVertical:'0.35%',borderRadius:5,
alignSelf:'flex-start',marginRight:'1%',marginTop:'2%'
}}>
  <Text style={{fontSize:getResponsiveFontSize(13),fontFamily:'PoppinsMedium',color:'white',textAlign:'center',
}}>{x.montant}dh</Text>
</View>





<TouchableOpacity onPress={()=>{toggleModal(index)}} style={{
backgroundColor:'#40DC01',color:'white',paddingHorizontal:'2.5%',paddingVertical:'1%',borderRadius:5,display:'flex',flexDirection:'row',
alignItems:'center',alignSelf:'flex-start',marginRight:'1%',marginTop:'2%'
}}>
  <Text style={{fontSize:getResponsiveFontSize(12),fontFamily:'PoppinsMedium',color:'white',textAlign:'center',
}}>Modifier</Text>

</TouchableOpacity>

  </View>








)}





</ScrollView>




















    


<TouchableOpacity disabled={false} onPress={()=>{handleOptions()}}  style={{width:"25%",marginBottom:'2%',marginLeft:'70%',backgroundColor:'#4A83FE',paddingHorizontal:'2%',paddingVertical:'2%',borderRadius:5}}>
         <Text style={{fontSize:getResponsiveFontSize(15),textAlign:'center',color:'white',fontFamily:'PoppinsRegular'}}>FINIR</Text>
</TouchableOpacity>

        






</View>




</LinearGradient>

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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
  },
});
export default Setupdepense