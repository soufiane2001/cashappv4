import React, { useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator, Animated, Easing } from 'react-native';
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
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, Ionicons } from '@expo/vector-icons';


function  Parametere({navigation ,route}) {

  const [isCalendarVisible, setCalendarVisible] = useState(false);



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

  const q = query(collection(db, "users"), where("id", '==', route.params.id));
  const querySnapshot=await getDocs(q);
 
      querySnapshot.forEach((doc) => {
        // Update each document individually
        const docRef = doc.ref;
        updateDoc(docRef, { 
          id: route.params.id,
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
    
    const updatedOptions =depense.map((option, index) => {
      if ((index) == depenseid) {
       
        return {
          ...option,
          montant: selectedDepensem,
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
    const docRef = await query(collection(db, "users"),where("id","==",route.params.id));
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

    const q = query(collection(db, "users"), where("id", '==', route.params.id));
    const querySnapshot=await getDocs(q);
   
        querySnapshot.forEach((doc) => {
          // Update each document individually
          const docRef = doc.ref;
          updateDoc(docRef, { 
            id: route.params.id,
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
      currentDate.getFullYear() == givenDate.getFullYear() &&
      currentDate.getMonth() == givenDate.getMonth() &&
      currentDate.getDate() == givenDate.getDate()
    ) {
      setModalInitial(true)
    } 






  };


  const [loads, setload] = React.useState("block");

    
useFocusEffect(
  React.useCallback(() => {

    
  }, [])
);



const toggleModal2 = () => {
  //setdate(x)

 setModalVisible2(!isModalVisible2);
};




    
const showit=()=>{

  console.log(depense)
}
    



const showToast=()=>{
  Toast.show({
    position: 'top', // 'top' or 'bottom'
    text1: 'Success', 
    text2: 'modification', // Subtitle text
    visibilityTime: 3000, // Time (in milliseconds) to auto-hide the toast
    autoHide: true, // Automatically hide the toast after visibilityTime
    topOffset: 30, // Offset from the top (if position is 'top')
    bottomOffset: 30, 
    text1Style:{
      fontSize: 45,
      fontWeight: '400'
    },
  })}








  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setCalendarVisible(Platform.OS === 'ios');
    setCal(currentDate.toLocaleDateString());
    setDatehelp(currentDate)
  };









  const myRef = useRef(null);
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
<LinearGradient ref={myRef} onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%"}}
      colors={['#528f76', '#5EC309', '#5CCA00']}
    
    >




<View style={{position:'absolute',zIndex:1654,backgroundColor:'red',width:'100%'}}>
<Toast  config={{text:{fontSize:getResponsiveFontSize(25)}}} ref={(ref) => Toast.setRef(ref)}/>
</View>





























<View style={{height:'15%',display:'flex',flexDirection:'row',alignItems: 'center',justifyContent:"center",paddingHorizontal:'4%'}}>

<Text style={{fontSize:getResponsiveFontSize(20),fontFamily:'PoppinsBold',color:'white',marginLeft:'0.5%'}}>Parametre</Text>

</View>



<View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:'100%',justifyContent:'space-around',alignItems:'center',backgroundColor:'white',height:'78%',padding:'5%',borderTopLeftRadius: getResponsiveFontSize(55),borderTopRightRadius:getResponsiveFontSize(55)}}>


<TouchableOpacity onPress={()=>{navigation.navigate("Profile")}} style={{height:"20%",borderRadius:getResponsiveFontSize(30),width:getResponsiveFontSize(150),backgroundColor:'white',...Platform.select({
  ios: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 4,
  },
  android: {
    elevation:6,
  },}) ,display:"flex",justifyContent:"center",alignItems:"center",padding:'3%',marginTop:'60%'}}>
<Image source={{uri:"https://cdn-icons-png.flaticon.com/512/3589/3589034.png"}} style={{width:"100%",height:'100%',resizeMode:'contain',borderRadius:50}} />
<Text style={{marginBottom:"20%",fontSize:getResponsiveFontSize(17),fontFamily:"PoppinsRegular"}}>Info personnel</Text>
</TouchableOpacity>







<TouchableOpacity onPress={()=>{navigation.navigate("Transactions")}} style={{height:"20%",borderRadius:getResponsiveFontSize(30),width:getResponsiveFontSize(150),backgroundColor:'white',...Platform.select({
  ios: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 4,
  },
  android: {
    elevation:6,
  },}) ,display:"flex",justifyContent:"center",alignItems:"center",padding:'3%'}}>
<Image source={{uri:"https://cdn-icons-png.flaticon.com/512/7180/7180153.png"}} style={{width:"100%",height:'120%',resizeMode:'contain',borderRadius:50}} />
<Text style={{marginBottom:"30%",fontSize:getResponsiveFontSize(17),fontFamily:"PoppinsRegular"}}>transaction</Text>
</TouchableOpacity>


<TouchableOpacity onPress={()=>{navigation.navigate("Wallet")}} style={{height:"20%",borderRadius:getResponsiveFontSize(30),width:getResponsiveFontSize(150),backgroundColor:'white',...Platform.select({
  ios: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 4,
  },
  android: {
    elevation:6,
  },}) ,display:"flex",justifyContent:"center",alignItems:"center",padding:'3%'}}>
<Image source={{uri:"https://cdn-icons-png.flaticon.com/512/6772/6772402.png"}} style={{width:"100%",height:'100%',resizeMode:'contain',borderRadius:50}} />
<Text style={{marginBottom:"20%",fontSize:getResponsiveFontSize(20),fontFamily:"PoppinsRegular"}}>Wallet</Text>
</TouchableOpacity>



<TouchableOpacity style={{height:"20%",borderRadius:getResponsiveFontSize(30),width:getResponsiveFontSize(150),backgroundColor:'white',...Platform.select({
  ios: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 4,
  },
  android: {
    elevation:6,
  },}) ,display:"flex",justifyContent:"center",alignItems:"center",padding:'3%'}}>
<Image source={{uri:"https://cdn-icons-png.flaticon.com/512/9897/9897155.png"}} style={{width:"100%",height:'100%',resizeMode:'contain',borderRadius:50}} />
<Text style={{marginBottom:"20%",fontSize:getResponsiveFontSize(17),fontFamily:"PoppinsRegular"}}>politique general</Text>
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



</LinearGradient>

)
}


export default Parametere;

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