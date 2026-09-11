import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const isValid = id && id.toString().startsWith('STU-');

  return (
    <View style={styles.container}>
      <View style={[styles.card, !isValid && styles.errorCard]}>
        <Text style={[styles.title, !isValid && styles.errorTitle]}>
          {isValid ? 'Student Profile Found' : 'Invalid Parameter'}
        </Text>
        <Text style={styles.body}>
          {isValid 
            ? `Viewing details for Student ID: ${id}` 
            : `The route parameter "${id}" is not a valid student format.`}
        </Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF5F6' },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFD1DC',
    marginBottom: 16,
  },
  errorCard: { borderColor: '#E53935', backgroundColor: '#FFEBEE' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#D81B60', marginBottom: 8 },
  errorTitle: { color: '#E53935' },
  body: { fontSize: 15, color: '#444' },
  backButton: { backgroundColor: '#D81B60', padding: 14, borderRadius: 12, alignItems: 'center' },
  backButtonText: { color: '#FFF', fontWeight: 'bold' },
});