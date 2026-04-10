import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API = 'http://192.168.100.9:3000';
export default function AddScreen() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const addExpense = async () => {
    if (!title || !amount || !category) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    await axios.post(`${API}/expenses`, { title, amount, category });
    Alert.alert('✅ Success', 'Expense added!');
    setTitle(''); setAmount(''); setCategory('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>➕ Add Expense</Text>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Amount" value={amount}
        onChangeText={setAmount} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Category (Food, Transport...)"
        value={category} onChangeText={setCategory} />
      <TouchableOpacity style={styles.button} onPress={addExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#6C63FF' },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 14,
    marginBottom: 14, fontSize: 16, elevation: 2 },
  button: { backgroundColor: '#6C63FF', borderRadius: 10, padding: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});