import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const API = 'http://192.168.100.9:3000';
export default function SummaryScreen() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    axios.get(`${API}/expenses/summary`).then(res => setSummary(res.data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Spending Summary</Text>
      <FlatList
        data={summary}
        keyExtractor={(item: any) => item.category}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.category}>📂 {item.category}</Text>
            <Text style={styles.total}>${parseFloat(item.total).toFixed(2)}</Text>
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
    marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', elevation: 3 },
  category: { fontSize: 16, fontWeight: 'bold' },
  total: { fontSize: 16, color: '#6C63FF', fontWeight: 'bold' },
});