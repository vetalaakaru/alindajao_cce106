import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Attendance Tracker</Text>
        <Text style={styles.subtitle}>React Native Local State & Hooks</Text>

        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => router.push('/lab08')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTitle}>Lab 08</Text>
          <Text style={styles.buttonSubtitle}>Open Attendance Sheet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E8FF', 
  },
  content: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B0764', 
  },
  subtitle: {
    fontSize: 16,
    color: '#7E22CE', 
    marginBottom: 30,
  },
  cardButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E9D5FF', 
    shadowColor: '#6B21A8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7E22CE', 
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#581C87',
    marginTop: 4,
  },
});