# Inventory Management App

Full-stack Inventory Management application (Node.js + Express + MySQL + frontend UI) plus React Native instructions for mobile app connection.

## Backend (Node.js + Express + MySQL)

### Prerequisites
- Node.js 16+
- MySQL server running
- `npm` installed

### Setup
1. `cd "c:\\Users\\User\\Desktop\\MAD PROJECT TASKS\\inventry app"`
2. `npm install`
3. Create MySQL user/db or use defaults:
   - DB host: `localhost`
   - DB user: `root`
   - DB password: `` (empty)
4. Start server: `npm start` (or `npm run dev` with `nodemon`)

Server runs at: `http://localhost:3000`

### API
- GET `/inventory` returns JSON list with `item_name` and `quantity`.
- Express static serves `public/index.html` and frontend assets.

### Database initialization logic
`server.js` automatically:
- creates database `inventory_db` if missing
- creates table `inventory` (`id`, `item_name`, `quantity`)
- inserts 5 sample rows (upsert style)

## Frontend (Vanilla HTML/CSS/JS)

Open `http://localhost:3000` after server start.

- `public/index.html`: UI with dark sidebar, white content, table
- `public/styles.css`: blue / grey theme, badges, responsive
- `public/script.js`: fetch `/inventory`, render table, color-coded badge, real-time name filter

## React Native Mobile App (Conceptual setup)

### Prerequisites
- `npm install -g expo-cli` or React Native CLI
- Android Studio / Xcode / simulators

### Create app
```
expo init inventory-mobile
cd inventory-mobile
npm install axios
```

### Sample app code snippet
```js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('http://YOUR_PC_IP:3000/inventory');
      setItems(res.data);
    }
    fetchData();
  }, []);

  const filtered = items.filter(i => i.item_name.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search items"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.item_name}</Text>
            <Text>{item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f8fafc' },
  search: { borderColor: '#cbd5e1', borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#e5e7eb' }
});
```

### Connect to MySQL from React Native
- Do not connect directly from RN app to MySQL for security.
- Use Node.js API (`/inventory`, `/inventory/:id`, etc.) as backend and consume via HTTP.

## MySQL queries (examples)

- Create table:
  `CREATE TABLE inventory (id INT AUTO_INCREMENT PRIMARY KEY, item_name VARCHAR(255), quantity INT);`
- Select all:
  `SELECT item_name, quantity FROM inventory;`
- Insert:
  `INSERT INTO inventory (item_name, quantity) VALUES ('Item A', 30);`
- Update:
  `UPDATE inventory SET quantity = 20 WHERE item_name = 'Item A';`
- Delete:
  `DELETE FROM inventory WHERE id = 1;`

## Notes
- Ensure network routing if testing mobile on emulator/physical device (use computer IP not `localhost`).
- Adjust DB credentials in `server.js` or via environment variables (`DB_USER`, `DB_PASSWORD`, `DB_HOST`).
