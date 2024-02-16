import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Alert, Switch} from 'react-native';

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
import { Ionicons } from '@expo/vector-icons';
const storage = getStorage();


const storageRef = ref(storage);

async function uploadImageAsync(uri) {

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), uuid.v4());
  const result = await uploadBytes(fileRef, blob);

 
  blob.close();

  return await getDownloadURL(fileRef);
}








export default function Cameras({navigation ,route}) {

    const [imageUri, setImageUri] = useState(null);
    const [imageurl, setImageUrl] = useState(null);
    const [factures, setFactures] = useState([]);
    const [componentWidth, setComponentWidth] = React.useState(0);
    const [recognizedText, setRecognizedText] = useState('');
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const pickImage = async () => {
    
      try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         base64: true
       });
  
      if (!result.assets[0].cancelled) {
        setImageUri(result.assets[0].uri);
      
}


    
        let base64Img =  `data:image/jpg;base64,${result.assets[0].base64}`;
  
        const uploadUrl = await uploadImageAsync(result.assets[0].uri);
       // console.log(uploadUrl)
       recognizeText(uploadUrl)
       if(isEnabled){
        if(factures.length<25){updateData(uploadUrl)}else{alert("vou avez passer limite des scans enregistres vous devez supprimer ou abonne toi pour plusieurs enregistrementss")}
        }
      
}catch(e){
  return e
}

    };


    const getCameraAndPhotoLibraryPermissions=async()=> {
      const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
      const { status: photoLibraryStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    
      if (cameraStatus === 'granted' && photoLibraryStatus === 'granted') {
       
        return true;
      } else {
       
        return false;
      }
    }




    const launchCamera = async() => {
      Alert.alert(
        'Permission',
        'Permettez-vous à cashapp d’utiliser votre appareil photo ? ',
        [
          {
            text: 'refuser',
            style: 'cancel',
          },
          {
            text: 'accepter',
            onPress: async () => {
             
              const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status)
       
if (status == 'granted') {
  console.log('Permission to access location was denied');




        try {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 0.1,
              aspect: [4, 3],
              base64: true
            });
        
        
              
       
              if (!result.assets[0].cancelled) {
                setImageUri(result.assets[0].uri);
              setload('block')
               let base64Img =  `data:image/jpg;base64,${result.assets[0].base64}`;
              const uploadUrl = await uploadImageAsync(result.assets[0].uri);
        
              if(isEnabled){
                if(factures.length<25){updateData(uploadUrl)}else{alert("vou avez passer limite des scans enregistres vous devez supprimer ou abonne toi pour plusieurs enregistrementss")}
                }
            recognizeText(uploadUrl)
           
              }
          } catch (error) {
            setload("none")
   
          }
        }


      },
    },
  ]
);




    };




















    


    
    const recognizeText = async (x) => {
    
      setload('block')

      const url = 'https://ocr-extract-text.p.rapidapi.com/ocr?url='+x;
      const options = {
        method: 'GET',
        url: 'https://ocr-extract-text.p.rapidapi.com/ocr',
        params: {
          url: 'https://qph.cf2.quoracdn.net/main-qimg-60dad75c0dddf8f4aa1a95040d7c3ca5-pjlq'
        },
        headers: {
          'X-RapidAPI-Key': '7bc9c4cb1bmsh63ea1d613ab28f2p1c7640jsn14fcad894c62',
          'X-RapidAPI-Host': 'ocr-extract-text.p.rapidapi.com'
        }
      };
      
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("//////////////////////////");
        console.log(result);
        var resultArray = result.text.split("\n");
        // console.log(resultArray);
        // const outputArray =resultArray.map(str => parseFloat(str.replace(/[^\d.]/g, '')));
        // let newArray = outputArray.filter(value => !isNaN(value));
        // console.log(newArray);
         //const filteredArray = newArray.filter(value => {
         // const decimalPart = (value.toString().split('.')[1] || '').length;
         // return decimalPart < 2;
        //});
       console.log(result.text);
const prix = result.text.match(/\b\d+\.\d+\b/g);
      console.log("Les prix trouvés sont :", prix);
      var largestNumber=null;
      if(prix!=null){
      var prixFloats = prix.map(parseFloat);
      
        var largestNumber = findLargestNumber(prixFloats);
        console.log(largestNumber)
     }
        if(prix!=null || largestNumber!=null){
          setload('none')
 navigation.navigate('OcrResult',{prix:largestNumber})
          }
        else{
          setload('none')
          alert("aucun prix detecte Ressaye")


        }
      } catch (error) {
        console.error(error);
      }

    /*  var myHeaders = new Headers();
      myHeaders.append("apikey", "TMlKq85q7lsDOKOrjKgEwShBgHdpuTiP");
      
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
      
      fetch("https://api.apilayer.com/image_to_text/url?url="+x, requestOptions)
        .then(response => response.text())
        .then(result =>{ //setRecognizedText(JSON.parse(result).all_text)
          console.log(result)
          const text = JSON.parse(result).annotations;
       
       //  const numbersWithTwoDecimalPlaces = findNumbersWithTwoDecimalPlaces(text);
     //     const largestNumber = findLargestNumber(numbersWithTwoDecimalPlaces);
      if(text!=undefined && largestNumber!=undefined){
          setload('none')
 navigation.navigate('OcrResult',{prix:largestNumber})
          }
        else{
          setload('none')
          alert("aucun prix detecte")


        }
        setload('none')

        })
        .catch(error => {
          console.log(error)
        setload('none')
      });
      */








