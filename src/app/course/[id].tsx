import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.tag}>COURSE PARAMETER</Text>
        <Text style={styles.title}>{id}</Text>
        <Text style={styles.body}>
          Opens the full screen so the bottom tabs or katong navigation are hidden.
        </Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back to Portal</Text>
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
  tag: { fontSize: 12, color: '#D81B60', fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginVertical: 6 },
  body: { fontSize: 15, color: '#666' },
  backButton: { backgroundColor: '#D81B60', padding: 14, borderRadius: 12, alignItems: 'center' },
  backButtonText: { color: '#FFF', fontWeight: 'bold' },
});