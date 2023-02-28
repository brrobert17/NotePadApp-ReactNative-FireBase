import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import {AppContext} from "./config/context";
import NoteScreen from "./screens/NoteScreen";
import {collection, addDoc, getDocs, doc, deleteDoc, setDoc, query} from "firebase/firestore";
import {auth, db, notesRef} from "./config/firebase";
import {NotesHomeScreen} from "./screens/NotesHomeScreen";
import {useCollection} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";

const Stack = createNativeStackNavigator();

export default function App() {
    // const [notes, setNotes] = useState([
    //     /*{
    //         "id": 1,
    //         "text": "Shopping"
    //     },
    //     {
    //         "id": 2,
    //         "text": "ToDo"
    //     },
    //     {
    //         "id": 3,
    //         "text": "Concerts"
    //     }*/
    // ])

    const [note, setNote] = useState("");


    // const fetchPost = async () => {
    //     await getDocs(collection(db, "notes"))
    //         .then((querySnapshot) => {
    //             const newData = querySnapshot.docs
    //                 .map((doc) => ({...doc.data(), id: doc.id}));
    //             setNotes(newData);
    //             console.log(notes, newData);
    //         })
    // }
    //

    // const fetchPost = () => {
    //
    // }
    // useEffect(() => {
    //     fetchPost();
    // }, [note])
    /*function addNote(text) {
        const lastId = notes[notes.length - 1].id
        setNotes([...notes, {id: lastId + 1, text: text}])
    }*/

    const addNoteDb = async (text) => {
        try {
            const docRef = await addDoc(collection(db, "notes"), {
                text: text,
            });
            console.log("doc written with ID: ", docRef.id);
            setNote(text);
        } catch (e) {
            console.error("error adding doc: ", e)
        }
    }

    const saveNote = async (id, text) => {
        const docRef = await doc(db, "notes", id);
        const data = {text: text}
        await setDoc(docRef,data).then(()=> {
            console.log("update", data);
            if(note === "") {
                setNote("1");
            } else {
                setNote("");
            }
        }).catch(error => {
            console.error(error);
        });

    }
    const deleteNote = (id) => {
        const docRef = doc(db, "notes", id);
        deleteDoc(docRef).then(() => {
            console.log("deleted: ", docRef.id);
            if(note === "") {
                setNote("1");
            } else {
                setNote("")
            }
        })
    }

    // function editNote(id, text) {
    //     setNotes(notes.map((note) => {
    //         if (note.id === id) {
    //             return {...note, text: text}
    //         } else {
    //             return note
    //         }
    //     }))
    // }

    return (
        <AppContext.Provider value={{addNoteDb, deleteNote, saveNote, setNote, note}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={"Home"}
                                  component={NotesHomeScreen}/>
                    <Stack.Screen name={"NoteScreen"}
                                  options={{title: "Note"}}
                                  component={NoteScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>

    );
}
