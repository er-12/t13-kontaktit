import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, FlatList, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import React, { useState } from 'react';

export default function App() {

  const [contacts, setContacts] = useState();

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({ 
        fields: [
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
          Contacts.Fields.PhoneNumbers,
        ],
      });
      if (data.length > 0) {
        setContacts(data);
        console.log(contacts)
      }
    } 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
        <View>
          <Text>{item.firstName} {item.lastName}, {item.phoneNumbers[0].number}</Text>
        </View>
      }
      />
      <Button title='Get Contacts' onPress={getContacts}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  title: {
    fontSize: 16,
    marginBottom: 10
  },

});