/** 




      const requestBody = {
      
        parent: "",
        requests: [
          {
            image: {
              source: {
                imageUri: x
              }
            },
            features: [
              {
                type: "TEXT_DETECTION"
              },
            
            ]
          }
        ]
      
    };

    // Make a POST request using fetch
    fetch('https://vision.googleapis.com/v1/images:annotate?key=40fb7f17e7fb341b2fb98f7b4f6a468204edeb82', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type
        // You may need to include other headers like authentication tokens
      },
      body: JSON.stringify(requestBody), // Convert the body to JSON format
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
         var datastring=[];
         if(data.responses[0].textAnnotations!=undefined){
       console.log(data.responses[0].textAnnotations)
       let textString=data.responses[0].textAnnotations[0].description;

       let lines = textString.split('\n');

// Initialiser un tableau pour stocker les montants convertis
let amounts = [];

// Parcourir chaque ligne du texte
lines.forEach(line => {
    // Utiliser une expression régulière pour extraire les montants
    let match = line.match(/[\d\s,]+\.?\d/);
    
    if (match) {
        // Récupérer la correspondance et la convertir en nombre
        let amountStr = match[0].replace(/\s/g, '').replace(',', '.');
        let amount = parseFloat(amountStr);
        amounts.push(amount);
    }
});

      
       //console.log(amounts);
       let newArray = amounts.filter(value => !isNaN(value));
   //    console.log(newArray)
        const largestNumber = findLargestNumber(newArray);
      //  console.log(largestNumber)
        
        const text = data.responses[0].textAnnotations[0].description;

        if(newArray.length>0 && largestNumber!=undefined){
          setload('none')
 navigation.navigate('OcrResult',{prix:largestNumber})
          }
        else{
          setload('none')
          alert("aucun prix detecte")


        }
      }
      else{
        setload('none')
        alert("aucun prix detecte")
      }

        
      })
      .catch(error => {
        setload('none')
       alert("error")
      });





*/








      };

















     
