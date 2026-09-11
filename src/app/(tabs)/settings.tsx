import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.label}>Selected Theme</Text>
        <Text style={styles.value}>Rose Pink 🌹</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Notifications</Text>
        <Text style={styles.value}>Active</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF5F6' },
  item: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFD1DC',
  },
  label: { fontSize: 16, color: '#333', fontWeight: '500' },
  value: { fontSize: 16, color: '#D81B60', fontWeight: 'bold' },
});