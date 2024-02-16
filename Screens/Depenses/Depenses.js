import React, { useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import {auth,db} from "../../Firebase/FirebaseConfig"
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import { collection,addDoc, where, getDocs, query, updateDoc } from 'firebase/firestore';
import { Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import ModalSelector from 'react-native-modal-selector';
import { Calendar } from 'react-native-calendars';
import { Modal } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Toast = ({ message, isVisible, onDismiss }) => {
  return (
    <>
      {isVisible && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{message}</Text>
          <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};



function Depenses({navigation ,route}) {

  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000); // Adjust the duration as needed
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















    
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [nom, setNom] = React.useState('');
    const [prenom, setPrenom] = React.useState('');
    const [ville, setVille] = React.useState('');
    const [fonction, setFonction] = React.useState('');
   
    const toggleCalendar = () => {setCalendarVisible(!isCalendarVisible);};
    const [secteur, setSecteur] = React.useState('');
    const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
    const [componentWidth, setComponentWidth] = useState(0);
    const [showAlert, setshowalert] = React.useState(false);
    const [Alertmsg, setalertmsg] = React.useState("");
    const [Calendrier, setCal] = React.useState("");
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [textInputValue2, setTextInputValue2] = useState('');
    const [list, setlist] = React.useState([]);
    const [textInputValue, setTextInputValue] = useState('');
    const [revenu, setrevenu] = useState(0);
    const [daten, setdaten] = React.useState(null);
    const [date, setdate] = useState(0);
    const [dateinscription, setdateinscription] = useState("");
    const [city, setCity] = React.useState('');
    const [datehelp, setDatehelp] = React.useState(null);
    const [isModalInitial, setModalInitial] = useState(false);
    const [budgetinitial, setbudgetinitial] = useState(0);
    const [telephone, setTel] = React.useState(""); 



    
    const [isModalbudgem, setModalbudgem] = useState(false);
    const [isModalbudged, setModalbudged] = useState(false);
    const [isModaldepense, setModaldepense] = useState(false);
    const [selectedDate, setSelectedDate] = useState(1);
    const [selectedDepensem, setSelectedDepensem] = useState(0);
    const [selectedBudgetm, setSelectedBudgetm] = useState(0);
    const [depenseid, setdepenseid] = useState(0);
 



    const [budgets, setBudget] = useState([{type:"Salaire",revenu:0,date:1,icon:"https://cdn-icons-png.flaticon.com/512/3790/3790140.png"},
    {type:"Pension retraite",revenu:0,date:1,icon:"https://cdn-icons-png.flaticon.com/512/5656/5656069.png"},
    {type:"Revenu Locatif",revenu:0,date:1,icon:"https://uploads-ssl.webflow.com/63f37f4229fe340e55bcd4c8/642585acbcda32f0e324a82f_undraw_House_searching_re_stk8.png"},
    {type:"Revenu de placement",revenu:0,date:1,icon:"https://img.freepik.com/vecteurs-premium/augmentation-du-revenu-fonds-communs-placement-rapport-statistique-boost-icone-productivite-entreprises-isole-fond-blanc-illustration-vectorielle_736051-459.jpg?w=2000"},
    {type:"Dividendes",revenu:0,date:1,icon:"https://cdn-icons-png.flaticon.com/512/2643/2643832.png"},
    {type:"Freelance",revenu:0,date:1,icon:"https://cdn-icons-png.flaticon.com/512/6553/6553383.png"},
    {type:"Autres",revenu:0,date:1,icon:"https://cdn-icons-png.flaticon.com/512/7580/7580275.png"}

    ]);


    const [depense, setDepense] = React.useState([]);


















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
        { key: 1, label: 'Privé' },
        { key: 2, label: 'Public' },

      ]

   


      
      
      const fonctions = [
        { key: 1, label: 'Architecte' },
        { key: 2, label: 'Avocat/avocate' },
        { key: 3, label: 'Analyste de données' },
        { key: 4, label: 'Analyste financier' },
        { key: 5, label: 'Archiviste' },
        { key: 6, label: 'Chirurgien/chirurgienne' },
        { key: 7, label: 'Comptable' },
        { key: 8, label: 'Consultant en gestion' },
        { key: 9, label: 'Développeur web' },
        { key: 10, label: 'Designer graphique' },
        { key: 11, label: 'Enseignant' },
        { key: 12, label: 'Infirmier/infirmière' },
        { key: 13, label: 'Ingénieur civil' },
        { key: 14, label: 'Ingénieur logiciel' },
        { key: 15, label: 'Journaliste' },
        { key: 16, label: 'Marketing Manager' },
        { key: 17, label: 'Médecin' },
        { key: 18, label: 'Photographe' },
        { key: 19, label: 'Plombier' },
        { key: 20, label: 'Psychologue' },
        { key: 21, label: 'Professeur d université' },
        { key: 22, label: 'Responsable des ressources humaines' },
        { key: 23, label: 'Technicien informatique' },
        { key: 24, label: 'Traducteur/traductrice' },
        { key: 25, label: 'Cuisinier/cuisinière' },
        { key: 26, label: 'Électricien/électricienne' },
        { key: 27, label: 'Infirmier/infirmière' },
        { key: 28, label: 'Pharmacien/pharmacienne' },
        { key: 29, label: 'Pilote d avion' },
        { key: 30, label: "Autre" },

      ];
      
      
















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
  
  
  






    const handleOptionChange = (option) => {
        setVille(option.label);
      };


      const handleOptionChange2 = (option) => {
        setFonction(option.label);
      };

      const handleOptionChange3 = (option) => {
        setSecteur(option.label);
      };




 

 
    
 
 















 const toggleBudgetm = (x) => {
    setModalbudgem(!isModalbudgem);
    setSelectedBudgetm(0)
    setrevenu(x)
  };



  const Savebudgetm = (x) => {
if(/\d/.test(selectedBudgetm)){

    setModalbudgem(false);

    const updatedOptions = budgets.map((option, index) => {
      if ((index) == revenu) {
        return {
          ...option,
          revenu: selectedBudgetm,
        };
      }
  
      return option;
    });

    setBudget(updatedOptions);
setSelectedBudgetm(0)

}

    else {
      alert("Entrez un vrai montant")
    }
  



  };








  const toggleBudgetd = (x) => {
    setModalbudged(!isModalbudged);
    //setdate(x)
  };


  const Savebudgetd = () => {
    setModalbudged(false);
    
    const updatedOptions = budgets.map((option, index) => {
      //if ((index) == date) {
       
        return {
          ...option,
          date: selectedDate,
        };
      //}
      //return option;
    });

    setBudget(updatedOptions);
    
    setSelectedBudgetm(0)
  };





const togglebudgetinitial = () => {
  setModalInitial(!isModalInitial);
};


const Savebudgetinitial = async() => {
  
  
  setModalInitial(!isModalInitial);
  const values = await AsyncStorage.getItem('userid');
  const q = query(collection(db, "users"), where("id", '==', values));
  const querySnapshot=await getDocs(q);
 
      querySnapshot.forEach((doc) => {
        // Update each document individually
        const docRef = doc.ref;
        updateDoc(docRef, { 
          id: values,
          nom: nom,
          prenom: prenom, 
          secteur: secteur, 
          ville: city,
          budget: budgets,  
          depense: depense, 
          fonction: fonction, 
          Datenaissance:Calendrier,
          budgetinitial:budgetinitial ,
         telephone:telephone
        }
          
          )
          .then(() => {
          return true
          navigation.navigate('Camera')
       
          })
          .catch((error) => {
    return false
          });
      });

};











/************************* */
  const toggledepense = (x) => {
    setModaldepense(!isModaldepense);
    setdepenseid(x)
    setSelectedDepensem(0)
  };


  const Savedepense = () => {
    setModaldepense(false);
    let stringWithPeriod = selectedDepensem.replace(',', '.');

    let convertedNumber = parseFloat(stringWithPeriod);
    const updatedOptions =depense.map((option, index) => {
      if ((index) == depenseid) {
       
        return {
          ...option,
          montant: convertedNumber,
        };
      }
      return option;
    });

    setDepense(updatedOptions);
    setSelectedDepensem(0)

  };




















 

    
    
    
    
  const numberOptions = Array.from({ length: 31 }, (_, index) => ({
    label: (index + 1).toString(),
    value: index + 1,
  }));
    
    
    




  const fetchItemsFromFirebase =async () => {
    const values = await AsyncStorage.getItem('userid');
    const docRef = await query(collection(db, "users"),where("id","==",values));
    const querySnapshot=await getDocs(docRef)
    let todos=[]
    querySnapshot.forEach(async(doc) => {
      const itemData = doc.data();
     
      setBudget(itemData.budget)
      setDepense(itemData.depense)
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
        dateinscription:itemData.dateinscription,
        budgetinitial:itemData.budgetinitial ,
        telephone:itemData.telephone
    };

      todos.push(item)
      await AsyncStorage.setItem("userid",itemData.id);
    });

    return todos;



  };





  const updateItemsFromFirebase =async () => {

setload("block")
const values = await AsyncStorage.getItem('userid');
    const q = query(collection(db, "users"), where("id", '==', values));
    const querySnapshot=await getDocs(q);
   
        querySnapshot.forEach((doc) => {
          // Update each document individually
          const docRef = doc.ref;
          updateDoc(docRef, { 
            id: values,
            nom: nom,
            prenom: prenom, 
            secteur: secteur, 
            ville: city,
            budget: budgets,  
            depense: depense, 
            fonction: fonction, 
            Datenaissance:Calendrier ,
            budgetinitial:budgetinitial ,
            telephone:telephone
          }
            
            )
            .then(() => {
             // console.log(`Document with ID ${doc.id} successfully updated!`);
              show()
              showToast('modification bien traite')
              setModalInitial(false)
            })
          
        });

      setModalInitial(false)
  }















  const show= async () => {
  

    const fetchedItems = await fetchItemsFromFirebase();

    setlist(fetchedItems);
   

    setNom(fetchedItems[0].nom)
    setPrenom(fetchedItems[0].prenom)
    setVille(fetchedItems[0].ville)
    setCity(fetchedItems[0].ville)
    setSecteur(fetchedItems[0].secteur)
    setFonction(fetchedItems[0].fonction)
    setCal(fetchedItems[0].Datenaissance)
    setdateinscription(fetchedItems[0].dateinscription)
    setbudgetinitial(fetchedItems[0].budgetinitial)
   
    setTel(fetchedItems[0].telephone)
   
    setload("none")





    const currentDate = new Date();

    // Given date string in the format "YYYY-MM-DD"
    const givenDateString = fetchedItems[0].dateinscription;
    
    // Parse the given date string into a Date object
    const givenDate = new Date(givenDateString);

    if (
      currentDate.getFullYear() === givenDate.getFullYear() &&
      currentDate.getMonth() === givenDate.getMonth() &&
      currentDate.getDate() === givenDate.getDate()
    ) {
      setModalInitial(true)
    } 






  };


  const [loads, setload] = React.useState("block");

    
useFocusEffect(
  React.useCallback(() => {

    setload("block")
    setModalInitial(false)
    show()    
    
  }, [])
);



const toggleModal2 = () => {
  //setdate(x)

 setModalVisible2(!isModalVisible2);
};




    
const showit=()=>{

  console.log(depense)
}
    











  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setCalendarVisible(Platform.OS === 'ios');
    setCal(currentDate.toLocaleDateString());
    setDatehelp(currentDate)
  };









  const myRef = useRef(null);




  


  return (
<LinearGradient ref={myRef} onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%"}}
      colors={['white', 'white', 'white']}
    
    >
<Toast
        message={toastMessage}
        isVisible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />




<View style={{position:'absolute',zIndex:1654,backgroundColor:'red',width:'100%'}}>
<Toast  config={{text:{fontSize:getResponsiveFontSize(25)}}} ref={(ref) => Toast.setRef(ref)}/>
</View>




























<View style={{height:'100%',paddingHorizontal:'1%'}}>







<ScrollView contentContainerStyle={{flexGrow:1,paddingVertical:getResponsiveFontSize(5)}}>
<TouchableOpacity onPress={()=>{updateItemsFromFirebase()}}  style={{width:"25%",marginTop:'3%',marginLeft:'70%',backgroundColor:'#4A83FE',paddingHorizontal:'2%',paddingVertical:'2%',marginBottom:"3%",borderRadius:5}}>
         <Text style={{fontSize:getResponsiveFontSize(15),textAlign:'center',color:'white',fontFamily:'PoppinsRegular'}}>Modifier</Text>
</TouchableOpacity>






<Modal visible={isModaldepense} animationIn="slideInUp" animationOut="slideOutDown">


 <View style={styles.modal}>
      
         <Text style={styles.modalTitle}>Modifier le montant </Text>

        <TextInput
           style={styles.textInput}
           placeholder="1000"
           keyboardType="numeric"
           value={selectedDepensem}
           onChangeText={setSelectedDepensem}

         />



  <View style={styles.buttonContainer}>
       <Button title="enregistrer" onPress={()=>{Savedepense()}} color="#007BFF" />
        <Button title="fermer" onPress={()=>{toggledepense() }} color="#FF6347" />
   </View>
 </View>
</Modal>




























    

    {depense.length>0 && depense.map((x,index)=>



<View key={index}  style={{backgroundColor:'white',paddingHorizontal:'1%',paddingVertical:'5.5%',borderRadius:5,borderWidth:1,borderColor:'#E5E5E7',marginTop:'4%',
  display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'97%',marginLeft:'1.8%',
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

<Image source={{uri:x.photo}} style={{width:"14%",height:'85%',marginBottom:'2%',resizeMode:'contain',borderRadius:50}} />
  <Text style={{width:'30%',fontSize:getResponsiveFontSize(12),fontFamily:'PoppinsMedium',color:'black',textAlign:'center',marginLeft:'0%'}}>{x.type}</Text>


<View style={{
backgroundColor:'#4816FF',width:'24%',color:'white',paddingHorizontal:'3%',paddingVertical:'0.35%',borderRadius:5,
alignSelf:'flex-start',marginTop:'2%',marginLeft:'-2%'
}}>
  <Text style={{fontSize:getResponsiveFontSize(12),fontFamily:'PoppinsMedium',color:'white',textAlign:'center',
}}>{x.montant}dh</Text>
</View>





<TouchableOpacity onPress={()=>{toggledepense(index)}} style={{
backgroundColor:'#40DC01',color:'white',paddingHorizontal:'2.5%',paddingVertical:'1%',borderRadius:5,display:'flex',flexDirection:'row',
alignItems:'center',alignSelf:'flex-start',marginTop:'2%',marginRight:'2%'
}}>
  <Text style={{fontSize:getResponsiveFontSize(12),fontFamily:'PoppinsMedium',color:'white',textAlign:'center',
}}>Modifier</Text>

</TouchableOpacity>

  </View>


)}










    

</ScrollView>        





</View>




</LinearGradient>

)
}


export default Depenses;

const styles = StyleSheet.create({
  toastContainer: {
    position:'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    zIndex:44,
    bottom: 5,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toastText: {
    color: '#fff',
  },
  dismissButton: {
    marginLeft: 10,
    padding: 5,
  },
  dismissButtonText: {
    color: '#fff',
  },
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