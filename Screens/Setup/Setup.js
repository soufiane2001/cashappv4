import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import {auth,db} from "../../Firebase/FirebaseConfig"
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection,addDoc, where, getDocs, query } from 'firebase/firestore';
import { Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';

import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector';
import { Calendar } from 'react-native-calendars';









function Setup({navigation ,route}) {



    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [nom, setNom] = React.useState('');  
    const [telephone, setTel] = React.useState('');  
   const [enabled, setEnabled] = useState(true);
    const [prenom, setPrenom] = React.useState('');
    const [ville, setVille] = React.useState('');
    const [city, setCity] = React.useState('');
    const [fonction, setFonction] = React.useState('');
    const [secteur, setSecteur] = React.useState('');
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
    const [componentWidth, setComponentWidth] = useState(0);
    const [showAlert, setshowalert] = React.useState(false);
    const [Alertmsg, setalertmsg] = React.useState("");
    const [Calendrier, setCal] = React.useState("");
    const [datehelp, setDatehelp] = React.useState(null);
    const [complete, setComplet] = React.useState(0);
    const [bg, setBg] = React.useState("white");
    const [Color, setColor] = React.useState("black");
    const toggleCalendar = () => {setCalendarVisible(!isCalendarVisible);};
   
   
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
        { key: 1, label: 'Privé' },
        { key: 2, label: 'Public' },

      ]

  
      const fonctionspublic = [
        { key: 1, label: 'Administrateur public' },
        { key: 2, label: 'Secrétaire administratif' },
        { key: 3, label: 'Responsable des affaires  publiques' },
        { key: 4, label: 'Policier' },
        { key: 5, label: 'Agent de sécurité publique' },
        { key: 6, label: 'Agent pénitentiaire' },
        { key: 7, label: 'Garde forestier' },
        { key: 8, label: 'Enseignant' },
        { key: 9, label: 'Directeur école publique' },
        { key: 10, label: 'Inspecteur académique' },
        { key: 11, label: 'Chercheur universitaire' },
        { key: 12, label: 'Médecin de santé publique' },
        { key: 13, label: 'Infirmier/infirmière en santé publique' },
        { key: 14, label: 'Épidemiologiste' },
        { key: 15, label: 'Agent de santé environnementale' },
        { key: 16, label: 'Travailleur social' },
        { key: 17, label: 'Psychologue clinicien' },
        { key: 18, label: 'Coordinateur de programmes sociaux' },
        { key: 19, label: 'Agent de développement communautaire' },
        { key: 20, label: 'Avocat de l État' },
        { key: 21, label: 'Expert-comptable public' },
        { key: 22, label: 'Médecin consultant pour les services publics' },
        { key: 23, label: 'Architecte travaillant sur des projets gouvernementaux' },
        { key: 24, label: "Autre" },
      ]

      const fonctionsprive = [
        { key: 1, label: 'PDG (Chief Executive Officer -CEO) ' },
        { key: 2, label: 'Directeur financier (CFO)' },
        { key: 3, label: 'Directeur des opérations (COO)' },
        { key: 4, label: 'Directeur des ressources humaines (HRD)' },
        { key: 5, label: 'Ingénieur en chef' },
        { key: 6, label: 'Chercheur principal' },
        { key: 7, label: 'Développeur de produits' },
        { key: 8, label: 'Technicien en R&D' },
        { key: 9, label: 'Directeur commercial' },
        { key: 10, label: 'Responsable marketing' },
        { key: 11, label: 'Représentant des ventes' },
        { key: 12, label: 'Spécialiste en marketing digital' },
        { key: 13, label: 'Analyste financier' },
        { key: 14, label: 'Gestionnaire de portefeuille' },
        { key: 15, label: 'Contrôleur financier' },
        { key: 16, label: 'Conseiller fiscal' },
        { key: 17, label: 'Responsable formation' },
        { key: 18, label: 'Recruteur' },
        { key: 19, label: 'Gestionnaire des avantages sociaux' },
        { key: 20, label: 'Spécialiste en développement organisationnel' },
        { key: 21, label: 'Avocat indépendant' },
        { key: 22, label: 'Expert-comptable consultant' },
        { key: 23, label: 'Médecin exerçant en cabinet privé' },
        { key: 24, label: "Architecte travaillant sur des projets privés ou commerciaux" },
        { key: 25, label: "Autre" },
      ]





      const [fonctions,setFonctions]=useState([]);




   











 
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
        if(option.label=="Public"){
 setFonctions(fonctionspublic)
        }
        else{
          setFonctions(fonctionsprive)
        }
      };




      const handleOptions = (option) => {
        
       setNom("")
       setPrenom("")
       setVille("")
       setSecteur('')
       setFonction("")
       setCal("")
       setTel('')
        navigation.navigate('Setupbudget', {id:route.params.id,nom:nom,prenom:prenom,nom:nom,ville:city,secteur:secteur,telephone:telephone,fonction:fonction,daten:Calendrier});
      
      };



















