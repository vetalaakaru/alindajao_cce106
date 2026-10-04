import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type Student = {
  id?: string | number;
  name?: string | null;
  email?: string | null;
  course?: string | null;
};

export default function StudentCard({ student }: { student: Student }) {
  const handleViewDetails = () => {
    if (student.id === undefined || student.id === null) {
      return;
    }

    router.push(`/student/${student.id}`);
  };

  const firstLetter = student.name?.charAt(0).toUpperCase() || '?';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {firstLetter}
          </Text>
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.name}>
            {student.name || 'Name not available'}
          </Text>

          <Text style={styles.id}>
            Student #{student.id ?? 'N/A'}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>✉</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Email</Text>

          <Text style={styles.text}>
            {student.email || 'Email not available'}
          </Text>
        </View>
      </View>

      {student.course ? (
        <View style={styles.infoRow}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>★</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.label}>Course</Text>

            <Text style={styles.text}>
              {student.course}
            </Text>
          </View>
        </View>
      ) : null}

      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleViewDetails}
      >
        <Text style={styles.buttonText}>
          View Details
        </Text>

        <Text style={styles.arrow}>
          →
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    shadowColor: '#49627d',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#245bb2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: '800',
  },

  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    color: '#17324d',
    fontSize: 16,
    fontWeight: '800',
  },

  id: {
    color: '#7c8b9a',
    fontSize: 11,
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: '#dce5ef',
    marginVertical: 14,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#f2f5fa',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    color: '#245bb2',
    fontSize: 14,
  },

  info: {
    flex: 1,
    marginLeft: 10,
  },

  label: {
    color: '#7c8b9a',
    fontSize: 9,
    fontWeight: '600',
    marginBottom: 2,
  },

  text: {
    color: '#536579',
    fontSize: 12,
    fontWeight: '600',
  },

  button: {
    height: 45,
    borderRadius: 13,
    backgroundColor: '#245bb2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },

  arrow: {
    color: '#ffffff',
    fontSize: 19,
    marginLeft: 8,
  },
});
