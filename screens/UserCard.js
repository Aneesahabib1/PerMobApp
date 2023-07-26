import React,{useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Rating from './Rating';
import { useFonts } from 'expo-font';

const UserCard = ({ user }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (newRating) => {
    console.log(`User ${user.id} rating: ${newRating}`);
    setRating(newRating);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmission = () => {
    console.log(`User ${user.id} rating: ${rating}`);
    console.log(`User ${user.id} comment: ${comment}`);
    setRating(0);
    setComment('');
  };

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
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/Review_pfp.webp')} 
          style={styles.profileImage}
        /></View>
      <Text style={styles.fname}>{user.fname}</Text>
      <Text style={styles.empcode}>ID: {user.empcode}</Text>
      <Text style={styles.departn}>Department: {user.departn}</Text>
      <Text style={styles.desigg}>Designation: {user.desigg}</Text>
      <Text style={styles.textStyle}>Give Rating!</Text>
      <View style={styles.ratingContainer}>
        <Rating initialRating={rating} onChangeRating={handleRatingChange} />
        <Text style={styles.ratingText}> {rating}</Text>
      </View>
      <TextInput
        style={styles.commentInput}
        value={comment}
        onChangeText={handleCommentChange}
        placeholder="Leave a comment"
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f4f5ff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: 'white',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,     

  },
  ratingText:{
    fontFamily:'FiraSans_SemiBold',
    color:'#85c4ef',
    fontSize:50,
    textAlign:'center',

  },

  commentInput: {
    marginTop: 15,
    padding: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    color:'grey',
    backgroundColor:'#DEDEDE'
  },
  textStyle:{
    fontFamily:'FiraSans_SemiBold',
    color:'#85c4ef',
    textAlign:'center',
    marginTop:50,
    fontSize:20
  },
  fname:{
fontFamily: 'FiraSans_Bold',
fontSize:25,
textAlign:'center'
  },
  empcode:{
    fontFamily:'Light',
    textAlign:'center',
    fontSize:20,
  },
  departn:{
    fontFamily:'Light',
    textAlign:'center',
    fontSize:20,
  },
  desigg:{
    fontFamily:'Light',
    textAlign:'center',
    fontSize:20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 14,
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#349ce4',
    padding: 10,
    marginTop: 10,
    marginLeft: 140,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',

  },
  submitButtonText: {
    fontFamily: 'FiraSans_SemiBold',
    color: 'white',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'grey',
    marginBottom: 10,
    width: 100,
    marginLeft:120,
    height: 100,
    borderRadius: 50, 
    overflow: 'hidden', 
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});

export default UserCard;
