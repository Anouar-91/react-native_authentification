import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { actionSignup, actionLogin } from '../redux/actions/actionAuth';
import { useDispatch } from 'react-redux';

const Login = ({ navigation }) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignup, setIsSignup] = useState(true)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useLayoutEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if (error !== null) {
            Alert.alert(
                "ERREUR",
                error,
                [{ text: "Ok" }]
            )
        }

    }, [error])

    const handlePress = async () => {
        if (email.length > 0 && password.length > 0) {
            if (isSignup) {
                setError(null)
                setIsLoading(true);
                try {
                    await dispatch(actionSignup(email, password))
                    navigation.navigate('Home')
                    setIsLoading(false);

                } catch (error) {
                 
                    setError(error.message)
                    setIsLoading(false);
                }
            }
            else {
                setError(null)
                setIsLoading(true);
                try {
                    await dispatch(actionLogin(email, password))
                    navigation.navigate('Home')
                    setIsLoading(false);

                } catch (error) {
          
                    setError(error.message)
                    setIsLoading(false);
                }
            }
        } else {
            alert("Veuillez remplir tous les champs !")
        }
    }

    const load = async () => {
        const userDetailsStr = await AsyncStorage.getItem("user");

        if(userDetailsStr !== null){
            const userDetailsObj = JSON.parse(userDetailsStr);
            const {token, userId, dateTokenExpire}  = userDetailsObj;
            const expireDate = new Date(dateTokenExpire);
            if(expireDate <= new Date() || !token || !userId){
                return;
            }
            navigation.navigate("Home")
        }

    }

    return (
        <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.container}>
            <View style={styles.logo}>
                {
                    isLoading ? <ActivityIndicator /> : <AntDesign name="twitter" size={80} color="white" />
                }

            </View>
            <Text style={styles.text}>   {isSignup ? "Inscription" : "Connexion"}</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Votre Email" onChangeText={(val) => setEmail(val)} keyboardType="email-address" />
                <TextInput secureTextEntry style={styles.input} placeholder="Votre password" onChangeText={(val) => setPassword(val)} />
                <TouchableOpacity style={styles.touchable} onPress={() => handlePress()}>
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Valider</Text>
                    </View>
                </TouchableOpacity>
                <Pressable
                    onPress={() => setIsSignup(!isSignup)}
                >
                    <Text style={{ textAlign: 'center', marginTop: 9 }}>
                        {isSignup ? "Vers connexion" : "Vers inscription"}

                    </Text>
                </Pressable>
            </View>
        </LinearGradient>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1A91DA",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
    , logo: {
        marginBottom: 50
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 50
    },
    input: {
        backgroundColor: "white",
        borderRadius: 25,
        padding: 10,
        textAlign: "center",
        fontSize: 19,
        marginVertical: 10
    },
    touchable: {
        marginVertical: 9
    },
    text: {
        color: "white",
        fontSize: 25,
        textAlign: "center"
    },
    btnContainer: {
        backgroundColor: "turquoise",
        borderRadius: 7,
        padding: 9,

    },
    btnText: {
        fontSize: 17,
        textAlign: "center",
        textTransform: "uppercase"
    }
})