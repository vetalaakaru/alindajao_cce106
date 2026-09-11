import { Link, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Welcome Back! </Text>
        <Text style={styles.bannerSub}>Student Portal Dashboard</Text>
      </View>

      <Text style={styles.sectionHeader}>Course Quick Access</Text>

     
      <Link href="/course/CCE106" asChild>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTag}>CCE106</Text>
          <Text style={styles.cardTitle}>APPLICATION DEVELOPMENT</Text>
          <Text style={styles.cardLink}>Tap to view details →</Text>
        </TouchableOpacity>
      </Link>

      
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => router.push('/course/MATH201')}>
        <Text style={styles.cardTag}>MATH102</Text>
        <Text style={styles.cardTitle}>Mathematics in the Modern World</Text>
        <Text style={styles.cardLink}>Tap to view details →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF5F6' },
  banner: {
    backgroundColor: '#D81B60',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  bannerTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  bannerSub: { fontSize: 14, color: '#FFD1DC', marginTop: 4 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#880E4F', marginBottom: 12 },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFD1DC',
  },
  cardTag: { fontSize: 12, fontWeight: 'bold', color: '#D81B60', marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardLink: { fontSize: 13, color: '#D81B60', marginTop: 8, fontWeight: '600' },
});