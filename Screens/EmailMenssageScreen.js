import * as React from 'react';
import { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function EmailMenssageScreen({ route }){
    const {id} = route.params;

    const [emailMenssage, setEmailMenssage] = useState([]);

    useEffect(() => {
        async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails/' + id);
            const emailMenssage = await response.json();
            setEmailMenssage(emailMenssage);
        };
        getData();
    }, []);

    return(
        <View style={styles.container}>
            <StatusBar style='auto'/>
            <View style={styles.tituloContainer}>
                <Text style={styles.textFonteBig}>{emailMenssage.tittle}</Text>
                <TouchableOpacity>
                <AntDesign name={emailMenssage.star ? "star" : "staro"} size={24} color={emailMenssage.star ? "gold" : "gray"} />
                </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
                <View flexDirection='row'>
                    <Image style={styles.picture} source={{ uri: emailMenssage.picture}}/>
                    <View style={styles.toFrom}>
                        <Text style={styles.textFonteBig}>{emailMenssage.from}</Text>                 
                        <Text style={styles.textFonteSmall}>Para: {emailMenssage.to}</Text>
                    </View >
                </View>
                 
                <View style={styles.data}>
                    <Text style={styles.textFonteSmall}>{emailMenssage.time}</Text>
                </View>
                <View flexDirection='row' alignItems='center'>
                    <TouchableOpacity style={styles.star}>
                        <Feather name="corner-up-left" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo name="dots-three-vertical" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <WebView
                style={styles.corpoContainer}
                source={{html: `<div style="font-size: 60">${emailMenssage.body}</div>`}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    tituloContainer:{
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    star:{
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //////////////
    textFonteBig:{
        fontSize: 25,
        fontWeight: 'bold',
    },
    textFonteSmall:{
        fontSize: 15,
    },
    //////////////
    infoContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    picture:{
        height: 60,
        width: 60,
        margin: 5,
        borderRadius: 30,
        alignSelf: 'center',
    },
    toFrom:{
        justifyContent: 'space-evenly',
        paddingVertical: 5,
        paddingStart: 10,
    },
    data:{
        marginLeft: 20,
    },
    infoExtra:{
        
    },
    //////////////
    corpoContainer:{
        flex: 1,
        margin: 10,
    },
});