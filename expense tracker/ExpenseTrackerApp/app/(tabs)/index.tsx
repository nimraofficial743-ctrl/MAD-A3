import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API = 'http://YOUR_IP:3000'; // 👈 replace with your IP

export default function HomeScreen() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API}/expenses`);
      setExpenses(res.data);
    } catch (err) {
      Alert.alert('Error', 'Cannot connect to server');
    }
  };

  const deleteExpense = async (id: number) => {
    await axios.delete(`${API}/expenses/${id}`);
    fetchExpenses();
  };

  useEffect(() => { fetchExpenses(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💸 My Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.category}>📂 {item.category}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.amount}>${item.amount}</Text>
              <TouchableOpacity onPress={() => deleteExpense(item.id)}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#6C63FF' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between',
    elevation: 3 },
  title: { fontSize: 16, fontWeight: 'bold' },
  category: { color: 'gray', marginTop: 4 },
  right: { alignItems: 'flex-end' },
  amount: { fontSize: 16, fontWeight: 'bold', color: '#6C63FF' },
  delete: { fontSize: 20, marginTop: 6 },
});