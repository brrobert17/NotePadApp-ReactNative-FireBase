import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useContext, useState} from "react";
import {AppContext} from "../config/context";
import {styles} from "../config/styles.js";
import {NoteCard} from "./NoteCard";
import {auth, notesRef} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {SignIn} from "./SignIn";
import {useCollection, useCollectionData} from "react-firebase-hooks/firestore";
import {query} from "firebase/firestore";

export const NotesHomeScreen = ({navigation}) => {

    const {addNote, addNoteDb} = useContext(AppContext);
    const [value, loading, error] = useCollectionData(notesRef);
    const [user] = useAuthState(auth);
    console.log("user: "+user)
    const SignOut = () => {
        return auth.currentUser && (
            <TouchableOpacity style={styles.touchableOpacity2} onPress={()=> {
                auth.signOut();
                navigation.navigate("Home");
                }}>
                <Text>
                    SignOut
                </Text>
            </TouchableOpacity>)
    }

    return (
        <>
            {user ? (
                <View style={styles.container}>
                    {value
                        ? (<FlatList data={value} renderItem={({item}) => <NoteCard navigation={navigation} note={item}/>}/>)
                        : (<Text>Nope</Text>)}
                    <StatusBar style="auto"/>
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => addNoteDb('new note')}>
                        <Text>
                            Add note
                        </Text>
                    </TouchableOpacity>
                    <SignOut/>
                </View>
            ) : (
                <View>
                    <SignIn/>
                </View>
            )}
        </>


    )
}
