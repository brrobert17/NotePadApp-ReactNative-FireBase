import {Text, TouchableOpacity} from "react-native";
import {styles} from "../config/styles.js";

export const NoteCard = ({navigation, note}) => {

    return (
        <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => navigation.navigate('NoteScreen', {note: note})}>
            <Text style={{color: '#009657'}}>{note.text}</Text>
        </TouchableOpacity>
    )
}