import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Student {
  id: string;
  name: string;
  status: 'Present' | 'Absent' | 'Unmarked';
}

const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Harry Potter', status: 'Unmarked' },
  { id: '2', name: 'Hermione Granger', status: 'Unmarked' },
  { id: '3', name: 'Ron Weasley', status: 'Unmarked' },
  { id: '4', name: 'Draco Malfoy', status: 'Unmarked' },
  { id: '5', name: 'Neville Longbottom', status: 'Unmarked' },
  { id: '6', name: 'Luna Lovegood', status: 'Unmarked' },
  { id: '7', name: 'Ginny Weasley', status: 'Unmarked' },
  { id: '8', name: 'Fred Weasley', status: 'Unmarked' },
  { id: '9', name: 'George Weasley', status: 'Unmarked' },
  { id: '10', name: 'Cedric Diggory', status: 'Unmarked' },
  { id: '11', name: 'Cho Chang', status: 'Unmarked' },
];

export default function Lab08() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  useEffect(() => {
    const presentCount = students.filter((s) => s.status === 'Present').length;
    const absentCount = students.filter((s) => s.status === 'Absent').length;

    console.log(`Attendance Updated -> Present: ${presentCount}, Absent: ${absentCount}`);
  }, [students]);

  const markAttendance = (id: string, status: 'Present' | 'Absent') => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const renderStudentItem = ({ item }: { item: Student }) => (
    <View style={styles.card}>
      <Text style={styles.studentName}>{item.name}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.presentButton,
            item.status === 'Present' && styles.selectedPresent,
          ]}
          onPress={() => markAttendance(item.id, 'Present')}
        >
          <Text
            style={[
              styles.buttonText,
              styles.presentButtonText,
              item.status === 'Present' && styles.activeButtonText,
            ]}
          >
            Present
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.absentButton,
            item.status === 'Absent' && styles.selectedAbsent,
          ]}
          onPress={() => markAttendance(item.id, 'Absent')}
        >
          <Text
            style={[
              styles.buttonText,
              styles.absentButtonText,
              item.status === 'Absent' && styles.activeButtonText,
            ]}
          >
            Absent
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderStudentItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E8FF', // Soft light purple background
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#6B21A8', // Purple tint shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B0764', // Dark purple text
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  presentButton: {
    borderColor: '#7E22CE', 
    backgroundColor: 'transparent',
  },
  absentButton: {
    borderColor: '#A855F7', 
    backgroundColor: 'transparent',
  },
  selectedPresent: {
    backgroundColor: '#00FF00', 
  },
  selectedAbsent: {
    backgroundColor: '#DC143C', 
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  presentButtonText: {
    color: '#7E22CE',
  },
  absentButtonText: {
    color: '#A855F7',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
});