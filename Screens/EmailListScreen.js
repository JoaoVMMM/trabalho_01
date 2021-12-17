import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

export default function EmailListScreen({ navigation }){
    const [emailList, setEmailList] = useState([]);

    useEffect(() => {
        async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails');
            const emailList = await response.json();
            setEmailList(emailList);
        };
        getData();
    }, []);

    function renderItem({ item }){
        return <TouchableOpacity style={styles.emailFolder} onPress={() => navigation.navigate('EmailMessageScreen', {id: item.id})}>
            <Image style={styles.picture} source={{ uri: item.picture }}/>
            <View style={styles.info}>
                <Text style={styles.textFocus}>{item.to}</Text>
                <Text style={styles.textFocus}>{item.tittle}</Text>
                <Text>{item.summary}</Text>
            </View>
            <View style={styles.extra}>
                <Text>{item.time}</Text>
                <TouchableOpacity style={styles.lupa}>
                    <AntDesign name={item.star ? "star" : "staro"} size={24} color={item.star ? "gold" : "gray"} />
                </TouchableOpacity>
                
            </View>
        </TouchableOpacity>;
    };

    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.pesquisarContainer}>
                <TextInput style={styles.pesquisar}></TextInput>
                <TouchableOpacity style={styles.lupa}>
                    <Entypo name="magnifying-glass" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.emailListContainer}>
                <FlatList
                    data={emailList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    pesquisarContainer:{
        marginTop: 55,
        height: 60,
        padding: 5,
        flexDirection: 'row',
    },
    pesquisar:{
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
    },
    lupa:{
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emailListContainer:{
        flex: 1,
    },
    emailFolder:{
        height: 100,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
    },
    picture:{
        height: 60,
        width: 60,
        margin: 10,
        borderRadius: 30,
        alignSelf: 'center',
    },
    info:{
        flex: 1,
        paddingStart: 10,
        justifyContent: 'center',
    },
    extra:{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    textFocus:{
        fontWeight: 'bold',
        fontSize: 17,
    },
});