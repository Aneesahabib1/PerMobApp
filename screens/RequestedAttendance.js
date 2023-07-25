import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native'
import React,{useEffect, useState} from 'react'

const RequestedAttendance = ()=>{
    const [attData, setAttData]=useState();
    const [isLoaded, setIsLoaded]= useState(true);
    const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  let flatListRef = null;

    
const getData= async()=>{
    try{
        const response= await fetch(
            "https://646296267a9eead6fad2c898.mockapi.io/api/V1/Attendance"
        );
        const myData = await response.json();
        setAttData(myData);
        setIsLoaded(false);
        setFilteredData(myData);
        console.log(myData);}
        catch(error){
        console.log(error);
    }
};
useEffect(()=>{
    getData();
},[]);
const handleSearch = (text) => {
    setSearchText(text);
    const filtered = attData.filter((item) => {
      return item.id.toString().includes(text);
    });
    setFilteredData(filtered);
    if (filtered.length > 0 && flatListRef) {
        flatListRef.scrollToIndex({ index: attData.indexOf(filtered[0]), animated: true });
      }
    };

return(
  <View style={styles.mainContainer}>
  <View style={styles.titleContainer}>
      <Text style={styles.title}>Requested Attendance</Text></View>      
        <TextInput
        style={styles.searchBar}
        placeholder="Search by ID"
        onChangeText={handleSearch}
        value={searchText}
      />
            {filteredData.length > 0 ? (

 <FlatList
        ref={(ref) => (flatListRef = ref)}
        data={filteredData}
        renderItem={({ item }) => {
    return(<View style={styles.card}>
        <View>
          <View style={styles.dataContainer}>
            <Text style={styles.data}> Requests </Text>
          </View>
          <View style={styles.mainContain}>
            <Text style={styles.myName}> ID: {item.id} </Text>
            <Text style={styles.myName}> From date: {item.fromdate} </Text>
            <Text style={styles.myName}> To date: {item.todate} </Text>
            <Text style={styles.myName}> Reason: {item.reason} </Text>
          </View>
          
        </View>
        
      </View>)
}}/>    
) : (
    <Text style={styles.dataNotAvailable}>Data not available</Text>
  )}
</View>
);
};

const styles = StyleSheet.create({

  title: {
    fontFamily:'Light',
    fontSize: 20,
    marginBottom: 16,
    marginLeft:85,
    marginTop:20,
    textAlign:'center',
    color:'white',
  },
  titleContainer:{
    backgroundColor:'#153e5b',
    flexDirection:'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    width:'150%',
      },

    searchBar: {
        height: 40,
        width:150,
        marginLeft:20,
        borderRadius: 10,
        backgroundColor:'white',
        paddingHorizontal: 10,
        shadowColor: '#d6ebfa',
        margin: 10,
        shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
        fontFamily: "JosefinSans_400Regular",
      },

    mainContainer: {
      width: "100%",
      minHeight: "100%",
      paddingVertical: 50,
      backgroundColor: "#f4f5ff",
    },
    card: {
      width: 250,
      height: 150,
      backgroundColor: "#fff",
      borderRadius: 5,
      margin: 20,
      shadowColor: '#d6ebfa',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    borderColor: '#0a1f2e', 
    },
    dataContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      fontFamily: "JosefinSans_400Regular",
      borderRadius:'15px', boxShadow:'1px 2px 9px #d6ebfa',
      backgroundColor: "#5db0e9",

        },
    idNumber: {
      fontSize: 20,
      color: "rgba(255, 255, 255, 0.5)",
      fontFamily: "JosefinSans_400Regular",
      paddingRight: 10,
    },
    data: {
      fontSize: 20,
      color: "#fff",
      fontFamily: "JosefinSans_400Regular",
      
    },
    mainHeader: {
      fontSize: 30,
      color: "#0a1f2e",
      textAlign: "center",
      fontFamily: 'Source Sans Pro',
      fontWeight: 'bold'
    },

    mainContain: {
      padding: 10,
      backgroundColor: "#fdfdff",
      borderTopStartRadius:20,
      borderTopEndRadius:20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      shadowColor: '#d6ebfa',
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,      
    },
    myName: {
      fontSize: 14,
      color: "#0a1f2e",
      marginBottom: 10,
      alignSelf: "flex-start",
      textTransform: "capitalize",
      fontFamily: "JosefinSans_400Regular",
    },
  });
  export default RequestedAttendance;
