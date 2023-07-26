import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PersonalInfoCard = ({ title, data, onDelete }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.cardItemContainer}>
          <Text style={styles.cardItemText}>{item}</Text>
          <TouchableOpacity onPress={() => onDelete(item)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    padding: 10,     width:350,
    borderRadius: 10,
    marginTop:40,
    marginBottom: 20,
    shadowColor: '#2a7db6',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,    
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  cardItemText: {
    fontSize: 16,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 16,
  },
});

export default PersonalInfoCard;