React.useEffect(()=>{

var count=0;
setComplet(0);

if(nom.length>3){

  count+=13;
}
if(prenom.length>3){

  count+=13;
}
if(city.length>2){

count+=13;
}
if(secteur.length>4){

  count+=13;
}
if(fonction.length>4){

  count+=13;
}
if(Calendrier.length>4){
 
  count+=13;
}
if(telephone.length>6){
  count+=13;
}




if(count>90){
  count=100;

}


if(count>0 && count<100){
  setBg("blue")
  setColor("#C3C1C1")
}
if(count>=100){
  setEnabled(prevEnabled => !prevEnabled);
  setBg("#32F517")
  setColor("black")
}


setComplet(count);

},[nom,prenom,secteur,fonction,Calendrier,telephone,city])

















const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setCalendarVisible(Platform.OS === 'ios');
  setCal(currentDate.toLocaleDateString());
  setDatehelp(currentDate)
};









  return (
    <LinearGradient  onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%"}}
      colors={['#528f76', '#5EC309', '#5CCA00']}
     >





         <View style={{height:'20%',display:'flex',justifyContent:'space-around',alignItems: 'center'}}>

             <Text style={{fontSize:getResponsiveFontSize(21),fontFamily:'PoppinsBold',color:'white'}}>Completer vos donnees</Text>

         </View>



         <View style={{backgroundColor:'white',height:'80%',paddingTop:'10%',borderTopLeftRadius: getResponsiveFontSize(55),borderTopRightRadius:getResponsiveFontSize(55)}}>


<ScrollView style={{height:"92.2%"}}>


               <Text style={{fontSize:getResponsiveFontSize(15),fontFamily:'PoppinsSemiBold',color:'black',textAlign:'center'}}>Svp Entrez vos donnees personnel</Text>




              <TextInput 
                onChangeText={setNom}
                value={nom}
                style={{width:'90%',padding:"0%", borderColor:'#F0F0F0',paddingVertical:'2.5%',paddingLeft:'5%',borderRadius:5,marginTop:'7%',backgroundColor:'#F3F3FC',marginLeft:'5%',fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'#484948', }}
                placeholder="Nom"
                placeholderTextColor="#BCBCBC" 
                />



               <TextInput 
                  onChangeText={setPrenom}
                  value={prenom}
                  style={{width:'90%',padding:"0%", borderColor:'#F0F0F0',paddingVertical:'2.4%',paddingLeft:'5%',borderRadius:5,marginTop:'7%',backgroundColor:'#F3F3FC',marginLeft:'5%',fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'#484948',    }}
                  placeholder="Prenom"
                  placeholderTextColor="#BCBCBC" 
                  />


<TextInput 
                  onChangeText={setCity}
                  value={city}
                  style={{width:'90%',padding:"0%", borderColor:'#F0F0F0',paddingVertical:'2.4%',paddingLeft:'5%',borderRadius:5,marginTop:'7%',backgroundColor:'#F3F3FC',marginLeft:'5%',fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'#484948',    }}
                  placeholder="Ville"
                  placeholderTextColor="#BCBCBC" 
                  />

<TextInput 
                  onChangeText={setTel}
                  value={telephone}
                  keyboardType="numeric"
                  style={{width:'90%',padding:"0%", borderColor:'#F0F0F0',paddingVertical:'2.4%',paddingLeft:'5%',borderRadius:5,marginTop:'7%',backgroundColor:'#F3F3FC',marginLeft:'5%',fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'#484948',    }}
                  placeholder="telephone"
                  placeholderTextColor="#BCBCBC" 
                  />





               <ModalSelector
                   data={secteurs}
                   initValue="Select Genre"
                   onChange={handleOptionChange3}
                   style={{marginTop:'7%',backgroundColor:'#F3F3FC',width:'90%',paddingVertical:'2.4%',paddingLeft:'5%',marginTop:"5%",marginLeft:'5%',borderWidth:1,borderColor:'#F7F7F7',borderRadius:5}}
                 >
      
      
                  <TouchableOpacity>
                      <Text style={{fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'#BCBCBC'}} >{secteur || 'Secteur d’activité' }</Text>
                  </TouchableOpacity>
     
     
                </ModalSelector>








              <ModalSelector
                disabled={secteur.length<1 ? true :false}
                 data={fonctions}
                 initValue="Select Genre"
                 onChange={handleOptionChange2}
                 style={{marginTop:'7%',backgroundColor:'#F3F3FC',width:'90%',paddingVertical:'2.4%',paddingLeft:'5%',marginTop:"5%",marginLeft:'5%',borderWidth:1,borderColor:'#F7F7F7',borderRadius:5}}
                >
       
                  <TouchableOpacity>
                    <Text style={{fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'#BCBCBC'}} >{fonction || 'Fonction' }</Text>
                  </TouchableOpacity>
     
               </ModalSelector>







          <TouchableOpacity onPress={()=>{toggleCalendar()}}>
               <View style={{position:'relative',zIndex:4564,display:'flex',flexDirection:'row',alignItems:'center',marginTop:'7%',backgroundColor:'#F3F3FC',width:'90%',paddingVertical:'2.4%',paddingLeft:'5%',marginTop:"5%",marginLeft:'5%',borderWidth:1,borderColor:'#F7F7F7',borderRadius:5}}>
                    <Text style={{fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'#BCBCBC'}}>{Calendrier || 'Datenaissance'}</Text>
     
                  <Icon name="calendar" size={24} color="black" style={{marginLeft:'40%'}}/>
    
              <View style={{position:'absolute',left:'7%',backgroundColor:'#DFDFDF',top:'-945%',width:'90%'}}>
                  
                  {isCalendarVisible && (
                
                       <DateTimePicker
                       testID="dateTimePicker"
                       value={Calendrier.length<1 ? new Date() : datehelp}
                       mode="date" // "date" for a date picker, "time" for a time picker
                       is24Hour={true}
                       display="spinner" // "default" or "spinner"
                       onChange={onChange}
          
                     />
                    )
                    
                    
                    
                    
                    
                    }
      
      
              </View>
             </View>


           </TouchableOpacity>














    




          <TouchableOpacity disabled={complete==100 ?false :true}  onPress={()=>{handleOptions()}}  style={{width:"25%",marginTop:'7%',marginLeft:'70%',backgroundColor:'#4A83FE',paddingHorizontal:'1%',paddingVertical:'2%',borderRadius:5}}>
              <Text style={{fontSize:getResponsiveFontSize(13),textAlign:'center',color:'white',fontFamily:'PoppinsRegular'}}>SUIVANT</Text>
          </TouchableOpacity>

        
</ScrollView>





         <View style={{height:'7%',display:'flex',justifyContent:'center',paddingHorizontal:'0%',borderTopColor:'#EAEAEA',borderTopWidth:1}}>
              <Text style={{marginLeft:'2%',fontSize:getResponsiveFontSize(15),fontFamily:"PoppinsRegular",color:Color}}>Profiter Completer  {complete}%</Text>
              <View  style={{backgroundColor:bg,position:"absolute",top:0,height:'95%',width:`${complete}%`,opacity:0.6}}>
                     <Text>.</Text>
             </View>
          </View>




          </View>




</LinearGradient>

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

export default Setup

