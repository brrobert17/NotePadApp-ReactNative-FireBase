import {Text, TextInput, TouchableOpacity} from "react-native";
import {styles} from "../config/styles";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config/firebase";
import {useContext, useState} from "react";
import {AppContext} from "../config/context";

export const SignIn = () => {
    const [userCredentials, setUserCredentials] = useState({email: "", password: ""});
    //const {setUser} = useContext(AppContext)

    const signInWithEmail = () => {
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password);
        console.log("uc: " + userCredentials);
    }
    return (
        <>
            <TouchableOpacity style={styles.touchableOpacity} onPress={signInWithEmail}>
                <Text>Sign In</Text>
            </TouchableOpacity>
            <TextInput placeholder={"email"}
                       style={{fontSize: 20}}
                       onChangeText={(e) => setUserCredentials({...userCredentials, email: e})}>
            </TextInput>
            <TextInput placeholder={"password"}
                       style={{fontSize: 20}}
                       secureTextEntry={true}
                       onChangeText={(e) => setUserCredentials({...userCredentials, password: e})}>
            </TextInput>
        </>

    )
}