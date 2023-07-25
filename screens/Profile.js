
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  ScrollView,
} from "react-native";
import ProgressCircleBar from "./components/ProgressCircleBar";
import axios from 'axios';
import PersonalInfoCard from "./components/PersonalInfo";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fullName } = route.params ?? { fullName: 'Default Name' };

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(require(''));
  const [name, setName] = useState(fullName); // Initialize name with the logged-in fullName
  const [editedName, setEditedName] = useState(fullName); // New state to store edited name
  const [designation, setDesignation] = useState('Jr. Developer');
  const [profileImageClicks, setProfileImageClicks] = useState(0);

  const handleEditProfile = () => {
    setIsEditModalVisible(true);
    setProfileImageClicks(profileImageClicks + 1);
  };

  const handleSaveProfile = () => {
    // Save the updated profile information to the state or database
    setName(editedName); 
    setIsEditModalVisible(false);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to change your profile image.');
        }
      }
    })();
  }, []);

  const handleSelectProfileImage = async () => {
    if (profileImageClicks > 1) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to change your profile image.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfileImage({ uri: result.uri });
      }
    }
  };

  const [educationData, setEducationData] = useState([]);
  const [certificationData, setCertificationData] = useState([]);
  const [newEducationItem, setNewEducationItem] = useState("");
  const [newCertificationItem, setNewCertificationItem] = useState("");
  const [educationItems, setEducationItems] = useState([
    "Bachelors in Computer Science",
  ]);
  const [certificationItems, setCertificationItems] = useState([
    "React Native Developer Certification",
  ]);

  const handleAddEducation = (newItem) => {
    setEducationItems([...educationItems, newItem]);
  };

  const handleDeleteEducation = (itemToDelete) => {
    const updatedItems = educationItems.filter(item => item !== itemToDelete);
    setEducationItems(updatedItems);
  };

  const handleAddCertification = (newItem) => {
    setCertificationItems([...certificationItems, newItem]);
  };

  const handleDeleteCertification = (itemToDelete) => {
    const updatedItems = certificationItems.filter(item => item !== itemToDelete);
    setCertificationItems(updatedItems);
  };

  const [loaded] = useFonts({
    FiraSans_Bold: require('../assets/Fira_Sans/FiraSans_Bold.ttf'),
    Light: require('../assets/Fira_Sans/FiraSans_ExtraLight.ttf'),
    FiraSans_LightItalic: require('../assets/Fira_Sans/FiraSans_LightItalic.ttf'),
    FiraSans_BoldItalic: require('../assets/Fira_Sans/FiraSans_BoldItalic.ttf'),
    FiraSans_SemiBold: require('../assets/Fira_Sans/FiraSans_SemiBold.ttf'),
  });

  const [completedTasks, setCompletedTasks] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [isTaskListExpanded, setIsTaskListExpanded] = useState(false);
  const [overdueTasks, setOverdueTasks] = useState(0);

  useEffect(() => {
    fetchTasks();
    fetchJobs();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/Task');
      const tasksData = response.data; 

      const completedCount = tasksData.filter(task => task.status === 'Completed').length;
      setCompletedTasks(completedCount);

      const overdueCount = tasksData.filter(task => task.status === 'Over-due').length;
      setOverdueTasks(overdueCount);

      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const [jobs, setJobs] = useState([]); 

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://646296267a9eead6fad2c898.mockapi.io/api/V1/EmpMD-PerM');
      const jobsData = response.data; 
      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };


  const toggleTaskList = () => {
    setIsTaskListExpanded(!isTaskListExpanded);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.Topcontainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: -300, marginTop: 10 }}>
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
              </View>*
            <Text style={{ fontFamily: 'FiraSans_SemiBold', fontSize: 20, marginTop: -30, textAlign: 'center' }}>
              My Profile
              </Text>
            <TouchableOpacity onPress={handleEditProfile}>
              <Image
                source={profileImage}
                resizeMode="cover"
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.designationText}>{designation}</Text>

            <Modal visible={isEditModalVisible} animationType="slide">
              <View style={styles.editModalContainer}>
                <TouchableOpacity onPress={handleSelectProfileImage}>
                  <Image
                    source={profileImage}
                    resizeMode="cover"
                    style={styles.editProfileImage}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  value={editedName}
                  onChangeText={(text) => setEditedName(text)}
                  placeholder="Name"
                />
                <TextInput
                  style={styles.input}
                  value={designation}
                  onChangeText={(text) => setDesignation(text)}
                  placeholder="Designation"
                />
                <Button title="Save" onPress={handleSaveProfile} />
                <Button title="Cancel" onPress={() => setIsEditModalVisible(false)} />
              </View>
            </Modal>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressCircleContainer}>
            <ProgressCircleBar
              progress={completedTasks / 100}
              size={100}
              strokeWidth={20}
              progressColor="#149c88"
              backgroundColor="#0a1f2e"
            />
            <Text style={styles.completedTasksText}>
              Completed Tasks: {completedTasks}
            </Text>
          </View>

          <View style={styles.progressCircleContainer}>
            {/* Overdue Tasks Circle */}
            <ProgressCircleBar
              progress={overdueTasks / 100}
              size={100}
              strokeWidth={20}
              progressColor="#ff6f61"
              backgroundColor="#0a1f2e"
            />
            <Text style={styles.overdueTasksText}>
              Overdue Tasks: {overdueTasks}
            </Text>
          </View>
        </View>

        {/* Task Card */}
        <TouchableOpacity onPress={toggleTaskList}>
          <View style={styles.taskCard}>
            {/* Heading row */}
            <View style={styles.taskHeadingRow}>
              <Text style={styles.taskHeadingText}>Task Title</Text>
              <Text style={styles.taskHeadingText}>Status</Text>
            </View>

            {/* Task list */}
            {isTaskListExpanded ? (
              <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.taskItem}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <Text style={styles.taskStatus}>{item.status}</Text>
                  </View>
                )}
              />
            ) : (
              <View style={styles.minimizedRow}>
                <Text style={styles.minimizedText}>Show Tasks</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTaskList}>
  <View style={styles.jobCard}>
    <View style={styles.jobHeadingRow}>
      <Text style={styles.taskHeadingText}>Job Details</Text>


    </View>

    {isTaskListExpanded ? (
      <FlatList
        data={jobs}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobItem}>
            <View style={styles.jobDetails}>
            <Text style={{fontSize:20, marginTop:20}}>
                Job Title:                                                                          {item.desigg}
              </Text>
              <Text style={{marginLeft:200, marginTop:-50, fontSize:20}}>
                Department:                                                                        {item.departn}
              </Text>
              <Text style={{ marginTop:20,fontSize:20}}>
                Employee code:                                                                      {item.empcode}
              </Text>
              <Text style={{marginLeft:200, marginTop:-50,fontSize:20}}>
                Employement Type:                                                                {item.etype}
              </Text>
              <Text style={{marginTop:10, fontSize:20
}}>
                 Starting date:                                                                        {item.doj}
              </Text>
            </View>
          </View>
        )}
      />
    ) : (
      <View style={styles.minimizedRow}>
        <Text style={styles.minimizedText}>Show Job Detail</Text>
      </View>
    )}
  </View>
</TouchableOpacity>

        {/* Education Card */}
        <PersonalInfoCard
          title="Education"
          data={educationItems}
          onDelete={handleDeleteEducation}
        />
        {/* Add Education */}
        <View style={styles.addInfoContainer}>
          <TextInput
            style={styles.input}
            value={newEducationItem}
            onChangeText={(text) => setNewEducationItem(text)}
            placeholder="Add Education"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              if (newEducationItem) {
                handleAddEducation(newEducationItem);
                setNewEducationItem("");
              }
            }}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <PersonalInfoCard
          title="Certification"
          data={certificationItems}
          onDelete={handleDeleteCertification}
        />
        {/* Add Certification */}
        <View style={styles.addInfoContainer}>
          <TextInput
            style={styles.input}
            value={newCertificationItem}
            onChangeText={(text) => setNewCertificationItem(text)}
            placeholder="Add Certification"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              if (newCertificationItem) {
                handleAddCertification(newCertificationItem);
                setNewCertificationItem("");
              }
            }}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
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

export default Profile;
