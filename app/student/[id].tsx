import { type Student } from '@/components/StudentCard';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token, logout } = useAuth();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = async () => {
    if (!id) {
      setStudent(null);
      setError('Student ID is missing.');
      setLoading(false);
      return;
    }

    if (!token) {
      setStudent(null);
      setError('You are not authenticated.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setStudent(null);
        setError('Your session has expired. Please sign in again.');
        await logout();
        return;
      }

      if (response.status === 404) {
        setStudent(null);
        setError('Student record not found.');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to load student details.');
      }

      const data = await response.json();

      setStudent({
        id: data.id,
        name: data.name,
        email: data.email,
        course: data.course ?? null,
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong while loading the student.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudent();
  }, [id, token]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Details</Text>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator size="large" color="#245bb2" />
          <Text style={styles.text}>Loading student...</Text>
        </View>
      ) : error ? (
        <View style={styles.state}>
          <Text style={styles.error}>{error}</Text>

          <Pressable
            accessibilityRole="button"
            style={styles.retryButton}
            onPress={loadStudent}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        </View>
      ) : student ? (
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {student.name?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>

          <Text style={styles.name}>
            {student.name || 'Name not available'}
          </Text>

          <Text style={styles.id}>
            Student #{student.id ?? 'N/A'}
          </Text>

          <View style={styles.divider} />

          <View style={styles.infoBox}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.text}>
              {student.email || 'Email not available'}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Course</Text>
            <Text style={styles.text}>
              {student.course || 'Not available'}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.text}>No student record available.</Text>
      )}

      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 20,
    backgroundColor: '#f2f5fa',
  },
  title: {
    color: '#17324d',
    fontSize: 28,
    fontWeight: '700',
  },
  state: {
    paddingVertical: 30,
    gap: 14,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 22,
    alignItems: 'center',
    gap: 10,
    shadowColor: '#49627d',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#245bb2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    color: '#17324d',
    fontSize: 23,
    fontWeight: '700',
    textAlign: 'center',
  },
  id: {
    color: '#7c8b9a',
    fontSize: 14,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#dce5ef',
    marginVertical: 12,
  },
  infoBox: {
    width: '100%',
backgroundColor: '#f2f5fa',
    padding: 16,
    borderRadius: 14,
    gap: 6,
  },
  label: {
    color: '#7c8b9a',
    fontSize: 13,
    fontWeight: '700',
  },
  text: {
    color: '#536579',
    fontSize: 16,
  },
  error: {
    color: '#b42318',
    textAlign: 'center',
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: '#245bb2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#245bb2',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});
