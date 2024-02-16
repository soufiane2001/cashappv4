import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';

const Welcom = ({navigation,route }) => {
  const logoPosition = useRef(new Animated.Value(-200)).current;
  const sloganPosition = useRef(new Animated.Value(-200)).current;
  const buttonPositionX = useRef(new Animated.Value(200)).current;
  const buttonPositionY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [componentWidth, setComponentWidth] = useState(0);


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
  
  useEffect(() => {

      const logoAnimation = Animated.timing(logoPosition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      });
      const sloganAnimation = Animated.timing(sloganPosition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      });
  
      Animated.parallel([ logoAnimation, sloganAnimation]).start(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000, // Adjust the duration as needed
            useNativeDriver: true,
          })
          
        ]).start();
      });
  }, []);

  return (
    <View style={styles.container}  onLayout={onLayout} >
      <Animated.Image
        source={require('../../assets/expensia.png')}
        style={[{  width:getResponsiveFontSize(200),height:getResponsiveFontSize(50),resizeMode:'stretch'}, { transform: [{ translateY: logoPosition }] }]}
      />
      <Animated.Text style={[{  fontSize: getResponsiveFontSize(15),

    textAlign: 'center',fontFamily:'PoppinsRegular',color:'#494949',marginTop:getResponsiveFontSize(5)}, { transform:[{ translateY: sloganPosition }]}]}>
     An easy way to manage your expenses​
      </Animated.Text>

      <Animated.View style={[{
    position: 'absolute',
    bottom:"5%",
    right: "5%",
  }, {opacity}]}>
      <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{
          borderRadius: 25,
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={ {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }}>commencez</Text>
      </LinearGradient>
    </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Welcom;
