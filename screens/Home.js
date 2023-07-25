

import React, { useRef, useState, useLayoutEffect} from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PieChartComponent from './PieChartComponent';
import { useNavigation } from '@react-navigation/native';
import home from '../assets/home.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
import menu from '../assets/menu.png';
import close from '../assets/close.png';
import logo from '../assets/logo.jpeg';
import search from '../assets/search.png';
import BarChartComponent from './BarChartComponent';
import Profile from './Profile';
import RequestedAttendance from './RequestedAttendance';
import ReviewScreen from './Review';
import EmployeeMD from './EmployeeMD';


export default function Home({ }) {

  const [currentTab, setCurrentTab] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);


  
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <Image source={logo} style={{
          width: 120,
          height: 60,
          borderRadius: 10,
          marginTop: 8
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#0a1f2e',
          marginTop: 20
        }}>PerM App</Text>

        <TouchableOpacity>
          <Text style={{
            marginTop: 6,
            color: 'white'
          }}></Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {TabButton(currentTab, setCurrentTab, "Home", home)}
          {TabButton(currentTab, setCurrentTab, "Profile", settings, navigation)}
          {TabButton(currentTab, setCurrentTab, "Employees", settings, navigation)}
          {TabButton(currentTab, setCurrentTab, "Rating & Reviews", settings, navigation)}
          {TabButton(currentTab, setCurrentTab, "Attendance", search, navigation)}
          {TabButton(currentTab, setCurrentTab, "RequestAttendance", search, navigation)}
          {TabButton(currentTab, setCurrentTab, "Tasks", search, navigation)} 
        

        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, "LogOut", logout, navigation)}
        </View>
      </View>

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: '#f4f5ff',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        
        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            <Image source={showMenu ? close : menu} style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginTop: 40,

            }}></Image>

          </TouchableOpacity>

          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            paddingTop: 20
          }}>{currentTab}</Text>

        </Animated.View>
        
        <View style={styles.dataContainer}>
          <Text></Text>
          <PieChartComponent />
        </View>

        <View style={styles.dataContainer}>
          <Text></Text>
          <BarChartComponent />
        </View>
        </Animated.View>

    </SafeAreaView>
  );
}

const TabButton = (currentTab, setCurrentTab, title, image, navigation) => {
  return (

    <TouchableOpacity onPress={() => {
      if (title === "Attendance") {
        navigation.navigate("Attendance"); 
      } else if (title === "Tasks") {
        navigation.navigate("Task"); 
      } else if (title === "LogOut") {
        navigation.navigate("Welcome"); 
      }
        else if (title === "Profile") {
          navigation.navigate("Profile"); 
        }
        else if (title === "RequestAttendance") {
          navigation.navigate("RequestAttendance"); 
        } else if (title === "Rating & Reviews") {
          navigation.navigate("Review"); 
        } else if (title === "Employees") {
          navigation.navigate("EmployeeMD"); 
      } else {       
         setCurrentTab(title);
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: '#0a1f2e'
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: '#0a1f2e'
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6ebfa',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  dataContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fdfdff',
    borderRadius: 20,
    marginBottom: 10,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: '#d6ebfa',
    shadowOffset: { width: 0, height: 4 }, 
  },

});
