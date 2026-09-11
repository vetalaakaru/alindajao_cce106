import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DA</Text>
        </View>
        <Text style={styles.name}>Desiree Alindajao</Text>
        <Text style={styles.subtext}>Information Technology Student</Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/student/STUD-146727')}>
        <Text style={styles.buttonText}>View Student ID Route (STUD-146727)</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.outlineButton]} 
        onPress={() => router.push('/student/invalid-id')}>
        <Text style={styles.outlineButtonText}>Test Invalid Parameter Route</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF5F6' },
  profileHeader: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFD1DC',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D81B60',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: { color: '#FFF', fontWeight: 'bold', fontSize: 20 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  subtext: { fontSize: 14, color: '#777', marginTop: 2 },
  button: {
    backgroundColor: '#D81B60',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  outlineButton: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#D81B60' },
  outlineButtonText: { color: '#D81B60', fontWeight: 'bold', fontSize: 15 },
});