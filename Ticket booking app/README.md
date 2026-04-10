# Ticket Booking App

Full-stack ticket booking app.

- Backend: Node.js + Express + MySQL
- Frontend: static HTML/CSS/JS served through Express
- Also includes React Native guidance to connect to the same backend API.

## Prerequisites

- Node.js 18+ installed
- MySQL server running
- create-react-native-app / expo-cli installed for mobile app optionally

## Database Setup

1. Start MySQL and log in:

   ```bash
   mysql -u root -p
   ```

2. Create database (the app also creates if missing):

   ```sql
   CREATE DATABASE IF NOT EXISTS ticket_db;
   USE ticket_db;
   ```

The server auto-creates the `tickets` table and inserts sample data.

## Install dependencies

```bash
cd "c:\\Users\\User\\Desktop\\MAD PROJECT TASKS\\Ticket booking app"
npm install
```

## Run backend server

```bash
npm start
```

Server listens on `http://localhost:3001`.

## Open frontend

Navigate in browser to

- `http://localhost:3001`

The frontend fetches `/tickets` and renders cards.

## API endpoint

GET `/tickets`

Response sample:

```json
[
  {"user_name":"Alice Johnson","event":"Silver Screen Premiere","seat_no":"A1"},
  ...
]
```

## React Native app (example)

1. Create new app:

```bash
npx expo init TicketBookingMobile
cd TicketBookingMobile
npm install axios
```

2. Example App.js (replace):

```js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('http://10.0.2.2:3001/tickets') // Android emulator mapping
      .then(resp => setTickets(resp.data))
      .catch(e => console.error(e));
  }, []);

  const filtered = tickets.filter(t =>
    t.event.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Booking</Text>
      <TextInput
        style={styles.input}
        placeholder="Filter event"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => `${item.seat_no}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.event}>{item.event}</Text>
            <Text>{item.user_name}</Text>
            <Text>{item.seat_no}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 16 },
  title: { color: 'tomato', fontSize: 24, marginBottom: 8 },
  input: { backgroundColor: '#222', color: '#fff', padding: 12, marginBottom: 12, borderRadius: 8 },
  card: { backgroundColor: '#1c1c1c', padding: 12, borderRadius: 8, marginBottom: 10 },
  event: { color: '#ff7f7f', fontWeight: 'bold' }
});
```

3. Run with emulator:

```bash
npm run android
# or
npm run ios
```

### Important

- If using iOS simulator, use your machine IP instead of `10.0.2.2`.
- Ensure backend `http://<your-ip>:3001` is reachable from device.

## SQL Queries for reference

- Create table:

```sql
CREATE TABLE IF NOT EXISTS tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(100),
  event VARCHAR(150),
  seat_no VARCHAR(20)
);
```

- Insert sample:

```sql
INSERT INTO tickets (user_name, event, seat_no) VALUES 
('Alice Johnson','Silver Screen Premiere','A1'),
('Ravi Patel','Rock Concert 2026','B14'),
('Mia Zhang','Broadway Night','C7'),
('Derek Smith','Tech Expo 2026','D3'),
('Sofia Lopez','Jazz & Wine','E11');
```

- Read:

```sql
SELECT user_name, event, seat_no FROM tickets;
```
