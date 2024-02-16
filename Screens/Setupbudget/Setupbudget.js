import React from 'react'
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








function Setupbudget({navigation ,route}) {
 
 
 
 
 
 
 
 
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [nom, setNom] = React.useState('');
  const [prenom, setPrenom] = React.useState('');
  const [ville, setVille] = React.useState('');
  const [fonction, setFonction] = React.useState('');
  const [secteur, setSecteur] = React.useState('');
  const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
  const [componentWidth, setComponentWidth] = useState(0);
  const [showAlert, setshowalert] = React.useState(false);
  const [Alertmsg, setalertmsg] = React.useState("");
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [textInputValue2, setTextInputValue2] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [revenu, setrevenu] = useState(0);
  const [date, setdate] = useState(0);
  const [budgets, setBudget] = useState([{type:"Salaire",revenu:0,date:1,icon:"https://cdn-icons-png.flaticon.com/512/3790/3790140.png"},
                                         {type:"Pension retraite",revenu:0,date:1,icon:"https://cdn-icons-png.flaticon.com/512/5656/5656069.png"},
                                         {type:"Revenu Locatif",revenu:0,date:1,icon:"https://uploads-ssl.webflow.com/63f37f4229fe340e55bcd4c8/642585acbcda32f0e324a82f_undraw_House_searching_re_stk8.png"},
                                         {type:"Revenu de placement",revenu:0,date:1,icon:"https://img.freepik.com/vecteurs-premium/augmentation-du-revenu-fonds-communs-placement-rapport-statistique-boost-icone-productivite-entreprises-isole-fond-blanc-illustration-vectorielle_736051-459.jpg?w=2000"},
                                         {type:"Dividendes",revenu:0,date:1,icon:"https://cdn-icons-png.flaticon.com/512/2643/2643832.png"},
                                         {type:"Freelance",revenu:0,date:1,icon:"https://cdn-icons-png.flaticon.com/512/6553/6553383.png"},
                                         {type:"Autres",revenu:0,date:1,icon:"https://cdn-icons-png.flaticon.com/512/7580/7580275.png"}

                                         ]);













  const toggleModal = (x) => {
    setModalVisible(!isModalVisible);
    setrevenu(x)
  };







  const handleSave = (x) => {
    setModalVisible(false);

    if(/\d/.test(textInputValue)){


    const updatedOptions = budgets.map((option, index) => {
      if ((index) == revenu) {
        return {
          ...option,
          revenu: textInputValue,
        };
      }
      return option;
    });

    setBudget(updatedOptions);
  }

  else {
    alert("Entrez un vrai montant")
  }



setTextInputValue('')




  };








  const handleSave2 = () => {
    setModalVisible2(false);
  //  if(/\d/.test(textInputValue)){
    
    const updatedOptions = budgets.map((option, index) => {
    
       
        return {
          ...option,
          date: selectedNumber,
        };
      
  
    });

    setBudget(updatedOptions);
  //}
  




  };





  





  const toggleModal2 = () => {
     //setdate(x)
   
    setModalVisible2(!isModalVisible2);
  };


















    const age = [
        { key: '18', label: 18 },
        { key: '19', label: 19 },
        { key: '20', label: 20 },
        { key: '21', label: 21 },
        { key: '22', label: 22 },
        { key: '23', label: 23 },
        { key: '24', label: 24 },
        { key: '25', label: 25 },
        { key: '26', label: 26 },
        { key: '27', label: 27 },
        { key: '28', label: 28 },
        { key: '29', label: 29 },
        { key: '30', label: 30 },
        { key: '31', label: 31 },
        { key: '32', label: 32 },
        { key: '33', label: 33 },
        { key: '34', label: 34 },
        { key: '35', label: 35 },
        { key: '36', label: 36 },
        { key: '37', label: 37 },
        { key: '38', label: 38 },
        { key: '39', label: 39 },
        { key: '40', label: 40 },
        { key: '41', label: 41 },
        { key: '42', label: 42 },
        { key: '43', label: 43 },
        { key: '44', label: 44 },
        { key: '45', label: 45 },
        { key: '46', label: 46 },
        { key: '47', label: 47 },
        { key: '48', label: 48 },
        { key: '49', label: 49 },
        { key: '50', label: 50 },
      ];















    

    
  
    
    





   


    const villes = [
        { key: 1, label: 'Agadir' },
        { key: 2, label: 'Ahfir' },
        { key: 3, label: 'Ain Harrouda' },
        { key: 4, label: 'Al Hoceima' },
        { key: 5, label: 'Asilah' },
        { key: 6, label: 'Azrou' },
        { key: 7, label: 'Beni Ansar' },
        { key: 8, label: 'Beni Mellal' },
        { key: 9, label: 'Benslimane' },
        { key: 10, label: 'Berkane' },
        { key: 11, label: 'Berrechid' },
        { key: 12, label: 'Casablanca' },
        { key: 13, label: 'Dar Bouazza' },
        { key: 14, label: 'Dakhla' },
        { key: 15, label: 'El Jadida' },
        { key: 16, label: 'Fes' },
        { key: 17, label: 'Inezgane' },
        { key: 18, label: 'Kasba Tadla' },
        { key: 19, label: 'Kenitra' },
        { key: 20, label: 'Laayoune' },
        { key: 21, label: 'Marrakech' },
        { key: 22, label: 'Meknes' },
        { key: 23, label: 'Mohammedia' },
        { key: 24, label: 'Nador' },
        { key: 25, label: 'Ouarzazate' },
        { key: 26, label: 'Oujda' },
        { key: 27, label: 'Rabat' },
        { key: 28, label: 'Sale' },
        { key: 29, label: 'Settat' },
        { key: 30, label: 'Sidi Bennour' },
        { key: 31, label: 'Sidi Ifni' },
        { key: 32, label: 'Sidi Kacem' },
        { key: 33, label: 'Sidi Slimane' },
        { key: 34, label: 'Skhirat' },
        { key: 35, label: 'Souk El Arbaa' },
        { key: 36, label: 'Tahala' },
        { key: 37, label: 'Tangier' },
        { key: 38, label: 'Taza' },
        { key: 39, label: 'Temara' },
        { key: 40, label: 'Tetouan' },
        { key: 41, label: 'Tiznit' },
        { key: 42, label: 'Touarga' },
        { key: 43, label: 'Touissit' },
        { key: 44, label: 'Taza' },
        { key: 45, label: 'Tifelt' },
        { key: 46, label: 'Tinghir' },
        { key: 47, label: 'Tifelt' },
        { key: 48, label: 'Youssoufia' },
        { key: 49, label: 'Zagora' },

      ];


         

      const secteurs = [
        { key: 1, label: 'Prive' },
        { key: 2, label: 'Public' },

      ]

   


      
      
      const fonctions = [
        { key: 1, label: 'Ingénieur logiciel' },
        { key: 2, label: 'Médecin' },
        { key: 3, label: 'Enseignant' },
        { key: 4, label: 'Infirmier/infirmière' },
        { key: 5, label: 'Avocat/avocate' },
        { key: 6, label: 'Designer graphique' },
        { key: 7, label: 'Comptable' },
        { key: 8, label: 'Électricien/électricienne' },
        { key: 9, label: 'Plombier' },
        { key: 10, label: 'Cuisinier/cuisinière' },
        { key: 11, label: 'Architecte' },
  { key: 12, label: 'Consultant en gestion' },
  { key: 13, label: 'Chef de projet' },
  { key: 14, label: 'Journaliste' },
  { key: 15, label: 'Traducteur/traductrice' },
  { key: 16, label: 'Marketing Manager' },
  { key: 17, label: 'Technicien informatique' },
  { key: 18, label: 'Infirmier/infirmière' },
  { key: 19, label: 'Pharmacien/pharmacienne' },
  { key: 20, label: 'Analyste financier' },

  { key: 21, label: 'Ingénieur civil' },
  { key: 22, label: 'Chirurgien/chirurgienne' },
  { key: 23, label: 'Professeur d université' },
  { key: 24, label: 'Psychologue' },
  { key: 25, label: 'Responsable des ressources humaines' },
  { key: 26, label: 'Développeur web' },
  { key: 27, label: 'Analyste de données' },
  { key: 28, label: 'Archiviste' },
  { key: 29, label: 'Photographe' },
  { key: 30, label: 'Pilote d avion' },

      ];
      









     const handleOptionChange = (option) => {
        setVille(option.label);
      };










      const handleOptionChange2 = (option) => {
        setFonction(option.label);
      };






      const handleOptionChange3 = (option) => {
        setSecteur(option.label);
      };









      const handleOptions = (option) => {
        
       
       navigation.navigate("Setupdepense",{budget:budgets,id:route.params.id,telephone:route.params.telephone,nom:route.params.nom,prenom:route.params.prenom,nom:route.params.nom,ville:route.params.ville,
        secteur:route.params.secteur,fonction:route.params.fonction,
      daten:route.params.daten})
      };










      const numberOptions = Array.from({ length: 31 }, (_, index) => ({
        label: (index + 1).toString(),
        value: index + 1,
      }));




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
  



















  return (





      <LinearGradient  onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%"}}
      colors={['#528f76', '#5EC309', '#5CCA00']}
    
       >





            <View style={{height:'20%',display:'flex',justifyContent:'space-around',alignItems: 'center'}}>

                 <Text style={{fontSize:getResponsiveFontSize(21),fontFamily:'PoppinsBold',color:'white'}}>Compléter vos données</Text>

             </View>






           <View style={{backgroundColor:'white',height:'80%',paddingTop:'7%',borderTopLeftRadius: getResponsiveFontSize(55),borderTopRightRadius:getResponsiveFontSize(55)}}>



                <Text style={{fontSize:getResponsiveFontSize(13),fontFamily:'PoppinsMedium',color:'black',textAlign:'center'}}>Quels sont vos revenus …Shut c’est confidentiel !</Text>







          










           <ScrollView contentContainerStyle={{flexGrow:1,paddingVertical:getResponsiveFontSize(25)}} style={{flex:1,marginTop:'4%',marginBottom:'2%',padding:'0%',paddingLeft:'1%',paddingRight:'1%',paddingVertical:'0%'}}>




              <View style={styles.container}>
   
                      <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
       
       
                         <View style={styles.modal}>
                              
                                 <Text style={styles.modalTitle}>Entrez le montant </Text>
         
                                <TextInput
                                   style={styles.textInput}
                                   placeholder="1000"
                                   keyboardType="numeric"
                                   value={textInputValue}
                                   onChangeText={setTextInputValue}
          
                                 />
          
          
          
                          <View style={styles.buttonContainer}>
                               <Button title="enregistrer" onPress={handleSave} color="#007BFF" />
                                <Button title="fermer" onPress={toggleModal} color="#FF6347" />
                           </View>
                         </View>
     
     
                       </Modal>
  
                      </View>







                   <View style={styles.container}>
    
    
                        <Modal isVisible={isModalVisible2} animationIn="slideInUp" animationOut="slideOutDown">
                           <View style={styles.modal}>
                             <Text style={styles.modalTitle}>Entrez le jour du moi</Text>
                               <RNPickerSelect
                                  value={selectedNumber}
                                  onValueChange={(value) => setSelectedNumber(value)}
                                  items={numberOptions}
                                  style={pickerSelectStyles}
                                 />
          
          
                             <View style={styles.buttonContainer}>
                              <Button title="enregistrer" onPress={handleSave2} color="#007BFF" />
                              <Button title="fermer" onPress={toggleModal2} color="#FF6347" />
                             </View>
                            </View>
                        </Modal>

                    </View>









  {budgets.map((x,index)=>


            <View key={index} style={{backgroundColor:'white',paddingHorizontal:'0%',paddingVertical:'5.5%',borderRadius:5,borderWidth:1,borderColor:'#F7F7F7',marginTop:'4%',
                          display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'93%',marginLeft:'3.2%',
                         ...Platform.select({
                                           ios: {
                                                  shadowColor: 'black',
                                                  shadowOffset: { width: 0, height: 2 },
                                                  shadowOpacity: 0.1,
                                                  shadowRadius: 2,
                                                   },
                                             android: {
                                                          elevation:5,
                                             },})

             }}>

  
<Image source={{uri:x.icon}} style={{width:"18%",height:'85%',marginBottom:'2%',resizeMode:'contain',borderRadius:50}} />

         <Text style={{width:'40%',fontSize:getResponsiveFontSize(13),fontFamily:'PoppinsMedium',color:'black',textAlign:'center',marginLeft:'0%'}}>{x.type}</Text>


                <TouchableOpacity onPress={()=>{toggleModal(index)}} style={{backgroundColor:'#4816FF',width:'29%',color:'white',paddingHorizontal:'1%',borderRadius:5,
                             alignSelf:'flex-start',marginRight:'4%',marginTop:'2%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'
                               }}>



                  <Text style={{fontSize:getResponsiveFontSize(14),fontFamily:'PoppinsMedium',color:'white',textAlign:'center',display:'flex',marginTop:'2%'}}>{x.revenu} dh</Text></TouchableOpacity>




               











  
                 </View>


                 )}


               </ScrollView>









    


<TouchableOpacity onPress={()=>{handleOptions()}}  style={{width:"25%",marginBottom:'2%',marginLeft:'70%',backgroundColor:'#4A83FE',paddingHorizontal:'2%',paddingVertical:'1.75%',borderRadius:5}}>
         <Text style={{fontSize:getResponsiveFontSize(13),textAlign:'center',color:'white',fontFamily:'PoppinsRegular'}}>SUIVANT</Text>
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
export default Setupbudget