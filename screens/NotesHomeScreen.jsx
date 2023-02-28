import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useContext, useState} from "react";
import {AppContext} from "../config/context";
import {styles} from "../config/styles.js";
import {NoteCard} from "./NoteCard";

export const NotesHomeScreen = ({navigation}) => {

    const {notes, addNote, addNoteDb} = useContext(AppContext)

    return (
        <View style={styles.container}>
            <FlatList data={notes} renderItem={({item}) => <NoteCard navigation={navigation} note={item}/>}/>
            <StatusBar style="auto"/>
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={()=> addNoteDb('new note')}>
                <Text>
                    Add note
                </Text>
            </TouchableOpacity>


        </View>
    )
}
