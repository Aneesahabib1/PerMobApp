
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { color } from 'react-native-tailwindcss';
import { Svg, Path } from 'react-native-svg';

export default function Welcome() {
  const navigation = useNavigation();
  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <View style={styles.container}>
      <Svg style={styles.curveContainer} height="50%" width="100%" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <Path fill="#349ce4" d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,192C672,192,768,192,864,186.7C960,181,1056,171,1152,165.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </Svg>
        <Text style={styles.title} >Welcome!</Text>
        <Image
          source={require("../assets/logo.jpeg")}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginText, styles.loginLink]}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#153e5b',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 750 / 350,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f4f5ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#0a1f2e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#153e5b',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#0a1f2e',
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#349ce4',
    marginLeft: 5,
  },
});
