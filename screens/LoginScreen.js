import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../Core/config';

const LoginScreen = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("Resigtered with:", user.email);
            alert("Resigtered with:", user.email);
        })
        .catch((error) => {
            console.log('register error');
            alert(error.message);
        })
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
            alert('Logged in with:', user.email);
        })
        .catch((error) => {
            alert(error.message);
            console.log('login error')
        })
    }

    return (
        <View styles={styles.container}>
            <Text style={styles.heading}>Login Screen!</Text>
            <TextInput placeholder="email..." onChangeText={(email) => setEmail(email)}/>
            <TextInput placeholder="password" onChangeText={(password) => setPassword(password)}/>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )

}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'purple',
    },
    button: {
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline:{
        backgroundColor:'white',
        marginTop: 5,
        borderColor: 'orange',
        borderWidth: 2,
    }
})
