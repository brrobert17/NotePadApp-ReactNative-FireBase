import {Button, Image, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../config/context.js";
import {styles} from "../config/styles.js";
import * as ImagePicker from "expo-image-picker";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../config/firebase";

const NoteScreen = ({route, navigation}) => {
    const {editNote, deleteNote, saveNote, setNote} = useContext(AppContext)
    const {note} = route.params
    const [noteScreenNote, setNoteScreenNote] = useState(note.text);
    const [url, setUrl] = useState();
    console.log("here's the note:" +note)
    const [image, setImage] = useState([]);
    const [imagePath, setImagePath] = useState();

    useEffect(() => {
        const func = async () => {
            const reference = ref(storage, note.id);
            await getDownloadURL(reference).then((res) => {
                setUrl(res)
                console.log(res)});
        }
        func();
    }, [])

    const getImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true
        });
        console.log(result);
        setImagePath(result.assets[0].uri)
        console.log(imagePath + "hey")
        setImage(result);
    }

    const uploadImage = async () => {
        const res = await fetch(imagePath);
        const blob = await res.blob();
        const storageRef = ref(storage, note.id);
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log(storageRef);
        });
    }
    let imagePreview;
    if (imagePath) {
        imagePreview = <Image style={styles.image} source={{uri: imagePath}}/>;
        console.log(image)
    } else {
        imagePreview = <Image style={styles.image} source={{uri: url}}/>;
        console.log("url: " + url)
    }

    function backToHome() {
        navigation.navigate("Home")
    }

    return (
        <>
            <TextInput
                style={{fontSize: 18}}
                multiline={true}
                onChangeText={(text => setNoteScreenNote(text))}
            >
                {note.text}
            </TextInput>
            <TouchableOpacity style={styles.touchableOpacity2} onPress={() => {
                deleteNote(note.id);
                backToHome();
            }}>
                <Text>delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableOpacity2} onPress={() => {
                saveNote(note.id, noteScreenNote);
                backToHome();
            }}>
                <Text>save</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <TouchableOpacity style={styles.touchableOpacity2} onPress={getImage}>
                    <Text>Choose image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableOpacity2} onPress={uploadImage}>
                    <Text>Upload image</Text>
                </TouchableOpacity>
                <View style={styles.imagePreview}>
                    {imagePreview}
                </View>

            </View>
        </>
    )
}
export default NoteScreen