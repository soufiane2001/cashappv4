import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Alert, TouchableWithoutFeedback, Modal} from 'react-native';

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
import { ScrollView } from 'react-native';


const FullScreenImage = ({ uri, visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
      </View>
    </Modal>
  );
};



export default function Scans({navigation ,route}) {

    const [imageUri, setImageUri] = useState(null);
    const [imageurl, setImageUrl] = useState(null);
    const [images, setImages] = useState([]);
    const [componentWidth, setComponentWidth] = React.useState(0);
    const [recognizedText, setRecognizedText] = useState('');

    const [isFullScreenVisible, setFullScreenVisible] = useState(false);

    const toggleFullScreen = () => {
      setFullScreenVisible(!isFullScreenVisible);
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
      
useEffect(()=>{
  setload('block')
},[])




      const [loads, setload] = React.useState("none");


/**********************************888888 */
  



  
    const fetchItemsFromFirebase =async () => {
  
      const values = await AsyncStorage.getItem('userid');
        
        const docRef = await query(collection(db, "users"),where("id","==",values));
        const querySnapshot=await getDocs(docRef)
        let todos=[]
        querySnapshot.forEach((doc) => {
              const itemData = doc.data();
              console.log(itemData.factures)
              setImages(itemData.factures)
              setload('none')
         //     console.log(itemData)
                })
      
      
      
      
      }


    useFocusEffect(
      React.useCallback(() => {
    
        fetchItemsFromFirebase()     
        
      }, [])
    );
    







/***********************************88 */
const [selectedImage, setSelectedImage] = useState(null);

const openImage = (imageUri) => {
  setSelectedImage(imageUri);
};

const closeImage = () => {
  setSelectedImage(null);
};
/************************* ********************/
const [selectedImages, setSelectedImages] = useState([]);

const toggleImageSelection = (index) => {
  if (selectedImages.includes(index)) {
    // If image is already selected, deselect it
    setSelectedImages(selectedImages.filter((i) => i !== index));
  } else {
    // If image is not selected, select it
    setSelectedImages([...selectedImages, index]);
  }
};

const handleImageLongPress = (index) => {
  toggleImageSelection(index);
};

const handleDeleteSelected = () => {
  // Implement deletion logic here
  // For example, you can show an alert for confirmation
  Alert.alert(
    'Confirm Deletion',
    'Are you sure you want to delete the selected images?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deleteSelectedImages(),
      },
    ],
    { cancelable: false }
  );
};

const deleteSelectedImages = () => {
  // Implement deletion logic here
  console.log('Deleting selected images:', selectedImages);
  // Clear selected images after deletion
  setSelectedImages([]);
};
    return (
     
        <View onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%",paddingVertical:'0%'}}>
     

     <View style={{display:loads,backgroundColor:'black',opacity:0.65,position:'absolute',zIndex:1111,top:"0%",left:'0%',width:'100%',height:"100%"}}>
<View style={{
display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:"100%"
}}>
  
  <ActivityIndicator size="large" color="#007AFF" />
</View>
</View>




       
        <LinearGradient  style={{backgroundColor:'white',paddingHorizontal:"0%",height:'100%',paddingVertical:"0%"}}
         colors={['#528f76', '#5EC309', '#15A701']}
       
       >
<TouchableOpacity style={{marginTop:"5%"}} onPress={()=>{navigation.navigate("Home")}}>
<Icon name="home" size={getResponsiveFontSize(35)} color="white" style={{marginLeft:'2.5%'}}/>

</TouchableOpacity>


<ScrollView contentContainerStyle={{flexGrow:1,paddingVertical:getResponsiveFontSize(0),marginTop:'4%'}}>

  <View style={{ display:'flex',flexDirection:'row',flexWrap:'wrap',width:'100%'}}>
  {images.length>0 && (
    images.map(((x,key)=>{
        return(  
          
    <TouchableOpacity   onLongPress={() =>{ handleImageLongPress(key);console.log(selectedImages.length)}} style={{marginLeft:'0%',marginTop:'0%',width:'50%'}}   onPress={() =>{if(selectedImages.length==0){openImage(x)}}}/* onPress={()=>{navigation.navigate("Scan",{scanid:key})}}*/>
            <Image source={{ uri: x}} style={{ borderWidth:getResponsiveFontSize(0.5),borderColor:'white',width:"100%", height: getResponsiveFontSize(180) }}  />
    </TouchableOpacity>        
            )
    }))
 )}
  </View>
</ScrollView>

        </LinearGradient>
       
        
        <Modal visible={!!selectedImage} transparent={true} onRequestClose={closeImage}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeImage}>
            <Text style={styles.closeButtonText}>Close</Text>
            
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} resizeMode="contain" />
        </View>
      </Modal>
        </View>
      
      )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
});










