import {Dimensions, StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    touchableOpacity: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        width: Dimensions.get('window').width,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderWidth: 4,
        borderRadius: 6,
        borderStyle: 'solid',
        borderColor: '#009657'

    },
    touchableOpacity2: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        width: Dimensions.get('window').width,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderWidth: 4,
        borderRadius: 6,
        borderStyle: 'solid',
        borderColor: '#b01179'

    },
    item: {
        height: 40
    },
    imagePreview:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems:'center',
        backgroundColor: "#b01179"
    },
    image:{
        width: Dimensions.get('window').width,
        height: 550,
        resizeMode: 'contain'

    }

});
