/*import React from "react";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const UserProfile = ()=>{
    const navigation = useNavigation();

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(require(''));
    const [name, setName] = useState(fullName); // Initialize name with the logged-in fullName
    const [editedName, setEditedName] = useState(fullName); // New state to store edited name
    const [designation, setDesignation] = useState('Jr. Developer');
    const [profileImageClicks, setProfileImageClicks] = useState(0);  

    const [loaded] = useFonts({
        FiraSans_Bold: require('../assets/Fira_Sans/FiraSans_Bold.ttf'),
        Light: require('../assets/Fira_Sans/FiraSans_ExtraLight.ttf'),
        FiraSans_LightItalic: require('../assets/Fira_Sans/FiraSans_LightItalic.ttf'),
        FiraSans_BoldItalic: require('../assets/Fira_Sans/FiraSans_BoldItalic.ttf'),
        FiraSans_SemiBold: require('../assets/Fira_Sans/FiraSans_SemiBold.ttf'),
      });

      
      const styles = StyleSheet.create({
        scrollViewContainer: {
          flexGrow: 1,
        },
          Topcontainer: {
            flex: 1,
            backgroundColor: 'white', 
            paddingHorizontal: 8,
            paddingTop: 10,
            paddingBottom: 30,
            shadowColor: '#2a7db6',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 8,
            justifyContent: 'center', 
            alignItems: 'center', 
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingBottom: 30,
          },
          
        profileContainer: {
          flex: 0.3,
          flexDirection:'column',
          backgroundColor: 'white',
          paddingHorizontal: 8,
          paddingTop: 10,
          paddingBottom: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: 30,
        },
        progressContainer: {
          flexDirection: 'row',
          backgroundColor: 'white',
          justifyContent: 'space-around',
          marginTop: -5,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: 30,
          shadowColor: '#2a7db6',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 8,
        },
      
        completedTasksText: {
          fontSize: 18,
          fontWeight: 'bold',
          fontFamily: 'FiraSans_LightItalic',
          marginTop: 120,
          marginLeft:-100,
        },
        overdueTasksText: {
          fontSize: 18,
          fontWeight: 'bold',
          fontFamily: 'FiraSans_LightItalic',
          marginTop: 120,
          marginLeft:-100,
      
        },
        jobCard: {
          backgroundColor: "white",
          borderRadius: 20,
          marginTop: 20,
          fontSize:40,
          padding: 10,
          width: 350,
          shadowColor: "#2a7db6",
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 8,
        },
        jobItem: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        },
        itemInfo: {
          alignItems: "center",
        },
        itemHeading: {
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 5, 
        },
        itemText: {
          fontSize: 14,
        },
        taskCard: {
          backgroundColor: 'white',
          borderRadius: 20,
          marginTop: 20,
          padding: 10,
          width:350,
          shadowColor: '#2a7db6',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 8,     
        },
        taskHeadingRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        },
        taskHeadingText: {
          fontSize: 18,
          fontWeight: 'bold',
          fontFamily: ' FiraSans_SemiBold',
        },
        taskItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        },
        taskTitle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
       
        profileInfo: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          
        },
        profileImage: {
          height: 130,
          width: 130,
          borderRadius: 999,
          marginTop: 50,
          
        },
        profileTextContainer: {
          marginLeft: 10,
          marginTop: 5,
        },
        nameText: {
          fontFamily: 'FiraSans_Bold',
          color: 'black',
          fontSize: 30,
          marginBottom: 5,
        },
        designationText: {
          fontFamily: 'Light',
          color: 'black',
          fontSize: 20,
        },
        progressCircleContainer: {
          flexDirection:'row',
          justifyContent: 'space-around',
          marginTop: 50,
        },
        minimizedRow: {
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          alignItems: 'center',
        },
        minimizedText: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      
        editModalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        editProfileImage: {
          width: 150,
          height: 150,
          borderRadius: 75,
          marginBottom: 20,
        },
        input: {
          width: '80%',
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          marginBottom: 20,
        },
      
      });



    return(
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profileInfo}>
            <View style={styles.Topcontainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
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
            
            </View>
            <Text style={{ fontFamily: 'FiraSans_SemiBold', fontSize: 20, marginTop: -30, textAlign: 'center' }}>
              My Profile
              </Text>
              <TouchableOpacity >
              <Image
              />
            </TouchableOpacity>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.designationText}>{designation}</Text>
          </View>
        </View>
      </ScrollView>
    )

   
}
export default UserProfile;*/