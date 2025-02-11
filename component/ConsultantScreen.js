import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConsultantConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function ConsultantScreen({ navigation }) {
  const [consultants, setConsultants] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'consultants'));
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log('Fetched consultants:', data);
        setConsultants(data);
      } catch (error) {
        console.error('Error fetching consultants:', error);
      }
    };

    fetchConsultants();
  }, []);

  const filteredConsultants = consultants.filter(consultant =>
    consultant.username && consultant.username.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ConsultantDetail', { consultant: item })}>
      <View style={styles.card}>
        <Image source={{ uri: item.photoUrl || 'default_image_url' }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.username || 'Unknown User'}</Text>
          <Text style={styles.specialty}>{item.specialty || 'No Specialty'}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Consultant"
        value={search}
        onChangeText={setSearch}
      />
      {filteredConsultants.length > 0 ? (
        <FlatList
          data={filteredConsultants}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noResults}>No consultants found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
    padding: 20,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    fontSize: 16,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  specialty: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    color: '#FFD700',
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});
