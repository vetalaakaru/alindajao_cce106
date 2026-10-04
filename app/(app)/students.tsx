import StudentCard, { type Student } from '@/components/StudentCard';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function StudentsScreen() {
  const { token, logout } = useAuth();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const loadStudents = async () => {
    if (!token) {
      setStudents([]);
      setError('You are not authenticated.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setStudents([]);
        setError('Your session has expired. Please sign in again.');
        await logout();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to load students.');
      }

      const data = await response.json();

      const studentData: Student[] = Array.isArray(data)
        ? data
        : data.users || data.data || [];

      setStudents(studentData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong while loading students.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [token]);

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircleOne} />
      <View style={styles.backgroundCircleTwo} />

      <View style={styles.header}>
        <Text style={styles.eyebrow}>STUDENT SERVICE PORTAL</Text>

        <Text style={styles.title}>Students</Text>

        <Text style={styles.subtitle}>
          Browse student information
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>⌕</Text>

        <TextInput
          style={styles.input}
          accessibilityLabel="Search students"
          placeholder="Search by name"
          placeholderTextColor="#9aa8b7"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <View style={styles.state}>
          <View style={styles.loadingIcon}>
            <ActivityIndicator color="#245bb2" size="large" />
          </View>

          <Text style={styles.stateTitle}>
            Loading students...
          </Text>

          <Text style={styles.text}>
            Please wait while we get the student list.
          </Text>
        </View>
      ) : error ? (
        <View style={styles.state} accessibilityLiveRegion="polite">
          <View style={styles.errorIcon}>
            <Text style={styles.errorIconText}>!</Text>
          </View>

          <Text style={styles.stateTitle}>
            Unable to load students
          </Text>

          <Text style={styles.error}>
            {error}
          </Text>

          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={loadStudents}
          >
            <Text style={styles.retryText}>
              Try Again
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item, index) =>
            String(item.id ?? index)
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/student/${item.id}`)}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.studentItem,
                pressed && styles.buttonPressed,
              ]}
            >
              <StudentCard student={item} />
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={styles.state}>
              <Text style={styles.emptyIcon}>○</Text>

              <Text style={styles.stateTitle}>
                {search.trim()
                  ? 'No students found'
                  : 'No students available'}
              </Text>

              <Text style={styles.text}>
                {search.trim()
                  ? 'Try searching for a different name.'
                  : 'There are no students to display.'}
              </Text>
            </View>
          }
        />
      )}

      {!loading && !error && filteredStudents.length > 0 && (
        <Text style={styles.count}>
          {filteredStudents.length} student
          {filteredStudents.length !== 1 ? 's' : ''}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 35,
    backgroundColor: '#f2f5fa',
    overflow: 'hidden',
  },

  backgroundCircleOne: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#dce8f8',
    top: -150,
    right: -100,
  },

  backgroundCircleTwo: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#e5edf7',
    bottom: -100,
    left: -120,
  },

  header: {
    marginBottom: 18,
  },

  eyebrow: {
    color: '#245bb2',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#17324d',
    letterSpacing: -0.7,
  },

  subtitle: {
    color: '#536579',
    fontSize: 13,
    marginTop: 5,
  },

  searchContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dce5ef',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  searchIcon: {
    color: '#245bb2',
    fontSize: 24,
    width: 28,
    textAlign: 'center',
  },

  input: {
    flex: 1,
    color: '#17324d',
    fontSize: 14,
    marginLeft: 7,
    paddingVertical: 0,
  },

  list: {
    paddingBottom: 65,
  },

  studentItem: {
    marginBottom: 10,
    borderRadius: 18,
  },

  state: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    flex: 1,
  },

  loadingIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
backgroundColor: '#f2f5fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  errorIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#245bb2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  errorIconText: {
    color: '#ffffff',
    fontSize: 27,
    fontWeight: '800',
  },

  emptyIcon: {
    color: '#245bb2',
    fontSize: 42,
    marginBottom: 8,
  },

  stateTitle: {
    color: '#17324d',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 5,
  },

  text: {
    color: '#6d7d8e',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },

  error: {
    color: '#536579',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 15,
  },

  retryButton: {
    backgroundColor: '#245bb2',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 13,
  },

  retryText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  count: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    color: '#245bb2',
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    shadowColor: '#49627d',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
});