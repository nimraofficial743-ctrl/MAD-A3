import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#6C63FF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Summary',
          tabBarIcon: ({ color }) => (
            <Ionicons name="pie-chart" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}