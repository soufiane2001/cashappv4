import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button ,TouchableOpacity,Image,Text} from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./warmUpBrowser";
 
WebBrowser.maybeCompleteAuthSession();
 
const SignInWithOAuth = ({size}) => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
return(err);
    }
  }, []);
 
  return (
    <TouchableOpacity onPress={onPress} style={{display:'flex',flexDirection:'row',alignItems: 'center',justifyContent: 'center',marginTop:'5%',backgroundColor:'#E90B0B',paddingHorizontal:'2%',paddingVertical:'3%',borderRadius:35}}>
  
    <Image source={require('../assets/Gmail.png')} style={{width:"10%",height:'80%',marginBottom:'0%',resizeMode:'contain'}} />
    <Text style={{fontSize:size,textAlign:'center',color:'white',fontFamily:'PoppinsBold'}}>Connectez-vous avec Google</Text>
  
  
   </TouchableOpacity>
  );
}
export default SignInWithOAuth;