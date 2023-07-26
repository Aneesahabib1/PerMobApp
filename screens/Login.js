

import React,{useState} from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, TextInput, Keyboard, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Svg, Path } from 'react-native-svg';

export default function Login() {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleLogin = async () => {
    if (!isEmailValid(credentials.email) ) {
      alert('Please enter a valid email and password.');
      return;
    }
  
    try {
      // Request to the API to fetch all records
      const response = await fetch('https://64bbb5b37b33a35a444697dd.mockapi.io/MobAppSignup');
      if (!response.ok) {
        console.log('Failed to fetch user records from API');
        return;
      }
  
      const data = await response.json();
  
      // To check if any user record in the API matches the provided email and password
      const matchingUser = data.find(
        (user) => user.email === credentials.email && user.password === credentials.password
      );
  
      if (matchingUser) {
        alert('Login successful!'); 
        navigation.navigate('Home'); 
      } else {
        alert('Invalid email or password.'); 
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
   
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'start' , }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: '#349ce4',
              padding: 8,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              marginLeft: 4,
            }}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <Svg style={styles.curveContainer} height="600%" width="100%" viewBox="0 0 1440 320" preserveAspectRatio="none">
  <Path fill="#349ce4" d="M0,128L48,122.7C96,117,192,107,288,128C384,149,480,203,576,213.3C672,224,768,192,864,165.3C960,139,1056,117,1152,144C1248,171,1344,245,1392,282.7L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
  <Path fill="white" d="M0,192L48,202.7C96,213,192,235,288,234.7C384,235,480,213,576,181.3C672,149,768,107,864,106.7C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" opacity="0.8" />
</Svg>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title} >Log In to PerM</Text>
        <Text style={styles.text} >Welcome back to your Account!</Text>
      </View>
    </SafeAreaView>
    <View
      style={{
        flex: 1,
        backgroundColor: '#aed7f4',
        paddingHorizontal: 8,
        paddingTop: 30,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
      }}
    >
        <View style={{ marginBottom: 2 }}>
          <Text style={{ color: '#aed7f4', marginLeft: 4 }}>Full Name</Text>
          <TextInput
            style={{
              padding: 12,
              backgroundColor: '#aed7f4',
              color: 'white',
              borderRadius: 20,
              marginBottom: 8,
              placeholderTextColor: 'white',
            }}
            placeholder="Tap to Enter Name" placeholderTextColor= 'white'
          />
          <Text style={{ color: '#aed7f4', marginLeft: 4 }}>Email Address</Text>
        <TextInput
          style={{
            padding: 12,
            backgroundColor: '#aed7f4',
            color: 'white',
            borderRadius: 20,
            marginBottom: 8,
          }}
          placeholder="Tap to Enter Email"
          placeholderTextColor="white"
          value={credentials.email}
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        />
        {!isEmailValid(credentials.email) && credentials.email.trim() !== '' && (
          <Text style={{ color: 'red', marginLeft: 4 }}>Please enter a valid email address.</Text>
        )}

        <Text style={{ color: '#aed7f4', marginLeft: 4 }}>Password</Text>
        <TextInput
          style={{
            padding: 12,
            backgroundColor: '#aed7f4',
            color: 'white',
            borderRadius: 20,
            marginBottom: 16,
          }}
          secureTextEntry
          placeholder="Tap to Enter Password"
          placeholderTextColor="white"
          value={credentials.password}
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        />
              

        <View style={{ paddingHorizontal: 100 }}>
          <TouchableOpacity onPress={handleLogin} style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: 'white', borderRadius: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#0a1f2e' , }}>
              LogIn
            </Text>
          </TouchableOpacity></View>
        </View>
       
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 28 }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{ fontWeight: '600', color: '#349ce4' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View></TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
   
    title: {
      color: '#153e5b',
      fontWeight: 'bold',
      fontSize: 40,
      textAlign: 'center',
      marginBottom: 10,
    },
    curveContainer:{
marginTop:-50,
marginBottom:100
    },
    text:{
      fontSize: 16,
      color: '#0a1f2e',
    marginBottom:-50    }
  })