const findLargestNumber=(numbers)=> {
  if (numbers === null) {
    
    return null; // Return null if the array is empty
  }
  console.log("big")

  // Use the spread operator (...) to pass the array elements as arguments to Math.max()
  const largestNumber = Math.max(...numbers);

  return largestNumber;
}












      const findNumbersWithTwoDecimalPlaces=(arrayOfStrings)=> {
        console.log("changes")
        const numberRegex = /^\d+(?:[.,]\d{2})?/;
        const numbers = [];
      
        arrayOfStrings.forEach((str) => {
          const matches = str.match(numberRegex);
          if (matches) {
            matches.forEach((match) => {
              numbers.push(parseFloat(match.replace(',', '.')));
            });
          }
        });
      
        return numbers;
      }
      



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
  setload('none')
},[])




      const [loads, setload] = React.useState("none");


/**********************************888888 */
  


const updateData =async (x) => {
  var values = await AsyncStorage.getItem('userid');
  var scans=[];
  var docRef = await query(collection(db, "users"),where("id","==",values));
  var querySnapshot=await getDocs(docRef)
  var todos=[]
  querySnapshot.forEach((doc) => {
        const itemData = doc.data();
       
        console.log('----------------------')
    
        itemData.factures.map(x=>{
          scans.push(x)
        })
         
      })

  setload('block')
scans.push(x)  


  
  
   values= await AsyncStorage.getItem("userid");
  docRef = await query(collection(db, "users"),where("id","==",values));
   querySnapshot=await getDocs(docRef)
   todos=[]
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
      
        const docRef = doc.ref;
        updateDoc(docRef, { 
          id: values,
          nom: todos[0].nom,
          prenom: todos[0].prenom, 
          secteur: todos[0].secteur, 
          ville: todos[0].ville,
          budget: todos[0].budget,  
          depense: todos[0].depense, 
          fonction:  todos[0].fonction, 
          Datenaissance: todos[0].Datenaissance,
          dateinscription:todos[0].dateinscription,
          budgetinitial: todos[0].budgetinitial,
          factures:scans
        }
          
          )
          .then(() => {
     
            setload('none')
          
          })
          .catch((error) => {
            setload("none")
            
          });
      });
  
  
    




    }
  
    const fetchItemsFromFirebase =async () => {
  
      const values = await AsyncStorage.getItem('userid');
        
        const docRef = await query(collection(db, "users"),where("id","==",values));
        const querySnapshot=await getDocs(docRef)
        let todos=[]
        querySnapshot.forEach((doc) => {
              const itemData = doc.data();
              setFactures(itemData.factures)
              console.log('----------------------')
           
                })
      
      
      
      
      }


    useFocusEffect(
      React.useCallback(() => {
    
        fetchItemsFromFirebase()     
        
      }, [])
    );
    







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














<View style={{marginTop:"5%",display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
  <TouchableOpacity  onPress={()=>{navigation.navigate("Home")}}>
       <Icon name="home" size={getResponsiveFontSize(35)} color="white" style={{marginLeft:'2.5%'}}/>
       
   </TouchableOpacity>

   <TouchableOpacity  onPress={()=>{navigation.navigate("Scans")}}>
       <Ionicons name="albums" size={getResponsiveFontSize(35)} color="white" />
   </TouchableOpacity>
</View>


<View style={{width:"100%",display:'flex',flexDirection:'row',alignItems:'center'}}>
  <Text style={{fontSize:getResponsiveFontSize(16),fontFamily:'PoppinsRegular',color:'white'}}>Enregister les scans</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{transform: [{ scaleX: 0.65 }, { scaleY: 0.65 }],}}
      />
    </View>



<View style={{ display:'flex',justifyContent:'center',alignItems:'center',height:'80%'}}>







{imageUri && <Image source={{ uri: imageUri}} style={{ width: 200, height: 200 }} />}

<Entypo name="camera" size={getResponsiveFontSize(75)} color="white" onPress={()=>{launchCamera()}} style={{marginBottom:'10%'}} />
<MaterialIcons name="library-books" size={getResponsiveFontSize(75)} onPress={()=>{pickImage()}} style={{marginTop:'10%'}} color="white" />
</View>


        </LinearGradient>
        </View>
      
      )

}