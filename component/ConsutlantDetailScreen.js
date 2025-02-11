import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const ConsultantDetailScreen = ({ route, navigation }) => {
  const { consultant } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: consultant.photoUrl }} style={styles.image} />
      <Text style={styles.name}>{consultant.name}</Text>
      <Text style={styles.specialty}>{consultant.specialty}</Text>
      <Text style={styles.details}>Available Days: {consultant.availableDays}</Text>
      <Text style={styles.details}>Consultation Hours: {consultant.consultationHours}</Text>
      <Text style={styles.details}>Platform: {consultant.platform}</Text>
      <Text style={styles.details}>Contact: {consultant.contactInfo}</Text>
      <Button title="Make Appointment" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF4E6',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  specialty: {
    fontSize: 18,
    color: '#666',
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ConsultantDetailScreen;
