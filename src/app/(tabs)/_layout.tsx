import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#FFE4E1' },
        headerTintColor: '#D81B60',
        tabBarActiveTintColor: '#D81B60',
        tabBarInactiveTintColor: '#A86B7B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#FFD1DC',
          height: 60,
          paddingBottom: 8,
        },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}