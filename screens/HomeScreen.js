import { StatusBar } from 'expo-status-bar';
import { doc, getDoc, getDocs, setDoc, deleteDoc, collection, querySnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { signOut } from "firebase/auth";
import { auth } from '../Core/config';

import { db } from '../Core/config';

const App = () => {
    const navigation = useNavigation()

    const [ userDoc, setUserDoc ] = useState(null);
    const [ docId, setDocId ] = useState(null);
    const [ people, setPeople ] = useState([]);
  
    const [ text, setText ] = useState("");
    const [ nameText, setNameText ] = useState("");
    const [ ageText, setAgeText ] = useState("");
  
    const Create = (name, age) => {
      //step: create database in Firestore
      //step: allow read, write
      const myDoc = doc(db, "BunchOfNames", name)
  
      const docData = 
      {
        "name": name,
        "age": age
      }
  
      setDoc(myDoc, docData)
  
      //Handling promises
      .then(() => {
        //success
        console.log("data logged")
        alert("doc created")
      })
      .catch((error) => {
        alert(error.message)
      })
  
    }
  
    const Read = (name) => {
      const myDoc = doc(db, "BunchOfNames", name)
  
      getDoc(myDoc)
  
      .then((snapshot) => {
        //success
        if (snapshot.exists) {
          setUserDoc(snapshot.data());
          // alert(userDoc.name, '=>', userDoc.age);
        }
        else {
          alert("Read: No Doc Found")
        }
      })
      .catch((error) => {
        alert(error.message)
      })
    }

    const RenderCollectionV2 = () => {

      getDocs(collection(db, "BunchOfNames"))
      
      .then((querySnapshot) => {
        const peopleArray = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data())

          peopleArray.push({
            ...doc.data(),
            key: doc.data().name

          });

          setPeople(peopleArray);
        
          console.log(people);

        })
      .catch((error) => {
        alert(error.message)
      })

      })
    }
  
    const Update = (value, merge) => {
      const myDoc = doc(db, "BunchOfNames", "Amy")
  
      setDoc(myDoc, value, {merge: merge})
  
      .then(() => {
        //success
        console.log("data updated")
        alert("data updated")
        setText("")
      })
      .catch((error) => {
        alert(error.message)
      })
      
    }
  
    const Delete = () => {
      const myDoc = doc(db, "BunchOfNames", "Amy")
  
      deleteDoc(myDoc)
  
      .then(() => {
        //success
        console.log("data deleted")
        alert("data deleted")
      })
      .catch((error) => {
        alert(error.message)
      })
    }

    const handleSignOut = () => {
      signOut(auth).then(() => {
          navigation.replace('Login');
          console.log('Signed out');
        }).catch((error) => {
          alert(error.message)
        });
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.header}>Firebase Testing</Text>
          <TextInput style={styles.textInput} placeholder='Input your name...' onChangeText={(nameText) => {setNameText(nameText)} } value={nameText}></TextInput>
          <TextInput style={styles.textInput} placeholder='Input your age...' onChangeText={(ageText) => {setAgeText(ageText)}} value={ageText}></TextInput>
          <Button title='Add a new person' onPress={() => {
            Create(nameText, ageText)
          }} disabled={ageText==""}></Button>
          <Button title='Read doc' onPress={Read('Amy')}></Button>
          {
            userDoc != null &&
            <Text>{userDoc.name} is {userDoc.age} years old.</Text>
          }
          <Button title='Render collection' onPress={RenderCollectionV2}/>
          <TextInput style={styles.textInput} placeholder='Update your age here...' onChangeText={(text) => {setText(text) }} value={text}></TextInput>
          <Button title='Update doc' onPress={() => {
            Update({"age": text}, true)
            }} disabled={text ==""}></Button>
            <Button title='Delete doc' onPress={Delete}></Button>
            <Button title='Sign Out' onPress={handleSignOut}/>
        </View>
        <FlatList style={styles.flatList} data={people} renderItem={({item}) => (
          <View style={styles.flatListItem}>
            <Text>Name: {item.key}</Text>
            <Text>{item.name} => {item.age} years old</Text>
          </View>
        )} />

      </View>
    );
  }
  
  export default App;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',

    },
    section: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: 800,
      borderColor: 'grey',
      borderRightWidth: 1,
      borderLeftWidth: 1,
    },
    flatList:{
      flex: 1,
      marginLeft: 10,
    },
    flatListItem:{
      marginBottom: 20,

    },
    textInput: {
      borderColor: 'blue',
      padding: 10,
    },
    header: {
      padding:15,
      color: 'purple',
      fontSize: 40,
      fontWeight: 'bold',
    }
  });