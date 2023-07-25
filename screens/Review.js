import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios'; 
import UserCard from './UserCard';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const Review = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://646296267a9eead6fad2c898.mockapi.io/api/V1/EmpMD-PerM')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const [loaded] = useFonts({
    FiraSans_Bold: require('../assets/Fira_Sans/FiraSans_Bold.ttf'),
    Light: require('../assets/Fira_Sans/FiraSans_ExtraLight.ttf'),
    FiraSans_LightItalic: require('../assets/Fira_Sans/FiraSans_LightItalic.ttf'),
    FiraSans_BoldItalic: require('../assets/Fira_Sans/FiraSans_BoldItalic.ttf'),
    FiraSans_SemiBold: require('../assets/Fira_Sans/FiraSans_SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
  <View style={styles.titleContainer}>
  <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" marginTop='20'/>
      </TouchableOpacity>
      <Text style={styles.title}>         Help Employees Improve</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor:'#d6ebfa'
  },
  titleContainer:{
backgroundColor:'#153e5b',
flexDirection:'row',
alignItems: 'center',
paddingHorizontal: 15,
paddingTop: 20,
width:'150%',
  },
  title: {
    fontFamily:'Light',

    fontSize: 20,
    marginBottom: 16,
    marginTop:20,
    textAlign:'center',
    color:'white',
  },
});

export default Review;
